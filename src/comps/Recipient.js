import React from "react";

/* img */
import backArrow from "../store/image/back-arrow.png";

/* helpers */
import { Fontawesome } from "../store/fontawesome/Fontawesome";
import { formatDate, formatTime, formatTimeago } from "../store/days/days";

export const Recipient = ({
	currRecipient: { avatar, username, lastseen, online },
	setActivelink,
	prevActivelink,
	setMessages,
	setImage,
	setText,
}) => {
	const handBackClick = () => {
		// setMessages([])
		setActivelink(prevActivelink);
		setImage(undefined);
		setText("");
	};
	return (
		<div className='w-full h-full flex gap-2 justify-start items-center px-6'>
			<div
				onClick={handBackClick}
				className='text-[20px] text-gray-600 
							font-[100] cursor-pointer 
							rounded-full p-[1px]
							
							'
			>
				<span className=''>
					{/* <Fontawesome type={"faAngleLeft"} /> */}
					<img src={backArrow} className='w-[20px] h-[20px]' />
				</span>
			</div>
			<div className='avatar overflow-hidden ml-1'>
				<img
					src={avatar}
					className='h-[45px] w-[45px] 
                                border-[2px] border-solid 
                                border-white object-cover p-[0px]
                                rounded-full
                                '
				/>
			</div>

			<div
				className='username flex flex-col justify-start leading-[18px]

							'
			>
				<span className='w-full text-[16px]'>
					{username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()}
				</span>

				{online ? (
					<span className=' w-full text-[12px] text-green-500'>Online</span>
				) : (
					<div
						className='block text-gray-600 text-shadow-none
								  flex flex-col pt-[1px] leading-[12px]'
					>
						{/* <span className='today text-[10px]'>{formatDate(lastseen, 'YYYY.MMM.DD')}</span> */}
						{/* <span className='clock text-[10px]'>{formatTime(lastseen, "hh:mm A")}</span> */}
						<span className='clock text-[10px]'>{formatTimeago(lastseen)}</span>
					</div>
				)}
			</div>
		</div>
	);
};
