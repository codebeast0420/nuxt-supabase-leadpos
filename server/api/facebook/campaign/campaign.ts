import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import bizSdk from "facebook-nodejs-business-sdk";

export default defineEventHandler(async (event: any) => {
	// // const payload: any = await readBody(event);
	// // console.log(payload);
	const body: any = await readBody(event);
	const { facebookId, facebookSecret, facebookAdId } = useRuntimeConfig();
	// const AdAccount = bizSdk.AdAccount;
	// const Campaign = bizSdk.Campaign;

	// console.log("Body is", body);

	// const access_token = body.token;
	// const app_secret = process.env.FACEBOOK_SECRET;
	// const app_id = process.env.FACEBOOK_ID;
	// const id = body.fb_account_id;

	// const api = bizSdk.FacebookAdsApi.init(access_token);

	// const showDebugingInfo = true; // Setting this to true shows more debugging info.
	// if (showDebugingInfo) {
	// 	api.setDebug(true);
	// }

	// const logApiCallResult = (apiCallName: any, data: any) => {
	// 	console.log(apiCallName);
	// 	if (showDebugingInfo) {
	// 		console.log("Data:" + JSON.stringify(data));
	// 	}
	// };

	// let fields: any, params: any;
	// fields = [];
	// params = {
	// 	name: body.campaignName,
	// 	objective: "LEAD_GENERATION",
	// 	status: "PAUSED",
	// 	special_ad_categories: [],
	// };
	// const campaigns = new AdAccount(id).createCampaign(fields, params);
	// logApiCallResult("campaigns api call complete.", campaigns);

	// const response: any = logApiCallResult(
	// 	"campaigns api call complete.",
	// 	campaigns
	// );

	// return response;

	const appId = facebookId;
	const appSecret = facebookSecret;
	const accessToken = "YOUR_USER_ACCESS_TOKEN"; // User access token with 'ads_management' and 'ads_read' permissions

	// Example campaign details
	const campaignName = body.campaignId;
	const adAccountId = facebookAdId;
	const budgetAmount = body.budget; // The budget amount in your currency
	const budgetCurrency = "EUR";
	let objective = "LEAD_GENERATION"; // Replace with your campaign objective
	if (body.objective) {
		objective = body.objective;
	}

	let campaignId;
	const createCampaign = async () => {
		try {
			const response = await axios.post(
				`https://graph.facebook.com/v12.0/${adAccountId}/campaigns`,
				{
					name: campaignName,
					objective: objective,
					status: "ACTIVE",
					special_ad_categories: "NONE", // Optional
					spend_cap: budgetAmount,
					currency: budgetCurrency,
					
				},
				{
					params: {
						access_token: accessToken,
					},
				}
			);
			campaignId = response.data.id;
			console.log(`Campaign created with ID: ${campaignId}`);
		} catch (error: any) {
			console.error(
				"Error:",
				error.response ? error.response.data : error.message
			);
		}
	};

	createCampaign();
});
