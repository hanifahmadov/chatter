import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";

/* states */
import { on_messages_state } from "../store/states/socket_state";

/* apis */
import { all_messages, lastunread_messages } from "../apis/messageCalls";
import { formatDate } from "../store/days/days";

export const Chats = ({
	signedUser: { accessToken, _id },
	setLoading,
	setCustomnav,
	users,
	setCurrRecipient,
	setActivelink,
}) => {
	const [on_messages] = useRecoilState(on_messages_state);

	console.log(_id);

	const handleChatClick = (user) => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 1500);

		setCurrRecipient(user);
		setActivelink(2);
		setCustomnav(2.2);
	};

	/* call all-messages*/
	useEffect(() => {
		// all_messages(accessToken).then((result) => {
		// 	console.log("result", result);
		// });
	}, [on_messages]);

	const [tracker, setTracker] = useState({});
	useEffect(() => {
		if (users.length > 0) {
			users.map((user) => {
				lastunread_messages(accessToken, user._id).then((res) => {
					setTracker((prevTracker) => ({
						...prevTracker,
						[user._id]: res, // Update the tracker with new user data
					}));
				});
			});
		}
	}, []); // Include dependencies if necessary
	return (
		<div className='flex flex-col gap-2 pt-2 '>
			{users.length > 0 &&
				users.map((user, index) => {
					const { avatar, username } = user;

					console.log("tracker", tracker);

					return (
						<div key={index} className='pr-2 bg-white rounded-3xl'>
							<motion.div
								onClick={() => handleChatClick(user)}
								className={`
                                            user flex cursor-pointer rounded
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
									<div className='content_top flex w-fit justify-between'>
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
									<div className='content_bottom'>
										<div className='text-[10px] flex italic text-gray-500 text-shadow-custom_01'>
											<span>{formatDate(tracker[user._id]?.lastMessage.createdAt, "MMM-DD")}</span>
											<span className='px-1'>:</span>
											<span className="inline-block max-h-[30px]">
												{tracker[user._id]?.lastMessage.message
													? tracker[user._id].lastMessage.message.slice(0, 25)  +  ' ...'
													: "image & media ..."}
											</span>
										</div>
									</div>
								</div>
								<div className={`${tracker[user._id]?.unread > 0 ? "flex" : 'hidden'}  justtify-center items-center w-[25px] mr-1`}>
									<span
										className='text-[10px] text-white font-[700] inline-block
													rounded-full w-[20px] h-[20px] px-3 py-3 leading-0 bg-green-400 flex items-center justify-center
													'
									>
										{tracker[user._id]?.unread}
									</span>
								</div>
							</motion.div>
						</div>
					);
				})}
		</div>
	);
};
