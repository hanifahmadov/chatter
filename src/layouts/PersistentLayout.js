/* NPM packages */
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilCallback } from "recoil";
import { useMediaQuery } from "react-responsive";
import { ThemeProvider } from "styled-components";

/** import images */
import dino from "../store/image/dino.png";

/* apis */
import { socketconnect } from "../apis/socketCall";
import { useRefreshAccessApi } from "../apis/auth";

/* global states */
import {
	activelinkDefault,
	errorContentDefault,
	refreshErrorDefault,
	signedUserDefault,
} from "../store/states/app_state";
import { newConnectionDefault, newMessageDefault } from "../store/states/socket_states";

export const PersistentLayout = () => {
	/* navigate */
	const navigate = useNavigate();
	const location = useLocation();

	/* activelink */
	const [activelink, setActivelink] = useRecoilState(activelinkDefault);

	/** loading */
	const [isLoading, setIsLoading] = useState(true);

	/* socket defaults */
	const [newConnection, setNewConnection] = useRecoilState(newConnectionDefault);
	const [newMessage, setNewMessage] = useRecoilState(newMessageDefault);

	/** signeduser
	 *  and its updater
	 */
	const [signedUser, setSignedUser] = useRecoilState(signedUserDefault);
	const updateUserState = useRecoilCallback(({ set }) => async (user) => {
		return new Promise((resolve) => {
			set(signedUserDefault, user);
			resolve(true);
		});
	});

	/* update global err content state guaraante */
	const [refreshError, setRefreshError] = useRecoilState(refreshErrorDefault);
	const [errorContent, setErrorContent] = useRecoilState(errorContentDefault);
	const updateErrorContent = useRecoilCallback(({ set }) => async (val) => {
		return new Promise((resolve) => {
			set(errorContentDefault, val);
			resolve(true);
		});
	});

	/** setup function will run on every time page refresh
	 *  and will send the cookies to backend server and
	 *  if cookies are valid, then the current signed user will get returned
	 *  and page will stay active-signed in
	 *  otherwise, page will pop the refreshError modal || toaster
	 */
	const setup = async () => {
		useRefreshAccessApi()
			.then(async (user) => {
				/** connect the socket to server
				 *  right after the user signed in
				 *  return the sockets to add listeners
				 *
				 */

				socketconnect(user.accessToken)
					.then((socket) => {
						window.socket = socket;
						/**
						 *  on connections or disconnection
						 *  this will return the current
						 *  updated online users array
						 */
						socket.on("new_connection", (data) => {
							setNewConnection(data);
						});

						/**  emit on new message  */
						socket.on("new_message", (data) => {
							setNewMessage((prev) => !prev);
						});
					})
					.catch((err) => {
						console.log("Error on Socket Connection", err);
					});

				/** after socket connection
				 *  attached the user to global user state
				 */
				updateUserState(user).then(() => {
					// Preventing back navigation
					navigate("/", { replace: true });
					setActivelink(1);
					setIsLoading(false);
					setRefreshError(false);
				});
			})
			.catch((error) => {
				/** make sure the global state
				 * updated then navigate
				 */

				updateErrorContent({ status: error.status, text1: error.message1, text2: error.message2 }).then(
					(result) => {
						setIsLoading(false);
						setRefreshError(true);
					}
				);
			});
	};

	// useEffect(() => {
	// 	!signedUser ? setup() : setIsLoading(true);
	// }, []);

	useEffect(() => {
		!signedUser && setup() 
	}, []);

	return signedUser ? (
		<Outlet />
	) : (
		<div className='h-full w-full flex items-center justify-center text-[15px] text-shadow-custom_01 font-medium'>
			{isLoading ? (
				<div className='flex items-center justify-center'>
					<div className='flex  ml-1 text-[24px] text-shadow-custom_01 font-[400]'>
						<span className='animate-dot-1'>L</span>
						<span className='animate-dot-2'>o</span>
						<span className='animate-dot-3'>a</span>
						<span className='animate-dot-4'>d</span>
						<span className='animate-dot-5'>i</span>
						<span className='animate-dot-6'>n</span>
						<span className='animate-dot-7'>g</span>
					</div>
				</div>
			) : (
				<div className='animate-in fade-in ease-in duration-300'>
					<img src={dino} className='h-[8rem] w-[8rem]' />
				</div>
			)}
		</div>
	);
};
