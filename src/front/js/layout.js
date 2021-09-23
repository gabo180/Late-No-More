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
import { ProfileUpdate } from "./pages/account-info/profileUpdate";
import { Roles } from "./pages/account-info/roles";

{
	/* settings imports */
}

import { Settings } from "./pages/settings/settings";
import { Help } from "./pages/settings/help";
import { About } from "./pages/settings/about";

{
	/* components imports */
}

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
					<Switch>
						{/* main */}

						<Route exact path="/">
							<NavbarPublicUser />
							<HomePage />
							<FooterPublicUser />
						</Route>
						<Route exact path="/sign-up">
							<NavbarPublicUser />
							<SignUp />
							<FooterPublicUser />
						</Route>
						<Route exact path="/confirm-email">
							<NavbarPublicUser />
							<ConfirmEmail />
							<FooterPublicUser />
						</Route>
						<Route exact path="/home">
							<NavbarLoggedIn />
							<Main />
							<FooterLoggedIn />
						</Route>
						<Route exact path="/confirm-CI/:shift_id">
							<NavbarLoggedIn />
							<ConfirmClockIn />
							<FooterLoggedIn />
						</Route>
						<Route exact path="/confirm-CO/:shift_id">
							<NavbarLoggedIn />
							<ConfirmClockOut />
							<FooterLoggedIn />
						</Route>

						{/* shift info */}

						<Route exact path="/shifts">
							<NavbarLoggedIn />
							<Shifts />
							<FooterLoggedIn />
						</Route>
						<Route exact path="/shifts/create-event">
							<NavbarLoggedIn />
							<CreateEvent />
							<FooterLoggedIn />
						</Route>
						<Route exact path="/shifts/timesheet">
							<NavbarLoggedIn />
							<Timesheet />
							<FooterLoggedIn />
						</Route>
						<Route exact path="/shifts/shift-info/:shift_id">
							<NavbarLoggedIn />
							<ShiftInfo />
							<FooterLoggedIn />
						</Route>

						{/* messages */}

						<Route exact path="/messages">
							<NavbarLoggedIn />
							<Messages />
							<FooterLoggedIn />
						</Route>
						<Route exact path="/messages/:message_id">
							<NavbarLoggedIn />
							<SingleMessage />
							<FooterLoggedIn />
						</Route>

						{/* acc info */}

						<Route exact path="/account">
							<NavbarLoggedIn />
							<Account />
							<FooterLoggedIn />
						</Route>
						<Route exact path="/account/profile/:profile_id">
							<NavbarLoggedIn />
							<Profile />
							<FooterLoggedIn />
						</Route>
						<Route exact path="/account/profile/:profile_id/update">
							<NavbarLoggedIn />
							<ProfileUpdate />
							<FooterLoggedIn />
						</Route>
						<Route exact path="/account/company-profile">
							<NavbarLoggedIn />
							<CompanyProfile />
							<FooterLoggedIn />
						</Route>
						<Route exact path="/account/roles">
							<NavbarLoggedIn />
							<Roles />
							<FooterLoggedIn />
						</Route>

						{/* settings */}

						<Route exact path="/settings">
							<NavbarLoggedIn />
							<Settings />
							<FooterLoggedIn />
						</Route>
						<Route exact path="/settings/help">
							<NavbarLoggedIn />
							<Help />
							<FooterLoggedIn />
						</Route>
						<Route exact path="/settings/about">
							<NavbarLoggedIn />
							<About />
							<FooterLoggedIn />
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
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
