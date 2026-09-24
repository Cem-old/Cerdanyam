-- Ejecutar UNA VEZ en Supabase SQL Editor si las tablas aún no están en Realtime.
-- No altera datos.
do $$ begin
  alter publication supabase_realtime add table public.restaurants;
exception when duplicate_object then null; end $$;
do $$ begin
  alter publication supabase_realtime add table public.members;
exception when duplicate_object then null; end $$;
do $$ begin
  alter publication supabase_realtime add table public.votes;
exception when duplicate_object then null; end $$;
