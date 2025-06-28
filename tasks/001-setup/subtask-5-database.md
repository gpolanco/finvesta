# 001-5: Esquema Base de Datos

**⏱️ Estimación**: 45-60 minutos  
**🎯 Objetivo**: Esquema completo de BD con RLS policies y datos de ejemplo

## 📋 Pasos Específicos

### 1. Crear Tablas Principales (20 min)

```sql
-- En Supabase → SQL Editor, ejecutar estas queries:

-- 1. Tabla de perfiles de usuario (extiende auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_url TEXT,
  monthly_income DECIMAL(10,2) DEFAULT 2730.00,
  monthly_savings_target DECIMAL(10,2) DEFAULT 1500.00,
  max_crypto_percentage DECIMAL(5,2) DEFAULT 15.00,
  max_liquid_no_return DECIMAL(10,2) DEFAULT 20000.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tipos de cuenta (enum personalizado)
CREATE TYPE account_type AS ENUM ('bank', 'crypto', 'investment', 'cash', 'savings');

-- 3. Tabla de cuentas del usuario
CREATE TABLE IF NOT EXISTS public.accounts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type account_type NOT NULL,
  provider TEXT, -- 'BBVA', 'Sabadell', 'MyInvestor', 'Binance', etc.
  balance DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  currency TEXT NOT NULL DEFAULT 'EUR',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Categorías de transacciones
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense', 'investment')),
  parent_id UUID REFERENCES public.categories(id),
  color TEXT DEFAULT '#6b7280',
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Tipos de transacción
CREATE TYPE transaction_type AS ENUM ('income', 'expense', 'transfer', 'investment');

-- 6. Tabla principal de transacciones
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
  to_account_id UUID REFERENCES public.accounts(id), -- Para transferencias
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  CONSTRAINT positive_amount CHECK (amount > 0),
  CONSTRAINT transfer_has_destination CHECK (
    (type = 'transfer' AND to_account_id IS NOT NULL) OR
    (type != 'transfer' AND to_account_id IS NULL)
  )
);

-- 7. Tabla de alertas del usuario
CREATE TABLE IF NOT EXISTS public.alerts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('critical', 'warning', 'info')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  action_suggested TEXT,
  trigger_value DECIMAL(12,2),
  is_read BOOLEAN DEFAULT false,
  is_dismissed BOOLEAN DEFAULT false,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. Configurar RLS Policies (15 min)

```sql
-- Habilitar RLS en todas las tablas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

-- Policies para profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Policies para accounts
CREATE POLICY "Users can view own accounts" ON public.accounts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own accounts" ON public.accounts
  FOR ALL USING (auth.uid() = user_id);

-- Policies para categories
CREATE POLICY "Users can view own categories" ON public.categories
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can manage own categories" ON public.categories
  FOR ALL USING (auth.uid() = user_id);

-- Policies para transactions
CREATE POLICY "Users can view own transactions" ON public.transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own transactions" ON public.transactions
  FOR ALL USING (auth.uid() = user_id);

-- Policies para alerts
CREATE POLICY "Users can view own alerts" ON public.alerts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own alerts" ON public.alerts
  FOR ALL USING (auth.uid() = user_id);
```

### 3. Crear Categorías por Defecto (10 min)

```sql
-- Función para insertar categorías por defecto cuando se crea un usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insertar perfil
  INSERT INTO public.profiles (id, name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'name', NEW.email);

  -- Insertar categorías por defecto de ingresos
  INSERT INTO public.categories (user_id, name, type, is_default) VALUES
    (NEW.id, 'Salario', 'income', true),
    (NEW.id, 'Freelance', 'income', true),
    (NEW.id, 'Inversiones', 'income', true),
    (NEW.id, 'Otros ingresos', 'income', true);

  -- Insertar categorías por defecto de gastos
  INSERT INTO public.categories (user_id, name, type, is_default) VALUES
    (NEW.id, 'Vivienda', 'expense', true),
    (NEW.id, 'Alimentación', 'expense', true),
    (NEW.id, 'Transporte', 'expense', true),
    (NEW.id, 'Ocio', 'expense', true),
    (NEW.id, 'Salud', 'expense', true),
    (NEW.id, 'Compras', 'expense', true),
    (NEW.id, 'Otros gastos', 'expense', true);

  -- Insertar categorías de inversión
  INSERT INTO public.categories (user_id, name, type, is_default) VALUES
    (NEW.id, 'Fondos indexados', 'investment', true),
    (NEW.id, 'Criptomonedas', 'investment', true),
    (NEW.id, 'Letras del tesoro', 'investment', true),
    (NEW.id, 'Cuentas remuneradas', 'investment', true);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para ejecutar la función cuando se registra un usuario
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 4. Crear Tipos TypeScript (15 min)

