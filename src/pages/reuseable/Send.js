/* npm packages */
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import OutsideClickHandler from "react-outside-click-handler";
import { motion, useAnimation } from "framer-motion";
import FormData from "form-data";
const scrollIntoView = require("scroll-into-view");

/* helpers */
import { UploadImageButton } from "./UploadImageButton";
import { ImagePreview } from "./ImagePreview";

export const Send = ({ text, setText, image, setImage, handleKeyDown, handleSendMessage }) => {
	const controls = useAnimation();
	const textareaRef = useRef(null);
	const sendButtonRef = useRef(null);

	const handleTextChange = (event) => {
		setText(event.target.value);
		adjustTextareaHeight();
	};

	const adjustTextareaHeight = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			/*  Set height to scrollHeight */
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	};

	/**
	 * when textarea value text changes,
	 * this arrange the height of textarea
	 * */
	useEffect(() => {
		adjustTextareaHeight();
	}, [text]);

	return (
		<div className="bg-white min-h-[4rem] p-2 absolute bottom-0 left-0 right-0
						rounded-br-[25px] rounded-bl-[25px] rounded-tr-[3px] rounded-tl-[3px]
						
						">
			<div className='bg-white flex flex-row w-full  p-1 '>
				<UploadImageButton setImage={setImage} />

				<div
					tabIndex='0'
					className='textare_parent bg-white py-[0.45rem] px-2 mx-2
                                                flex flex-col flex-grow justify-center items-center 
                                                rounded-[20px]  border-[1px] border-blue-100
                                                '
				>
					{image && <ImagePreview image={image} setImage={setImage} />}

					<textarea
						className={`textarea w-full h-[1rem] leading-[18px] max-h-[6rem] border-0 
                                                    overflow-auto outline-none shadow-none 
                                                    resize-none px-3 py-0 text-[.95rem] text-shadow-custom_01
                                                    bg-transparent text-black placeholder:px-1  placeholder:text-shadow-custom_005
                                                    `}
						ref={textareaRef}
						value={text}
						onChange={handleTextChange}
						placeholder='Whats up...'
						rows={1}
						onKeyDown={handleKeyDown}
					/>
				</div>

				<motion.div
					whileTap={{ scale: 1.075 }}
					animate={controls}
					ref={sendButtonRef}
					onClick={handleSendMessage}
					className={`rounded-full min-w-[34px] min-h-[34px] 
                                                flex flex-row-1 justify-center items-center
                                                bg-white border-[1px] border-blue-100 hover:ring-[1px]
                                                ${text.length || image ? "cursor-pointer" : "pointer-events-none"}
                                                `}
				>
					<span
						className={` ${text.length || image ? "text-blue-600" : "text-blue-200"}  text-[18px] pl-[3px]`}
					>
						➤
					</span>
				</motion.div>
			</div>
		</div>
	);
};
