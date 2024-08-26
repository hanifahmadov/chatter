import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import {
	faHeart as faRegularHeart,
	faThumbsDown as faRegularThumbsDown,
	faBookmark as faRegularBookmark,
	faThumbsUp as faThumbsUpRegular,
	faFaceSmile as faFaceSmileRegular,
	faThumbsDown as faThumbsDownRegular,
	faFaceLaughBeam as faFaceLaughBeamRegular,
	faCircleCheck as faCircleCheckRegular,
	faUser as faUserRegular,
	faImage as faImageRegular,
} from "@fortawesome/free-regular-svg-icons";

import {
	faCircleXmark,
	faImage,
	faVideo,
	faMasksTheater,
	faCircleCheck,
	faUniversalAccess,
	faEarthAmericas,
	faThumbsUp,
	faComment,
	faHeart,
	faFaceSmile,
	faThumbsDown,
	faFaceLaughBeam,
	faPlus,
	faEllipsis,
	faPen,
	faTrash,
	faTrashCan,
	faEyeSlash,
	faPenToSquare,
	faXmark,
	faTriangleExclamation,
	faUser,
	faCircleInfo,
	faWandMagicSparkles,
	faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

library.add(
	faCircleXmark,
	faImage,
	faVideo,
	faMasksTheater,
	faCircleCheck,
	faUniversalAccess,
	faEarthAmericas,
	faComment,
	faRegularHeart,
	faRegularThumbsDown,
	faRegularBookmark,
	faThumbsUp,
	faComment,
	faHeart,
	faFaceSmile,
	faThumbsDown,
	faFaceLaughBeam,
	faFaceLaughBeamRegular,
	faThumbsDownRegular,
	faFaceSmileRegular,
	faThumbsUpRegular,
	faPlus,
	faEllipsis,
	faPen,
	faTrash,
	faTrashCan,
	faEyeSlash,
	faPenToSquare,
	faXmark,
	faTriangleExclamation,
	faCircleCheckRegular,
	faUser,
	faUserRegular,
	faCircleInfo,
	faImageRegular,
	faWandMagicSparkles,
	faRightFromBracket
);

const defineType = (type) => {
	switch (type) {
		case "faCircleCheck":
			return faCircleCheck;
		case "faEarthAmericas":
			return faEarthAmericas;
		case "faHeart":
			return faHeart;
		case "faRegularHeart":
			return faRegularHeart;
		case "faFaceSmile":
			return faFaceSmile;
		case "faFaceSmileRegular":
			return faFaceSmileRegular;
		case "faRegularBookmark":
			return faRegularBookmark;
		case "faFaceLaughBeam":
			return faFaceLaughBeam;
		case "faFaceLaughBeamRegular":
			return faFaceLaughBeamRegular;
		case "faThumbsDown":
			return faThumbsDown;
		case "faThumbsDownRegular":
			return faThumbsDownRegular;
		case "faImage":
			return faImage;
		case "faVideo":
			return faVideo;
		case "faMasksTheater":
			return faMasksTheater;
		case "faPlus":
			return faPlus;
		case "faEllipsis":
			return faEllipsis;
		case "faPen":
			return faPen;
		case "faTrash":
			return faTrash;
		case "faTrashCan":
			return faTrashCan;
		case "faEyeSlash":
			return faEyeSlash;
		case "faPenToSquare":
			return faPenToSquare;
		case "faXmark":
			return faXmark;
		case "faTriangleExclamation":
			return faTriangleExclamation;
		case "faCircleXmark":
			return faCircleXmark;
		case "faCircleCheckRegular":
			return faCircleCheckRegular;
		case "faUser":
			return faUser;
		case "faCircleInfo":
			return faCircleInfo;
		case "faImageRegular":
			return faImageRegular;
		case "faWandMagicSparkles":
			return faWandMagicSparkles;
		case "faRightFromBracket":
			return faRightFromBracket;
		default:
			return null;
	}
};

export const Fontawesome = ({
	type,
	color,
	size,
	padding,
	margin,
	position,
	top,
	left,
	right,
	down,
	paddingBottom,
	paddingTop,
	paddingLeft,
	paddingRight,
	marginTop,
	marginBottom,
	marginLeft,
	marginRight,
	fontSize,
	fontWeight,
	height,
	width,
}) => {
	const icon = defineType(type);
	return icon ? (
		<FontAwesomeIcon
			icon={icon}
			style={{
				color,
				size,
				padding,
				margin,
				position,
				top,
				left,
				right,
				down,
				paddingBottom,
				paddingTop,
				paddingLeft,
				paddingRight,
				marginTop,
				marginBottom,
				marginLeft,
				marginRight,
				fontSize,
				fontWeight,
				height,
				width,
			}}
		/>
	) : null;
};