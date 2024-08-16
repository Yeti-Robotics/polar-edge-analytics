create type public.alliance as enum('red', 'blue', 'none');

create table public.event (
    event_key               varchar(16) not null,
    event_name              varchar(128) not null,
    start_date              date not null,
    end_date                date not null,
    is_current              boolean default false,
    primary key (event_key)                      
);

create unique index on public.event (is_current) where is_current = true;

create table public.match (
    event_key               varchar(16) not null,
    match_number            smallint not null,
    primary key (event_key, match_number),
    foreign key (event_key) references public.event(event_key)
);

create table public.team (
    team_number             smallint not null primary key,
    team_name               varchar(256) not null
);

create table public.team_match (
    event_key               varchar(16) not null,
    match_number            smallint not null,
    team_number             smallint not null references public.team(team_number),
    alliance                alliance not null,
    alliance_position       smallint not null,
    primary key (event_key, match_number, team_number),
    foreign key (event_key, match_number) references public.match(event_key, match_number),
    constraint alliance_position_valid check (alliance_position in (1, 2, 3))
);

create table public.team_event (
    event_key                varchar(16) not null references public.event(event_key),
    team_number              smallint not null references public.team(team_number)
);

create table public.stand_form (
    id                      bigint generated by default as identity primary key,
    team_number             smallint not null references public.team(team_number),
    event_key               varchar(16) not null,
    match_number            smallint not null,
    scouter                 uuid not null references public.profile(id),
    auto_amp_notes          smallint not null default 0,
    auto_speaker_notes      smallint not null default 0,
    teleop_amp_notes        smallint not null default 0,
    teleop_speaker_notes    smallint not null default 0,
    shuttle_notes           smallint not null default 0,
    trap_notes              smallint not null default 0,
    initiation_line         boolean not null default false,
    climb                   boolean not null default false,
    spotlight               boolean not null default false,
    park                    boolean not null default false,
    number_on_chain         smallint not null default 0,
    defense                 smallint not null default 3,
--    penalties               smallint not null default 0,
    notes                   varchar(1024) not null,
    approved                boolean not null default false,
    created_at              timestamp with time zone not null default now(),
    updated_at              timestamp with time zone not null default now(),
    foreign key (event_key, match_number) references public.match(event_key, match_number)
) tablespace pg_default;

create index on public.stand_form using btree (event_key, match_number);
alter table public.stand_form enable row level security;
create policy "Allow stand form submit permission access" on public.stand_form for insert with check ((SELECT authorize ('standform.submit')));
create policy "Allow public stand form read access" on public.stand_form for select using (true);

create table public.schedule (
    event_key               varchar(16) not null,
    match_number            smallint not null,
    scouter                 uuid not null,
    team_number             smallint not null,
    primary key (event_key, match_number, scouter, team_number),
    foreign key (event_key, match_number) references public.match(event_key, match_number),
    foreign key (scouter) references public.profile(id),
    foreign key (team_number) references public.team(team_number)
);

create index on public.schedule using btree (event_key, match_number);
alter table public.schedule enable row level security;
create policy "Allow individual read access" on public.schedule for select using ( (SELECT auth.uid()) = scouter );
create policy "Allow admin access" on public.schedule for all using ( (SELECT authorize('admin.access')));
