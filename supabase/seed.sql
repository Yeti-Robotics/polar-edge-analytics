insert into
    public.role_permissions (role, permission)
values
    ('admin', 'admin.access'),
    ('yeti-member', 'standform.submit');

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
        ('00000000-0000-0000-0000-000000000000', 'c97311ba-9e6e-4bb5-8a4b-b6f947527b30', 'authenticated', 'authenticated', 'admin@yeti', '$2a$10$3pogVDwu37GhJWMk8BVhjOgR9YLyEVFBFrzt8NGwsATgsW8gct6nq', '2024-07-28 01:40:58.160076+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-07-28 01:40:58.128634+00', '2024-07-28 01:40:58.16061+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
        ('00000000-0000-0000-0000-000000000000', '9c3c8fb6-528f-46e8-a40d-1ffda082044e', 'authenticated', 'authenticated', 'scouter1@yeti', '$2a$10$zwdVBFgZ2Do5665t5y3K7u..OW6Pe/5e3DuvoBZQRIPdkLWYLvsMS', '2024-07-28 01:41:39.483456+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-07-28 01:41:39.474343+00', '2024-07-28 01:41:39.483651+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
        ('00000000-0000-0000-0000-000000000000', '931670f8-c709-464a-a78b-bb55bd8dcfc6', 'authenticated', 'authenticated', 'scouter2@yeti', '$2a$10$QcDuWGK/RimysUyQ2uN76.2818eaTPbOOxBYre/uByRzVlCl.e5A.', '2024-07-28 01:41:50.380067+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-07-28 01:41:50.371998+00', '2024-07-28 01:41:50.380252+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
        ('00000000-0000-0000-0000-000000000000', 'f540ec81-669a-4c24-89e9-eeac0e9981a0', 'authenticated', 'authenticated', 'scouter3@yeti', '$2a$10$6sAE1UvxKaVHfcmRTl//FeXrA8c1z0h.vcYafeTUA0rvQGEdQhwRC', '2024-07-28 01:42:01.586648+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-07-28 01:42:01.576438+00', '2024-07-28 01:42:01.587032+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
        ('00000000-0000-0000-0000-000000000000', '849448df-af65-4e80-b692-86b4eea70d3e', 'authenticated', 'authenticated', 'scouter4@yeti', '$2a$10$SZ7eM8YHKEaPfluyAOHX5Oiq/SdrcqexIY01ysDPWu4QGbs0OzTf6', '2024-07-28 01:42:11.847425+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-07-28 01:42:11.837268+00', '2024-07-28 01:42:11.847569+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
        ('00000000-0000-0000-0000-000000000000', '9b5d90ac-8d2f-4204-b731-9a80be6944fd', 'authenticated', 'authenticated', 'scouter5@yeti', '$2a$10$Fo/W1fwgI4C4DYvkr7qT8.F5kkctFwQrjK34fhI5DeN5tGVwuout2', '2024-07-28 01:42:21.653822+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-07-28 01:42:21.644708+00', '2024-07-28 01:42:21.654034+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
        ('00000000-0000-0000-0000-000000000000', 'c00cd1a5-5e6e-4f44-a1f1-265790185c05', 'authenticated', 'authenticated', 'scouter6@yeti', '$2a$10$XpomHusdvBqWtBG2DzQFHONLgXW94cN3i7CTpSw2OyXsugl.8rg3K', '2024-07-28 01:42:31.662361+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-07-28 01:42:31.650188+00', '2024-07-28 01:42:31.662736+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
        ('c97311ba-9e6e-4bb5-8a4b-b6f947527b30', 'c97311ba-9e6e-4bb5-8a4b-b6f947527b30', '{"sub": "c97311ba-9e6e-4bb5-8a4b-b6f947527b30", "email": "admin@yeti", "email_verified": false, "phone_verified": false}', 'email', '2024-07-28 01:40:58.143983+00', '2024-07-28 01:40:58.144079+00', '2024-07-28 01:40:58.144079+00', 'a7318c9e-dce3-4f55-9352-e9a6b7f6916a'),
        ('9c3c8fb6-528f-46e8-a40d-1ffda082044e', '9c3c8fb6-528f-46e8-a40d-1ffda082044e', '{"sub": "9c3c8fb6-528f-46e8-a40d-1ffda082044e", "email": "scouter1@yeti", "email_verified": false, "phone_verified": false}', 'email', '2024-07-28 01:41:39.477722+00', '2024-07-28 01:41:39.47779+00', '2024-07-28 01:41:39.47779+00', '995bb84c-7276-48d4-b9b5-cd3482732726'),
        ('931670f8-c709-464a-a78b-bb55bd8dcfc6', '931670f8-c709-464a-a78b-bb55bd8dcfc6', '{"sub": "931670f8-c709-464a-a78b-bb55bd8dcfc6", "email": "scouter2@yeti", "email_verified": false, "phone_verified": false}', 'email', '2024-07-28 01:41:50.375572+00', '2024-07-28 01:41:50.375665+00', '2024-07-28 01:41:50.375665+00', 'fa4f55f4-b928-41b3-a72d-cf9d8647baf9'),
        ('f540ec81-669a-4c24-89e9-eeac0e9981a0', 'f540ec81-669a-4c24-89e9-eeac0e9981a0', '{"sub": "f540ec81-669a-4c24-89e9-eeac0e9981a0", "email": "scouter3@yeti", "email_verified": false, "phone_verified": false}', 'email', '2024-07-28 01:42:01.579083+00', '2024-07-28 01:42:01.579124+00', '2024-07-28 01:42:01.579124+00', 'ca69d262-bd02-471d-9f19-7d16d39b9bbc'),
        ('849448df-af65-4e80-b692-86b4eea70d3e', '849448df-af65-4e80-b692-86b4eea70d3e', '{"sub": "849448df-af65-4e80-b692-86b4eea70d3e", "email": "scouter4@yeti", "email_verified": false, "phone_verified": false}', 'email', '2024-07-28 01:42:11.840625+00', '2024-07-28 01:42:11.840665+00', '2024-07-28 01:42:11.840665+00', '18c1f708-64eb-4198-bfe8-8a16dcc9dcf3'),
        ('9b5d90ac-8d2f-4204-b731-9a80be6944fd', '9b5d90ac-8d2f-4204-b731-9a80be6944fd', '{"sub": "9b5d90ac-8d2f-4204-b731-9a80be6944fd", "email": "scouter5@yeti", "email_verified": false, "phone_verified": false}', 'email', '2024-07-28 01:42:21.646898+00', '2024-07-28 01:42:21.646944+00', '2024-07-28 01:42:21.646944+00', '122e14d4-4632-4f3a-bc3c-8d8fddbf0d54'),
        ('c00cd1a5-5e6e-4f44-a1f1-265790185c05', 'c00cd1a5-5e6e-4f44-a1f1-265790185c05', '{"sub": "c00cd1a5-5e6e-4f44-a1f1-265790185c05", "email": "scouter6@yeti", "email_verified": false, "phone_verified": false}', 'email', '2024-07-28 01:42:31.654866+00', '2024-07-28 01:42:31.655037+00', '2024-07-28 01:42:31.655037+00', '87ad6ffb-46a5-45f9-bffb-97b32a67a5da');

-- Insert data into the event table
insert into public.event (event_key, event_name, start_date, end_date) values
('event2024A', 'FRC Regional Event A', '2024-03-01', '2024-03-03'),
('event2024B', 'FRC Regional Event B', '2024-03-10', '2024-03-12');

-- Insert data into the team table
insert into public.team (team_key, team_name) values
('frc100', 'Team 100'),
('frc200', 'Team 200'),
('frc300', 'Team 300');

-- Insert data into the match table
insert into public.match (event_key, match_number) values
('event2024A', 1),
('event2024A', 2),
('event2024A', 3),
('event2024B', 1),
('event2024B', 2);

-- Insert data into the schedule table
insert into public.schedule (event_key, match_number, scouter, team) values
('event2024A', 1, '9c3c8fb6-528f-46e8-a40d-1ffda082044e', 'frc100'),
('event2024A', 1, '931670f8-c709-464a-a78b-bb55bd8dcfc6', 'frc200'),
('event2024A', 1, 'f540ec81-669a-4c24-89e9-eeac0e9981a0', 'frc300'),
('event2024A', 2, '849448df-af65-4e80-b692-86b4eea70d3e', 'frc100'),
('event2024A', 2, '9b5d90ac-8d2f-4204-b731-9a80be6944fd', 'frc200'),
('event2024A', 2, 'c00cd1a5-5e6e-4f44-a1f1-265790185c05', 'frc300'),
('event2024B', 1, '9c3c8fb6-528f-46e8-a40d-1ffda082044e', 'frc100'),
('event2024B', 1, '931670f8-c709-464a-a78b-bb55bd8dcfc6', 'frc200'),
('event2024B', 1, 'f540ec81-669a-4c24-89e9-eeac0e9981a0', 'frc300'),
('event2024B', 2, '849448df-af65-4e80-b692-86b4eea70d3e', 'frc100'),
('event2024B', 2, '9b5d90ac-8d2f-4204-b731-9a80be6944fd', 'frc200');

-- Insert data into the stand_form table
insert into public.stand_form (team_number, event_key, match_number, scouter, auto_amp_notes, auto_speaker_notes, teleop_amp_notes, teleop_speaker_notes, shuttle_notes, trap_notes, initiation_line, climb, spotlight, park, number_on_chain, defense, penalties, notes, alliance, approved) values
(100, 'event2024A', 1, '9c3c8fb6-528f-46e8-a40d-1ffda082044e', 2, 3, 1, 4, 0, 0, false, true, false, true, 2, 3, 0, 'Great performance in the match', 'red', true),
(200, 'event2024A', 1, '931670f8-c709-464a-a78b-bb55bd8dcfc6', 1, 2, 2, 1, 0, 0, true, false, false, true, 3, 2, 1, 'Good defense', 'blue', true),
(300, 'event2024A', 1, 'f540ec81-669a-4c24-89e9-eeac0e9981a0', 3, 1, 4, 2, 0, 0, false, false, true, true, 1, 4, 0, 'Excellent strategy', 'red', true),
(100, 'event2024A', 2, '849448df-af65-4e80-b692-86b4eea70d3e', 2, 2, 2, 2, 0, 0, true, true, false, false, 2, 3, 1, 'Consistent performance', 'blue', true),
(200, 'event2024A', 2, '9b5d90ac-8d2f-4204-b731-9a80be6944fd', 1, 1, 3, 1, 0, 0, false, false, true, false, 3, 2, 0, 'Needs improvement', 'red', false),
(300, 'event2024A', 2, 'c00cd1a5-5e6e-4f44-a1f1-265790185c05', 4, 3, 1, 4, 0, 0, true, true, false, true, 1, 4, 2, 'Outstanding performance', 'blue', true),
(100, 'event2024B', 1, '9c3c8fb6-528f-46e8-a40d-1ffda082044e', 2, 1, 3, 2, 0, 0, false, true, true, false, 2, 2, 0, 'Solid game', 'red', true),
(200, 'event2024B', 1, '931670f8-c709-464a-a78b-bb55bd8dcfc6', 3, 4, 2, 1, 0, 0, true, false, false, true, 1, 3, 1, 'Excellent teamwork', 'blue', true),
(300, 'event2024B', 1, 'f540ec81-669a-4c24-89e9-eeac0e9981a0', 1, 1, 4, 3, 0, 0, false, true, false, false, 3, 4, 0, 'Needs better coordination', 'red', false),
(100, 'event2024B', 2, '849448df-af65-4e80-b692-86b4eea70d3e', 2, 3, 2, 1, 0, 0, true, false, true, true, 1, 2, 2, 'Strong defense', 'blue', true),
(200, 'event2024B', 2, '9b5d90ac-8d2f-4204-b731-9a80be6944fd', 4, 2, 1, 4, 0, 0, false, true, false, false, 2, 3, 0, 'Good strategy', 'red', true);
