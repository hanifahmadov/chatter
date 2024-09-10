/* eslint-disable */
import axios from "axios";
import { apiUrl } from "./apiUrl";

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
