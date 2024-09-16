/* npm packages */
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
const scrollIntoView = require("scroll-into-view");

/* states */

/* helpers */
import { formatDate, formatTime } from "../store/days/days";
import { mark_asRead } from "../apis/messagesCall";
import { currTimeoutIdDefault, groupedByIdUMCDefault } from "../store/states/app_state";

export const Message = ({
	signedUser: { _id, accessToken },
	messages,
	currRecipient,
	setUnreadCountUpdated,
	setMessageLoading,
}) => {
	/* last div element ref */
	const lastMessageRef = useRef();

	/* prev messages length */

	/*  curr recipient */

	/* track timeout id */
	const [currTimeoutId, setCurrTimeoutId] = useRecoilState(currTimeoutIdDefault);

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
			if (result == 0) return;
			setUnreadCountUpdated((prev) => !prev);
		});

		/* deactivate loading anime */
		clearTimeout(currTimeoutId);
		const timeoutId = setTimeout(() => {
			setMessageLoading(false);
		}, 2200);

		setCurrTimeoutId(timeoutId);
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
						px-1 bg-white py-1
						
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
	                        sticky top-0 mb-[3px] 
	                        '
						>
							<span
								className='text-[10px] px-3 py-[2px]
	                            			rounded-full bg-white
											text-black font-sans
											border-[0.5px] border-gray-200

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
													flex gap-[3px] flex-col ${owner ? "items-end" : "items-start"}
													
													`}
									>
										{msg.map((m, index) => (
											<div className={`flex flex-col ${owner ? "items-end" : "items-start"}`}>
												{m.media && (
													<div className='m_media mb-[2px]'>
														<span>
															<img
																src={m.media}
																className='selected_image h-[150px] w-[150px] 
																		rounded-lg border-[1px] border-solid 
																		border-blue-100 object-cover p-[1px]
																		'
															/>
														</span>
													</div>
												)}

												<div
													key={index}
													className={`msg_content_and_date w-fit max-w-[18rem] break-words
															flex flex-col
															px-4 pt-[3px] pb-[2px]
															rounded-3xl 
															text-black
															border-[0.5px] border-gray-200
															${owner ? " rounded-br-none" : "rounded-tl-none"}
															${owner ? "bg-blue-50" : "bg-slate-50"}
															${index == msg.length - 1 && "animate-in slide-in-from-bottom"}

															`}
												>
													<div className='text-[14px] leading-[18px]'>
														{m.message ? (
															m.message
														) : (
															<span className='text-[12px] inline-block italic text-gray-500 '>
																attached photo ⬆
															</span>
														)}
													</div>
													<span
														className={`text-[9px] font-sans
															${owner ? "self-end" : "self-start"} 
															text-gray-500 text-end mt-[0px]
															`}
													>
														{formatTime(m.createdAt)}
													</span>
												</div>
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