```typescript
// src/types/database.ts
export interface Profile {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  monthly_income: number;
  monthly_savings_target: number;
  max_crypto_percentage: number;
  max_liquid_no_return: number;
  created_at: string;
  updated_at: string;
}

export type AccountType = "bank" | "crypto" | "investment" | "cash" | "savings";

export interface Account {
  id: string;
  user_id: string;
  name: string;
  type: AccountType;
  provider?: string;
  balance: number;
  currency: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  user_id?: string;
  name: string;
  type: "income" | "expense" | "investment";
  parent_id?: string;
  color: string;
  is_default: boolean;
  created_at: string;
}

export type TransactionType = "income" | "expense" | "transfer" | "investment";

export interface Transaction {
  id: string;
  user_id: string;
  account_id: string;
  category_id?: string;
  type: TransactionType;
  amount: number;
  description: string;
  notes?: string;
  transaction_date: string;
  to_account_id?: string;
  created_at: string;
  updated_at: string;

  // Relaciones
  account?: Account;
  category?: Category;
  to_account?: Account;
}

export interface Alert {
  id: string;
  user_id: string;
  type: "critical" | "warning" | "info";
  title: string;
  message: string;
  action_suggested?: string;
  trigger_value?: number;
  is_read: boolean;
  is_dismissed: boolean;
  expires_at?: string;
  created_at: string;
}

// Tipos utilitarios para KPIs
export interface FinancialKPIs {
  netWorth: number;
  cryptoPercentage: number;
  liquidNoReturn: number;
  monthlySavings: number;
  monthlyTarget: number;
  totalAssets: number;
  totalLiabilities: number;
}

export interface AssetDistribution {
  crypto: number;
  bank: number;
  investment: number;
  cash: number;
  savings: number;
}
```

### 5. Insertar Datos de Ejemplo (10 min)

```sql
-- Datos de ejemplo para testing (ajustados a la situación del usuario)
-- NOTA: Esto se ejecuta MANUALMENTE después de registrar el primer usuario

-- Obtener el ID del usuario registrado (cambiar por el ID real)
-- SELECT id FROM auth.users WHERE email = 'tu_email@ejemplo.com';

-- Cuentas de ejemplo (usar el ID real del usuario)
INSERT INTO public.accounts (user_id, name, type, provider, balance) VALUES
  ('USER_ID_AQUI', 'BBVA Cuenta Corriente', 'bank', 'BBVA', 25000.00),
  ('USER_ID_AQUI', 'Sabadell Ahorro', 'bank', 'Sabadell', 17000.00),
  ('USER_ID_AQUI', 'Binance Crypto', 'crypto', 'Binance', 7500.00),
  ('USER_ID_AQUI', 'Coinbase BTC', 'crypto', 'Coinbase', 2500.00),
  ('USER_ID_AQUI', 'MyInvestor MSCI World', 'investment', 'MyInvestor', 800.00),
  ('USER_ID_AQUI', 'Efectivo', 'cash', null, 200.00);

-- Transacciones de ejemplo del mes actual
INSERT INTO public.transactions (user_id, account_id, type, amount, description, transaction_date) VALUES
  ('USER_ID_AQUI', (SELECT id FROM accounts WHERE name = 'BBVA Cuenta Corriente'), 'income', 2730.00, 'Salario diciembre', '2024-12-01'),
  ('USER_ID_AQUI', (SELECT id FROM accounts WHERE name = 'BBVA Cuenta Corriente'), 'expense', 800.00, 'Alquiler', '2024-12-01'),
  ('USER_ID_AQUI', (SELECT id FROM accounts WHERE name = 'BBVA Cuenta Corriente'), 'expense', 350.00, 'Supermercado', '2024-12-05'),
  ('USER_ID_AQUI', (SELECT id FROM accounts WHERE name = 'MyInvestor MSCI World'), 'investment', 100.00, 'Aportación mensual fondo', '2024-12-01'),
  ('USER_ID_AQUI', (SELECT id FROM accounts WHERE name = 'Binance Crypto'), 'investment', 200.00, 'Compra BTC', '2024-12-10');
```

## ✅ Criterios de Éxito

- [ ] Todas las tablas creadas sin errores
- [ ] RLS policies funcionando correctamente
- [ ] Trigger de usuario nuevo operativo
- [ ] Tipos TypeScript definidos
- [ ] Datos de ejemplo insertados
- [ ] Queries básicas funcionando

## 🧪 Testing

```sql
-- 1. Verificar estructura de tablas
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('profiles', 'accounts', 'categories', 'transactions', 'alerts');

-- 2. Verificar RLS habilitado
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';

-- 3. Probar inserción de categorías automática
-- (Registrar un nuevo usuario y verificar que se crean las categorías)

-- 4. Verificar datos de ejemplo
SELECT
  a.name as account_name,
  a.balance,
  COUNT(t.id) as transaction_count
FROM accounts a
LEFT JOIN transactions t ON a.id = t.account_id
GROUP BY a.id, a.name, a.balance;
```

## 📝 Commit

```bash
git add .
git commit -m "feat(database): implement complete database schema

- Create main tables: profiles, accounts, categories, transactions, alerts
- Configure Row Level Security policies for data protection
- Add trigger for automatic user setup with default categories
- Define TypeScript types for all database entities
- Insert example data matching user's financial situation
- Add constraints and validations for data integrity

Refs: tasks/001-setup/subtask-5-database.md"
```

## 🎯 Task 001 Completada!

✅ **¡Configuración inicial terminada!**

### 📋 Actualizar Estado Final

```bash
# Actualizar tasks/current-task.md:
# - Task 001: ✅ COMPLETADA (5/5 subtasks)
# - Próxima tarea: Task 002 - Gestión de Cuentas y Transacciones
# - Próximo subtask: 002-1 (por definir)
```

### 🎉 Lo que tienes funcionando:

- ✅ Supabase conectado y configurado
- ✅ Shadcn/UI con tema financiero personalizado
- ✅ Layout responsivo con navegación completa
- ✅ Sistema de autenticación completo
- ✅ Base de datos con esquema optimizado para finanzas
- ✅ RLS policies para seguridad
- ✅ Datos de ejemplo con tu situación financiera

### 🚀 Próximo Paso:

👉 **[Continuar con Task 002](../002-accounts/README.md)** - Sistema de gestión de cuentas y transacciones
