
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."games" (
    "id" integer NOT NULL,
    "type" character varying(50) NOT NULL,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "participants" integer[] NOT NULL,
    "game_mode" character varying(50) NOT NULL,
    "legs_to_win" integer NOT NULL,
    "current_status" character varying(50) NOT NULL,
    CONSTRAINT "games_current_status_check" CHECK ((("current_status")::"text" = ANY ((ARRAY['ongoing'::character varying, 'completed'::character varying])::"text"[]))),
    CONSTRAINT "games_type_check" CHECK ((("type")::"text" = ANY ((ARRAY['practice'::character varying, 'competitive'::character varying])::"text"[])))
);

ALTER TABLE "public"."games" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."games_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."games_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."games_id_seq" OWNED BY "public"."games"."id";

CREATE TABLE IF NOT EXISTS "public"."leaderboard" (
    "id" integer NOT NULL,
    "user_id" integer,
    "games_won" integer DEFAULT 0,
    "games_played" integer DEFAULT 0,
    "highest_score" integer DEFAULT 0
);

ALTER TABLE "public"."leaderboard" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."leaderboard_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."leaderboard_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."leaderboard_id_seq" OWNED BY "public"."leaderboard"."id";

CREATE TABLE IF NOT EXISTS "public"."notes" (
    "id" bigint NOT NULL,
    "title" "text"
);

ALTER TABLE "public"."notes" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."notes_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."notes_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."notes_id_seq" OWNED BY "public"."notes"."id";

CREATE TABLE IF NOT EXISTS "public"."throws" (
    "id" integer NOT NULL,
    "game_id" integer,
    "user_id" integer,
    "value" character varying(50) NOT NULL,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "public"."throws" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."throws_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."throws_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."throws_id_seq" OWNED BY "public"."throws"."id";

CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" integer NOT NULL,
    "name" character varying(255) NOT NULL,
    "email" character varying(255) NOT NULL,
    "type" character varying(50) NOT NULL,
    "created_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "users_type_check" CHECK ((("type")::"text" = ANY ((ARRAY['internal'::character varying, 'external'::character varying])::"text"[])))
);

ALTER TABLE "public"."users" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."users_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."users_id_seq" OWNED BY "public"."users"."id";

ALTER TABLE ONLY "public"."games" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."games_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."leaderboard" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."leaderboard_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."notes" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."notes_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."throws" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."throws_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."users" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."users_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."games"
    ADD CONSTRAINT "games_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."leaderboard"
    ADD CONSTRAINT "leaderboard_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."notes"
    ADD CONSTRAINT "notes_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."throws"
    ADD CONSTRAINT "throws_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_email_key" UNIQUE ("email");

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."leaderboard"
    ADD CONSTRAINT "leaderboard_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."throws"
    ADD CONSTRAINT "throws_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."throws"
    ADD CONSTRAINT "throws_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."games" TO "anon";
GRANT ALL ON TABLE "public"."games" TO "authenticated";
GRANT ALL ON TABLE "public"."games" TO "service_role";

GRANT ALL ON SEQUENCE "public"."games_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."games_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."games_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."leaderboard" TO "anon";
GRANT ALL ON TABLE "public"."leaderboard" TO "authenticated";
GRANT ALL ON TABLE "public"."leaderboard" TO "service_role";

GRANT ALL ON SEQUENCE "public"."leaderboard_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."leaderboard_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."leaderboard_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."notes" TO "anon";
GRANT ALL ON TABLE "public"."notes" TO "authenticated";
GRANT ALL ON TABLE "public"."notes" TO "service_role";

GRANT ALL ON SEQUENCE "public"."notes_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."notes_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."notes_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."throws" TO "anon";
GRANT ALL ON TABLE "public"."throws" TO "authenticated";
GRANT ALL ON TABLE "public"."throws" TO "service_role";

GRANT ALL ON SEQUENCE "public"."throws_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."throws_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."throws_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";

GRANT ALL ON SEQUENCE "public"."users_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."users_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."users_id_seq" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
