import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";
export default defineEventHandler(async (event: any) => {
	const id = event.context.params.id;

	const {
		stripeSecretKey,
		facebookId,
		facebookSecret,
		supabaseKey,
		supabaseUrl,
	} = useRuntimeConfig();
	const stripe = new Stripe(stripeSecretKey, null);

	const supabase = createClient(supabaseUrl, supabaseKey);

    const profile:any = await supabase.from("profile").select().eq("id", id).single();

    
});
