/* npm packages */
import React, { useRef } from "react";
import { motion } from "framer-motion";

/* images */
import uploadImages from "../store/image/image-2.svg";

/* helper */
import { Fontawesome } from "../store/fontawesome/Fontawesome";

export const UploadImageButton = ({ setImage }) => {
	/* refs */
	const imageRef = useRef(null);

	/* upload image */
	const handleMessageImageChange = () => {
		const [file] = imageRef.current?.files;
		if (file) {
			setImage(file);
			// Clear the input value to allow the same image to be selected again
			imageRef.current.value = null;
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
				<span className="text-blue-300">
					<img src={uploadImages} className='w-[22px] h-[22px]' />
				</span>
			</motion.label>
		</>
	);
};
