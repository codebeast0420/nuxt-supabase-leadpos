import { createClient } from "@supabase/supabase-js";
// import { Axios } from "axios";
import axios from "axios";
export default defineEventHandler(async (event: any) => {
	console.log("entered");
	const { supabaseKey, supabaseUrl } = useRuntimeConfig();
	const id = event.context.params.id;

	const supabase = createClient(supabaseUrl, supabaseKey);

	const profile:any = await supabase.from("profile").select().eq("id", id).single();

	console.log(profile);

	const response = await axios.get(
		`https://graph.facebook.com/v13.0/${id}/accounts`,
		{
			params: {
				access_token: profile?.access_token,
			},
		}
	);

	return response;
});
