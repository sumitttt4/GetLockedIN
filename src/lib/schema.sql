-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PUBLIC PROFILES (Synced with Auth)
create table public.profiles (
  id uuid references auth.users not null primary key,
  username text unique,
  display_name text,
  bio text,
  location text,
  website text,
  avatar_url text,
  
  -- Settings
  is_public boolean default true,
  has_paid boolean default false,
  
  updated_at timestamp with time zone,
  
  constraint username_length check (char_length(username) >= 3)
);

-- Function to handle new user signup automatically
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, display_name, avatar_url)
  values (
      new.id, 
      new.raw_user_meta_data->>'full_name', -- Temp fallback for now
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new signups
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. GOALS (Expanded)
create table public.goals (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  
  -- Core
  title text not null,
  description text,
  category text, -- 'personal', 'startup', 'fitness'
  tags text[],   -- Array of strings
  
  -- Progress
  target_value numeric,
  current_value numeric default 0,
  unit text default 'USD',
  
  -- Dates
  deadline date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Config
  stakes_type text, -- Optional legacy field
  visibility text default 'public' check (visibility in ('public', 'private')),
  status text default 'active' check (status in ('active', 'completed', 'failed', 'paused')),
  is_pinned boolean default false
);

-- 3. GOAL LIKES (Supporters)
create table public.goal_likes (
    id uuid default uuid_generate_v4() primary key,
    goal_id uuid references public.goals(id) on delete cascade not null,
    user_id uuid references public.profiles(id) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(goal_id, user_id)
);

-- 4. INTEGRATIONS (Proof of Work & Revenue)
create table public.integrations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  type text not null check (type in ('github', 'stripe', 'dodo', 'lemonsqueezy', 'polar')),
  config jsonb, -- Stores API Keys (Encrypted if possible, but for MVP standard), Product IDs etc.
  connected_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  unique(user_id, type)
);

-- Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.goals enable row level security;
alter table public.goal_likes enable row level security;
alter table public.integrations enable row level security;

-- Policies

-- PROFILES
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- GOALS
create policy "Public goals are viewable by everyone." on public.goals for select using (visibility = 'public');
create policy "Users can view own private goals." on public.goals for select using (auth.uid() = user_id);
create policy "Users can insert own goals." on public.goals for insert with check (auth.uid() = user_id);
create policy "Users can update own goals." on public.goals for update using (auth.uid() = user_id);
create policy "Users can delete own goals." on public.goals for delete using (auth.uid() = user_id);

-- LIKES
create policy "Everyone can view likes." on public.goal_likes for select using (true);
create policy "Auth users can like." on public.goal_likes for insert with check (auth.uid() = user_id);
create policy "Users can unlike." on public.goal_likes for delete using (auth.uid() = user_id);

-- INTEGRATIONS
create policy "Users can view own integrations." on public.integrations for select using (auth.uid() = user_id);
create policy "Users can manage own integrations." on public.integrations for all using (auth.uid() = user_id);

-- 5. LEDGER (The Consistency Engine)
create table public.ledger (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  
  -- Log Details
  content text, -- "Synced database", "Ran 5k", etc.
  proof_url text, -- Optional screenshot/link
  
  -- Metadata
  log_date date default CURRENT_DATE, -- The date this counts for (to handle timezone late night commits)
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  status text default 'shipped' check (status in ('shipped', 'missed', 'frozen')),
  
  -- Constraint: One log per day per user (for the heatmap logic simplicity)
  -- Or allow multiple, but usually we just care "did they log something?"
  unique(user_id, log_date)
);

-- RLS for Ledger
alter table public.ledger enable row level security;
create policy "Public ledger is viewable." on public.ledger for select using (true);
create policy "Users can insert ledger logs." on public.ledger for insert with check (auth.uid() = user_id);
create policy "Users can update own ledger." on public.ledger for update using (auth.uid() = user_id);

-- 6. ADD STREAK TO PROFILES (Run this via SQL Editor if table exists)
-- alter table public.profiles add column streak_count integer default 0;
-- alter table public.profiles add column last_check_in date;
