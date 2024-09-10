import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilCallback } from "recoil";
import { motion } from "framer-motion";

/* apis */
import { signin_api } from "../apis/signsCall";
import { socketconnect } from "../apis/socketCall";

/*  global states */
import { newConnectionDefault, newMessageDefault } from "../store/states/socket_states";
import { errorContentDefault, signedUserDefault, signsErrorDefault } from "../store/states/app_state";

export const Signin = () => {
	/* location & navigation */
	const navigate = useNavigate();
	/* tracking the setTimeout Ids on signin_api error catch */
	const timeout = useRef(0);

	/* socket defaults */
	const [newConnection, setNewConnection] = useRecoilState(newConnectionDefault);
	const [newMessage, setNewMessage] = useRecoilState(newMessageDefault);

	/** toaster
	 *  states and
	 *  content
	 */
	const [signsError, setSignsError] = useRecoilState(signsErrorDefault);
	const [errorContent, setErrorContent] = useRecoilState(errorContentDefault);

	/* user */
	const [signedUser, setSignedUser] = useRecoilState(signedUserDefault);
	/** update the global signed user
	 *  this will guratee that default user
	 *  will get updated  then keep on other line codes
	 *  syncronous
	 */
	const updateUserState = useRecoilCallback(({ set }) => async (user) => {
		return new Promise((resolve) => {
			set(signedUserDefault, user);

			/* resolve user */
			resolve(user);
		});
	});

	/* sign in setup */
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const requiredFileds = email.length > 0 && pwd.length > 0;

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		if (!email.length || !pwd.length) return;

		/**
		 *  signin api
		 */
		signin_api({ email, pwd })
			.then(async (response) => {
				/* get signedin user */
				const { user } = response.data;

				/** connect the socket to server
				 *  right after the user signed in
				 *  return the sockets to add listeners
				 *
				 */
				socketconnect(user.accessToken)
					.then((socket) => {
						console.log("socket connected and listeners setted up");
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
							setNewMessage((prev) => prev);
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
					history.pushState(null, null, window.location.href);
					window.onpopstate = function () {
						history.go(1);
					};

					navigate("/", { replace: true });
					setActivelink(1);
				});
			})

			.catch((err) => {
				/* clear the current set-timeouts */
				clearTimeout(timeout.current);

				/** error toaster
				 *  content of error
				 */
				setErrorContent({
					text1: err.message1,
					text2: err.message2,
				});

				/* display error */
				setSignsError(true);

				/* remove error after 5s automatically */
				timeout.current = setTimeout(() => {
					setSignsError(false);
				}, 5000);
			});
	};

	return (
		<motion.div
			initial={{ opacity: 0, display: "none" }}
			animate={{ opacity: 1, display: "block" }}
			transition={{ delay: 0.25 }}
			className='signin text-center w-[18rem] 
                        px-4 py-5 rounded-2xl 
                        '
		>
			<div className='signin_header text-[30px] text-shadow-custom_03 font-[400]'>Sign in.</div>

			<div className='signin_content mt-6'>
				<form className='' onSubmit={handleFormSubmit}>
					<input
						type='email'
						className='border border-gray-300 px-3 py-2
								w-full 
								rounded-md focus:outline-none 
								focus:ring-1 focus:ring-blue-200
								text-shadow-custom_01
								text-[12px]
								placeholder:px-1 
								placeholder:text-gray-300
								placeholder:text-shadow-custom_000
								'
						placeholder='Enter email address'
						autoComplete='true'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<input
						type='password'
						className='border border-gray-300 px-3 py-2 mt-5
								w-full 
								rounded-md focus:outline-none 
								focus:ring-1 focus:ring-blue-200
								text-[12px] text-shadow-custom_01
								placeholder:px-1 
								placeholder:text-gray-300
								placeholder:text-shadow-custom_000
								'
						placeholder='Enter password'
						autoComplete='true'
						value={pwd}
						onChange={(e) => setPwd(e.target.value)}
					/>

					<motion.button
						whileTap={requiredFileds ? { scale: 0.99 } : {}}
						type='submit'
						className={`${
							!requiredFileds
								? "bg-blue-600 text-white opacity-50 cursor-not-allowed"
								: "bg-blue-700 hover:bg-blue-800 text-white cursor-pointer"
						} 
						        py-[5px] px-3 mt-3 
						        rounded font-bold 
						        text-shadow-custom_1 
						        w-full mt-5  text-[13px]
						        transition-colors duration-200 ease-in-out
                               
                            `}
					>
						sign in
					</motion.button>
				</form>
			</div>

			<div className='signin_footer mt-6 text-sm'>
				<div className='text-shadow-custom_02'>Dont have an account?</div>

				<div
					onClick={() => navigate("/welcome/signup")}
					className='text-shadow-custom_02 
                                    font-[600]
									text-blue-900 
									bg-gray-100 
									hover:bg-gray-50
									cursor-pointer 
									mt-1 
									inline-block
									px-3 py-[2px] mt-2
									rounded
									text-center
                                    bg-white
									transition-colors duration-200 ease-in-out
									'
				>
					Sign up
				</div>
			</div>
		</motion.div>
	);
};
