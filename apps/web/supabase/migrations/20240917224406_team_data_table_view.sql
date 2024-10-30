CREATE VIEW team_stats AS SELECT
    stand_form.team_number,
    t.team_name,
    avg(auto_amp_notes) as auto_amp_notes,
    avg(auto_speaker_notes) as auto_speaker_notes,
    avg(auto_shuttle_notes) as auto_shuttle_notes,
    avg(teleop_amp_notes) as teleop_amp_notes,
    avg(teleop_speaker_notes) as teleop_speaker_notes,
    avg(teleop_shuttle_notes) as teleop_shuttle_notes,
    avg(defense) as defense,
    bool_or(climb) as climb,
    bool_or(park) as park,
    bool_or(initiation_line) as initiation_line
FROM
    stand_form
JOIN team t on t.team_number = stand_form.team_number
GROUP BY
    stand_form.team_number, t.team_name;