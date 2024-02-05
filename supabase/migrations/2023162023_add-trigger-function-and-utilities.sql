-- This table is a key-value store for platform settings
-- such as api urls or other platform-wide values
-- used by the database's functions
CREATE TABLE IF NOT EXISTS public.platform_settings(
  key text PRIMARY KEY NOT NULL,
  value text
);

-- Util function to get a platform setting by key
-- from the platform_settings table
CREATE OR REPLACE FUNCTION public.util_get_platform_setting(key_name text, raise_exception boolean DEFAULT FALSE)
  RETURNS text
  LANGUAGE plpgsql
  AS $function$
DECLARE
  result text;
BEGIN
  SELECT
    value INTO result
  FROM
    public.platform_settings
  WHERE
    key = key_name;
  IF result IS NULL AND raise_exception THEN
    RAISE EXCEPTION 'Platform setting % not found', key_name;
  END IF;
  RETURN result;
END;
$function$;

-- This function is a utility that handles the whole
-- http request building and handling to be used
-- more easily by other functions
CREATE OR REPLACE FUNCTION public.util_invoke_api(http_method text, uri text, body jsonb DEFAULT('{}'::jsonb), additional_headers jsonb DEFAULT('{}'::jsonb))
  RETURNS VOID
  LANGUAGE plpgsql
  AS $function$
DECLARE
  api_url text;
  api_token text;
  headers jsonb;
  execution_string text;
BEGIN
  -- Setup the initial state of the variables
  headers := '{ "Content-Type": "application/json" }'::jsonb;
  api_url := public.util_get_platform_setting('settings:api_url', TRUE);
  api_token := public.util_get_platform_setting('settings:api_token');
  -- Check if the API token is present, if so add it to the headers
  IF api_token IS NULL THEN
    RAISE WARNING 'Bearer token not found in platform_settings, invoking API without authorization header';
  ELSE
    -- Assuming it will be a bearer type of authorization
    headers := headers || concat('{ "Authorization": "Bearer ', api_token, '" }')::jsonb;
  END IF;
  -- Check that the http_method is valid
  IF lower(http_method)
    NOT IN ('get', 'post', 'put', 'patch', 'options', 'delete') THEN
    RAISE EXCEPTION 'Invalid http method: %', http_method;
  END IF;
  -- Perform the http request
  execution_string := format('SELECT * FROM net.http_%s(url := %L, headers := %L::jsonb, body := %L::jsonb)', lower(http_method), rtrim(api_url, '/') || '/api/' || ltrim(uri, '/'),(headers || additional_headers)::text, body::text);
  RAISE DEBUG 'Executing request: %', execution_string;
  EXECUTE execution_string;
END;
$function$;

-- This trigger function is sending a json payload
-- to the /api/campaign/:id/updated-event endpoint
-- with the old and new values.
CREATE OR REPLACE FUNCTION fntg_send_updated_campaign_to_api()
  RETURNS TRIGGER
  SECURITY DEFINER
  LANGUAGE plpgsql
  AS $function$
DECLARE
  old_json jsonb;
  new_json jsonb;
  body jsonb;
BEGIN
  old_json := row_to_json(OLD)::jsonb;
  new_json := row_to_json(NEW)::jsonb;
  body := jsonb_build_object('old', old_json, 'new', new_json);
  PERFORM
    public.util_invoke_api('post', concat('/campaign/', OLD.campaign_id, '/updated-event'), body);
  RETURN NEW;
END;
$function$;

-- This trigger hooks the fntg_send_updated_campaign_to_api
-- to any row update in the campaign table
CREATE TRIGGER tg_invoke_api_after_campaign_update
  AFTER UPDATE ON public.campaign
  FOR EACH ROW
  EXECUTE FUNCTION public.fntg_send_updated_campaign_to_api();

