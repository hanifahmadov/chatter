/* eslint-disable */
import { atom } from "recoil";

/**
 * on socket connection
 * this state will keep the
 * online users array
 * returns from the server
 * on connection and disconnection
 */
const newConnectionDefault = atom({
	key: "newConnectionDefault",
	default: [],
});

/**
 * emitter when new messaae recivied
 */
const newMessageDefault = atom({
	key: "newMessageDefault",
	default: false,
});

export { newConnectionDefault, newMessageDefault };
