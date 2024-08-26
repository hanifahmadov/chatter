/* eslint-disable */
import { atom } from "recoil";

export const activeLinkDefault = atom({
	key: "activeLinkDefault",
	default: 0,
});

export const darkmodeDefault = atom({
	key: "darkmodeDefault",
	default: false,
});

export const deviceDefault = atom({
	key: "deviceDefault",
	default: {
		xsamll: null /* > 360 */,
		small: null /* > 640 */,
		medium: null /* > 768 */,
		large: null /* > 1024 */,
		xlarge: null /*  > 1440 */
	},
});

export const modalDefault = atom({
	key: "modalStatusDefault",
	default: false,
});

export const backdropDefault = atom({
	key: "backdropDefault",
	default: false,
});
