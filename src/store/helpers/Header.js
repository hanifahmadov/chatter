/* npm packages */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import OutsideClickHandler from "react-outside-click-handler";
import { motion } from "framer-motion";

/* apis */
import { signout_api } from "../../apis/registerCalls";

/* global states */
import { userDefault } from "../states/user_state";

/* helpers */
import { Fontawesome } from "../fontawesome/Fontawesome";

export const Header = () => {
	/* navigate */
	const navigate = useNavigate();

	/* user settings */
	const [account, setAccount] = useState(false);

	/* user */
	const [{ avatar, username, email, accessToken, _id }] = useRecoilState(userDefault);

	/* sign out */
	const handleSignout = () => {
		signout_api(accessToken, _id).then((res) => {
			window.socket?.disconnect();
			window.socket = null;
			navigate("/welcome", { replace: true });
		});
	};

	return (
		<>
			<div
				className='header_left title h-full min-w-[22rem] p-2 
							flex items-center justify-center  
							font-medium text-[16px] text-shadow-custom_005
							'
			>
				Chatter
			</div>

			<div className='header_center flex-grow-1 min-w-[40rem]'></div>

			<div
				className='header_right account title w-[22rem] p-2
							flex h-full items-center justify-center 
							relative cursor-pointer
							'
			>
				<motion.div
					onClick={() => setAccount((account) => !account)}
					id='logout'
					className={"flex justify-center items-center"}
				>
					<span className='pointer-events-none font-medium font-medium text-[16px] text-shadow-custom_005'>
						{username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()}
					</span>
					<div className='pointer-events-none ml-1 w-[17px] cursor-pointer overflow-hidden px-0'>
						<span
							className={`faRightFromBracket pointer-events-none relative top-[1px] block flex h-[20px] items-center justify-center overflow-hidden`}
						>
							<Fontawesome
								type={"faRightFromBracket"}
								className='pointer-events-none'
								fontSize={account && "16px"}
								color={account && "#1f4ed9"}
							/>
						</span>
					</div>
				</motion.div>

				{account && (
					<OutsideClickHandler
						onOutsideClick={(e) => {
							if (e.target.id !== "logout") {
								setAccount(false);
							}
						}}
					>
						<div className=' absolute right-[65px] top-[50px] z-50 w-[11rem] lg:right-[85px] overflow-hidden rounded-md opacity-100 shadow-custom03 transition-opacity duration-200 ease-in-out '>
							<div className='justify-top flex h-full w-full flex-col items-center bg-slate-50 px-3 py-5 text-center'>
								<div className='account_avatar_wrapper flex flex-col items-start justify-center'>
									<img
										src={avatar}
										className='h-[5rem] w-[5rem] rounded-full object-cover p-[1px] shadow-custom04'
									/>
								</div>
								<div className='account_content'>
									<div className='account_username mt-2 text-center text-[15px] font-medium text-shadow-custom_01'>
										{username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()}
									</div>
									<div className='account_email text-[11px] font-medium text-gray-500 text-shadow-custom_005'>
										{email}
									</div>

									<div className='account_buttons mt-2 flex flex-col'>
										{/* <button
												className='password 		
															bg-blue-800 hover:bg-blue-900 
															text-white cursor-pointe   
															font-bold py-[2px] 
						  									rounded text-[12px] 
						  									text-shadow-custom_03
						 									 w-full mt-3
						 									transition-colors duration-200 ease-in-out '
											>
												password
											</button> */}
										<motion.button
											onClick={handleSignout}
											whileTap={{ scale: 0.99 }}
											className='logout cursor-pointe mt-2 w-full rounded bg-blue-700 py-[2px] text-[12px] font-bold text-white transition-colors duration-200 ease-in-out text-shadow-custom_01'
										>
											sign out
										</motion.button>
									</div>
								</div>
							</div>
						</div>
					</OutsideClickHandler>
				)}
			</div>
		</>
	);
};
