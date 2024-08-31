import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";

/* states */
import { userDefault } from "../store/states/user_state";

export const RegisterLayout = () => {
	const location = useLocation();
	const navigate = useNavigate();

	console.log(location.pathname);

	// Determine whether to show welcome content based on the current pathname
	const showWelcome = location.pathname === "/welcome";

	const handleSignIn = () => {
		navigate("signin");
	};

	const handleSignUp = () => {
		navigate("signup");
	};

	console.log("RegisterLayout rendered");

	const [user] = useRecoilState(userDefault);

	return (
		<div
			className='register-layout h-screen w-screen 
						flex flex-col items-center justify-center fixed 
						'
		>
			{showWelcome ? (
				<div className='welcome-container flex flex-col items-center justify-center fixed w-[70%] w:md-[90%]'>
					<h1 className='text-[18px] font-medium text-shadow-custom_01'>
						Welcome to Chatter <span className='text-[16px]'>♡</span>
					</h1>

					<div className='content mt-2 text-center text-shadow-custom_01'>
						<p>Chatter is a simple full-stack chat app with core features.</p>
						<p>Please sign in or sign up to continue.</p>
					</div>
					<div className='auth-buttons mt-5 flex gap-6'>
						<button
							onClick={handleSignIn}
							className='text-shadow-custom_01 py-1 px-3 
										rounded border-[1px] border-slate-300
										hover:ring-1'
						>
							Sign in
						</button>
						<button
							onClick={handleSignUp}
							className='text-shadow-custom_01 py-1 px-3 
										rounded border-[1px] border-slate-300
										hover:ring-1'
						>
							Sign up
						</button>
					</div>
				</div>
			) : (
				<div className='auth-container'>
					{/* This will render SignIn/SignUp components */}
					<Outlet />
				</div>
			)}
		</div>
	);
};
