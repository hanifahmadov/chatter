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
		xsm: null /* > 360 */,
		sm: null /* > 640 */,
		md: null /* > 768 */,
		lg: null /* > 1024 */,
		xlg: null /*  > 1440 */,
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

/* revents the animation effect on unmout-remount of comps */
export const animateState = atom({
	key: "animateState",
	default: "",

	/* "animate-in slide-in-from-bottom 1s ease-out forwards" */
});
/* revents the animation effect on unmout-remount of comps */

