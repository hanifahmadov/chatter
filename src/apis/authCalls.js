/* eslint-disable */
import axios from "axios";
import { apiUrl } from "./apiUrl";

export const changePwdApi = ({ oldPassword, newPassword }, accessToken) => {
	return axios({
		url: apiUrl + "/changepwd/",
		method: "PATCH",
		withCredentials: true,
		credentials: "include",
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
		data: {
			passwords: {
				old: oldPassword,
				new: newPassword,
			},
		},
	});
};

export const useRefreshAccessApi = () => {
	return axios({
		url: `${apiUrl}/refreshAccess`, // Ensure the URL is correct
		method: "GET",
		withCredentials: true, // Ensure credentials are sent
		credentials: "include", // Include credentials if needed for cross-origin requests
	});
};

export const useVerifyAccessApi = ({ accessToken }) => {
	return axios({
		url: apiUrl + "/verifyaccess",
		method: "GET",
		withCredentials: true,
		credentials: "include",
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
};
