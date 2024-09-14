import React from "react";
import { motion } from "framer-motion";
/* helpers */
import { formatDate, formatTime } from "../store/days/days";

export const Users = ({ users, setActivelink, setCurrRecipient, setPrevActivelink, setMessageLoading }) => {
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
							className={`min-h-[50px] min-w-[300px] w-[90%] bg-white p-1 
										border-[0.5px] border-gray-200 rounded-[10px] overflow-hidden
										flex gap-3 flex-row justify-start items-center flex-nowrap

									`}
						>
							<div
								className='user-avatar 
                                            overflow-hidden ml-2 relative 
											flex flex-col items-center justify-center
                                            '
							>
								<img
									src={user.avatar}
									className={`h-[50px] w-[50px] 
                                       			object-cover p-[2px]
                                                text-shadow-custom_02 rounded-full
												border-[2px] 
												${user.online ? "border-solid border-green-400" : " border-solid border-gray-100"}
                                                `}
								/>

								<div
									className='flex flex-col items-center justify-center w-full
												leading-[14px]
												'
								>
									{user.online ? (
										<span
											className='text-[10px] font-sans text-green-500 block font-[300]
															flex flex-col justify-center items-center mt-[3px]'
										>
											Online
										</span>
									) : (
										<span
											className='text-[10px] block text-black font-sans font-[300]
														flex flex-col justify-center items-center  mt-[3px]'
										>
											<span className='today text-[10px] text-black font-sans font-[300]'>
												{formatDate(user.lastseen)}
											</span>

											<span className='clock text-[10px] text-black font-sans font-[300]'>
												{formatTime(user.lastseen, "HH:mm")}
											</span>
										</span>
									)}
								</div>
							</div>

							<div
								className='user-datails
                                            flex gap-0 flex-col justify-start items-start 
                                        	rounded-md w-[calc(100%-100px-10px)]
                                            bg-white

                                            '
							>
								<div className='row-top flex flex-col '>
									<div
										className='text-[16px] text-black font-[400] font-sans
													flex justify-start items-center
													text-shadow-custom_01
													'
									>
										{user.username.charAt(0).toUpperCase() + user.username.slice(1).toLowerCase()}
									</div>

									<span
										className='text-[12px] text-gray-600
													font-[300] font-sans 
													relative bottom-[3px]
													text-shadow-custom_01
													'
									>
										{user.email}
									</span>

									<div className='relative bottom-[3px] self-start'>
										<div className='flex gap-2 flex-row text-center justify-center items-center'>
											<div
												className='flex flex-row gap-1 justify-center items-center
															text-[12px] text-black font-[300] font-sans text-shadow-custom_01
															'
											>
												<span className=''>Member since</span>
												<span className=''>✩</span>
											</div>

											<span className='text-[12px] text-black font-[300] font-sans text-shadow-custom_01'>
												{formatDate(user.createdAt)}
											</span>
										</div>
									</div>
								</div>

								<div className='row-bottom w-full flex flex-row gap-2'>
									<motion.span
										whileTap={{ scale: 1.025 }}
										onClick={() => handleSendMessage(user)}
										className='text-shadow-custom_01 text-white text-[12px] text-center 
													bg-blue-500 rounded-sm font-[600] inline-block
													w-[100px] sm:w-[90px] py-0 font-sans
													cursor-pointer hover:bg-blue-600
													'
									>
										message
									</motion.span>
									<span
										className='text-shadow-custom_01 text-white text-[12px] text-center 
													bg-blue-500 rounded-sm font-[600] inline-block font-sans
													w-[100px] sm:w-[90px] py-0 opacity-50 cursor-not-allowed
													'
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
