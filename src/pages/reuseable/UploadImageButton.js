/* npm packages */
import React, { useRef } from "react";
import { motion } from "framer-motion";

/* helper */
import { Fontawesome } from "../../store/fontawesome/Fontawesome";

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
				className='rounded-full min-w-[34px] min-h-[34px] bg-white
                                                 flex flex-row-1 justify-center items-center
                                                 label_avatar cursor-pointer text-slate-600 text-[12px]
                                                 hover:ring-[1px] border-[2px] border-blue-100
                                                '
			>
				<Fontawesome type={"faImage"} />
			</motion.label>
		</>
	);
};
