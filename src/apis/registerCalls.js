/* eslint-disable */
import axios from "axios";
import { apiUrl } from "./apiUrl";

/* sign up */
export const signup_api = (data) => {
	return axios({
		url: apiUrl + "/signup/",
		method: "POST",
		withCredentials: true,
		credentials: "include", // this is important to get image file in the backend
		data,

		headers: {
			accept: "application/json",
			"Accept-Language": "en-US,en;q=0.8",
			"Content-Type": `multipart/form-data; boundary=${data._boundary}`,
		},
	});
};

/* sign in */
export const signin_api = async (data) => {
	try {
		const response = await axios({
			url: `${apiUrl}/signin`,
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
			data,
		});

		return response;
	} catch (error) {
		if (error.response) {
			// Server-side error
			console.error("Sign-in failed. Please check your credentials");

			// Return or throw a custom error object
			throw {
				status: 404,
				message1: "Sign-in failed",
				message2: "Please check your credentials.",
			};
		} else if (error.request) {
			// No response from server
			console.error("No response received from server:", error.request);
			throw {
				status: 503,
				message1: "No response from server",
				message2: "Please check your network connection.",
			};
		} else {
			// Client-side error
			console.error("Error during sign-in:", error.message);
			throw { status: 500, message: "An unexpected error occurred during sign-in. Please try again." };
		}
	}
};

/* signout */
export const signout_api = async (accessToken, _id) => {
	try {
		const response = await axios({
			url: `${apiUrl}/signout`,
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			/* Ensure cookies are sent with the request */
			withCredentials: true,
			data: { _id },
		});

		return true;
	} catch (error) {
		/* possible errors */
		if (error.response) {
			// Server-side error
			console.error("Error response from server:", error.response.data);
			throw new Error(error.response.data.message || "Sign out failed");
		} else if (error.request) {
			// No response from server
			console.error("No response received:", error.request);
			throw new Error("No response from server. Please try again.");
		} else {
			// Something else went wrong
			console.error("Error during sign out:", error.message);
			throw new Error("An unexpected error occurred during sign out.");
		}
	}
};
