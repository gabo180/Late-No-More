import React, { useContext } from "react";
import { Link } from "react-router-dom";
import userImage from "../../../img/userImage.jpg";
import { Context } from "../../store/appContext";
// import rigoImageUrl from "../../img/clock-(no-background).jpg";
import "../../../styles/home.scss";
import { Container, Card, Button, Nav, ListGroup, ListGroupItem } from "react-bootstrap";

export const CreateEvent = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center">
			<div className="my-3">
				<div className="fadein-animation d-flex flex-column">
					<div className="d-flex justify-content-start mx-2">
						<img className="user-img" src={userImage} />
						<h4 className="justify-content-start my-auto">
							<span className="pl-2">{store.profile.username}</span> <br />{" "}
							<span className="pr-5">Role</span>
						</h4>
						<h2 className="mx-auto my-auto font-weight-bold">
							Create <br /> Shift
						</h2>
					</div>
					<form className="d-flex flex-column mr-auto">
						<div className="my-2 d-flex flex-column mr-auto">
							<span className="mr-auto ml-2">Select employee for the shift</span>{" "}
							<input className="ml-4 form-control" type="text" />
						</div>
						<div className="my-2 d-flex flex-column mx-auto">
							<span className="mr-auto ml-2">Select starting date and time:</span>{" "}
							<input className="ml-4 form-control" type="datetime-local" />
						</div>
						<div className="my-2 d-flex flex-column mx-auto">
							<span className="mr-auto ml-2">Select ending date and time:</span>{" "}
							<input className="ml-4 form-control" type="datetime-local" />
						</div>
					</form>
					<div className="d-flex justify-content-around">
						<Link to="/shifts">
							<button type="submit" className="btn btn-primary mb-2 px-4 my-2" value="Log in">
								Cancel
							</button>
						</Link>
						<Link to="/shifts">
							<button type="submit" className="btn btn-primary mb-2 px-4 my-2" value="Log in">
								Submit
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
