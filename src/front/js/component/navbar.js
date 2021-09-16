import React from "react";
import { Link } from "react-router-dom";
import latenomoreLogo from "../../img/latenomoreLogo.png";

export const NavbarLoggedIn = () => {
	return (
		<nav className="navbar navbar-light mb-1 shade-color-navbar">
			<Link to="/home" className="text-decoration-none">
				<span className="mb-0 h1 text-white font-navbar">
					LateNoMore <img src={latenomoreLogo} />
				</span>
			</Link>
			<Link to="/messages">
				<button className="btn btn-lg text-white font-navbar">
					<i className="fas fa-inbox" />
				</button>
			</Link>
		</nav>
	);
};

export const NavbarPublicUser = () => {
	return (
		<nav className="d-flex justify-content-center w-100 navbar navbar-light mb-1 shade-color-navbar">
			<Link to="/" className="text-decoration-none">
				<span className="mb-0 h1 text-white font-navbar">
					LateNoMore <img src={latenomoreLogo} />
				</span>
			</Link>
		</nav>
	);
};
