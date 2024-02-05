import Stripe from "stripe";
import axios from "axios";
export default defineEventHandler(async (event: any) => {
	const cardNumber = 42424242;
	let cardData: any;
	const amount = 100;
	let adBudget = 0;

	const europeanCountries = [
		"Albania",
		"Andorra",
		"Austria",
		"Belarus",
		"Belgium",
		"Bosnia and Herzegovina",
		"Bulgaria",
		"Croatia",
		"Cyprus",
		"Czech Republic",
		"Denmark",
		"Estonia",
		"Finland",
		"France",
		"Germany",
		"Greece",
		"Hungary",
		"Iceland",
		"Ireland",
		"Italy",
		"Kosovo",
		"Latvia",
		"Liechtenstein",
		"Lithuania",
		"Luxembourg",
		"Malta",
		"Moldova",
		"Monaco",
		"Montenegro",
		"Netherlands",
		"North Macedonia",
		"Norway",
		"Poland",
		"Portugal",
		"Romania",
		"Russia",
		"San Marino",
		"Serbia",
		"Slovakia",
		"Slovenia",
		"Spain",
		"Sweden",
		"Switzerland",
		"Ukraine",
		"United Kingdom",
		"Vatican City",
	];

	await axios
		.get(`https://lookup.binlist.net/${cardNumber}`)
		.then((response: any) => {
			cardData = response.data;
		})
		.catch((error) => console.error("Error >>>>>>>>>> ", error));

	const platformFees = (country: any) => {
		let index = null;
		index = europeanCountries.indexOf(country.name);
		if (
			country.name ==
			"United Kingdom of Great Britain and Northern Ireland (the)"
			// cardData.country.name.includes("United Kingdom")
		) {
			console.log("executing UK");
			adBudget = amount - ((amount * 2.5) / 100 + 0.25);
			if (country.currency != "EUR") {
				adBudget = amount - ((amount * 2.5) / 100 + 0.25 + (amount * 2) / 100);
			}
		} else if (!index) {
			console.log("executing europe");
			adBudget = amount - ((amount * 1.5) / 100 + 0.25);
		} else {
			console.log("executing other");
			adBudget = amount - ((amount * 3.25) / 100 + 0.25 + (amount * 2) / 100);
		}
	};

	console.log(cardData);
	platformFees(cardData.country);

	// platformFees("India");

	return { adBudget: adBudget, cardData: cardData };
});
