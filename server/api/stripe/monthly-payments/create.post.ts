import Stripe from "stripe";
import axios from "axios";
export default defineEventHandler(async (event: any) => {
	const { campaignId, accessToken } = await readBody(event);
	const { stripeSecretKey, facebookId, facebookSecret } = useRuntimeConfig();
	const stripe = new Stripe(stripeSecretKey, null);

	const products = await stripe.products.list({ limit: 3 });
	const price = await stripe.prices.list();

	console.log({ facebookId: facebookId, facebookSecret: facebookSecret });

	const paymentLink = await stripe.paymentLinks.create({
		line_items: [
			{
				price: price.data[0].id,
				quantity: 1,
			},
		],
	});

	// campaign spent

	const applicationFees = await stripe.applicationFees.list();

	// const campaignSpent: any = await axios
	// 	.get(`https://graph.facebook.com/v12.0/${campaignId}/insights`, {
	// 		params: {
	// 			fields: "spend",
	// 			access_token: accessToken,
	// 		},
	// 	})
	// 	.catch((error) => console.log(JSON.parse(error)));

	return {
		products: products,
		price: price,
		paymentLink: paymentLink,
		applicationfees: applicationFees
		// campaignSpent: campaignSpent?.data?.data[0]?.spend,
	};
});
