import { io } from "socket.io-client";
import { apiUrl } from "./apiUrl";

export function establishSocketConnection(accessToken) {
	return new Promise(async (resolve, reject) => {
		try {
			const socket = io(apiUrl, {
				reconnection: false,
				extraHeaders: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			/* resolve with the socket object */
			resolve(socket);
		} catch (error) {
			console.log("establishSocketConnection err");
			/* reject if error  */
			reject(false);
		}
	});
}

export function addSocketListeners(
	socket,
	socketConnection,
	setSocketConnection,
	newOmit,
	setNewOmit,
	messageDataCall,
	setMessageDataCall
) {
	if (!socketConnection) {
		return new Promise((resolve, reject) => {
			try {
				console.log("addSocketListeners called");

				setSocketConnection(true);

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
					window.socket = false;
					setSocketConnection(false);
				});

				resolve({ result: true, userSocket: socket });
			} catch (err) {
				console.log(err);
				reject({ result: false, userSocket: null });
			}
		});
	}

	return new Promise((resolve, reject) => {
		reject({ result: false, userSocket: false });
	});
}
