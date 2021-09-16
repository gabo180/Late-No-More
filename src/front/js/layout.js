import React from "react";
import injectContext from "./store/appContext.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";

{
	/* main imports */
}

import { ConfirmClockIn } from "./pages/main/confirmClockIn";
import { ConfirmClockOut } from "./pages/main/confirmClockOut";
import { ConfirmEmail } from "./pages/main/confirmEmail";
import { HomePage } from "./pages/main/homePage";
import { Main } from "./pages/main/main";
import { SignUp } from "./pages/main/signUp";

{
	/* shift info imports */
}

import { Shifts } from "./pages/shift/shifts";
import { CreateEvent } from "./pages/shift/createEvent";
import { ShiftInfo } from "./pages/shift/shiftInfo";
import { Timesheet } from "./pages/shift/timesheet";

{
	/* messages imports */
}

import { Messages } from "./pages/messages/messages";
import { SingleMessage } from "./pages/messages/singleMessage";

{
	/* account info imports */
}

import { Account } from "./pages/account-info/account";
import { CompanyProfile } from "./pages/account-info/companyProfile";
import { Profile } from "./pages/account-info/profile";
import { Roles } from "./pages/account-info/roles";

{
	/* settings imports */
}

import { Settings } from "./pages/settings/settings";
import { Help } from "./pages/settings/help";
import { About } from "./pages/settings/about";

import { NavbarLoggedIn } from "./component/navbar";
import { NavbarPublicUser } from "./component/navbar";
import { FooterLoggedIn } from "./component/footer";
import { FooterPublicUser } from "./component/footer";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<NavbarPublicUser />
					<Switch>
						{/* main */}

						<Route exact path="/">
							<HomePage />
						</Route>
						<Route exact path="/sign-up">
							<SignUp />
						</Route>
						<Route exact path="/confirm-email">
							<ConfirmEmail />
						</Route>
						<Route exact path="/home">
							<Main />
						</Route>
						<Route exact path="/confirm-CI">
							<ConfirmClockIn />
						</Route>
						<Route exact path="/confirm-CO">
							<ConfirmClockOut />
						</Route>

						{/* shift info */}

						<Route exact path="/shifts">
							<Shifts />
						</Route>
						<Route exact path="/shifts/create-event">
							<CreateEvent />
						</Route>
						<Route exact path="/shifts/timesheet">
							<Timesheet />
						</Route>
						<Route exact path="/shifts/shift-info">
							<ShiftInfo />
						</Route>

						{/* messages */}

						<Route exact path="/messages">
							<Messages />
						</Route>
						<Route exact path="/messages/:theid">
							<SingleMessage />
						</Route>

						{/* acc info */}

						<Route exact path="/account">
							<Account />
						</Route>
						<Route exact path="/account/profile">
							<Profile />
						</Route>
						<Route exact path="/account/company-profile">
							<CompanyProfile />
						</Route>
						<Route exact path="/account/roles">
							<Roles />
						</Route>

						{/* settings */}

						<Route exact path="/settings">
							<Settings />
						</Route>
						<Route exact path="/settings/help">
							<Help />
						</Route>
						<Route exact path="/settings/about">
							<About />
						</Route>

						{/* layouts */}

						<Route exact path="/demo">
							<Demo />
						</Route>
						<Route exact path="/single/:theid">
							<Single />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
					<FooterPublicUser />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
