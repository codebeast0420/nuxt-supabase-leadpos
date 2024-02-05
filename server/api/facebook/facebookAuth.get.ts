import express from "express";
import session from "express-session";
import axios from "axios";
import "dotenv/config";
import bodyParser from "body-parser";



//this is working code
export default defineEventHandler((event) => {
	const app = express();
	const router = express.Router();

	const APP_ID = process.env.FACEBOOK_ID;
	const APP_SECRET = process.env.FACEBOOK_SECRET;
	const REDIRECT_URI = process.env.NUXTAUTH_URL;

	let returnurl;

	const url = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&scope=email`;

	// console.log(returnurl);
	const redirect = (url: any, asLink = true) => {
		asLink ? (window.location.href = url) : window.location.replace(url);
	};

	// redirect(url);
	return url;
	// return redirect(url);
});
