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
import { userDefault } from "../store/states/user_state";
import { on_messages_state, on_users_state } from "../store/states/socket_state";

/* styled */
import { Loading_Container } from "./layouts.styled";

/* helpers */
import { Backdrop } from "./Backdrop";
import { backdropDefault } from "../store/states/app_state";
import { SetupErrorHandler } from "../store/helpers/SetupErrorHandler";

export const PersistentLayout = () => {
	console.log("Persistent_layout");
	/* backdrop  */
	const [backdrop, setBackdrop] = useRecoilState(backdropDefault);

	/* navigate */
	const navigate = useNavigate();

	/* location */
	// console.log(location.state?.from);
	const location = useLocation();

	console.log(location.pathname);

	/** user */
	const [signedUser, setSignedUser] = useRecoilState(userDefault);
	console.log("signedUser right after fetching globally", signedUser);

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
	const [on_messages, set_on_messages] = useRecoilState(on_messages_state);
	const [on_users, set_on_users] = useRecoilState(on_users_state);

	const setup = async () => {
		useRefreshAccessApi()
			.then(async (response) => {
				const { user } = await response.data;

				socketconnect(user.accessToken, on_users, set_on_users, on_messages, set_on_messages)
					.then((socket) => {
						console.log("sockettt");
						window.socket = socket;
					})
					.catch((err) => {
						console.log(err);
					});

				updateUserState(user).then((ress) => {
					console.log(ress);
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
