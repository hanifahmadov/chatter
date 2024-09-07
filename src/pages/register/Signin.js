import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilState, useRecoilCallback } from "recoil";
import { motion } from "framer-motion";
import async from "async";

/* apis */
import { signin_api } from "../../apis/registerCalls";
import { socketconnect } from "../../apis/socketCalls";

/* states */
import { userDefault } from "../../store/states/user_state";
import { on_messages_state, on_users_state } from "../../store/states/socket_state";
import { activelinkDefault } from "../../store/states/app_state";


export const Signin = () => {
	/* location & navigation */
	const location = useLocation();
	const navigate = useNavigate();

	/* active link */
	const [activelink, setActivelink] = useRecoilState(activelinkDefault)

	/* for socket */
	const [on_messages, set_on_messages] = useRecoilState(on_messages_state);
	const [on_users, set_on_users] = useRecoilState(on_users_state);

	/* user */
	const [signedUser, setSignedUser] = useRecoilState(userDefault);
	const updateUserState = useRecoilCallback(({ set }) => async (user) => {
		return new Promise((resolve) => {
			set(userDefault, user);
			resolve(user);
		});
	});
	/* sign in setup */
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const requiredFileds = email.length > 0 && pwd.length > 0;

	/* handle sign in  */
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		if (!email.length || !pwd.length) return;

		signin_api({ email, pwd })
			.then(async (response) => {
				const { user } = response.data;

				socketconnect(user.accessToken, on_users, set_on_users, on_messages, set_on_messages)
					.then((socket) => {
						console.log("socket connected and listeners setted up");
						window.socket = socket;
					})
					.catch((err) => {
						console.log("socket connection error >>", err);
					});

				updateUserState(user).then(() => {
					// Preventing back navigation
					history.pushState(null, null, window.location.href);
					window.onpopstate = function () {
						history.go(1);
					};

					navigate("/", { replace: true });
					setActivelink(1)
					
				});
			})

			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className='signin text-center w-[18rem] px-4 py-5 rounded-2xl'>
			<div className='signin_header text-4xl text-shadow-custom_02'>Sign in.</div>

			<div className='signin_content mt-8'>
				<form className='' onSubmit={handleFormSubmit}>
					<input
						type='email'
						className='border border-gray-300 px-3 py-2
								w-full 
								rounded-md focus:outline-none 
								focus:ring-1 focus:ring-blue-200
								text-shadow-custom_01
								text-sm 
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
								text-sm text-shadow-custom_01
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
						  font-bold py-1 px-3 mt-3 
						  rounded font-medium 
						  text-shadow-custom_1 
						  w-full mt-5 
						  transition-colors duration-200 ease-in-out`}
					>
						sign in
					</motion.button>
				</form>
			</div>

			<div className='signin_footer mt-6 text-sm'>
				<div className='text-shadow-custom_01'>Dont have an account?</div>

				<div
					onClick={() => navigate("/welcome/signup")}
					className='text-shadow-custom_01 
									text-blue-900 
									bg-gray-100 
									hover:bg-gray-50
									cursor-pointer 
									font-medium mt-1 
									inline-block
									px-2 py-1 mt-2
									rounded
									text-center
									transition-colors duration-200 ease-in-out
									'
				>
					Sign up
				</div>
			</div>
		</div>
	);
};
