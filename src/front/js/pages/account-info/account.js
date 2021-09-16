import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
// import rigoImageUrl from "../../img/clock-(no-background).jpg";
import "../../../styles/home.scss";
import { Container, Card, Button, Nav, ListGroup, ListGroupItem } from "react-bootstrap";

export const Account = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center">
			<div className="my-3">
				<div className="fadein-animation d-flex">
					<div className="position-try">
						<ul className="text-primary mx-3">
							<li>
								<Link to="/account/profile">
									<button type="submit" className="font-navbar text-dark btn my-2" value="Sign up">
										<h2>Update information</h2>
									</button>
								</Link>
							</li>
							<li>
								<Link to="/account/company-profile">
									<button
										type="submit"
										className="font-navbar text-dark btn my-2 border-bottom border-top"
										value="Sign up">
										<h2>Manage or crate company</h2>
									</button>
								</Link>
							</li>
							<li>
								<Link to="/account/roles">
									<button type="submit" className="font-navbar text-dark btn my-2" value="Sign up">
										<h2>Manage roles</h2>
									</button>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
