/* eslint-disable */
import axios from "axios";
import { apiUrl } from "./apiUrl";

/**
 *  sign in
 */
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

			if (error.status == 404) {
				throw {
					message1: "Email address doesnt exit.",
					message2: "Please check your credentials.",
				};
			} else if (error.status == 422) {
				throw {
					message1: "Password is incorrect.",
					message2: "Please check your credentials.",
				};
			} else {
				throw {
					message1: "Sing-in failed w/ " + error.status,
					message2: "Please check your credentials.",
				};
			}
		} else if (error.request) {
			throw {
				message1: "No response from server",
				message2: "Please check your network connection.",
			};
		} else {
			throw {
				message1: "An unexpected error occurred during sign-in.",
				message2: "Please try again.",
			};
		}
	}
};

/**
 *  sign up
 */

export const signup_api = async (data) => {
	try {
		const response = await axios({
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

		return response;
	} catch (error) {
		if (error.response) {
			// Server-side error
			// console.log(error.status);

			if (error.status == 400) {
				throw {
					message1: "Email must have a valid domain.",
					message2: "like → .com  .ru .net  ",
				};
			} else if (error.status == 422) {
				throw {
					message1: "Passwords don`t match.",
					message2: "Make sure the passwords are the same.",
				};
			} else {
				throw {
					message1: "Sign-up failed.",
					message2: "Please check your credentials.",
				};
			}
		} else if (error.request) {
			throw {
				message1: "No response from server",
				message2: "Please check your network connection.",
			};
		} else {
			throw {
				message1: "An unexpected error occurred during sign-un.",
				message2: "Please try again.",
			};
		}
	}
};


/** 
 *  sign out
 */
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
