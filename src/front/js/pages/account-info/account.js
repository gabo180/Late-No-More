import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
// import rigoImageUrl from "../../img/clock-(no-background).jpg";
import "../../../styles/home.scss";
import userImage from "../../../img/userImage.jpg";
import { Container, Card, Button, Nav, ListGroup, ListGroupItem } from "react-bootstrap";

export const Account = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center">
			<div className="my-3">
				<div className="fadein-animation d-flex flex-column">
					<div className="d-flex justify-content-start mx-2">
						<img className="user-img" src={userImage} />
						<h4 className="justify-content-start my-auto">
							<span className="pl-2">Username</span> <br /> <span className="pr-5">Role</span>
						</h4>
						<h1 className="mx-2 my-2 font-weight-bold">Account</h1>
					</div>
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
