import React from "react";

/* img */
import backArrow from "../store/image/back-arrow.png";

/* helpers */
import { Fontawesome } from "../store/fontawesome/Fontawesome";
import { formatDate, formatTime } from "../store/days/days";

export const Recipient = ({
	currRecipient: { avatar, username, lastseen, online },
	setActivelink,
	prevActivelink,
	setMessages,
}) => {
	const handBackClick = () => {
		// setMessages([])
		setActivelink(prevActivelink);
	};
	return (
		<div className='w-full h-full flex gap-2 justify-start items-center px-6'>
			<div
				onClick={handBackClick}
				className='text-[20px] text-gray-600 
							font-[100] cursor-pointer 
							rounded-full p-[1px]
							
							'>
				<span className=''>
					{/* <Fontawesome type={"faAngleLeft"} /> */}
					<img src={backArrow} className='w-[20px] h-[20px]' />
				</span>
			</div>
			<div className='avatar overflow-hidden ml-1'>
				<img
					src={avatar}
					className='h-[50px] w-[50px] 
								sm:h-[40px] sm:w-[40px]
                                border-[2px] border-solid 
                                border-white object-cover p-[0px]
                                text-shadow-custom_02  rounded-full
                                '
				/>
			</div>

			<div
				className='username flex flex-col justify-start

							'
			>
				<span
					className='text-[18px] sm:text-[16px] block w-full
								text-black  text-shadow-custom_01 font-[500]
								'
				>
					{username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()}
				</span>

				{online ? (
					<span className=' w-full text-[11px] sm:text-[10px]  text-green-500  text-shadow-custom_005 font-[500]'>
						Online
					</span>
				) : (
					<div
						className='block text-gray-400 text-shadow-none
								  flex gap-1 pt-[1px]'
					>
						<span className='today text-[11px] sm:text-[10px]'>{formatDate(lastseen)}</span>

						<span className='clock text-[11px] sm:text-[10px]'>{formatTime(lastseen, "HH:mm")}</span>
					</div>
				)}
			</div>
		</div>
	);
};
