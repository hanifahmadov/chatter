import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";

/* img */
import chat_img from "../store/image/nobg-chat.png";

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
			className='register-layout w-full h-full 
						flex flex-col items-center justify-center
						'
		>
			{showWelcome ? (
				<div className='welcome-container h-full w-full flex flex-col items-center justify-evenly px-8'>
					<div>
						<img src={chat_img} />
					</div>

					<div className="flex flex-col items-center justify-around px-0 relative bottom-[40px]">
						<h1 className='text-[18px] font-medium text-shadow-custom_01'>
							Welcome to Chatter <span className='text-[16px]'>♡</span>
						</h1>

						<div className='content mt-2 text-center text-shadow-custom_01'>
							<p>Chatter is a simple full-stack chat app</p>
							<p> with core features.</p>
							<p className='mt-5'>Please sign in or sign up to continue.</p>
						</div>
						<div className='auth-buttons mt-3 flex gap-6'>
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
