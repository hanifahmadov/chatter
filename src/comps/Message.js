/* npm packages */
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
const scrollIntoView = require("scroll-into-view");

/* states */

/* helpers */
import { formatDate, formatTime } from "../store/days/days";
import { mark_asRead } from "../apis/messagesCall";
import { groupedByIdUMCDefault } from "../store/states/app_state";

export const Message = ({ signedUser: { _id, accessToken }, messages, currRecipient, setUnreadCountUpdated }) => {
	/* last div element ref */
	const lastMessageRef = useRef();

	/* prev messages length */

	/*  curr recipient */

	/* local states */
	const [groupedByDate, setGroupedByDate] = useState({});
	const [groupedByIdUMC] = useRecoilState(groupedByIdUMCDefault);

	const groupedByOwner = (array) => {
		/**
		 * 	grouping the same messages
		 * 	sending at the same time, like below
		 * 	A: [{owner}, {owner}, {owner}]
		 * 	B: [{recipient}, {recipient}]
		 * 	C: [{owner}]
		 *
		 * 	builder is like [a, b, c, ....]
		 */

		/* if there is only a message  return it */
		if (array.length == 1) return [array];

		let builder = [];
		let temp = [];

		/* looper */
		array.forEach((msg, index) => {
			if (temp.length == 0) {
				temp.push(msg);
			} else {
				if (temp[0].sender._id == msg.sender._id) {
					temp.push(msg);
				} else {
					builder.push(temp);
					temp = [];
					temp.push(msg);
				}
			}
		});

		builder.push(temp);
		return builder;
	};

	/** get valid messages
	 * 	messages thats between
	 * 	current user and current recipient
	 */
	const validMessages = (messages) => {
		const temp = messages.filter(
			(mess, index) =>
				(mess.sender._id == _id && mess.recipient._id == currRecipient._id) ||
				(mess.sender._id == currRecipient._id && mess.recipient._id == _id)
		);

		// Sort the messages by their createdAt field
		return temp.sort((a, b) => {
			// Return the result of the comparison
			return new Date(a.createdAt) - new Date(b.createdAt);
		});
	};

	useEffect(() => {
		const localdb = {};
		const filteredMessages = validMessages(messages);

		console.log("filtered messages", filteredMessages);

		// console.log("filtered messsages", filteredMessages);

		for (const message of filteredMessages) {
			/** get the message sent date  */
			let tempdate = formatDate(message.createdAt);

			if (!localdb[tempdate]) {
				localdb[tempdate] = [message];
			} else {
				localdb[tempdate].push(message);
			}
		}

		console.log("localdb", localdb);
		setGroupedByDate(localdb);

		console.log("groupedByIdUMC", groupedByIdUMC);

		/* mark messages as read */
		mark_asRead(accessToken, currRecipient._id).then((result) => {
			// setUnreadCountUpdated((prev) => !prev);
			if (result == 0) return;

			setUnreadCountUpdated((prev) => !prev);
		});
	}, [messages]);

	/** auto scrool to the last element */
	useEffect(() => {
		scrollIntoView(lastMessageRef.current, {
			time: 300,
		});
	}, [groupedByDate]);

	return (
		<div
			className='message_container w-full h-full 
						flex flex-col justify-start overflow-scroll scrollbar-none 
						px-1 bg-slate-100
						
						'
		>
			{/* {console.log("grouped by date", groupedByDate)} */}

			{Object.keys(groupedByDate).map((date, index) => {
				const built = groupedByOwner(groupedByDate[date]);

				console.log("builder", built);
				return (
					<div
						key={index}
						className='message
	                    flex flex-col w-full
	                    '
					>
						<div
							className='message-date
	                        flex flex-col justify-center items-center
	                        sticky top-2
	                        '
						>
							<span
								className='text-[10px] px-3 py-[2px]
	                            			rounded-full 
											text-black font-sans  bg-white 
											border-[0.5px] border-gray-100

	                            '
							>
								{date}
							</span>
						</div>

						<div
							className='message-content
	                        			w-full 
	                        			flex gap-5 flex-col

	                        			'
						>
							{built.map((msg, index) => {
								const owner = msg[0].sender._id == _id;

								return (
									/**
									 * 	this div is parent of messages
									 * 	like [{owner owner owner}], or [{recipient}, {recipient}]
									 * 	so this can where the messages will aligns depends on owner
									 * 	cant make height full
									 */
									<div
										key={index}
										className={`message-content-parent 
													w-full 
													flex gap-[1px] flex-col ${owner ? "items-end" : "items-start"}
													
													`}
									>
										{msg.map((m, index) => (
											<div
												key={index}
												className={`msg_content_and_date w-fit max-w-[18rem] break-words
															flex flex-col
															px-4 py-[3px]
															rounded-3xl 
															text-gray-700 
															border-[0.5px] border-gray-200
															${owner ? " rounded-br-none" : "rounded-tl-none"}
															${owner ? "bg-blue-100" : "bg-white"}
															${index == msg.length - 1 && "animate-in slide-in-from-bottom"}

															`}
											>
												<div
													className='text-[14px] text-black 
																font-sans font-[300] 
																leading-[18px] 
																'
												>
													{m.message ? (
														m.message
													) : (
														<span
															className='text-[10px] inline-block 
																		italic text-gray-500 
																		font-[300] font-sans
																		'
														>
															attached photo
														</span>
													)}
												</div>
												<span
													className={`text-[9px] font-sans font-[300] 
															${owner ? "self-end" : "self-start"} 
															text-gray-500 text-end
															`}
												>
													{formatTime(m.createdAt)}
												</span>
											</div>
										))}
									</div>
								);
							})}
						</div>
						<div ref={lastMessageRef} className='lastmessage bg-none h-5 w-full' />
					</div>
				);
			})}
		</div>
	);
};
