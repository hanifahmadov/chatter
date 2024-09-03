import React from "react";
import { formatDate } from "../store/days/days";
import { useTheme } from "styled-components";
import { motion } from "framer-motion";

/* styled */
import { User_Container } from "../app.styled";

export const Users = ({ users, setActivelink, setCurrRecipient }) => {
	const {
		device: { sm, md },
	} = useTheme();

	console.log("sm sm ", sm);

	console.log(users);

	const handleUserClick = (user) => {
		setCurrRecipient(user);
		setActivelink(2);
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
							className={`min-h-[50px] min-w-[300px] ${
								sm ? "w-[95%]" : "w-[90%]"
							} border-[1px] bg-white border-white p-1 
								flex gap-3 flex-row  justify-start items-center 
								rounded-[10px] shadow-custom_04 overflow-hidden flex-nowrap
								`}
						>
							<div className='avatar overflow-hidden ml-2'>
								<img
									src={user.avatar}
									className='h-[60px] w-[60px] 
                                                border-[3px] border-solid 
                                                border-white object-cover p-[0px]
                                                text-shadow-custom_02  rounded-full
                                                '
								/>
							</div>

							<div
								className='flex gap-0 flex-col justify-start items-start 
                                        	rounded-md w-[calc(100%-100px-10px)]
                                            bg-opacity-50 backdrop-blur-[2px]

                                            '
							>
								<div className='flex flex-col'>
									<span className='text-[14px] text-black  text-shadow-custom_02 font-[500]'>
										{user.username.charAt(0).toUpperCase() + user.username.slice(1).toLowerCase()}
									</span>

									<span
										className='text-[12px] text-gray-600 
													text-shadow-custom_02 font-[400]
													relative bottom-[3px]
													'
									>
										{user.email}
									</span>

									<span className='relative bottom-[3px]'>
										<div className='flex gap-2 flex-row text-center'>
											<div className='flex flex-row gap-1 justify-center items-center text-gray-500'>
												<span className='text-[11px] text-shadow-custom_02'>Member since</span>
												<span className='text-[11px] text-shadow-custom_02 leading-[0px] pt-5px'>
													✩
												</span>
											</div>

											{/* <span> {timeAgo.format(new Date(currRecipient.createdAt), "twitter")}</span> */}
											<span className='text-shadow-custom_01 text-gray-600 font-medium text-[11px] '>
												{formatDate(user.createdAt)}
											</span>
										</div>
									</span>
								</div>

								<div className='w-full flex flex-row gap-2'>
									<motion.span
										whileTap={{ scale: 1.025 }}
										onClick={() => handleUserClick(user)}
										className='text-shadow-custom_02 text-white text-[13px] text-center 
													bg-blue-500 rounded-sm font-[500] inline-block
													w-[80px] py-0 cursor-pointer hover:bg-blue-600
													'
									>
										message
									</motion.span>
									<span
										className='text-shadow-custom_02 text-white text-[13px] text-center 
													bg-blue-500 rounded-sm font-[500] inline-block
													w-[80px] py-0 opacity-50 cursor-not-allowed
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
