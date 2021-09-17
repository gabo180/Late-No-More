import React, { useContext } from "react";
import userImage from "../../../img/userImage.jpg";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
// import rigoImageUrl from "../../img/clock-(no-background).jpg";
import "../../../styles/home.scss";
import { Container, Card, Button, Nav, ListGroup, ListGroupItem } from "react-bootstrap";

export const Shifts = () => {
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
						<h1 className="mx-auto my-2 font-weight-bold">Shifts</h1>
					</div>
					<div className="d-flex justify-content-around">
						<Link to="/shifts/timesheet">
							<button type="submit" className="btn btn-primary mb-2 px-4 my-2" value="Log in">
								Timesheet
							</button>
						</Link>
						<Link to="/shifts/create-event">
							<button type="submit" className="btn btn-primary mb-2 px-4 my-2" value="Log in">
								+ Create shift
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
