import { io } from "socket.io-client";
import { apiUrl } from "./apiUrl";

export const socketconnect = (userToken, set_on_users, set_on_messages, set_on_signin) => {
	return new Promise(async (resolve, reject) => {
		try {
			const socket = io(apiUrl, {
				reconnection: false,
				extraHeaders: {
					Authorization: `Bearer ${userToken}`,
				},
			});

			socket.on("on_users", (data) => set_on_users((prev) => !prev));
			socket.on("on_messages", (data) => set_on_messages((prev) => !prev));
			socket.on("on_signin", (data) => set_on_signin((prev) => !prev));

			socket.on("disconnect", (res) => {
				console.log("user disconnected");
			});

			resolve(socket);
		} catch (error) {
			console.log("socket connect error", error);
			reject(false);
		}
	});
};
