/* npm packages */
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { ThemeProvider } from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import OutsideClickHandler from "react-outside-click-handler";
import { motion, useAnimation } from "framer-motion";
import FormData from "form-data";
const scrollIntoView = require("scroll-into-view");
import { useMediaQuery } from "react-responsive";

/* styled */
import { App_Container } from "./app.styled";

/* apis */
import { apiUrl } from "./apis/apiUrl";
import { all_users } from "./apis/usersCalls";
import { all_messages, post_message } from "./apis/messageCalls";

/* global states */
import { currentRecipientState, userDefault } from "./store/states/user_state";
import {
	newConnectionState,
	newSigninState,
	on_messages_state,
	on_singin_state,
	on_users_state,
} from "./store/states/socket_state";
import { activelinkDefault, animateState, customnavDefault, unreadCountDefault } from "./store/states/app_state";

/* helpers */
import { Header } from "./store/helpers/Header";
import { Fontawesome } from "./store/fontawesome/Fontawesome";
import { TimeAgo } from "./store/timeago/timeAgoConfig";
import { formatDate, formatTime, generateRandomDate } from "./store/days/days";
import { User } from "./pages/reuseable/User";
import { Message } from "./pages/reuseable/Message";
import { Send } from "./pages/reuseable/Send";
import { RecipientDetails } from "./pages/reuseable/RecipientDetails";
import { Users } from "./comps/Users";
import { Settings } from "./comps/Settings";
import { Recipient } from "./comps/Recipient";
import { Nav } from "./comps/Nav";
import { Chats } from "./comps/Chats";

