revoke delete on table "public"."notes" from "anon";

revoke insert on table "public"."notes" from "anon";

revoke references on table "public"."notes" from "anon";

revoke select on table "public"."notes" from "anon";

revoke trigger on table "public"."notes" from "anon";

revoke truncate on table "public"."notes" from "anon";

revoke update on table "public"."notes" from "anon";

revoke delete on table "public"."notes" from "authenticated";

revoke insert on table "public"."notes" from "authenticated";

revoke references on table "public"."notes" from "authenticated";

revoke select on table "public"."notes" from "authenticated";

revoke trigger on table "public"."notes" from "authenticated";

revoke truncate on table "public"."notes" from "authenticated";

revoke update on table "public"."notes" from "authenticated";

revoke delete on table "public"."notes" from "service_role";

revoke insert on table "public"."notes" from "service_role";

revoke references on table "public"."notes" from "service_role";

revoke select on table "public"."notes" from "service_role";

revoke trigger on table "public"."notes" from "service_role";

revoke truncate on table "public"."notes" from "service_role";

revoke update on table "public"."notes" from "service_role";

alter table "public"."games" drop constraint "games_current_status_check";

alter table "public"."games" drop constraint "games_type_check";

alter table "public"."throws" drop constraint "throws_game_id_fkey";

alter table "public"."notes" drop constraint "notes_pkey";

alter table "public"."leaderboard" drop constraint "leaderboard_pkey";

drop index if exists "public"."idx_game_id";

drop index if exists "public"."idx_user_id";

drop index if exists "public"."notes_pkey";

drop index if exists "public"."leaderboard_pkey";

drop table "public"."notes";

alter table "public"."game_participants" alter column "game_id" set data type uuid using "game_id"::uuid;

alter table "public"."games" add column "winner" uuid;

alter table "public"."games" alter column "id" set default gen_random_uuid();

alter table "public"."games" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."leaderboard" drop column "id";

alter table "public"."leaderboard" alter column "user_id" set not null;

alter table "public"."leaderboard" alter column "user_id" set data type uuid using "user_id"::uuid;

alter table "public"."throws" add column "multiplier" integer not null;

alter table "public"."throws" add column "round" integer not null;

alter table "public"."throws" add column "sector" integer not null;

alter table "public"."throws" alter column "game_id" set not null;

alter table "public"."throws" alter column "game_id" set data type uuid using "game_id"::uuid;

alter table "public"."throws" alter column "id" set default gen_random_uuid();

alter table "public"."throws" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."throws" alter column "user_id" set not null;

alter table "public"."throws" alter column "user_id" set data type uuid using "user_id"::uuid;

alter table "public"."throws" alter column "value" set data type integer using "value"::integer;

drop sequence if exists "public"."games_id_seq";

drop sequence if exists "public"."leaderboard_id_seq";

drop sequence if exists "public"."notes_id_seq";

drop sequence if exists "public"."throws_id_seq";

CREATE UNIQUE INDEX leaderboard_pkey ON public.leaderboard USING btree (user_id);

alter table "public"."leaderboard" add constraint "leaderboard_pkey" PRIMARY KEY using index "leaderboard_pkey";

alter table "public"."games" add constraint "games_winner_fkey" FOREIGN KEY (winner) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."games" validate constraint "games_winner_fkey";

alter table "public"."leaderboard" add constraint "leaderboard_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."leaderboard" validate constraint "leaderboard_user_id_fkey";

alter table "public"."throws" add constraint "throws_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."throws" validate constraint "throws_user_id_fkey";

alter table "public"."games" add constraint "games_current_status_check" CHECK (((current_status)::text = ANY ((ARRAY['ongoing'::character varying, 'completed'::character varying])::text[]))) not valid;

alter table "public"."games" validate constraint "games_current_status_check";

alter table "public"."games" add constraint "games_type_check" CHECK (((type)::text = ANY ((ARRAY['practice'::character varying, 'competitive'::character varying])::text[]))) not valid;

alter table "public"."games" validate constraint "games_type_check";

alter table "public"."throws" add constraint "throws_game_id_fkey" FOREIGN KEY (game_id) REFERENCES games(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."throws" validate constraint "throws_game_id_fkey";


