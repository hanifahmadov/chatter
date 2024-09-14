import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
import { produce } from "immer";

/* apis */
import { formatDate, formatTime } from "../store/days/days";

/* states */
import { newConnectionDefault } from "../store/states/socket_states";
import { currTimeoutIdDefault, groupedByIdUMCDefault } from "../store/states/app_state";

export const Chats = ({
	signedUser: { accessToken, _id },
	messages,
	users,
	setCurrRecipient,
	setActivelink,
	setPrevActivelink,
	setChatsLoading,
	setMessageLoading,
}) => {
	/**
	 * 	socket newConnection global state
	 * 	it holds the ids of online users
	 */

	const [newConnection] = useRecoilState(newConnectionDefault);
	const [groupedByIdUMC, setGroupedByIdUMC] = useRecoilState(groupedByIdUMCDefault);

	/* track timeout id */
	const [currTimeoutId, setCurrTimeoutId] = useRecoilState(currTimeoutIdDefault);

	/** handle click on user */
	const handleChatClick = (user) => {
		/* activate laoding */
		setMessageLoading(true);

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

	/* get the counts of unread messages */
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
		return unreadMessages;
	};

	const latestMessages = getLatestMessages(messages, _id);
	const unreadMessageCounts = getUnreadMessageCounts(messages, _id);

	console.log("unreadMessageCounts", unreadMessageCounts);

	const presentMessage = (message) => {
		if (message.length == 0) return " image & media attached ";

		if (message.length >= 69) {
			return message.slice(0, 69) + " ... ";
		} else {
			return message;
		}
	};

	useEffect(() => {
		const unreadMessages = getUnreadMessageCounts(messages, _id);
		setGroupedByIdUMC(unreadMessages);

		const timeoutId = setTimeout(() => {
			setChatsLoading(false);
		}, 2200);

		/**
		 *  make this id global
		 * 	deactivate this on every other link visit
		 * 	clearTimeout(timeoutId);
		 *
		 */
		setCurrTimeoutId(timeoutId);
	}, [messages]);

	return (
		<div className={`flex flex-col gap-2 pt-2 px-3 h-full w-full rounded relative bg-white`}>
			{console.log("last message", latestMessages)}
			{latestMessages.map((mess, index) => {
				const recipientId = mess.sender._id !== _id ? mess.sender._id : mess.recipient._id;
				const recipient = users.find((user) => user._id == recipientId);

				// if (newConnection.includes(recipient._id)) {
				// 	/* update 'online' status */
				// 	recipient = produce(recipient, (draft) => {
				// 		draft.online = true;
				// 	});
				// }

				return (
					<div
						key={index}
						onClick={() => handleChatClick(recipient)}
						className='bg-white rounded-lg font-sans py-[4px] px-[3px]
									group hover:bg-blue-50
									ease-in duration-100 border-[0.5px]
									'
					>
						<motion.div
							className={` user flex flex-row items-start cursor-pointer rounded
                                         px-1 py-1 rounded-full relative pointer-events-none

                                        `}
						>
							<div className='user_avatar_parent '>
								<img
									src={recipient.avatar}
									className={`max-h-[45px] min-h-[45px] max-w-[45px] min-w-[45px] 
                                                rounded-full border-[1.5px] ${
													recipient.online ? "border-green-500 " : "border-gray-300 "
												}
                                                object-cover p-[2px]
                                                text-shadow-custom_02
                                                `}
								/>
							</div>
							<div className='user_content flex flex-grow flex-col items-start justify-center px-2'>
								<div className='content_top flex w-full justify-start items-center'>
									<span className='text-[16px] font-[400]'>
										{recipient.username.charAt(0).toUpperCase() +
											recipient.username.slice(1).toLowerCase()}
									</span>

									<div
										className='	ml-2
													flex items-center justify-start
													'
									>
										{recipient.online ? (
											<span className='text-green-500'>online</span>
										) : (
											<div className='text-gray-500 text-[12px]'>
												<div className='flex gap-1 justify-end pt-[2px]'>
													<span>{formatTime(recipient.lastseen, "hh:mm a")}</span>
													<span>＠</span>
													<span>{formatDate(recipient.lastseen)}</span>
												</div>
											</div>
										)}
									</div>
								</div>

								<div className='content_bottom w-full'>
									<div className='flex w-full'>
										<span
											className='font-[400] text-gray-800 mr-1
														flex justify-start items-start
														text-[12px]
																'
										>
											{mess.sender._id == _id ? (
												"you: "
											) : (
												<span className='flex justify-center items-center'>
													{/* <img src={recipient.avatar} className='w-3 h-3 rounded-full' /> */}
													{recipient.username}:
												</span>
											)}
										</span>
										<span
											className='block text-[12px] w-full 
														italic flex justify-start items-center
														font-sans font-[300px] text-shadow-none
														text-gray-500 leading-[15px]
														'
										>
											{`${presentMessage(mess.message)}`}
										</span>
									</div>
								</div>
							</div>
							<div
								className=' flex flex-col justify-start items-end 
											absolute right-[-5px] top-[2px] px-1 h-full rounded-md min-w-[60px] pr-2
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
