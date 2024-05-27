alter table "public"."games" drop constraint "games_current_status_check";

alter table "public"."games" drop constraint "games_type_check";

alter table "public"."game_participants" disable row level security;

alter table "public"."games" drop column "participants";

alter table "public"."games" alter column "current_status" set default 'ongoing'::character varying;

alter table "public"."games" alter column "game_mode" set default '501'::character varying;

alter table "public"."games" alter column "legs_to_win" set default 1;

alter table "public"."games" alter column "type" set default 'competitive'::character varying;

alter table "public"."games" add constraint "games_current_status_check" CHECK (((current_status)::text = ANY ((ARRAY['ongoing'::character varying, 'completed'::character varying])::text[]))) not valid;

alter table "public"."games" validate constraint "games_current_status_check";

alter table "public"."games" add constraint "games_type_check" CHECK (((type)::text = ANY ((ARRAY['practice'::character varying, 'competitive'::character varying])::text[]))) not valid;

alter table "public"."games" validate constraint "games_type_check";


