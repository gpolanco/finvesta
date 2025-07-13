-- 003_add_transfer_categories.sql
-- Add support for 'transfer' category type

-- Update the constraint to include 'transfer'
ALTER TABLE public.categories DROP CONSTRAINT IF EXISTS categories_type_check;
ALTER TABLE public.categories ADD CONSTRAINT categories_type_check CHECK (type IN ('income','expense','investment','transfer'));

-- Insert default transfer categories
INSERT INTO public.categories (name, type, color, is_default, description, user_id) VALUES
  ('Account Transfer', 'transfer', '#8b5cf6', true, 'Moving money between accounts', NULL),
  ('Investment Rebalancing', 'transfer', '#6366f1', true, 'Portfolio rebalancing transfers', NULL),
  ('Loan Payment', 'transfer', '#ec4899', true, 'Payments to loans or credit', NULL),
  ('Savings Allocation', 'transfer', '#10b981', true, 'Moving money to savings accounts', NULL)
ON CONFLICT (name, type, COALESCE(user_id, '00000000-0000-0000-0000-000000000000'::uuid))
DO NOTHING; 