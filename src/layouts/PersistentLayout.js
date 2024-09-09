/* npm packages */
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilCallback } from "recoil";
import { useMediaQuery } from "react-responsive";
import { ThemeProvider } from "styled-components";

/* apis */
import { useRefreshAccessApi } from "../apis/authCalls";
import { socketconnect } from "../apis/socketCalls";

/* global states */
import { onlineUsersDefault, userDefault } from "../store/states/user_state";
import {
	newConnectionState,
	newSigninState,
	on_messages_state,
	on_singin_state,
	on_users_state,
} from "../store/states/socket_state";

/* styled */
import { Loading_Container } from "./layouts.styled";

/* helpers */
import { Backdrop } from "./Backdrop";
import { backdropDefault } from "../store/states/app_state";
import { SetupErrorHandler } from "../store/helpers/SetupErrorHandler";

export const PersistentLayout = () => {
	/* backdrop  */
	const [backdrop, setBackdrop] = useRecoilState(backdropDefault);

	/* navigate */
	const navigate = useNavigate();

	/* location */

	const location = useLocation();

	/** user */
	const [signedUser, setSignedUser] = useRecoilState(userDefault);

	const updateUserState = useRecoilCallback(({ set }) => async (user) => {
		return new Promise((resolve) => {
			set(userDefault, user);
			resolve(true);
		});
	});

	/* loading */
	const [isLoading, setIsLoading] = useState(false);

	/**
	 * 	this useEffect sets the refresh token check
	 * 	and establish socket connection
	 */

	/* for socket */
	const [newSignin, setNewSignin] = useRecoilState(newSigninState);
	const [on_signin, set_on_signin] = useRecoilState(on_singin_state);
	const [on_messages, set_on_messages] = useRecoilState(on_messages_state);
	const [on_users, set_on_users] = useRecoilState(on_users_state);

	const [newConnection, setNewConnection] = useRecoilState(newConnectionState);
	// const [onlineUsers, setOnlineUsers] = useRecoilState(onlineUsersDefault);

	const setup = async () => {
		useRefreshAccessApi()
			.then(async (response) => {
				const { user } = await response.data;

				socketconnect(user.accessToken, set_on_users, set_on_messages, set_on_signin)
					.then((socket) => {
						window.socket = socket;

						socket.on("new_connection", (data) => {
							setNewConnection(data);
							// setOnlineUsers(onlineUsers);
						});
					})
					.catch((err) => {
						console.log(err);
					});

				updateUserState(user).then((ress) => {
					setIsLoading(false);
				});
			})
			.catch((error) => {
				console.log("refresh error happened", error);
				if (error.status == 401) {
					navigate("/welcome", { replace: true });
					setBackdrop(false);
					setIsLoading(false);
				} else {
					setBackdrop(true);
				}
			});
	};

	useEffect(() => {
		!signedUser ? setup() : setIsLoading(true);
	}, []);

	if (backdrop) {
		return <Backdrop kids={<SetupErrorHandler setBackdrop={setBackdrop} />} />;
	}

	return signedUser ? <Outlet /> : <Loading_Container>Loading...</Loading_Container>;
};
