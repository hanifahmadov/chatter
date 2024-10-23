/* npm packages */
import React, { useRef } from "react";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";

/* images */
import uploadImages from "../store/image/image-2.svg";

/* helper */
import { Fontawesome } from "../store/fontawesome/Fontawesome";

/* defaults */
import { errorContentDefault, signsErrorDefault } from "../store/states/app_state";

/* Main Functional Component */
export const UploadImageButton = ({ setImage }) => {
	/* refs */
	const imageRef = useRef(null);
	/* tracking the setTimeout Ids on signin_api error catch */
	const timeout = useRef(0);

	/* states */
	const [signsError, setSignsError] = useRecoilState(signsErrorDefault);
	const [errorContent, setErrorContent] = useRecoilState(errorContentDefault);

	/* upload image */
	const handleMessageImageChange = () => {
		const [file] = imageRef.current?.files;
		if (file) {
			// Get the file extension in lowercase
			const fileExtension = file.name.split(".").pop().toLowerCase();

			// allowed extensions
			const allowedExtensions = ["png", "jpeg", "jpg", "avif", "webp"];

			// Check if the file extension is allowed
			if (!allowedExtensions.includes(fileExtension)) {
				/* clear the current set-timeouts */
				clearTimeout(timeout.current);

				/** error toaster
				 *  content of error
				 */
				setErrorContent({
					text1: "Please select a valid image file",
					text2: " [ png, jpeg, jpg, avif, webp ] ",
				});

				/* display error */
				setSignsError(true);

				/* remove error after 5s automatically */
				timeout.current = setTimeout(() => {
					setSignsError(false);
					setErrorContent({ text1: "", text2: "" });
					timeout.current = 0;
				}, 5000);
			} else {
				// set the image
				setImage(file);

				// Clear the input value to allow the same image to be selected again
				imageRef.current.value = null;
			}
		}
	};

	return (
		<>
			<input
				type='file'
				id='image'
				name='image'
				className='hidden'
				ref={imageRef}
				accept='image/png, image/jpeg, image/jpg, image/avif, image/webp  '
				onChange={handleMessageImageChange}
			/>
			<motion.label
				whileTap={{ scale: 1.05 }}
				htmlFor='image'
				className='rounded-full min-w-[34px] min-h-[34px] bg-transparent
                            flex flex-row-1 justify-center items-center
                            label_avatar cursor-pointer text-[12px]
							
                        '
			>
				<span className='text-blue-300'>
					<img src={uploadImages} className='w-[22px] h-[22px]' />
				</span>
			</motion.label>
		</>
	);
};
