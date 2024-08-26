/* npm packages */
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useMediaQuery } from "react-responsive";
import { ThemeProvider } from "styled-components";

/* apis */

/* global states */
import { userDefault } from "../store/states/user_state";

/* styled */
import { Loading_Container } from "./layouts.styled";

/* helpers */

export const PersistentLayout = () => {
	console.log("Persistent_layout");
	/* backdrop  */
	// const [backdrop, setBackdrop] = useRecoilState(backdropDefault);

	/* navigate */
	const navigate = useNavigate();

	/* location */
	// console.log(location.state?.from);
	// const location = useLocation();

	/** user */
	const [signedUser, setSignedUser] = useRecoilState(userDefault);

	/* loading */
	const [isLoading, setIsLoading] = useState(true);

	/**
	 *  Socket
	 * 	Connections
	 * 	Listeners
	 * 	Events
	 */
	const [messageDataCall, setMessageDataCall] = useRecoilState(messageDataCallDefault);
	const [socketConnection, setSocketConnection] = useRecoilState(socketConnectionDefault);
	const [newOmit, setNewOmit] = useRecoilState(newOmitDefault);

	/**
	 * 	this useEffect sets the refresh token check
	 * 	and establish socket connection
	 */

	const setup = async () => {
		console.log("setup called");

		console.log("signedUser", signedUser);

		return new Promise(async (resolve, reject) => {
			try {
				const response = await useRefreshAccessApi();
				const { user } = await response.data;

				if (user && user.accessToken) {
					const socket = await establishSocketConnection(user.accessToken);
					const { result, userSocket } = await addSocketListeners(
						socket,
						socketConnection,
						setSocketConnection,
						messageDataCall,
						setMessageDataCall,
						newOmit,
						setNewOmit
					);

					if (result) {
						console.log(socket);
						window.socket = socket;
					}

					resolve(user);
				}
			} catch (error) {
				console.log("useRefreshAccessApi error, cant get the user");
				reject(false);
			}
		});
	};

	useEffect(() => {
		console.log("signedUser", signedUser);
		if (!signedUser) {
			setup()
				.then((user) => {
					setSignedUser(user);
					setIsLoading(false);
				})

				.catch((err) => {
					setIsLoading(false);
					setBackdrop(true);
				});
		}
	}, []);

	// if (signedUser)

	// if (isLoading) {
	// 	return <Loading_Container>Loading...</Loading_Container>;
	// }

	// if (backdrop) {
	// 	return <Backdrop kids={<SetupErrorHandler />} />;
	// }

	return <Outlet />;
};
