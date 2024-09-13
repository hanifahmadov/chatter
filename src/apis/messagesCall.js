/* eslint-disable */
import axios from "axios";
import { apiUrl } from "./apiUrl";

/**
 *  get all messages
 */
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

		/* get messages  */
		const { messages } = await response.data;

		/* sort the messages based on created date */
		return messages.sort((a, b) => {
			return new Date(a.createdAt) - new Date(b.createdAt);
		});
	} catch (error) {
		// Optionally, you can re-throw the error to handle it at a higher level
		console.error("all messages >>  Error received:", error);
		throw error;
	}
};

/**
 *  send message
 */
export const send_message = async (accessToken, data) => {
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

		/* Return the data from the response */
		return response.data;
	} catch (error) {
		// Optionally, you can re-throw the error to handle it at a higher level
		console.error("send message >>  Error received:", error);
		throw error;
	}
};

/* mark messages as read */
export const mark_asRead = async (accessToken, recipientId) => {
	try {
		const response = await axios({
			url: `${apiUrl}/messages/${recipientId}/mark-read`,
			method: "POST",
			withCredentials: true,
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		return response.data.modifiedCount ? response.data.modifiedCount : 0;
	} catch (error) {
		console.error("Error marking messages as read:", error);
		throw error;
	}
};
