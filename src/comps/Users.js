import React, { useEffect } from "react";
import { formatDate, formatTime } from "../store/days/days";
import { useTheme } from "styled-components";
import { motion } from "framer-motion";

/* styled */
import { User_Container } from "../app.styled";
import { Fontawesome } from "../store/fontawesome/Fontawesome";

export const Users = ({ setLoading, users, setActivelink, setCurrRecipient, setCustomnav }) => {
	const {
		device: { sm, md },
	} = useTheme();

	const handleUserClick = (user) => {
		setLoading(true);

		setTimeout(() => {
			setLoading(false);
		}, 1500);
		setCurrRecipient(user);
		setActivelink(2);
		setCustomnav(1);
	};

	// users = [...users, ...users, ...users, ...users, ...users];
	// users = [...users];

	return (
		<User_Container className='text-black w-full max-h-full py-3 self-start flex flex-row flex-wrap gap-3 justify-center items-center overflow-scroll'>
			{users.length > 0 &&
				users.map((user, index) => {
					return (
						<div
							key={index}
							className={`min-h-[50px] min-w-[300px] w-[90%]
										border-[1px] bg-white border-white p-1 
										flex gap-3 flex-row  justify-start items-center 
										rounded-[10px]  overflow-hidden flex-nowrap
										shadow-custom_09
									`}
						>
							<div className='avatar overflow-hidden ml-2 relative '>
								<img
									src={user.avatar}
									className={`h-[50px] w-[50px] 
                                       			object-cover p-[2px]
                                                text-shadow-custom_02  rounded-full
												border-[2px] 
												${user.online ? "border-solid border-green-400" : " border-solid border-gray-100"}
                                                `}
								/>
							</div>

							<div
								className='flex gap-0 flex-col justify-start items-start 
                                        	rounded-md w-[calc(100%-100px-10px)]
                                            bg-opacity-50 backdrop-blur-[2px]

                                            '
							>
								<div className='flex flex-col'>
									<span
										className='text-[16px] sm:text-[14px] text-black text-shadow-custom_02 font-[500]
													flex justify-start items-center
													'
									>
										{user.username.charAt(0).toUpperCase() + user.username.slice(1).toLowerCase()}

										{user.online ? (
											<span
												className='text-[11px] block text-green-500 text-shadow-none
														flex justify-center items-end ml-2 pt-[1px]'
											>
												Online
											</span>
										) : (
											<span
												className='text-[11px] block text-gray-400 text-shadow-none
														flex gap-1 justify-center items-end ml-2 pt-[1px]'
											>
												<span className='today text-[10px]'>{formatDate(user.lastseen)}</span>

												<span className='clock text-[10px]'>
													{formatTime(user.lastseen, "HH:mm")}
												</span>
											</span>
										)}
									</span>

									<span
										className='text-[14px] sm:text-[12px] text-gray-600 
													text-shadow-custom_02 font-[400]
													relative bottom-[3px]
													'
									>
										{user.email}
									</span>

									<span className='relative bottom-[3px] self-start'>
										<div className='flex gap-2 flex-row text-center justify-center items-center'>
											<div className='flex flex-row gap-1 justify-center items-center text-gray-500'>
												<span className='text-[12px] sm:text-[11px] text-shadow-custom_02'>
													Member since
												</span>
												<span className='text-[12px] sm:text-[11px] text-shadow-custom_02 leading-[0px] pt-5px'>
													✩
												</span>
											</div>

											{/* <span> {timeAgo.format(new Date(currRecipient.createdAt), "twitter")}</span> */}
											<span className='text-shadow-custom_01 text-gray-600 font-medium text-[12px] sm:text-[11px] '>
												{formatDate(user.createdAt)}
											</span>
										</div>
									</span>
								</div>

								<div className='w-full flex flex-row gap-2'>
									<motion.span
										whileTap={{ scale: 1.025 }}
										onClick={() => handleUserClick(user)}
										className='text-shadow-custom_02 text-white text-[14px] sm:text-[13px] text-center 
													bg-blue-500 rounded-sm font-[500] inline-block
													w-[100px] sm:w-[90px] py-0 cursor-pointer hover:bg-blue-600
													'
									>
										message
									</motion.span>
									<span
										className='text-shadow-custom_02 text-white text-[14px] sm:text-[13px] text-center 
													bg-blue-500 rounded-sm font-[500] inline-block
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
		</User_Container>
	);
};
