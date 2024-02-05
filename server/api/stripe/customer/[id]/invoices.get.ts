import Stripe from "stripe";

export default defineEventHandler(
	async (event): Promise<Stripe.Response<Stripe.Invoice[]>> => {
		console.log("Entered stripe api");
		const { stripeSecretKey } = useRuntimeConfig();
		console.log("Stripe secret key is ", stripeSecretKey);
		const stripe = new Stripe(stripeSecretKey, null);
		const customerId = event.context.params!.id;

		const invoices: any = await stripe.invoices.list({
			customer: customerId,
		});

		if (!invoices) throw Error("No invoices returned from server");
		const invoicespdf: any = invoices.data;

		const monthlySubscription: any = [];

		invoices.data.forEach((el: any) => {
			monthlySubscription.push(el.hosted_invoice_url);
		});

		const lines: any = [];
		invoices.data.forEach((el: any) => {
			lines.push(el);
		});

		// const pdf: any = invoices.invoice_pdf;
		return invoices.data;
	}
);
