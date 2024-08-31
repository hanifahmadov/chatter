import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

/* global states */
import { userDefault } from "../store/states/user_state";

// The RequireAuth component
export const RequireAuth = ({ children }) => {
	/* location */
	const navigate = useNavigate();

	/* user */
	const [user] = useRecoilState(userDefault);

	return !user ? navigate("/welcome", { replace: true }) : children;
};
