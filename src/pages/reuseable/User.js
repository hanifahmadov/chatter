/* npm packages */
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import OutsideClickHandler from "react-outside-click-handler";
import { motion, useAnimation } from "framer-motion";
import FormData from "form-data";
const scrollIntoView = require("scroll-into-view");

/* apis */

/* states */

/*  */

/* helpers */

export const User = ({ currRecipient, setCurrRecipient, user, user: { avatar, username, _id } }) => {
	return (
		<div className="px-2">
			<motion.div
				onClick={() => setCurrRecipient(user)}
				className={`
                user flex cursor-pointer rounded
                px-1 py-1 hover:bg-blue-50 
                ${currRecipient._id == _id ? "bg-blue-100 hover:bg-blue-100" : "bg-gray-50"}
                `}
			>
				<div className='user_avatar_parent'>
					<img
						src={avatar}
						className='h-[42px] w-[42px] 
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

						<div className='flex items-center justify-center leading-[0px]'>
							<span className='text-[10px] italic text-gray-500 text-shadow-custom_01'>seen</span>
							<span className='relative bottom-[3px] px-[1px] leading-[0px] text-gray-500'>.</span>
							<span className='text-[10px] text-gray-500 text-shadow-custom_01'>3w</span>
						</div>
					</div>
					<div className='content_bottom'>
						<div className='text-[10px] italic text-gray-500 text-shadow-custom_01'>
							No message history yet
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	);
};
