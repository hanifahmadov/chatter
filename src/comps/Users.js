import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "styled-components";

/* helpers */
import { formatDate, formatTime } from "../store/days/days";

export const Users = ({ users, setActivelink, setCurrRecipient, setPrevActivelink, setMessageLoading }) => {
	/* mobile */
	const theme = useTheme();
	const { sm, md } = theme.device;



	/* handle user send message */
	const handleSendMessage = (user) => {
		/** display loading
		 *  to gain time
		 * to scroll to bottom  */
		// setLoading(true);

		/** loading done */
		// setTimeout(() => {
		// 	setLoading(false);
		// }, 2000);

		setMessageLoading(true);

		/**
		 *  set curr Recipient
		 */
		setCurrRecipient(user);

		/**
		 *  active link update to display chats
		 */
		setActivelink(2);

		/**
		 *  cache the prev value
		 *  of active link when back arrow clicked
		 *  this value will be needed
		 */
		setPrevActivelink(1);
	};
	return (
		<div
			className='w-full max-h-full self-start py-3 
                        flex gap-3 flex-row flex-wrap justify-center items-center 
                        overflow-scroll
                        '
		>
			{users.length > 0 &&
				users.map((user, index) => {
					return (
						<div
							key={index}
							className={`min-h-[50px] min-w-[300px] 
										${sm ? "w-[100%] px-1 py-2" : " w-[95%] p-1"} 
										border-[1px] border-gray-200 rounded-[10px] overflow-hidden
										flex gap-[2px] flex-row justify-start items-center flex-nowrap
										bg-white 

									`}
						>
							<div
								className={`user-avatar max-w-[75px] min-w-[75px] ${sm && "px-2"}
                                            overflow-hidden ml-1 relative 
											flex flex-col items-center justify-center
                                            `}
							>
								<img
									src={user.avatar}
									className={`${sm ? "h-[45px] w-[45px]" : "h-[40px] w-[40px]"}
                                       			object-cover p-[1px]
                                                text-shadow-custom_02 rounded-full
												border-[1px] 
												${user.online ? "border-solid border-green-400" : " border-solid border-gray-300"}
                                                `}
								/>

								<div
									className={`flex flex-col items-center justify-center w-full
												${sm ? "text-[12px] " : "text-[10px]"}
												`}
								>
									{user.online ? (
										<span
											className='text-green-500 block
														flex flex-col justify-center items-center
														mt-[3px]
														'
										>
											Online
										</span>
									) : (
										<span
											className={`block text-black font-sans
														flex flex-col justify-center items-center
														mt-[3px]
														`}
										>
											<span className={`today text-black font-sans text-shadow-custom_01 `}>
												{formatDate(user.lastseen, "YYYY.MMM.DD")}
											</span>

											<span className='clock text-black font-sans text-shadow-custom_01'>
												{formatTime(user.lastseen, "hh:mm A")}
											</span>
										</span>
									)}
								</div>
							</div>

							<div
								className='user-datails
                                            flex gap-0 flex-col justify-center items-start 
                                        	rounded-md w-[calc(100%-100px-10px)]
                                            bg-white

                                            '
							>
								<div className='row-top flex gap-[5px] flex-col mb-1 leading-none'>
									<div
										className={`${sm ? "text-[16px]" : "text-[14px]"}
													flex justify-start items-center font-[500]
													h-full 

													`}
									>
										{user.username.charAt(0).toUpperCase() + user.username.slice(1).toLowerCase()}
									</div>

									<span
										className={`${sm ? "text-[14px]" : "text-[12px]"}`}
									>
										{user.email}
									</span>

									<div className={`${sm ? "text-[14px]" : "text-[12px]"}`}>
										<div className='flex gap-2 flex-row text-center justify-center items-center'>
											<div
												className='flex flex-row gap-1 justify-center items-center
															text-black ext-shadow-custom_01
															'
											>
												<span className=''>Member since</span>
												<span className=''>✩</span>
											</div>

											<span
												className={` ${
													sm ? "text-[12px]" : "text-[10px]"
												} text-shadow-custom_01`}
											>
												{formatDate(user.createdAt)}
											</span>
										</div>
									</div>
								</div>

								<div
									className={`${sm ? "text-[16px]" : "text-[12px]"}
												row-bottom w-full flex flex-row gap-2
												`}
								>
									<motion.span
										whileTap={{ scale: 1.025 }}
										onClick={() => handleSendMessage(user)}
										className={` ${sm ? "w-[125px]" : "w-[100px]"}
													flex justify-center items-center
													text-white text-center 
													font-[500] text-shadow-custom_02
													bg-blue-600 rounded-sm 
													cursor-pointer hover:bg-blue-600
													`}
									>
										message
									</motion.span>
									<span
										className={` ${sm ? "w-[125px]" : "w-[100px]"}
													flex justify-center items-center
													text-white text-center 
													font-[500] text-shadow-custom_02
													bg-blue-600 rounded-sm opacity-40
													cursor-not-allowed
													`}
									>
										info
									</span>
								</div>
							</div>
						</div>
					);
				})}
		</div>
	);
};
