import React, { useContext } from "react";
import { Link } from "react-router-dom";
import userImage from "../../../img/userImage.jpg";
import { Context } from "../../store/appContext";
// import rigoImageUrl from "../../img/clock-(no-background).jpg";
import "../../../styles/home.scss";
import { Container, Card, Button, Nav, ListGroup, ListGroupItem } from "react-bootstrap";

export const Settings = () => {
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
						<h1 className="mx-2 my-2 font-weight-bold">Settings</h1>
					</div>
				</div>
			</div>
		</div>
	);
};
