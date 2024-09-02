<div>
	<div
		className='header 
			min-h-[4.5rem] bg-white
			flex justify-between items-center
			px-[15px] shadow-custom_01 fixed top-0 right-0 left-0 z-10
			'
	>
		<motion.div whileTap={{ scale: 1.2 }} onClick={handleMenuClick} className='menu text-[20px] p-3'>
			<Fontawesome type={"faBars"} />
		</motion.div>

		<div className='title text-[20px] font-medium text-shadow-custom_01'>Chatter</div>

		<motion.div whileTap={{ scale: 1.2 }} className='setting text-[20px] p-3'>
			<Fontawesome type={"faEllipsisVertical"} />
		</motion.div>
	</div>

	<div className='body mt-[4.5rem] fixed right-0 left-0'>
		<motion.div
			initial={{ x: 0, opacity: 1 }}
			animate={controlBodySlide}
			transition={{ delay: 1, duration: 0.75 }}
			className='flex flex-col gap-2 p-2  bg-slate-300  shadow-custom_05 absolute inset-0 z-10 overflow-scroll'
		>
			<div
				className='text-[20px] font-medium text-shadow-custom_01 
					flex justify-center items-center'
			>
				Messages
			</div>
			{users.map((user, index) => {
				const { avatar, username } = user;
				return (
					<motion.div
						key={index}
						whileTap={{ scale: 1.05 }}
						onClick={() => handleUserClick(user)}
						className={`
							flex gap-3 justify-start items-center 
							bg-slate-200 px-2 py-2 rounded-lg 
							
							
							`}
					>
						<div className='avatar h-full w-[5rem]'>
							<img
								src={avatar}
								className='h-[3.5rem] w-[3.5rem] rounded-full object-cover p-[1px] shadow-custom04 border-[2px] border-white'
							/>
						</div>

						<div className='details flex flex-col leading-[18px]'>
							<div className='top-row flex gap-3'>
								<div className='username text-[16px] font-medium text-shadow-custom_01 '>
									{username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()}
								</div>

								<div className='flex items-center justify-center leading-[0px]'>
									<span className='text-[12px] italic text-gray-500 text-shadow-custom_01'>seen</span>
									<span className='relative bottom-[3px] px-[1px] leading-[0px] text-gray-500'>
										.
									</span>
									<span className='text-[12px] text-gray-500 text-shadow-custom_01'>3w</span>
								</div>
							</div>

							<div className='bottom-row leading-[16px] text-gray-600'>
								<div className='text-[12px]'>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, fuga?
								</div>
							</div>
						</div>
					</motion.div>
				);
			})}
		</motion.div>

		<motion.div className=' h-[calc(100vh-4.5rem)] p-1 flex flex-col justify-between items-start'>
			<div className='w-full'>
				<div
					className='content_header curr_recipient flex min-h-[55px]   w-full
							px-2 justify-center items-center 
							border-slate-200 border-b-[1px]
							bg-slate-200
							'
				>
					<div>
						<img
							src={currRecipient?.avatar}
							className='h-[35px] w-[35px] 
								rounded-lg border-[2px] border-solid 
								border-white object-cover p-[1px]
								text-shadow-custom_02 
								'
						/>
					</div>
					<div className='text-[16px] text-shadow-custom_01 ml-2 font-[500]'>
						{currRecipient &&
							currRecipient.username.charAt(0).toUpperCase() +
								currRecipient.username.slice(1).toLowerCase()}
					</div>
				</div>
				<div className='overflow-scroll h-[78vh] w-full py-3 px-2'>
					{Object.keys(messages).length > 0 &&
						Object.keys(messages).map((date, index) => {
							/* msg can be [{}] or [{}, {}, {}, {}, ....] */
							const talks = messages[date];

							return (
								<Message
									key={index}
									signedUserId={_id}
									talks={talks}
									date={date}
									avatar={avatar}
									animate={animate}
									setAnimate={setAnimate}
								/>
							);
						})}
				</div>
			</div>

			<div className='send_message mb-0 relative bg-slate-900 w-full'>
				<div className='send_wrapper flex flex-row justify-between items-end absolute inset-0'>
					<Send
						text={text}
						setText={setText}
						image={image}
						setImage={setImage}
						handleKeyDown={handleKeyDown}
						handleSendMessage={handleSendMessage}
					/>
				</div>
			</div>
		</motion.div>
	</div>

	<div className='footer'></div>
</div>;
