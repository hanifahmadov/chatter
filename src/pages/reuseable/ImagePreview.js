import React from "react";

/* helper */
import { Fontawesome } from "../../store/fontawesome/Fontawesome";

export const ImagePreview = ({ image, setImage }) => {
	return (
		<div className='image_preview flex w-full justify-start items-start py-1 px-2 relative bottom-[7px] right-[0px]'>
			<img
				src={URL.createObjectURL(image)}
				className='selected_image h-[50px] w-[50px] 
                            rounded-lg border-[2px] border-solid 
                            border-white object-cover p-[1px]
                            text-shadow-custom_02'
			/>
			<span
				onClick={() => setImage(null)}
				className='faCircleXmark relative right-[12px] bottom-[2px] 
                            bg-white leading-[0px] rounded-full                                                            
                            '
			>
				<Fontawesome type={"faCircleXmark"} color={"red"} />
			</span>
		</div>
	);
};
