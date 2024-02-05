import supabase from "../supabase";
import { createClient } from "@supabase/supabase-js";
export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const { supabaseUrl, supabaseKey } = useRuntimeConfig();
	const { access_token, id } = body;

	const supabase = createClient(supabaseUrl, supabaseKey);

	const { data: profile, error } = await supabase
		.from("profile")
		.select()
		.eq("id", id)
		.single();

	if (error) {
		return { message: "Error fetching user from supabase" };
	}

	if (!profile) {
		return { error: "User not found" };
	}

	// Update user with Facebook access token
	const { data: updatedUser, updateError } = await supabase
		.from("profile")
		.update({ access_token })
		.eq("id", id)
		.single();

	if (updateError) {
		return { error: "Error updating user in Supabase" };
	}

	return updateError;
});
