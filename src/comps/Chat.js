import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
import { produce } from "immer";

/* apis */
import { formatDate } from "../store/days/days";

/* states */
import { newConnectionDefault } from "../store/states/socket_states";
import { groupedByIdUMCDefault } from "../store/states/app_state";

export const Chats = ({
	signedUser: { accessToken, _id },
	messages,
	setCurrRecipient,
	setActivelink,
	setPrevActivelink,
	setLoading,
}) => {
	/**
	 * 	socket newConnection global state
	 * 	it holds the ids of online users
	 */

	const [newConnection] = useRecoilState(newConnectionDefault);
	const [groupedByIdUMC, setGroupedByIdUMC] = useRecoilState(groupedByIdUMCDefault);

	/** handle click on user */
	const handleChatClick = (user) => {
		/* activate laoding */
		setLoading(true);

		/* deaactivate loading */
		setTimeout(() => {
			setLoading(false);
		}, 2200);

		/* set currRecipient  */
		setCurrRecipient(user);

		/* active link update  */
		setActivelink(2);

		/* follow prev active link */
		setPrevActivelink(2.2);
	};
	/** sort the message array */
	/* message array come in sorted version from all_message axios call */
	const getLatestMessages = (messages, myId) => {
		const latestMessages = {};

		messages.forEach((msg) => {
			// Determine the other user in the conversation
			const otherUserId = msg.sender._id === myId ? msg.recipient._id : msg.sender._id;

			// If there's no message recorded yet for this user, or the current one is newer, store it
			if (
				!latestMessages[otherUserId] ||
				new Date(msg.createdAt) > new Date(latestMessages[otherUserId].createdAt)
			) {
				latestMessages[otherUserId] = msg;
			}
		});

		// Convert object to array of latest messages
		return Object.values(latestMessages);
	};

	const getUnreadMessageCounts = (messages, myId) => {
		const unreadMessages = {};

		messages.forEach((msg) => {
			// Only count the message if I am the recipient and the message is unread
			if (msg.recipient._id === myId && !msg.isRead) {
				const otherUserId = msg.sender._id; // The other user is the sender if I am the recipient

				// Increment the unread count for this sender
				if (!unreadMessages[otherUserId]) {
					unreadMessages[otherUserId] = 1;
				} else {
					unreadMessages[otherUserId] += 1;
				}
			}
		});

		// Return the object with user IDs and their respective unread message counts
		setGroupedByIdUMC(unreadMessages);
		return unreadMessages;
	};

	const latestMessages = getLatestMessages(messages, _id);

	const unreadMessageCounts = getUnreadMessageCounts(messages, _id);

	console.log("unreadMessageCounts", unreadMessageCounts);

	const presentMessage = (message) => {
		if (message.length == 0) return " image & media attached ";

		if (message.length > 30) {
			return message.slice(0, 30) + " ... ";
		} else {
			return message;
		}
	};

	return (
		<div className={`flex flex-col gap-2 pt-2 px-3 h-full w-full rounded relative bg-slate-50`}>
			{latestMessages.map((mess, index) => {
				const recipient = mess.sender._id !== _id ? mess.sender : mess.recipient;

				console.log("recipient >> recipient >>", recipient);

				if (newConnection.includes(recipient._id)) {
					setCurrRecipient((prev) =>
						produce(prev, (draft) => {
							draft.online = true;
						})
					);
				}

				return (
					<div
						key={index}
						onClick={() => handleChatClick(recipient)}
						className='bg-white rounded-3xl shadow-custom_01  
									group hover:bg-blue-50 overflow-hidden
									ease-in duration-100 
									'
					>
						<motion.div
							className={` user flex flex-row items-center cursor-pointer rounded
                                         px-1 py-1 rounded-full relative pointer-events-none

                                        `}
						>
							<div className='user_avatar_parent '>
								<img
									src={recipient.avatar}
									className={`max-h-[45px] min-h-[45px] max-w-[45px] min-w-[45px] 
												sm:max-h-[40px] sm:max-w-[40px] sm:min-h-[40px] sm:min-w-[40px]
                                                rounded-full border-[1.5px] ${
													recipient.online ? "border-green-500 " : "border-gray-300 "
												}
                                                object-cover p-[1px]
                                                text-shadow-custom_02
                                                `}
								/>
							</div>
							<div className='user_content flex flex-grow flex-col items-start justify-center px-2'>
								<div className='content_top flex w-full justify-start'>
									<span className='text-[16px] font-[400] text-shadow-custom_01 font-sans'>
										{recipient.username.charAt(0).toUpperCase() +
											recipient.username.slice(1).toLowerCase()}
									</span>

									<div
										className='ml-2 
													flex items-center justify-center
													text-[11px] font-[400] 
													text-shadow-custom_01 font-sans
													'
									>
										{recipient.online ? (
											<span className='text-green-500'>online now</span>
										) : (
											<span>hassiktir</span>
										)}
									</div>
								</div>

								<div className='content_bottom w-full'>
									<div className='text-[12px] flex text-gray-500 text-shadow-custom_01  w-full'>
										<span
											className='font-medium text-gray-800 mr-1 max-h-[15px] 
														flex justify-start items-center
														 text-[14px] sm:text-[11px]
																'
										>
											{mess.sender._id == _id ? (
												"you: "
											) : (
												<span className='flex justify-center items-center'>
													<img src={recipient.avatar} className='w-3 h-3 rounded-full' />

													<span className='text-[18px] text-gray-400 mx-[2px] leading-[18px] '></span>
												</span>
											)}
										</span>
										<span className='block max-h-[15px]  text-[14px] sm:text-[11px] w-full overflow-hidden italic flex justify-start items-center'>
											{`" ${presentMessage(mess.message)} "`}
										</span>
									</div>
								</div>
							</div>
							<div
								className=' flex flex-col justify-center items-center 
											absolute right-0 px-1 h-full rounded-md min-w-[60px] pr-2
											bg-transparent bg-opacity-70  text-gray-700 text-shadow-custom_02

											'
							>
								{unreadMessageCounts[recipient._id] && (
									<span
										className='relative block h-full text-[10px] text-white font-[700] inline-block
													rounded-full min-w-[18px] max-h-[18px] leading-0 bg-green-400 flex items-center justify-center'
									>
										{unreadMessageCounts[recipient._id]}
									</span>
								)}

								{/* <span className='text-[12px] sm:text-[10px] font-[500] text-center font-medium text-gray-800'>
									{formatDate(mess.createdAt, "MMM-DD").toLocaleLowerCase()}
								</span> */}
							</div>
						</motion.div>
					</div>
				);
			})}
		</div>
	);
};
