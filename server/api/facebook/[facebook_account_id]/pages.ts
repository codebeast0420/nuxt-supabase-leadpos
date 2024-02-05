import { FacebookPage } from "@/types/facebook";
import axios from "axios";
export default defineEventHandler(async (event): Promise<FacebookPage[]> => {
	const facebookAccountId = event.context.params!.facebook_account_id;
	const accessToken = event.context.params!.accessToken;
	// TODO: Get facebook pages from facebook api
	//

	// Dummy data

	//this will extaact facebook pages using facebook account id
	const facebookPages = await axios.get(
		`https://graph.facebook.com/v18.0/${facebookAccountId}/accounts?access_token=${accessToken}`
	);
	console.log(facebookPages);
	await new Promise((resolve) => setTimeout(resolve, 2000));

	const pages: FacebookPage[] = [
		{
			facebook_page_id: "1",
			name: "Peak Physique Fitness Hub",
		},
		{
			facebook_page_id: "2",
			name: "Body Bliss Athletic Center",
		},
	];

	return pages;
});
