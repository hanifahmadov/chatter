/* eslint-disable */
import { atom } from "recoil";

/**
 * on socket connection
 * this state will keep the
 * online users array
 * returns from the server
 * on connection and disconnection
 */
export const newConnectionDefault = atom({
	key: "newConnectionDefault",
	default: [],
});

/**
 * emitter when new messaae recivied
 */
export const newMessageDefault = atom({
	key: "newMessageDefault",
	default: false,
});
