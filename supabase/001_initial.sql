-- 001_initial.sql
-- Finvesta initial database schema & RLS policies
-- Run with Supabase SQL editor or `supabase db reset`/`push`

-- === EXTEND auth.users with profile ===
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_url TEXT,
  monthly_income DECIMAL(10,2) DEFAULT 3730.00,
  monthly_savings_target DECIMAL(10,2) DEFAULT 1500.00,
  max_crypto_percentage DECIMAL(5,2) DEFAULT 15.00,
  max_liquid_no_return DECIMAL(10,2) DEFAULT 20000.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- === ENUMS ===
-- Create enum types only if they don't already exist (compatible with PG <15)
DO $$ BEGIN
  CREATE TYPE account_type AS ENUM ('bank','crypto','investment','cash','savings');
EXCEPTION WHEN duplicate_object THEN -- already exists, skip
  RAISE NOTICE 'Enum type account_type already exists, skipping.';
END $$;

DO $$ BEGIN
  CREATE TYPE transaction_type AS ENUM ('income','expense','transfer','investment');
EXCEPTION WHEN duplicate_object THEN
  RAISE NOTICE 'Enum type transaction_type already exists, skipping.';
END $$;

-- === ACCOUNTS ===
CREATE TABLE IF NOT EXISTS public.accounts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type account_type NOT NULL,
  provider TEXT,
  balance DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  currency TEXT NOT NULL DEFAULT 'EUR',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- === CATEGORIES ===
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('income','expense','investment')),
  parent_id UUID REFERENCES public.categories(id),
  color TEXT DEFAULT '#6b7280',
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- === TRANSACTIONS ===
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  account_id UUID REFERENCES public.accounts(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES public.categories(id),
  type transaction_type NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  description TEXT NOT NULL,
  notes TEXT,
  transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,
  to_account_id UUID REFERENCES public.accounts(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT positive_amount CHECK (amount > 0),
  CONSTRAINT transfer_has_destination CHECK (
    (type = 'transfer' AND to_account_id IS NOT NULL) OR (type <> 'transfer' AND to_account_id IS NULL)
  )
);

-- === ALERTS ===
CREATE TABLE IF NOT EXISTS public.alerts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('critical','warning','info')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  action_suggested TEXT,
  trigger_value DECIMAL(12,2),
  is_read BOOLEAN DEFAULT false,
  is_dismissed BOOLEAN DEFAULT false,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- === RLS ===
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

-- Profiles policies
DROP POLICY IF EXISTS "profiles_select" ON public.profiles;
CREATE POLICY "profiles_select" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
DROP POLICY IF EXISTS "profiles_all" ON public.profiles;
CREATE POLICY "profiles_all" ON public.profiles
  FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Accounts policies
DROP POLICY IF EXISTS "accounts_all" ON public.accounts;
CREATE POLICY "accounts_all" ON public.accounts
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Categories policies
DROP POLICY IF EXISTS "categories_select" ON public.categories;
CREATE POLICY "categories_select" ON public.categories
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
DROP POLICY IF EXISTS "categories_all" ON public.categories;
CREATE POLICY "categories_all" ON public.categories
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Transactions policies
DROP POLICY IF EXISTS "transactions_all" ON public.transactions;
CREATE POLICY "transactions_all" ON public.transactions
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Alerts policies
DROP POLICY IF EXISTS "alerts_all" ON public.alerts;
CREATE POLICY "alerts_all" ON public.alerts
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- === DEFAULT CATEGORIES TRIGGER ===
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- profile entry
  INSERT INTO public.profiles(id, name, email)
  VALUES(NEW.id, NEW.raw_user_meta_data->>'name', NEW.email);

  -- default categories
  INSERT INTO public.categories(user_id, name, type, is_default) VALUES
    (NEW.id,'Salario','income',true),
    (NEW.id,'Freelance','income',true),
    (NEW.id,'Inversiones','income',true),
    (NEW.id,'Otros ingresos','income',true),
    (NEW.id,'Vivienda','expense',true),
    (NEW.id,'Alimentación','expense',true),
    (NEW.id,'Transporte','expense',true),
    (NEW.id,'Ocio','expense',true),
    (NEW.id,'Salud','expense',true),
    (NEW.id,'Compras','expense',true),
    (NEW.id,'Otros gastos','expense',true),
    (NEW.id,'Fondos indexados','investment',true),
    (NEW.id,'Criptomonedas','investment',true),
    (NEW.id,'Letras del tesoro','investment',true),
    (NEW.id,'Cuentas remuneradas','investment',true);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user(); 