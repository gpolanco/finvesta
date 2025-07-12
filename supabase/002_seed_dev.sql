-- 002_seed_dev.sql
-- Seed de datos de ejemplo para desarrollo Finvesta
-- Ejecutar después de 001_initial.sql

-- 1. Crear usuario de ejemplo (simula registro en auth.users)
-- NOTA: En Supabase, normalmente auth.users se gestiona vía la API, pero para desarrollo local puedes insertar manualmente:

insert into auth.users (id, email, encrypted_password, raw_user_meta_data, created_at, updated_at)
values (
  '00000000-0000-0000-0000-000000000001',
  'demo@finvesta.dev',
  '',
  '{"name": "Demo User"}',
  now(),
  now()
)
  on conflict do nothing;

-- 2. Crear perfil asociado
insert into public.profiles (id, name, email, monthly_income, monthly_savings_target, max_crypto_percentage, max_liquid_no_return)
values (
  '00000000-0000-0000-0000-000000000001',
  'Demo User',
  'demo@finvesta.dev',
  3730.00,
  1500.00,
  15.00,
  20000.00
)
on conflict do nothing;

-- 3. Cuentas de ejemplo
insert into public.accounts (id, user_id, name, type, provider, balance, currency, is_active)
values
  ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000001', 'Sabadell', 'bank', 'Sabadell', 12000.00, 'EUR', true),
  ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000001', 'BBVA', 'bank', 'BBVA', 10000.00, 'EUR', true),
  ('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000001', 'Binance', 'crypto', 'Binance', 10000.00, 'EUR', true),
  ('44444444-4444-4444-4444-444444444444', '00000000-0000-0000-0000-000000000001', 'Fidelity MSCI World', 'investment', 'MyInvestor', 2500.00, 'EUR', true)
  on conflict do nothing;

-- 4. Categorías de ejemplo (usar UUIDs válidos)
insert into public.categories (id, user_id, name, type, is_default)
values
  ('55555555-5555-5555-5555-555555555551', '00000000-0000-0000-0000-000000000001', 'Salario', 'income', true),
  ('55555555-5555-5555-5555-555555555552', '00000000-0000-0000-0000-000000000001', 'Criptomonedas', 'investment', true),
  ('55555555-5555-5555-5555-555555555553', '00000000-0000-0000-0000-000000000001', 'Vivienda', 'expense', true),
  ('55555555-5555-5555-5555-555555555554', '00000000-0000-0000-0000-000000000001', 'Ocio', 'expense', true)
  on conflict do nothing;

-- 5. Transacciones de ejemplo (referenciar los nuevos UUIDs válidos)
insert into public.transactions (id, user_id, account_id, category_id, type, amount, description, transaction_date)
values
  ('66666666-6666-6666-6666-666666666661', '00000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', '55555555-5555-5555-5555-555555555551', 'income', 3730.00, 'Nómina mensual', current_date - interval '10 days'),
  ('66666666-6666-6666-6666-666666666662', '00000000-0000-0000-0000-000000000001', '33333333-3333-3333-3333-333333333333', '55555555-5555-5555-5555-555555555552', 'investment', 200.00, 'Compra mensual cripto', current_date - interval '8 days'),
  ('66666666-6666-6666-6666-666666666663', '00000000-0000-0000-0000-000000000001', '44444444-4444-4444-4444-444444444444', '55555555-5555-5555-5555-555555555552', 'investment', 100.00, 'Aporte fondo indexado', current_date - interval '7 days'),
  ('66666666-6666-6666-6666-666666666664', '00000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', '55555555-5555-5555-5555-555555555553', 'expense', 900.00, 'Alquiler', current_date - interval '5 days'),
  ('66666666-6666-6666-6666-666666666665', '00000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', '55555555-5555-5555-5555-555555555554', 'expense', 150.00, 'Cine y restaurantes', current_date - interval '2 days')
  on conflict do nothing;

-- 6. Alertas de ejemplo (usar UUIDs válidos)
insert into public.alerts (id, user_id, type, title, message, action_suggested, trigger_value, is_read, is_dismissed, created_at)
values
  ('77777777-7777-7777-7777-777777777771', '00000000-0000-0000-0000-000000000001', 'warning', 'Cripto representa el 19.2% de tu patrimonio', 'Considera rebalancear. Objetivo: <15%', 'Vender €2,000 y reinvertir en fondos indexados', 19.2, false, false, now()),
  ('77777777-7777-7777-7777-777777777772', '00000000-0000-0000-0000-000000000001', 'critical', '€22,000 sin rentabilidad', 'Dinero parado perdiendo inflación', 'Mover €2,000 a cuenta remunerada o fondos', 22000.00, false, false, now())
  on conflict do nothing; 