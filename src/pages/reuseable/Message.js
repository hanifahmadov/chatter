/* npm packages */
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import OutsideClickHandler from "react-outside-click-handler";
import { motion, useAnimation } from "framer-motion";
import FormData from "form-data";
const scrollIntoView = require("scroll-into-view");
import { animate } from "popmotion";

/* g-states */
import { animateDefault } from "../../store/states/app_state";

/* helpers */
import { formatDate, formatTime, generateRandomDate } from "../../store/days/days";
import { on_messages_state } from "../../store/states/socket_state";
import { currentRecipientState } from "../../store/states/user_state";

export const Message = ({ signedUserId, avatar, date, talks, talks: {} }) => {
	/* basics */
	const lastMessageRef = useRef();
	const previousMessagesLength = useRef(talks.length);
	const [updatedTallks, setUpdatedTalks] = useState([]);
	const [on_messages] = useRecoilState(on_messages_state);
	const [initiateScroll, setInitiateScroll] = useState(false);

	useLayoutEffect(() => {
		let builder = [];
		let temp = [];

		/**
		 * 	grouping the same messages
		 * 	sending at the same time, like below
		 * 	A: [{owner}, {owner}, {owner}]
		 * 	B: [{recipient}, {recipient}]
		 * 	C: [{owner}]
		 *
		 * 	builder is like [a, b, c, ....]
		 */

		talks.forEach((talk, index) => {
			if (temp.length == 0) {
				temp.push(talk);
			} else {
				if (temp[0].sender == talk.sender) {
					temp.push(talk);
				} else {
					builder.push(temp);
					temp = [];
					temp.push(talk);
				}
			}
		});

		// console.log("builder, builder", builder.length);
		builder.push(temp);
		setUpdatedTalks(builder);
	}, [talks]);

	// useLayoutEffect(() => {
	// 	if (!initiateScroll) {
	// 		scrollIntoView(lastMessageRef.current, {
	// 			time: 1,
	// 		});
	// 	}
	// }, [updatedTallks]);

	useEffect(() => {
		scrollIntoView(lastMessageRef.current, {
			time: 1000,
		});
	}, [updatedTallks]);

	return (
		<div className='message flex flex-col w-full'>
			<div className='date flex flex-col justify-center items-center sticky top-0'>
				<span
					className='bg-blue-50 text-[10px] px-3 py-[2px] my-1
                        rounded-full text-shadow-custom_01
                        text-gray-600 font-medium
                        
                        '
				>
					{date}
				</span>
			</div>

			<div className='flex gap-[1.5px] flex-col w-full'>
				{updatedTallks.length > 0 &&
					updatedTallks.map((msgs, index) => {
						const owner = msgs[0].sender == signedUserId;
						return (
							<div
								key={index}
								className={`w-full my-[8px]
											flex gap-[2px] flex-col
											${owner ? "items-end" : "items-start"}
											`}
							>
								{/* LOOOOOP */}
								{msgs.map((msg, index) => (
									<div
										key={index}
										className={`w-fit max-w-[25rem] 
													flex flex-col 
													${owner ? "items-end" : "items-start"}
													`}
									>
										{msg.media && (
											<div className='msg media'>
												<span>
													<img
														src={msg.media}
														className='selected_image h-[150px] w-[150px] 
																		rounded-lg border-[1px] border-solid 
																		border-blue-100 object-cover p-[1px]
																		'
													/>
												</span>
											</div>
										)}
										<div
											className={`msg_content_and date bg-blue-100 w-fit px-5 py-[2px]
															rounded-full text-shadow-custom_02 
															text-[13px] text-gray-700 flex flex-col
															${owner ? "items-end rounded-br-none" : "items-start rounded-bl-none"}
															${index === msgs.length - 1 && "animate-in slide-in-from-bottom"}

															`}
										>
											<span className='leading-[18px]'>
												{msg.message ? (
													msg.message
												) : (
													<span className='text-[10px] italic text-gray-500 font-medium'>
														attached photo
													</span>
												)}
											</span>
											<span className='text-[8px] text-shadow-custom_02 text-gray-500 text-end'>
												{formatTime(msg.createdAt)}
											</span>
										</div>
									</div>
								))}
							</div>
						);
					})}

				<div ref={lastMessageRef} className='lastmessahe bg-none h-5 w-full' />
			</div>
		</div>
	);
};