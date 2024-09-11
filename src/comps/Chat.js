import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";

/* states */

/* apis */
import { formatDate } from "../store/days/days";

export const Chats = ({
	signedUser: { accessToken, _id },
    users, 
    messages, 
    setCurrRecipient,
    setActivelink,
    setPrevActivelink,
    setLoading,
	
}) => {


    console.log("messages", messages)

	

	
	return (
		<div className={`flex flex-col gap-2 pt-2 h-full rounded relative`}>
        
		</div>
	);
};
