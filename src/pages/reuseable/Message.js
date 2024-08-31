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

export const Message = ({ signedUserId, avatar, date, talks, talks: {} }) => {
	console.log("talks talks talks", talks);

	/* basics */
	const lastMessageRef = useRef(null);

	const previousMessagesLength = useRef(talks.length);

	/**
	 *  smooth auto scroll
	 * 	to last message
	 * 	when added
	 */

	/* don not scroll every time on comp unmount or refresh */
	useLayoutEffect(() => {
		// On initial render, scroll to the last message without animation
		if (lastMessageRef.current) {
			scrollIntoView(lastMessageRef.current, {
				time: 1,
				cancellable: false,
			});
		}
	}, []);

	/* scroll only a new message added */
	useEffect(() => {
		// Scroll to the last message only when a new message is added
		if (previousMessagesLength.current < talks.length) {
			if (lastMessageRef.current) {
				scrollIntoView(lastMessageRef.current, {
					time: 1000,
					cancellable: false,
				});
			}

			previousMessagesLength.current = talks.length;
		}
	}, [talks]);

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
				{talks.map((msg, index) => {
					const isOwner = msg.sender === signedUserId;
					const lastmessage = talks.length - 1;

					return (
						<div
							key={index}
							ref={index == lastmessage ? lastMessageRef : null}
							className={
								isOwner
									? `w-fit  max-w-[25rem] flex max-w-[70vw] flex-col self-end items-end ${index ==lastmessage && 'mt-3'}`
									: `w-fit  max-w-[25rem] flex max-w-[70vw] flex-col self-start items-start`
							}
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
									text-[13px] text-gray-700 flex flex-col ${isOwner ? "items-end" : "items-start"}
									${isOwner ? "rounded-br-none" : "rounded-bl-none"}
									${index === lastmessage && "animate-in slide-in-from-bottom"}
									`}
							>
								<span className='leading-[18px]'>{msg.message ? msg.message : "photo"}</span>
								<span className='text-[8px] text-shadow-custom_02 text-gray-500 text-end'>
									{formatTime(msg.createdAt)}
								</span>
							</div>
						</div>
					);
				})}

				{/* <div className='flex justify-end items-end hidden'>
					<img
						src={avatar}
						className='selected_image h-[16px] w-[16px] 
                                    rounded-full border-[1px] border-solid 
                                    border-blue-100 object-cover p-[1px]
                                    text-shadow-custom_02 
                
                                    '
					/>
				</div> */}
			</div>
		</div>
	);
};