export const App = () => {
	/* app */
	const controls = useAnimation();
	const controlBodySlide = useAnimation();
	const lastMessageRef = useRef(null);
	const textareaRef = useRef(null);
	const spinRef = useRef(null);

	const sendButtonRef = useRef(null);
	const navigate = useNavigate();
	const timeAgo = new TimeAgo("en-US");

	/* triggers */
	const [on_signin] = useRecoilState(on_singin_state);
	const [on_messages] = useRecoilState(on_messages_state);
	const [on_users] = useRecoilState(on_users_state);
	const [animate, setAnimate] = useRecoilState(animateState);

	/* user */
	const [{ avatar, username, email, accessToken, _id }] = useRecoilState(userDefault);
	const [currRecipient, setCurrRecipient] = useRecoilState(currentRecipientState);
	const [activelink, setActivelink] = useRecoilState(activelinkDefault);
	const [customnav, setCustomnav] = useRecoilState(customnavDefault);
	const [unreadCount, setUnreadCount] = useRecoilState(unreadCountDefault);

	/* mobile - body transition tracker */
	const [isAtMinus400, setIsAtMinus400] = useState(false);
	const [loading, setLoading] = useState(false);

	/** local states*/
	const [messages, setMessages] = useState([]);
	const [users, setUsers] = useState([]);

	/**
	 *  textarea
	 *  setup
	 */
	const [text, setText] = useState("");
	const [image, setImage] = useState(null);

	/**
	 *  Message
	 *  send message
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

		post_message(accessToken, data)
			.then((res) => {
				setText("");
				setImage(undefined);
			})
			.catch((err) => {
				console.log(err);
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
	 *  use effects
	 * 	messages & users calls
	 */

	/* call all-users */

	const [newSignin] = useRecoilState(newSigninState);
	const [newConnection] = useRecoilState(newConnectionState);

	useEffect(() => {
		all_users(accessToken)
			.then((res) => {
				console.log("res rese", res);

				console.log("newConnection", newConnection);
				const temp = res.map((user) => {
					if (newConnection.includes(user._id)) {
						user.online = true;
						return user;
					} else {
						return user;
					}
				});

				setUsers(temp);
				setCurrRecipient(res[0]);
			})
			.catch((err) => {
				console.log("all users errors");
				console.log(err);
			});
	}, [newConnection]);

	/* call all-messages*/
	useEffect(() => {
		if (!currRecipient) return;
		all_messages(accessToken)
			.then((response_messages) => {
				// console.log("response_messages", response_messages);
				/**
				 *
				 * 	get the messages betweem
				 * 	curr user and recipient
				 */

				let localUnreadCount = 0;

				response_messages.forEach((mess) => {
					if (!mess.isRead && mess.recipient._id == _id) {
						localUnreadCount += 1;
					}
				});

				console.log("localUnreadCount >>", localUnreadCount);

				setUnreadCount(localUnreadCount);

				// const valid_messages = i_sent.concat(recipient_sent);
				const valid_messages = response_messages.filter(
					(mess, index) =>
						(mess.sender == _id && mess.recipient._id == currRecipient._id) ||
						(mess.sender == currRecipient._id && mess.recipient._id == _id)
				);

				let localdb = {};

				for (const message of valid_messages) {
					let tempdate = formatDate(message.createdAt);

					if (!localdb[tempdate]) {
						localdb[tempdate] = [message];
					} else {
						localdb[tempdate].push(message);
					}
				}

				// console.log("localdb", localdb)

				setMessages(localdb);
			})
			.catch((error) => {
				console.log("all message error >> ", error);
				console.log(error);
				setLoading(false);
			});
	}, [on_messages, currRecipient]);

	return (
		<>
			<div
				className='app header w-full h-[4rem] flex justify-center items-center text-[25px] sm:text-[22px] bg-white
								 rounded-[25px] rounded-br-[2px] rounded-bl-[2px] text-gray-700 font-[500] text-shadow-custom_01
								shadow-custom_09'
			>
				{activelink == 1 && "Users"}
				{activelink == 2 && (
					<Recipient
						setActivelink={setActivelink}
						currRecipient={currRecipient}
						customnav={customnav}
						setMessages={setMessages}
					/>
				)}
				{activelink == 2.2 && "Chats"}
				{activelink == 3 && "Send Message"}
				{activelink == 4 && "Calls"}
				{activelink == 5 && "Settings"}
			</div>

			<div className='app body w-full h-[calc(100%-4rem-4rem-1rem)] flex flex-frow'>
				{activelink == 1 && (
					<div className='users_wrapper'>
						<Users
							users={users}
							setActivelink={setActivelink}
							setCurrRecipient={setCurrRecipient}
							setCustomnav={setCustomnav}
							setLoading={setLoading}
						/>
					</div>
				)}
				{activelink == 2 && (
					<div className='message_parent relative h-full w-full flex flex-col py-0 px-1'>
						{loading && (
							<div
								className={`bg-white flex justify-center items-center
												absolute top-0 left-0 w-full h-full z-10 
												`}
							>
								<div className='bg-white text-white font-bold p-3 rounded inline-flex items-center'>
									<svg
										className='animate-spin h-6 w-6 text-blue-500'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
									>
										<circle
											className='opacity-25'
											cx='12'
											cy='12'
											r='10'
											stroke='currentColor'
											strokeWidth='4'
										></circle>
										<path
											className='opacity-75'
											fill='currentColor'
											d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
										></path>
									</svg>
								</div>
							</div>
						)}
						<div className='flex-1 mt-[height-of-the-red-div] overflow-scroll'>
							{Object.keys(messages).length > 0 ? (
								Object.keys(messages).map((date, index) => {
									const talks = messages[date];

									return (
										<Message
											key={index}
											signedUser={{ _id, accessToken, avatar }}
											talks={talks}
											date={date}
											avatar={avatar}
											animate={animate}
											setAnimate={setAnimate}
											currRecipient={currRecipient}
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
						{Object.keys(messages).length > 0 ? (
							<Chats
								signedUser={{ _id, accessToken }}
								users={users}
								messages={messages}
								setCurrRecipient={setCurrRecipient}
								setActivelink={setActivelink}
								setCustomnav={setCustomnav}
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
						<span>Not available currently</span>
						<span>A feature will be added soon</span>
					</div>
				)}
				{activelink == 4 && (
					<div
						className='h-full w-full 
								flex flex-col justify-center items-center
								text-gray-600 text-shadow-custom_01 
								'
					>
						<span>Web call is not available</span>
						<span>Another feature will be added soon</span>
					</div>
				)}

				{activelink == 5 && (
					<div className='settings_wrapper h-full w-full'>
						<Settings activelink={activelink} setActivelink={setActivelink} />
					</div>
				)}
			</div>

			<div
				className='app footer min-h-[4rem] w-full bg-white
								rounded-[25px] rounded-tr-[3px] rounded-tl-[3px]
								shadow-custom_09 relative
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
					/>
				) : (
					<Nav activelink={activelink} setActivelink={setActivelink} />
				)}
			</div>
		</>
	);
};
