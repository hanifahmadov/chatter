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
		url: apiUrl + "/refreshAccess",
		method: "GET",
		withCredentials: true,
		credentials: "include",
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
