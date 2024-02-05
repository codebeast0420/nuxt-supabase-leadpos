import express from "express";
import router from "../facebookAuth.get";
import axios from "axios";
export default defineEventHandler(async (event) => {
	const app = express();
	const id = event.context;
	console.log(id);

	// const router = express.Router();

	// const APP_ID = process.env.FACEBOOK_ID;
	// const APP_SECRET = process.env.FACEBOOK_SECRET;
	// const REDIRECT_URI = process.env.NUXTAUTH_URL;

	// router.get("/auth/facebook", (req, res) => {
	// 	const url = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&scope=email`;
	// 	res.redirect(url);
	// });

	// router.get("/auth/facebook/callback", async (req, res) => {
	//     const { code } = req.query;

	//     try {
	//         // Exchange authorization code for access token
	//         const { data } = await axios.get(
	//             `https://graph.facebook.com/v13.0/oauth/access_token?client_id=${APP_ID}&client_secret=${APP_SECRET}&code=${code}&redirect_uri=${REDIRECT_URI}`
	//         );

	//         const { access_token } = data;

	//         // Use access_token to fetch user profile
	//         const { data: profile } = await axios.get(
	//             `https://graph.facebook.com/v13.0/me?fields=name,email&access_token=${access_token}`
	//         );

	//         // Code to handle user authentication and retrieval using the profile data

	//         res.redirect("/");
	//     } catch (error: any) {
	//         console.error("Error:", error.response.data.error);
	//         res.redirect("/login");
	//     }
	// });

	// router.get("/logout", (req, res) => {
	//     // Code to handle user logout
	//     res.redirect("/login");
	// });

	app.use(router);
});
