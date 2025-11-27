-- Enable UUID helpers
create extension if not exists "uuid-ossp";

-- 1. Profiles (No auth linkage, just a table)
create table if not exists public.profiles (
  id uuid primary key, 
  name text,
  avatar_url text,
  age integer,
  income_type text check (income_type in ('pocket_money','salary','freelance')),
  monthly_income numeric(10,2),
  monthly_expenses numeric(10,2),
  city text,
  city_tier text check (city_tier in ('tier1','tier2','tier3')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Impulse logs
create table if not exists public.impulse_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  item_name text not null,
  item_price numeric(10,2) not null,
  item_image_url text,
  category text,
  decision text not null check (decision in ('resisted','delayed','purchased')),
  delay_hours integer,
  decision_made_at timestamptz default now(),
  questions_answered jsonb,
  final_action text,
  created_at timestamptz not null default now()
);

create index if not exists impulse_logs_user_idx on public.impulse_logs(user_id, created_at desc);

-- 3. XP transactions
create table if not exists public.xp_transactions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  amount integer not null,
  reason text not null,
  related_log_id uuid references public.impulse_logs(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists xp_transactions_user_idx on public.xp_transactions(user_id, created_at desc);

-- 4. User stats
create table if not exists public.user_stats (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  total_xp integer default 0,
  current_streak integer default 0,
  longest_streak integer default 0,
  total_saved numeric(10,2) default 0,
  total_spent_impulse numeric(10,2) default 0,
  impulses_resisted integer default 0,
  impulses_purchased integer default 0,
  last_impulse_resist_date timestamptz,
  shield_points integer default 0,
  updated_at timestamptz default now()
);

-- 5. Badges
create table if not exists public.badges (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  icon_url text,
  xp_requirement integer,
  streak_requirement integer,
  savings_requirement numeric(10,2),
  tier text check (tier in ('bronze','silver','gold','platinum'))
);

-- 6. User badges
create table if not exists public.user_badges (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  badge_id uuid references public.badges(id) on delete cascade,
  earned_at timestamptz default now(),
  unique (user_id, badge_id)
);

-- 7. Friendships
create table if not exists public.friendships (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  friend_id uuid references public.profiles(id) on delete cascade,
  status text default 'pending' check (status in ('pending','accepted','rejected')),
  created_at timestamptz default now(),
  unique (user_id, friend_id)
);

-- 8. Leaderboard View
create or replace view public.leaderboard_view as
select
  us.user_id,
  coalesce(p.name, 'Anonymous') as name,
  p.avatar_url,
  us.total_xp,
  us.current_streak,
  rank() over (order by us.total_xp desc) as rank
from public.user_stats us
left join public.profiles p on p.id = us.user_id;

-- Realtime publication
alter publication supabase_realtime add table public.impulse_logs;
alter publication supabase_realtime add table public.xp_transactions;
alter publication supabase_realtime add table public.user_stats;
alter publication supabase_realtime add table public.user_badges;

-- RLS Policies - OPEN TO EVERYONE (No Auth Required)
alter table public.profiles enable row level security;
alter table public.impulse_logs enable row level security;
alter table public.xp_transactions enable row level security;
alter table public.user_stats enable row level security;
alter table public.user_badges enable row level security;

create policy "Public profiles access" on public.profiles for all using (true) with check (true);
create policy "Public logs access" on public.impulse_logs for all using (true) with check (true);
create policy "Public xp access" on public.xp_transactions for all using (true) with check (true);
create policy "Public stats access" on public.user_stats for all using (true) with check (true);
create policy "Public badges access" on public.user_badges for all using (true) with check (true);

-- Seed Demo Data
insert into public.profiles (id, name, avatar_url, age, income_type, monthly_income, monthly_expenses, city, city_tier)
values
  ('00000000-0000-0000-0000-000000000001', 'Demo User', 'https://api.dicebear.com/8.x/thumbs/svg?seed=demo', 24, 'salary', 3000, 2000, 'Mumbai', 'tier1')
on conflict (id) do nothing;

insert into public.user_stats (user_id, total_xp, current_streak, longest_streak, total_saved, total_spent_impulse, impulses_resisted, impulses_purchased, shield_points)
values
  ('00000000-0000-0000-0000-000000000001', 2450, 15, 22, 2340, 240, 12, 3, 4)
on conflict (user_id) do nothing;
