<div
	className='phone h-[100svh] w-[100svw] bg-white 
							rounded-[30px]
							flex flex-col justify-between overflow-hidden
							shadow-custom_07  border-[3px] border-white
							'
>
	<div className='body h-full w-full bg-slate-100'>{activelink == 1 && <Users users={users} />}</div>

	<div
		className='footer h-[5.5rem] w-full bg-slate-800 
								rounded-tr-[5px] rounded-tl-[5px]
								shadow-custom_03
								'
	>
		<div
			className='navbar h-full w-full
									flex justify-evenly items-center
									'
		>
			<div
				onClick={() => setActivelink(1)}
				className={` users w-[40px] h-[40px] 
										flex justify-center items-center	
										text-[20px] text-white
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
										text-[20px]  text-white
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
										text-[20px] text-white bg-blue-500
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
										text-[20px]  text-white
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
										text-[20px]  text-white
										overflow-hidden rounded-full cursor-pointer
										hover:text-blue-500
									`}
			>
				<span className='pointer-events-none'>
					<Fontawesome type={"faGear"} />
				</span>
			</div>
		</div>
	</div>
</div>;
