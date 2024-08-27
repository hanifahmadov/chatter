/* eslint-disable */
import { atom } from "recoil";

/**
 *  this gb state will runs the useEffect
 *  and is used in the Message.js file
 *
 */
export const messageDataCallDefault = atom({
	key: "messageDataCallDefault",
	default: false,
});
