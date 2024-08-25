import { io } from "socket.io-client";
import { apiUrl } from "../../../apis/apiUrl";

export function checkSocketConnection(connected, callback) {
	return connected ? true : false;
}

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
	console.log(
		`	socket,
	socketConnection,
	setSocketConnection,
	newOmit,
	setNewOmit,
	messageDataCall,
	setMessageDataCall,`,
		socket,
		socketConnection,
		setSocketConnection,
		newOmit,
		setNewOmit,
		messageDataCall,
		setMessageDataCall
	);

	
	return new Promise((resolve, reject) => {
		try {
			console.log("addSocketListeners called");

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
				window.socket = socket;
				setSocketConnection(false);
			});

			resolve(true);
		} catch (err) {
			reject(err);
		}
	});
}
