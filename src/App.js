/* npm packages */
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useAnimation } from "framer-motion";
import FormData from "form-data";
import { useTheme } from "styled-components";

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
import { formatDate, generateRandomDate } from "./store/days/days";
import { Message } from "./comps/Message";
import { Send } from "./comps/Send";
import { Recipient } from "./comps/Recipient";
import { Chats } from "./comps/Chat";

/**
 * 	App.js
 * 	main comp.
 */
export const App = () => {
	/* mobile */
	const theme = useTheme();
	const { sm, md } = theme.device;

	/* apps states */
	const controls = useAnimation();
	const [activelink, setActivelink] = useRecoilState(activelinkDefault);
	const [prevActivelink, setPrevActivelink] = useRecoilState(prevActivelinkDefault);
	const [unreadMessageCount, setUnreadMessageCount] = useRecoilState(unreadMessageCountDefault);
	const [unreadCountUpdated, setUnreadCountUpdated] = useState(false);

	/* loading states */
	const [chatsLoading, setChatsLoading] = useState(false);
	const [messageLoading, setMessageLoading] = useState(false);

	/* socket listeners */
	const [newConnection] = useRecoilState(newConnectionDefault);
	const [newMessage] = useRecoilState(newMessageDefault);

	const [newMessageRecivied, setNewMessageRecivied] = useState(false);

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

				/* trigger to recall all messages on new message recivied */
				setNewMessageRecivied((prev) => !prev);


				/* set defaults */
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

	/* !!! this keydown is not in use  */
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

				/* set messages */
				setMessages(response);

				/**
				 * 	now get the valid messages between user and currRecipient
				 * 	when user clicks on message button on User.js
				 * 	currect recipient will get selected so, get messages between user and that recipient
				 */
			})
			.catch((error) => {
				console.log("all message error >> ", error);
			});
	}, [newMessage, unreadCountUpdated, newMessageRecivied]);

	return (
		<div
			className='h-full w-full bg-slate-50 rounded-[25px]
                    flex flex-col justify-between items-center
    
                    '
		>
			<div
				className={`app-header 
                            w-full h-[4rem] flex justify-center items-center 
                            text-[20px] text-black font-[500] font-sans
							rounded-[25px] rounded-br-[2px] rounded-bl-[2px] 
							bg-white
							${sm && ` text-[24px]`}
							
                            `}
			>
				{activelink == 1 && "Users"}
				{activelink == 2 && (
					<Recipient
						setActivelink={setActivelink}
						currRecipient={currRecipient}
						prevActivelink={prevActivelink}
						setMessages={setMessages}
						setChatsLoading={setChatsLoading}
						setImage={setImage}
						setText={setText}
					/>
				)}
				{activelink == 2.2 && "Chats"}
				{activelink == 3 && "Send Message"}
				{activelink == 4 && "Calls"}
				{activelink == 5 && "Settings"}
			</div>

			<div
				className='app-body
                            w-full h-[calc(100%-4rem-4rem-0.5rem)] 
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
							setMessageLoading={setMessageLoading}
						/>
					</div>
				)}

				{activelink == 2 && (
					<div
						className='message_parent relative 
									h-full w-full flex flex-col 
									py-0 px-0
									
									'
					>
						<Loading messageLoading={messageLoading} />
						<Message
							signedUser={{ _id, accessToken, avatar }}
							messages={messages}
							currRecipient={currRecipient}
							setUnreadCountUpdated={setUnreadCountUpdated}
							setMessageLoading={setMessageLoading}
						/>
					</div>
				)}

				{activelink == 2.2 && (
					<div className='h-full w-full relative'>
						<Loading chatsLoading={chatsLoading} />
						<Chats
							signedUser={{ accessToken, _id }}
							messages={messages}
							users={users}
							setCurrRecipient={setCurrRecipient}
							setActivelink={setActivelink}
							setPrevActivelink={setPrevActivelink}
							setChatsLoading={setChatsLoading}
							setMessageLoading={setMessageLoading}
						/>
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
							relative
							'
			>
				{activelink == 2 ? (
					<div className={messageLoading && "pointer-events-none opacity-40"}>
						<Send
							text={text}
							setText={setText}
							image={image}
							setImage={setImage}
							// handleKeyDown={handleKeyDown}
							handleSendMessage={handleSendMessage}
							controls={controls}
							messageLoading={messageLoading}
						/>
					</div>
				) : (
					<Nav
						activelink={activelink}
						setActivelink={setActivelink}
						setChatsLoading={setChatsLoading}
						prevActivelink={prevActivelink}
					/>
				)}
			</div>
		</div>
	);
};
