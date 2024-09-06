import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";

/* states */
import { on_messages_state } from "../store/states/socket_state";

/* apis */
import { all_messages, lastunread_messages } from "../apis/messageCalls";
import { formatDate } from "../store/days/days";

export const Chats = ({
	signedUser: { accessToken, _id, avatar },
	setLoading,
	setCustomnav,
	users,
	setCurrRecipient,
	setActivelink,
}) => {
	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	const [on_messages] = useRecoilState(on_messages_state);
	const [tracker, setTracker] = useState({});
	const [pulse, setPulse] = useState(true);

	const handleChatClick = (user) => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 1500);

		setCurrRecipient(user);
		setActivelink(2);
		setCustomnav(2.2);
	};

	useEffect(() => {
		if (users.length > 0) {
			users.map((user) => {
				lastunread_messages(accessToken, user._id).then((res) => {
					// console.log("resresresresres", res);
					delay(500).then(() => {
						setTracker((prevTracker) => ({
							...prevTracker,
							[user._id]: res, // Update the tracker with new user data
						}));
					});
				});
			});
		}
	}, [on_messages]); // Include dependencies if necessary

	useEffect(() => {
		if (Object.keys(tracker).length >= users.length) {
			delay(250).then(() => {
				setPulse(false);
			});
		}
	}, [tracker]);

	const presentMessage = (message) => {
		if (message.length == 0) return " image & media attached ";

		if (message.length > 25) {
			return message.slice(0, 25) + " ... ";
		} else {
			return message;
		}
	};
	return (
		<div className={`flex flex-col gap-2 pt-2 h-full rounded relative`}>
			<div className={`${pulse ? "flex" : "hidden"}  flex-col absolute z-20 h-full w-full bg-white`}>
				{users.length > 0 &&
					users.map((user, index) => {
						return (
							<div key={index} className='flex rounded-md p-1 max-w-sm w-full mx-auto my-3'>
								<div className='animate-pulse w-full px-3 flex space-x-4'>
									<div className='rounded-full bg-slate-200 h-10 w-10'></div>
									<div className='flex-1 space-y-6 py-1'>
										<div className='space-y-3'>
											<div className='grid grid-cols-3 gap-4'>
												<div className='h-2 bg-slate-200 rounded col-span-2'></div>
												<div className='h-2 bg-slate-200 rounded col-span-1'></div>
											</div>
											<div className='h-2 bg-slate-200 rounded'></div>
										</div>
									</div>
								</div>
							</div>
						);
					})}
			</div>

			{users.length > 0 &&
				users.map((user, index) => {
					const { avatar, username, _id: userId } = user;

					if (
						tracker &&
						tracker[userId] &&
						tracker[userId].lastMessage &&
						tracker[userId].lastMessage.message
					) {
						const {
							unread,
							lastMessage: { message, createdAt, sender },
						} = tracker[userId];

						return (
							<div key={index} className='pr-2 bg-white rounded-3xl'>
								<motion.div
									onClick={() => handleChatClick(user)}
									className={`
                                            user flex flex-row cursor-pointer rounded
                                            px-1 py-1 hover:bg-blue-50 

                                            `}
								>
									<div className='user_avatar_parent'>
										<img
											src={avatar}
											className='max-h-[42px] min-h-[42px] max-w-[42px] min-w-[42px] 
                                                    rounded-full border-[2px] border-solid 
                                                    border-white object-cover p-[1px]
                                                    text-shadow-custom_02
                                                    '
										/>
									</div>
									<div className='user_content flex flex-grow flex-col items-start justify-center px-2'>
										<div className='content_top flex w-full justify-between'>
											<span className='text-[13px] text-shadow-custom_01'>
												{username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()}
											</span>

											{/* <div className='flex items-center justify-center leading-[0px]'>
											<span className='text-[10px] italic text-gray-500 text-shadow-custom_01'>
												last seen
											</span>
											<span className='relative bottom-[3px] px-[1px] leading-[0px] text-gray-500'>
												.
											</span>
											<span className='text-[10px] text-gray-500 text-shadow-custom_01'>3w</span>
										</div> */}
										</div>

										<div className='content_bottom w-full'>
											<div className='text-[10px] flex text-gray-500 text-shadow-custom_01  w-full'>
												<span className='font-medium text-gray-800 mr-1'>
													{sender == _id ? (
														"you: "
													) : (
														<span className='flex '>
															<img src={avatar} className='w-4 h-4 rounded-full' />

															<span className='text-[18px] text-gray-400 mx-1 leading-[18px] '>
																{" "}
																ᐧ{" "}
															</span>
														</span>
													)}
												</span>
												<span className='block max-h-[15px] w-full overflow-hidden italic'>
													{`" ${presentMessage(message)} "`}
												</span>
											</div>
										</div>
									</div>
									<div className=' flex flex-col justify-center items-end mr-2'>
										{unread > 0 && (
											<span
												className='relative block h-full text-[10px] text-white font-[700] inline-block
													rounded-full w-[18px] h-[18px] px-2 py-2 leading-0 bg-green-400 flex items-center justify-center'
											>
												{unread}
											</span>
										)}

										<span className='text-[9px] text-center font-medium text-gray-800 mt-1'>
											{formatDate(createdAt, "MMM-DD").toLocaleLowerCase()}
										</span>
									</div>
								</motion.div>
							</div>
						);
					}
				})}
		</div>
	);
};
