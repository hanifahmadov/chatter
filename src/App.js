/* npm packages */
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { ThemeProvider } from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import OutsideClickHandler from "react-outside-click-handler";
import { motion, useAnimation } from "framer-motion";
import FormData from "form-data";
const scrollIntoView = require("scroll-into-view");

/* apis */
import { apiUrl } from "./apis/apiUrl";
import { all_users } from "./apis/usersCall";
import { all_messages, send_message } from "./apis/messagesCall";
import { newConnectionDefault, newMessageDefault } from "./store/states/socket_states";

/* global states */
import {
	activelinkDefault,
	currRecipientDefault,
	prevActivelinkDefault,
	signedUserDefault,
	unreadMessageCountDefault,
} from "./store/states/app_state";

/*  helpers */
import { Nav } from "./comps/Nav";
import { Settings } from "./comps/Settings";
import { Users } from "./comps/Users";
import { Loading } from "./comps/Loading";
import { formatDate } from "./store/days/days";
import { Message } from "./comps/Message";
import { Send } from "./comps/Send";
import { Recipient } from "./comps/Recipient";
import { Chats } from "./comps/Chat";

/**
 * 	App.js
 * 	main comp.
 */
export const App = () => {
	/* apps states */
	const controls = useAnimation();
	const [activelink, setActivelink] = useRecoilState(activelinkDefault);
	const [prevActivelink, setPrevActivelink] = useRecoilState(prevActivelinkDefault);
	const [unreadMessageCount, setUnreadMessageCount] = useRecoilState(unreadMessageCountDefault);
	const [loading, setLoading] = useState(false);

	/* socket listeners */
	const [newConnection] = useRecoilState(newConnectionDefault);
	const [newMessage] = useRecoilState(newMessageDefault);

	/* signed-user & curr-recipient*/
	const [{ accessToken, _id, avatar }] = useRecoilState(signedUserDefault);
	const [currRecipient, setCurrRecipient] = useRecoilState(currRecipientDefault);

	/** local primary states*/
	const [messages, setMessages] = useState([]);
	const [users, setUsers] = useState([]);

	/** send new message  */
	const [text, setText] = useState("");
	const [image, setImage] = useState(null);

	/**
	 * 	handle send message
	 * 	send message
	 */
	const handleSendMessage = (e) => {
		/* input validation todo */
		if (!text.length > 0 && !image) return;

		const data = new FormData();

		data.append("image", image);
		data.append("text", text.trim());
		data.append("baseurl", apiUrl);
		data.append("recipientId", currRecipient._id);
		// data.append("randomDate", generateRandomDate());

		send_message(accessToken, data)
			.then((res) => {
				setText("");
				setImage(undefined);
			})
			.catch((err) => {
				console.log("catch => send message error recivied");
			});
	};

	/**
	 * 	textarea will submit the message
	 * 	when enter pressed
	 * 	when cmd + enter
	 * 	jump to new line
	 */
	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			if (e.metaKey || e.ctrlKey) {
				// Cmd (macOS) or Ctrl (Windows/Linux) + Enter: Insert a new line
				e.preventDefault();
				setText(text + "\n");
			} else {
				// Enter alone: Trigger the send button animation and click
				e.preventDefault();
				controls.start({ scale: 1.05 }).then(() => {
					controls.start({ scale: 1 });
					handleSendMessage();
				});
			}
		}
	};

	/**
	 *  users call
	 */
	useEffect(() => {
		all_users(accessToken)
			.then((res) => {
				/**
				 *  new connection holds the current users
				 * 	who are in the server and mark them online
				 */
				const temp = res.map((user) => {
					/* checking which user is in the server */
					if (newConnection.includes(user._id)) {
						user.online = true;
						return user;
					} else {
						return user;
					}
				});

				setUsers(temp);
				// setCurrRecipient(res[0]);
			})
			.catch((err) => {
				console.log("all users errors");
				console.log(err);
			});
	}, [newConnection]);

	/**
	 * 	messages call
	 */
	useEffect(() => {
		// if (!currRecipient) return;
		all_messages(accessToken)
			.then((response) => {
				// console.log(" all message response >> ", response);
				/**
				 *  get the unread message counts
				 * 	looping the message response
				 */

				let tempCount = 0;
				response.forEach((mess) => {
					if (!mess.isRead && mess.recipient._id == _id) {
						tempCount += 1;
					}
				});

				setUnreadMessageCount(tempCount);

				/**
				 * 	now get the valid messages between user and currRecipient
				 * 	when user clicks on message button on User.js
				 * 	currect recipient will get selected so, get messages between user and that recipient
				 */

				let localdb = {};

				for (const message of response) {
					let tempdate = formatDate(message.createdAt);

					if (!localdb[tempdate]) {
						localdb[tempdate] = [message];
					} else {
						localdb[tempdate].push(message);
					}
				}

				/* set messages */
				setMessages(localdb);
			})
			.catch((error) => {
				console.log("all message error >> ", error);
				setLoading(false);
			});
	}, [currRecipient, newMessage]);

	return (
		<div
			className='h-full w-full bg-slate-50 rounded-[25px]
                    flex flex-col justify-between items-center
    
                    '
		>
			<div
				className='app-header 
                            w-full h-[4rem] flex justify-center items-center 
                            text-[25px] sm:text-[22px] text-gray-700 font-[500] text-shadow-custom_01 
							rounded-[25px] rounded-br-[2px] rounded-bl-[2px] 
							shadow-custom_04 bg-white
                            '
			>
				{activelink == 1 && "Users"}
				{activelink == 2 && (
					<Recipient
						setActivelink={setActivelink}
						currRecipient={currRecipient}
						prevActivelink={prevActivelink}
						setMessages={setMessages}
					/>
				)}
				{activelink == 2.2 && "Chats"}
				{activelink == 3 && "Send Message"}
				{activelink == 4 && "Calls"}
				{activelink == 5 && "Settings"}
			</div>

			<div
				className='app-body
                            w-full h-[calc(100%-4rem-4rem-1rem)] 
                            flex flex-frow bg-white
                            
                            '
			>
				{activelink == 1 && (
					<div className='users_wrapper'>
						<Users
							users={users}
							setActivelink={setActivelink}
							setCurrRecipient={setCurrRecipient}
							setPrevActivelink={setPrevActivelink}
							setLoading={setLoading}
						/>
					</div>
				)}

				{activelink == 2 && (
					<div className='message_parent relative h-full w-full flex flex-col py-0 px-1'>
						<Loading loading={loading} />

						<div className='flex-1 mt-[height-of-the-red-div] overflow-scroll scrollbar-none'>
							{Object.keys(messages).length > 0 ? (
								Object.keys(messages).map((date, index) => {
									const talks = messages[date];

									return (
										<Message
											key={index}
											signedUser={{ _id, accessToken, avatar }}
											currRecipient={currRecipient}
											date={date}
											talks={talks}
											avatar={avatar}
										/>
									);
								})
							) : (
								<div
									className='h-full w-full 
												flex justify-center items-center 
												text-gray-600 text-shadow-custom_01
												'
								>
									No Messages, Yet.
								</div>
							)}
						</div>
					</div>
				)}

				{activelink == 2.2 && (
					<div className='chats_parent h-full w-full overflow-scroll flex gap-0 flex-col flex-grow py-0 px-1'>
						{console.log("Object.keys(messages)", messages)}
						{Object.keys(messages).length > 0 ? (
							<Chats
								signedUser={{ accessToken, _id }}
								users={users}
								messages={messages}
								setCurrRecipient={setCurrRecipient}
								setActivelink={setActivelink}
								setPrevActivelink={setPrevActivelink}
								setLoading={setLoading}
							/>
						) : (
							<div
								className='h-full w-full 
										flex flex-col justify-center items-center 
										text-gray-600 text-shadow-custom_01
										'
							>
								<span>No chat history yet</span>
								<span>Send a message first</span>
							</div>
						)}
					</div>
				)}
				{activelink == 3 && (
					<div
						className='h-full w-full 
									flex flex-col  justify-center items-center
									text-gray-600 text-shadow-custom_01 
									'
					>
						<span>Not currently available.</span>
						<span>This feature will be added soon.</span>
					</div>
				)}
				{activelink == 4 && (
					<div
						className='h-full w-full 
								flex flex-col justify-center items-center
								text-gray-600 text-shadow-custom_01 
								'
					>
						<span>Web call is not available.</span>
						<span>Instead, another feature will be added.</span>
					</div>
				)}
				{activelink == 5 && (
					<div className='settings_wrapper h-full w-full'>
						<Settings activelink={activelink} setActivelink={setActivelink} />
					</div>
				)}
			</div>

			<div
				className='app-footer 
                            min-h-[4rem] w-full bg-white
							rounded-[25px] rounded-tr-[3px] rounded-tl-[3px]
							shadow-custom_04 relative
							'
			>
				{activelink == 2 ? (
					<Send
						text={text}
						setText={setText}
						image={image}
						setImage={setImage}
						handleKeyDown={handleKeyDown}
						handleSendMessage={handleSendMessage}
						controls={controls}
					/>
				) : (
					<Nav activelink={activelink} setActivelink={setActivelink} />
				)}
			</div>
		</div>
	);
};
