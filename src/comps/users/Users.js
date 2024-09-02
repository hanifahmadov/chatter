import React from "react";
import { formatDate } from "../../store/days/days";
import { useTheme } from "styled-components";

/* styled */
import { User_Container } from "../../app.styled";

export const Users = ({ users }) => {
	const {
		device: { sm, md },
	} = useTheme();

	console.log("sm sm ", sm);

	console.log(users);

	users = [...users, ...users, ...users, ...users, ...users];
	// users = [...users];

	return (
		<User_Container className='text-black w-full max-h-full py-3 self-start flex flex-row flex-wrap gap-3 justify-center items-center overflow-scroll'>
			{users.length > 0 &&
				users.map((user, index) => {
					return (
						<div
							key={index}
							className={`h-[100px] min-w-[300px] ${
								sm ? "w-[95%]" : "w-[90%]" 

							} border-[1px] bg-white border-white p-1 flex gap-3 flex-row rounded-md shadow-custom_05 overflow-hidden flex-nowrap`}
						>
							<div className='avatar overflow-hidden'>
								<img
									src={user.avatar}
									className='h-[90px] w-[90px] 
                                                border-[0px] border-solid 
                                                border-white object-cover p-[0px]
                                                text-shadow-custom_02  rounded-md
                                                '
								/>
							</div>

							<div
								className='flex gap-2 flex-col justify-start items-start 
                                        	rounded-md w-[calc(100%-100px-10px)]
                                            bg-opacity-50 backdrop-blur-[2px]

                                            '
							>
								<div className='flex flex-col'>
									<span className='text-[18px] text-black  text-shadow-custom_02 font-[500]'>
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

									<span className="">
										<div className='flex gap-2 flex-row text-center'>
											<div className='flex flex-row gap-1 justify-center items-center text-gray-500'>
												<span className='text-[11px] text-shadow-custom_02'>Member since</span>
												<span className='text-[11px] text-shadow-custom_02 leading-[0px] pt-5px'>✩</span>
											</div>

											{/* <span> {timeAgo.format(new Date(currRecipient.createdAt), "twitter")}</span> */}
											<span className='text-shadow-custom_01 text-gray-600 font-medium text-[11px] '>
												{formatDate(user.createdAt)}
											</span>
										</div>
									</span>
								</div>

								<div className='w-full flex flex-row gap-2'>
									<span
										className='text-shadow-custom_02 text-white text-[13px] text-center 
													bg-blue-800 rounded-sm font-[500] inline-block
													w-[70px] py-0
													'
									>
										message
									</span>
									<span
										className='text-shadow-custom_02 text-white text-[13px] text-center 
													bg-blue-800 rounded-sm font-[500] inline-block
													w-[70px] py-0
													'
									>
										details
									</span>
								</div>
							</div>
						</div>
					);
				})}
		</User_Container>
	);
};
