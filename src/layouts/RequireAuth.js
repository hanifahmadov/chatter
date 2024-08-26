import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";

/* global states */
import { userDefault } from "../store/states/user_state";

// The RequireAuth component
export const RequireAuth = ({ children }) => {
	/* location */
	const location = useLocation();

	/* user */
	const [user] = useRecoilState(userDefault);

	return !user ? <Navigate to='/welcome' state={{ from: location }} replace /> : children;
};
