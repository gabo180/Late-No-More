import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light mb-1 shade-color-navbar">
			<Link to="/">
				<span className="navbar-brand mb-0 h1 text-white font-body">
					<i className="fas fa-bed" />
					{"   "}
					LateNoMore
					{"   "}
					<i className="far fa-bell" />
				</span>
			</Link>
			<div className="ml-auto">
				<Link to="/demo">
					<button className="btn shade-button text-white font-body mr-1">Clock</button>
				</Link>
				<Link to="/demo">
					<button className="btn shade-button text-white font-body mr-1">Calendar</button>
				</Link>
				<Link to="/demo">
					<button className="btn shade-button text-white font-body mr-1">Timesheet</button>
				</Link>
				<Link to="/demo">
					<button className="btn shade-button text-white font-body">Messages</button>
				</Link>
			</div>
		</nav>
	);
};
