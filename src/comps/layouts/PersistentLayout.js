/* npm packages */
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useMediaQuery } from "react-responsive";
import { ThemeProvider } from "styled-components";

/* apis */
import { useRefreshAccessApi } from "../../apis/authCalls";

/* global states */
import { backdropDefault } from "../store/states/app_state";
import { userDefault } from "../store/states/user_state";
import { messageDataCallDefault } from "../store/states/message_state";
import { newOmitDefault, socketConnectionDefault } from "../store/states/socket_state";

/* styled */
import { Loading_Container } from "./layouts.styled";

/* helpers */
import { SetupErrorHandler } from "../store/error_handlers/SetupErrorHandler";
import  { Backdrop } from "./Backdrop"

export const PersistentLayout = () => {
	/* backdrop  */
	const [backdrop, setBackdrop] = useRecoilState(backdropDefault);
	/**
	 *  setup signedUser
	 * 	while refesh
	 */
	let navigate = useNavigate();
	let [isLoading, setIsLoading] = useState(true);
	let [signedUser, setSignedUser] = useRecoilState(userDefault);
	signedUser = JSON.parse(JSON.stringify(signedUser));

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
	 *
	 *
	 */
	useEffect(() => {
		const setup = async () => {
			return new Promise(async (resolve, reject) => {
				try {
					const response = await useRefreshAccessApi();
					const { user } = await response.data;
					resolve(user);
				} catch (error) {
					console.log("useRefreshAccessApi error, cant get the user");
					reject(false);
				}
			});
		};

		if (!signedUser) {
			setup()
				.then((user) => {
					setSignedUser(user);
					setIsLoading(false);
				})

				.catch((err) => {
					setIsLoading(false);
					setBackdrop(true);
					// navigate("/signin", { state: { nouser: true } });
				});
		}
	}, []);

	if (isLoading) {
		return <Loading_Container>Loading...</Loading_Container>;
	}

	if (backdrop) {
		return <Backdrop kids={<SetupErrorHandler />} />;
	}

	return <Outlet />;
};