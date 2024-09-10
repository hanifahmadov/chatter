/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route, Navigate } from "react-router-dom";
import "./index.scss";

import { StyleSheetManager } from "styled-components";
import { RecoilRoot } from "recoil";

/* layouts */
import { PhoneLayout } from "./layouts/PhoneLayout";
import { RegisterLayout } from "./layouts/RegisterLayout";
import { Signin } from "./signs/Signin";
import { Signup } from "./signs/Signup";

const router = createBrowserRouter([
	{
		path: "/",
		element: <PhoneLayout />,
		children: [
			{
				path: "/welcome",
				element: <RegisterLayout />,
				children: [
					{
						path: "signin",
						element: <Signin />,
					},
					{
						path: "signup",
						element: <Signup />,
					},
				],
			},
		],
	},
]);

/**
 *
 *  StyleSheetManager, CustomStyleSheetManager
 * 	are to avoid $value or $ while passing arg to styled-components
 *
 */
const CustomStyleSheetManager = (props) => (
	<StyleSheetManager shouldForwardProp={(prop) => prop !== "comp"}>{props.children}</StyleSheetManager>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<CustomStyleSheetManager>
		<RecoilRoot>
			<RouterProvider router={router} />
		</RecoilRoot>
	</CustomStyleSheetManager>
);
