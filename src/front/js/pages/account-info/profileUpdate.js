import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../store/appContext";
import userImage from "../../../img/userImage.jpg";
import "../../../styles/home.scss";
import { Container, Card, Button, Nav, ListGroup, ListGroupItem } from "react-bootstrap";

export const ProfileUpdate = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const rgb = {
		boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)"
	};

	return (
		<div className="fadein-animation d-flex flex-column profile-container">
			<div className="d-flex justify-content-start role-container">
				<img className="user-img" src={userImage} />
				<div className="justify-content-start my-auto profile-name">
					<span>{store.profile.username}</span> <br /> <span>Role</span>
				</div>
				<div className="font-weight-bold screen-info" style={rgb}>
					Update
					<br />
					Information
				</div>
			</div>
			<div className="d-flex flex-column info-container">
				<div className="d-flex flex-column single-info-element">
					<span className="mr-auto ml-2">Username</span>{" "}
					<input className="form-control" placeholder={store.profile.username} type="text" />
				</div>
				<div className="d-flex flex-column single-info-element">
					<span className="mr-auto ml-2">First name</span>{" "}
					<input className="form-control" placeholder={store.profile.name} type="text" />
				</div>
				<div className="d-flex flex-column single-info-element">
					<span className="mr-auto ml-2">Last name</span>{" "}
					<input className="form-control" placeholder={store.profile.last_name} type="text" />
				</div>
				<div className="d-flex flex-column single-info-element">
					<span className="mr-auto ml-2">Email address</span>{" "}
					<input className="form-control" placeholder={store.profile.email} type="text" />
				</div>
				<div className="d-flex flex-column single-info-element">
					<span className="mr-auto ml-2">Password</span> <input className="form-control" type="password" />
				</div>
				<div className="d-flex flex-column single-info-element">
					<span className="mr-auto ml-2">Phone number</span>{" "}
					<input className="form-control" placeholder={store.profile.phone_number} type="text" />
				</div>
			</div>
			<Link to="/account/profile/update">
				<button type="submit" className="btn btn-primary mb-2 px-5 my-2" value="edit">
					Submit
				</button>
			</Link>
		</div>
	);
};
