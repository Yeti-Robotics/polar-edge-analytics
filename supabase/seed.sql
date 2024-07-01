INSERT INTO
    event (
        event_code,
        event_name,
        event_location,
        event_date,
        event_end_date
    )
VALUES
    (
        '2024test',
        'Test Event',
        'Test Location',
        '2024-01-01',
        '2024-01-05'
    );

INSERT INTO
    match (event_code, match_number)
VALUES
    ('2024test', 1);

INSERT INTO
    match (event_code, match_number)
VALUES
    ('2024test', 2);

INSERT INTO
    match (event_code, match_number)
VALUES
    ('2024test', 3);

INSERT INTO
    match (event_code, match_number)
VALUES
    ('2024test', 4);

INSERT INTO
    match (event_code, match_number)
VALUES
    ('2024test', 5);

INSERT INTO
    team (team_number, team_name, location)
VALUES
    (1, 'Test Team 1', 'Test Location'),
    (2, 'Test Team 2', 'Test Location'),
    (3, 'Test Team 3', 'Test Location'),
    (4, 'Test Team 4', 'Test Location'),
    (5, 'Test Team 5', 'Test Location');