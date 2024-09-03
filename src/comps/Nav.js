import React from "react";
import { Fontawesome } from "../store/fontawesome/Fontawesome";

export const Nav = ({ setActivelink }) => {
	return (
		<div
			className='navbar h-full w-full
									flex justify-evenly items-center
									'
		>
			<div
				onClick={() => setActivelink(1)}
				className={` users w-[40px] h-[40px] 
										flex justify-center items-center	
										text-[18px] text-gray-600
										overflow-hidden rounded-full cursor-pointer
										hover:text-blue-500
									`}
			>
				<span className='pointer-events-none'>
					<Fontawesome type={"faGlobe"} />
				</span>
			</div>
			<div
				onClick={() => setActivelink(2)}
				className={` comments w-[40px] h-[40px] 
										flex justify-center items-center	
										text-[18px]  text-gray-600
										overflow-hidden rounded-full cursor-pointer
										hover:text-blue-500
									`}
			>
				<span className='pointer-events-none'>
					<Fontawesome type={"faComments"} />
				</span>
			</div>
			<div
				onClick={() => setActivelink(3)}
				className={` send w-[40px] h-[40px] 
										flex justify-center items-center	
										text-[18px] text-white bg-blue-500
										overflow-hidden rounded-full cursor-pointer
										`}
			>
				<span className='pointer-events-none'>
					<Fontawesome type={"faPlus"} />
				</span>
			</div>
			<div
				onClick={() => setActivelink(4)}
				className={` phone w-[40px] h-[40px] 
										flex justify-center items-center	
										text-[18px]  text-gray-600
										overflow-hidden rounded-full cursor-pointer
										hover:text-blue-500
									`}
			>
				<span className='pointer-events-none'>
					<Fontawesome type={"faPhone"} />
				</span>
			</div>
			<div
				onClick={() => setActivelink(5)}
				className={` settings w-[40px] h-[40px] 
										flex justify-center items-center	
										text-[18px]  text-gray-600
										overflow-hidden rounded-full cursor-pointer
										hover:text-blue-500
									`}
			>
				<span className='pointer-events-none'>
					<Fontawesome type={"faGear"} />
				</span>
			</div>
		</div>
	);
};
