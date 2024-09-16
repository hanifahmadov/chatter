/* npm packages */
import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

/* helpers */
import { ImagePreview } from "./ImagePreview";
import { UploadImageButton } from "./UploadImageButton";
import { Fontawesome } from "../store/fontawesome/Fontawesome";

export const Send = ({ text, setText, image, setImage, handleKeyDown, handleSendMessage, controls }) => {
	const textareaRef = useRef(null);
	const sendButtonRef = useRef(null);

	/* handle textarea value change */
	const handleTextChange = (event) => {
		setText(event.target.value);
		adjustTextareaHeight();
	};

	/* auto adjust the height of textarea */
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
		<div
			className='bg-white min-h-[4rem] p-2 absolute bottom-0 left-0 right-0
						rounded-br-[25px] rounded-bl-[25px] rounded-tr-[3px] rounded-tl-[3px]
						
						'
		>
			<div className='bg-white flex flex-row items-end justify-center w-full  p-1 '>
				<UploadImageButton setImage={setImage} />

				<div
					tabIndex='0'
					onClick={() => textareaRef.current.focus()}
					className='textare_parent bg-white py-[0.5rem] px-2 mx-1
                                flex flex-col flex-grow justify-center items-center 
                                rounded-[20px] border-[1px] border-gray-300

                                '
				>
					{image && <ImagePreview image={image} setImage={setImage} />}

					<textarea
						className={`textarea w-full h-[0rem] leading-[16px] max-h-[6rem] border-0 
                                    overflow-auto outline-none shadow-none 
                                    resize-none px-1 py-0 
									text-[14px] font-sans text-black
                                    bg-transparent 
									placeholder:px-1 placeholder:font-[300] placeholder:font-sans placeholder:text-gray-300

                                    `}
						ref={textareaRef}
						value={text}
						onChange={handleTextChange}
						placeholder='Whats up...'
						rows={1}
						// onKeyDown={handleKeyDown}
					/>
				</div>

				<motion.div
					whileTap={{ scale: 1.075 }}
					animate={controls}
					ref={sendButtonRef}
					onClick={handleSendMessage}
					className={`rounded-full min-w-[32px] min-h-[32px] 
                                flex flex-row-1 justify-center items-center
								bg-white
                                ${text.length || image ? "cursor-pointer" : "pointer-events-none opacity-20"}

                                `}
				>
					<span
						className={` blockk text-white  bg-slate-900 
									rounded-full min-w-[24px] min-h-[24px] 
									flex flex-row-1 justify-center items-center
									`}
					>
						<Fontawesome type={"faArrowUp"} fontSize={"1.1rem"} />
					</span>
				</motion.div>
			</div>
		</div>
	);
};
