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
			<div className='title h-full flex items-end p-2 text-shadow-custom_005 text-[16px] w-[5rem] lg:w-[10rem] justify-end'>
				Chatter
			</div>
			<div className='account title h-full flex items-end p-2 text-[14px] relative'>
				<motion.div
					whileTap={{ scale: 0.99 }}
					onClick={() => setAccount((account) => !account)}
					id='logout'
					className={"flex  w-[5rem] lg:w-[10rem] text-left text-shadow-custom_005 cursor-pointer"}
				>
					<span className='font-medium pointer-events-none'>
						{username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()}
					</span>
					<div className={"cursor-pointer pointer-events-none"}>
						<span
							className='faRightFromBracket relative px-2 top-[1px] 
											block pointer-events-none h-[20px] 2-[15px] 
											flex items-center justify-center overflow-hidden											
											'
						>
							<Fontawesome type={"faRightFromBracket"} className='pointer-events-none scale-100' />
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
						<div
							className='w-[11rem] absolute top-[65px] right-[5px] lg:right-[65px] shadow-custom03 
                                        rounded-md overflow-hidden transition-opacity duration-200 ease-in-out opacity-100 
                                        '
						>
							<div className='flex flex-col items-center w-full h-full p-3 text-center justify-top bg-slate-50'>
								<div className='flex flex-col items-start justify-center account_avatar_wrapper '>
									<img
										src={avatar}
										className='w-[5rem] h-[5rem] rounded-full
														object-cover p-[1px] shadow-custom04'
									/>
								</div>
								<div className='account_content '>
									<div className='account_username mt-2 text-shadow-custom_01 font-medium text-center text-[15px]'>
										{username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()}
									</div>
									<div className='account_email text-[11px] text-gray-500 text-shadow-custom_005 font-medium'>
										{email}
									</div>

									<div className='flex flex-col mt-2 account_buttons'>
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
											className='logout
															bg-blue-700
															text-white cursor-pointe   
															font-bold py-[2px] 
						  									rounded text-[12px] 
						  									text-shadow-custom_01
						 									 w-full mt-2 mb-1
						 									transition-colors duration-200 ease-in-out
															'
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
