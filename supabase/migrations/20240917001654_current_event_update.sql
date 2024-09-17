CREATE OR REPLACE FUNCTION current_event()
RETURNS TEXT AS $$
DECLARE
    current_event_key TEXT;
BEGIN 
    SELECT event_key INTO current_event_key FROM event WHERE is_current = true LIMIT 1;
    RETURN current_event_key;
END;
$$ LANGUAGE plpgsql STABLE;


CREATE OR REPLACE FUNCTION add_event_to_stand_form()
RETURNS TRIGGER AS $$
BEGIN
    NEW.event_key = current_event();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql STABLE;

CREATE TRIGGER stand_form_event_update BEFORE INSERT ON stand_form FOR EACH ROW EXECUTE PROCEDURE add_event_to_stand_form();