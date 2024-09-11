/* eslint-disable */
import axios from "axios";
import { apiUrl } from "./apiUrl";

/** when page reload
 * 	or refreshed
 */
export const useRefreshAccessApi = async () => {
	try {
		const response = await axios({
			url: `${apiUrl}/refreshAccess`,
			method: "GET",
			withCredentials: true, // Ensure credentials are sent
			credentials: "include", // Include credentials if needed for cross-origin requests
			headers: {
				accept: "application/json",
				"Accept-Language": "en-US,en;q=0.8",
			},
		});

		return response.data.user;
	} catch (error) {
		console.log(error);
		if (error.response) {
			// Server-side error
			if (error.status == 422) {
				throw {
					status: 422,
					message1: "Cookies have expired",
					message2: "Cookies are valid for only 24 hours.",
				};
			} else if (error.status == 401) {
				// Unauthorized refresh token is not provided
				throw {
					status: 401,
					message1: "Access denied",
					message2: "User signed out.",
				};
			} else if (error.status === 500) {
				// Server error
				throw {
					status: 500,
					message1: "Server Error",
					message2: "The issue has been reported.",
				};
			} else {
				throw {
					status: error.status,
					message1: "Request failed.",
					message2: `Error: w/ status code ${error.status}`,
				};
			}
		} else if (error.request) {
			// No response from server
			throw {
				message1: "No response from server.",
				message2: "Please check your network connection.",
			};
		} else {
			// Other errors
			throw {
				message1: "An unexpected error occurred.",
				message2: "Please try again.",
			};
		}
	}
};
