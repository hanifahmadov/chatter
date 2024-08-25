/* eslint-disable */
import axios from "axios";
import {apiUrl} from "./apiUrl";

export const signup = (data) => {

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