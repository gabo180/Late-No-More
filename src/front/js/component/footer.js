import React, { Component } from "react";
import { Link } from "react-router-dom";

export const FooterLoggedIn = () => (
	<footer className="fixed-bottom py-1 shade-color-footer text-white mt-5 py-2">
		<div className="d-flex justify-content-around">
			<Link to="/account">
				<button className="btn text-white font-body">
					Account <br /> <i className="pt-1 icon-size-xl far fa-user-circle" />
				</button>
			</Link>
			<Link to="/shifts">
				<button className="btn text-white round-bord">
					Shifts <br /> <i className="pt-1 icon-size-xl far fa-calendar-alt" />
				</button>
			</Link>
			<Link to="/settings">
				<button className="btn text-white font-body">
					Settings <br /> <i className="pt-1 icon-size-xl fas fa-cog" />
				</button>
			</Link>
		</div>
	</footer>
);

export const FooterPublicUser = () => (
	<footer className="fixed-bottom py-2 shade-color-footer text-white">
		<div className="text-center py-3">
			Made with <i className="text-danger fas fa-palette" /> by{" "}
			<a className="text-white text-decoration-none" href="https://github.com/marcoescmont">
				Marco Escalona
			</a>
			{", "}
			<a className="text-white text-decoration-none" href="https://github.com/gabo180">
				Gabriel Hernandez
			</a>
		</div>
	</footer>
);
