revoke delete on table "public"."users" from "anon";

revoke insert on table "public"."users" from "anon";

revoke references on table "public"."users" from "anon";

revoke select on table "public"."users" from "anon";

revoke trigger on table "public"."users" from "anon";

revoke truncate on table "public"."users" from "anon";

revoke update on table "public"."users" from "anon";

revoke delete on table "public"."users" from "authenticated";

revoke insert on table "public"."users" from "authenticated";

revoke references on table "public"."users" from "authenticated";

revoke select on table "public"."users" from "authenticated";

revoke trigger on table "public"."users" from "authenticated";

revoke truncate on table "public"."users" from "authenticated";

revoke update on table "public"."users" from "authenticated";

revoke delete on table "public"."users" from "service_role";

revoke insert on table "public"."users" from "service_role";

revoke references on table "public"."users" from "service_role";

revoke select on table "public"."users" from "service_role";

revoke trigger on table "public"."users" from "service_role";

revoke truncate on table "public"."users" from "service_role";

revoke update on table "public"."users" from "service_role";

alter table "public"."leaderboard" drop constraint "leaderboard_user_id_fkey";

alter table "public"."throws" drop constraint "throws_user_id_fkey";

alter table "public"."users" drop constraint "users_email_key";

alter table "public"."users" drop constraint "users_type_check";

alter table "public"."users" drop constraint "users_username_key";

alter table "public"."games" drop constraint "games_current_status_check";

alter table "public"."games" drop constraint "games_type_check";

alter table "public"."users" drop constraint "users_pkey";

drop index if exists "public"."users_email_key";

drop index if exists "public"."users_pkey";

drop index if exists "public"."users_username_key";

drop table "public"."users";

create table "public"."game_participants" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "participant_id" uuid not null,
    "game_id" integer
);


alter table "public"."game_participants" enable row level security;

alter table "public"."profiles" drop column "website";

drop sequence if exists "public"."users_id_seq";

CREATE UNIQUE INDEX game_participants_pkey ON public.game_participants USING btree (id);

alter table "public"."game_participants" add constraint "game_participants_pkey" PRIMARY KEY using index "game_participants_pkey";

alter table "public"."game_participants" add constraint "game_participants_game_id_fkey" FOREIGN KEY (game_id) REFERENCES games(id) not valid;

alter table "public"."game_participants" validate constraint "game_participants_game_id_fkey";

alter table "public"."game_participants" add constraint "game_participants_participant_id_fkey" FOREIGN KEY (participant_id) REFERENCES profiles(id) not valid;

alter table "public"."game_participants" validate constraint "game_participants_participant_id_fkey";

alter table "public"."games" add constraint "games_current_status_check" CHECK (((current_status)::text = ANY ((ARRAY['ongoing'::character varying, 'completed'::character varying])::text[]))) not valid;

alter table "public"."games" validate constraint "games_current_status_check";

alter table "public"."games" add constraint "games_type_check" CHECK (((type)::text = ANY ((ARRAY['practice'::character varying, 'competitive'::character varying])::text[]))) not valid;

alter table "public"."games" validate constraint "games_type_check";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_leaderboard()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Update the leaderboard for the winning user
    UPDATE Leaderboard
    SET games_won = games_won + 1,
        games_played = games_played + 1
    WHERE user_id = NEW.winner_user_id;

    -- Update the leaderboard for all participants
    UPDATE Leaderboard
    SET games_played = games_played + 1
    WHERE user_id = ANY(NEW.participants) AND user_id != NEW.winner_user_id;

    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
  insert into public.profiles (id,full_name, avatar_url)
  values (new.id,new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;$function$
;

grant delete on table "public"."game_participants" to "anon";

grant insert on table "public"."game_participants" to "anon";

grant references on table "public"."game_participants" to "anon";

grant select on table "public"."game_participants" to "anon";

grant trigger on table "public"."game_participants" to "anon";

grant truncate on table "public"."game_participants" to "anon";

grant update on table "public"."game_participants" to "anon";

grant delete on table "public"."game_participants" to "authenticated";

grant insert on table "public"."game_participants" to "authenticated";

grant references on table "public"."game_participants" to "authenticated";

grant select on table "public"."game_participants" to "authenticated";

grant trigger on table "public"."game_participants" to "authenticated";

grant truncate on table "public"."game_participants" to "authenticated";

grant update on table "public"."game_participants" to "authenticated";

grant delete on table "public"."game_participants" to "service_role";

grant insert on table "public"."game_participants" to "service_role";

grant references on table "public"."game_participants" to "service_role";

grant select on table "public"."game_participants" to "service_role";

grant trigger on table "public"."game_participants" to "service_role";

grant truncate on table "public"."game_participants" to "service_role";

grant update on table "public"."game_participants" to "service_role";

CREATE TRIGGER game_completed_trigger AFTER UPDATE OF current_status ON public.games FOR EACH ROW WHEN (((new.current_status)::text = 'completed'::text)) EXECUTE FUNCTION update_leaderboard();


