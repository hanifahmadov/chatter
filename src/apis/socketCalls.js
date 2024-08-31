import { io } from "socket.io-client";
import { apiUrl } from "./apiUrl";

export const socketconnect = (userToken, on_users, set_on_users, on_messages, set_on_messages) => {
	return new Promise(async (resolve, reject) => {
		try {
			const socket = io(apiUrl, {
				reconnection: false,
				extraHeaders: {
					Authorization: `Bearer ${userToken}`,
				},
			});

			socket.on("on_users", (data) => set_on_users((on_users) => !on_users));
			socket.on("on_messages", (data) => set_on_messages((on_messages) => !on_messages));

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
