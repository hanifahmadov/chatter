/* eslint-disable */
import axios from "axios";
import { apiUrl } from "./apiUrl";

export const all_users = async (accessToken) => {
	try {
		const response = await axios({
			url: `${apiUrl}/users`,
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			/* Ensure cookies are sent with the request */
			withCredentials: true,
		});

		console.log("all users >> Request successful:", response);

		// Return the response data containing the list of users
		return response.data.allUsers;
	} catch (error) {
		/* possible errors */
		if (error.response) {
			// Server-side error
			console.error("all users >> Error response from server:", error.response.data);
			throw new Error(error.response.data.message || "Failed to fetch users");
		} else if (error.request) {
			// No response from server
			console.error("all users >>  No response received:", error.request);
			throw new Error("No response from server. Please try again.");
		} else {
			// Something else went wrong
			console.error("all users >> Error during fetching users:", error.message);
			throw new Error("all users >> An unexpected error occurred during fetching users.");
		}
	}
};
