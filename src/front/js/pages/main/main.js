import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import userImage from "../../../img/userImage.jpg";
import "../../../styles/home.scss";
import { Container, Card, Button, Nav, ListGroup, ListGroupItem } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export const Main = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	const handleClock = () => {
		if (store.isClockIn) {
			history.push("/confirm-CO");
		} else {
			history.push("/confirm-CI");
		}
	};

	const ifHandleButton = () => {
		if (store.isClockIn) {
			return (
				<button type="button" className="btn btn-danger" onClick={handleClock}>
					Clock Out
				</button>
			);
		} else {
			return <h1>Home</h1>;
		}
	};

	const handleButton = ifHandleButton();

	return (
		<>
			<div className="fadein-animation d-flex flex-column">
				<div className="d-flex justify-content-start mx-2">
					<img className="user-img" src={userImage} />
					<h4 className="justify-content-start my-auto">
						<span className="pl-2">Username</span> <br /> <span className="pr-5">Role</span>
					</h4>
					{handleButton}
				</div>
			</div>
			<div className="container border border-dark m-3">
				<div className="row">
					<div className="col-6">
						<button type="button" className="btn btn-primary">
							Current Shift
						</button>
					</div>
					<div className="col-6">
						<button type="button" className="btn btn-primary">
							Date
						</button>
					</div>
				</div>
				<div className="row">
					<div className="col-6">
						<h3>Earned!</h3>
					</div>
					<div className="col-6">
						<h3>Hours!</h3>
					</div>
				</div>
			</div>
		</>
	);
};
