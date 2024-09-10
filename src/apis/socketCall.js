import { io } from "socket.io-client";
import { apiUrl } from "./apiUrl";

export const socketconnect = (userToken ) => {
	return new Promise(async (resolve, reject) => {
		try {
			const socket = io(apiUrl, {
				reconnection: false,
				extraHeaders: {
					Authorization: `Bearer ${userToken}`,
				},
			});

			resolve(socket);
		} catch (error) {
			console.log("socket connect error", error);
			reject(false);
		}
	});
};