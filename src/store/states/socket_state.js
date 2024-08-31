/* eslint-disable */
import { atom } from "recoil";

/* Socket connection default state */
export const socketConnectionDefault = atom({
	key: "socketConnectionDefault",
	default: false,
});

/* Socket connection default state */
export const on_messages_state = atom({
	key: "on_messages_state",
	default: false,
});

/* Socket connection default state */
export const on_users_state = atom({
	key: "on_users_state",
	default: false,
});
