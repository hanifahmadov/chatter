import { io } from "socket.io-client";
import { apiUrl } from "./apiUrl";

export const socketconnect = (userToken, messageDataCall, setMessageDataCall, newOmit, setNewOmit) => {
	return new Promise(async (resolve, reject) => {
		try {
			const socket = io(apiUrl, {
				reconnection: false,
				extraHeaders: {
					Authorization: `Bearer ${userToken}`,
				},
			});

			socket.on("on_newpost", (data) => setNewOmit((newOmit) => !newOmit));
			socket.on("on_newcomment", (data) => setNewOmit((newOmit) => !newOmit));
			socket.on("on_newreply", (data) => setNewOmit((newOmit) => !newOmit));
			socket.on("on_new_pvtmessage", (data) => setMessageDataCall((messageDataCall) => !messageDataCall));

			/*  */
			socket.on("on_postreaction", (data) => setNewOmit((newOmit) => !newOmit));
			socket.on("on_commentreaction", (data) => setNewOmit((newOmit) => !newOmit));

			socket.on("on_deletepost", (data) => setNewOmit((newOmit) => !newOmit));
			socket.on("on_deletecomment", (data) => setNewOmit((newOmit) => !newOmit));
			socket.on("on_deletereply", (data) => setNewOmit((newOmit) => !newOmit));
			socket.on("on_delete_subreply", (data) => setNewOmit((newOmit) => !newOmit));

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
