/* eslint-disable */
import axios from "axios";
import { apiUrl } from "./apiUrl";

/* post new message */
export const post_message = async (accessToken, data) => {
	try {
		const response = await axios({
			url: `${apiUrl}/messages/create`,
			method: "POST",
			withCredentials: true,
			credentials: "include",
			data,
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Accept-Language": "en-US,en;q=0.8",
				accept: "application/json",
				"Content-Type": `multipart/form-data; boundary=${data._boundary}`,
			},
		});

		// Logging response (optional)
		console.log("post message request successful:", response);

		return response.data; // Return the data from the response
	} catch (error) {
		// Error Handling
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			console.error("Server responded with an error:", error.response.status, error.response.data);

			// You can customize further actions based on specific status codes
			if (error.response.status === 401) {
				// Handle unauthorized access (e.g., redirect to login)
			} else if (error.response.status === 500) {
				// Handle server error (e.g., show a notification)
			}
		} else if (error.request) {
			// The request was made but no response was received
			console.error("No response received:", error.request);
			// Possible action: show a network error message to the user
		} else {
			// Something happened in setting up the request that triggered an Error
			console.error("Error in setting up request:", error.message);
		}

		// Optionally, you can re-throw the error to handle it at a higher level
		throw error;
	} finally {
		// Cleanup or further actions after request completion or failure
		console.log("Request finished.");
	}
};

/* get all messages */
export const all_messages = async (accessToken) => {
	try {
		const response = await axios({
			url: `${apiUrl}/messages/read`,
			method: "GET",
			withCredentials: true,
			credentials: "include",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Accept-Language": "en-US,en;q=0.8",
				accept: "application/json",
				"Content-Type": "application/json",
			},
		});

		// console.log("all messages >> Request successful:", response);

		/* get messages  */
		const { messages } = await response.data;

		console.log("messages", messages);

		/* sort the messages based on created date */
		return messages.sort((a, b) => {
			new Date(a.createdAt) - new Date(b.createdAt);
		});

		// return messages;
	} catch (error) {
		// Error Handling
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			console.error(
				"all messages >> Server responded with an error:",
				error.response.status,
				error.response.data
			);

			// You can customize further actions based on specific status codes
			if (error.response.status === 401) {
				// Handle unauthorized access (e.g., redirect to login)
			} else if (error.response.status === 500) {
				// Handle server error (e.g., show a notification)
			}
		} else if (error.request) {
			// The request was made but no response was received
			console.error("all messages >>  No response received:", error.request);
			// Possible action: show a network error message to the user
		} else {
			// Something happened in setting up the request that triggered an Error
			console.error("all messages >> Error in setting up request:", error.message);
		}

		// Optionally, you can re-throw the error to handle it at a higher level
		throw error;
	} finally {
		// Cleanup or further actions after request completion or failure
		// console.log("all messages >> Request finished.");
	}
};

/* get all messages */
export const lastunread_messages = async (accessToken, recipientId) => {
	try {
		const response = await axios({
			url: `${apiUrl}/messages/${recipientId}/last-message`,
			method: "GET",
			withCredentials: true,
			credentials: "include",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Accept-Language": "en-US,en;q=0.8",
				accept: "application/json",
				"Content-Type": "application/json",
			},
		});

		// console.log("all messages >> Request successful:", response);

		/* get messages  */
		const { messages } = await response.data;

		/* sort the messages based on created date */
		// return messages.sort((a, b) => {
		// 	new Date(a.createdAt) - new Date(b.createdAt);
		// });

		return messages;
	} catch (error) {
		// Error Handling
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			console.error(
				"recipient messages >> Server responded with an error:",
				error.response.status,
				error.response.data
			);

			// You can customize further actions based on specific status codes
			if (error.response.status === 401) {
				// Handle unauthorized access (e.g., redirect to login)
			} else if (error.response.status === 500) {
				// Handle server error (e.g., show a notification)
			}
		} else if (error.request) {
			// The request was made but no response was received
			console.error("recipient messages >>  No response received:", error.request);
			// Possible action: show a network error message to the user
		} else {
			// Something happened in setting up the request that triggered an Error
			console.error("recipient messages >> Error in setting up request:", error.message);
		}

		// Optionally, you can re-throw the error to handle it at a higher level
		throw error;
	} finally {
		// Cleanup or further actions after request completion or failure
		// console.log("all messages >> Request finished.");
	}
};

/* messages mark as read */
export const mark_messages_asread = async (accessToken, recipientId) => {
	try {
		await axios({
			url: `${apiUrl}/messages/${recipientId}/mark-read`,
			method: "POST",
			withCredentials: true,
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	} catch (error) {
		console.error("Error marking messages as read:", error);
	}
};
