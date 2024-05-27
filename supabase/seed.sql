SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.5 (Ubuntu 15.5-1.pgdg20.04+1)

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

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', '4acc6f5d-3aa9-4e80-82a9-c159a6fba83a', '{"action":"user_confirmation_requested","actor_id":"38ca00b2-0081-4735-b491-3595414c44ec","actor_username":"axel+teststore-1@rentle.io","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2024-05-26 06:49:33.631633+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd3a78ea6-5714-4511-b2fe-273b47da0fc8', '{"action":"user_signedup","actor_id":"38ca00b2-0081-4735-b491-3595414c44ec","actor_username":"axel+teststore-1@rentle.io","actor_via_sso":false,"log_type":"team"}', '2024-05-26 06:49:45.621327+00', ''),
	('00000000-0000-0000-0000-000000000000', '553600fe-c5dc-42aa-bed4-58faa174a62b', '{"action":"login","actor_id":"38ca00b2-0081-4735-b491-3595414c44ec","actor_username":"axel+teststore-1@rentle.io","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"email"}}', '2024-05-26 06:49:46.074218+00', ''),
	('00000000-0000-0000-0000-000000000000', '1709d3e8-773a-402a-a631-287e4bbb33bd', '{"action":"logout","actor_id":"38ca00b2-0081-4735-b491-3595414c44ec","actor_username":"axel+teststore-1@rentle.io","actor_via_sso":false,"log_type":"account"}', '2024-05-26 06:53:02.32415+00', ''),
	('00000000-0000-0000-0000-000000000000', '8ec4da4b-00f3-4135-9112-8fd3395ccc87', '{"action":"login","actor_id":"38ca00b2-0081-4735-b491-3595414c44ec","actor_username":"axel+teststore-1@rentle.io","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-05-26 06:59:04.221882+00', ''),
	('00000000-0000-0000-0000-000000000000', '77f8a48e-2f22-4c63-a521-f46a35c5b8ad', '{"action":"logout","actor_id":"38ca00b2-0081-4735-b491-3595414c44ec","actor_username":"axel+teststore-1@rentle.io","actor_via_sso":false,"log_type":"account"}', '2024-05-26 07:09:17.952159+00', ''),
	('00000000-0000-0000-0000-000000000000', '6d3ab830-761f-402a-81f6-161401d2e5d1', '{"action":"login","actor_id":"38ca00b2-0081-4735-b491-3595414c44ec","actor_username":"axel+teststore-1@rentle.io","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-05-26 07:09:28.914403+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '38ca00b2-0081-4735-b491-3595414c44ec', 'authenticated', 'authenticated', 'axel+teststore-1@rentle.io', '$2a$10$TA1dk/OJ6csuETbuhqxItOGfc8uC1hSgMIYsbhTRGOSfJVChNzVC2', '2024-05-26 06:49:45.62192+00', NULL, '', '2024-05-26 06:49:33.637251+00', '', NULL, '', '', NULL, '2024-05-26 07:09:28.915049+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "38ca00b2-0081-4735-b491-3595414c44ec", "email": "axel+teststore-1@rentle.io", "email_verified": false, "phone_verified": false}', NULL, '2024-05-26 06:49:33.617335+00', '2024-05-26 07:09:28.917942+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('38ca00b2-0081-4735-b491-3595414c44ec', '38ca00b2-0081-4735-b491-3595414c44ec', '{"sub": "38ca00b2-0081-4735-b491-3595414c44ec", "email": "axel+teststore-1@rentle.io", "email_verified": false, "phone_verified": false}', 'email', '2024-05-26 06:49:33.627554+00', '2024-05-26 06:49:33.62762+00', '2024-05-26 06:49:33.62762+00', 'efee1ae0-06c7-4aef-ac52-68cf40a023a2');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('7612d72e-262c-4f7e-b294-997e1b917178', '38ca00b2-0081-4735-b491-3595414c44ec', '2024-05-26 07:09:28.915212+00', '2024-05-26 07:09:28.915212+00', NULL, 'aal1', NULL, NULL, 'undici', '87.92.221.142', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('7612d72e-262c-4f7e-b294-997e1b917178', '2024-05-26 07:09:28.918533+00', '2024-05-26 07:09:28.918533+00', 'password', '645361e0-2e29-4b9d-a946-d8d944a2f432');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 3, 'Vt7A0CFB3J4PRGXiVEWRzA', '38ca00b2-0081-4735-b491-3595414c44ec', false, '2024-05-26 07:09:28.916757+00', '2024-05-26 07:09:28.916757+00', NULL, '7612d72e-262c-4f7e-b294-997e1b917178');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: leaderboard; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: notes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."notes" ("id", "title") VALUES
	(1, 'Today I created a Supabase project.'),
	(2, 'I added some data and queried it from Next.js.'),
	(3, 'It was awesome!');


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: throws; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id") VALUES
	('avatars', 'avatars', NULL, '2024-05-26 08:05:24.943188+00', '2024-05-26 08:05:24.943188+00', false, false, NULL, NULL, NULL);


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 3, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: games_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."games_id_seq"', 1, false);


--
-- Name: leaderboard_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."leaderboard_id_seq"', 1, false);


--
-- Name: notes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."notes_id_seq"', 3, true);


--
-- Name: throws_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."throws_id_seq"', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."users_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
