import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import userImage from "../../../img/userImage.jpg";
import "../../../styles/home.scss";
import { useHistory } from "react-router-dom";

export const Main = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	return (
		<>
			<div className="fadein-animation d-flex flex-column">
				<div className="d-flex justify-content-start mx-2">
					<img className="user-img" src={userImage} />
					<h4 className="justify-content-start my-auto">
						<span className="pl-2">{store.profile.username}</span> <br /> <span className="pr-5">Role</span>
					</h4>
				</div>
			</div>
			<div className="container border border-dark m-3">
				<div className="row">
					<div className="col-6">
						<div className="progress">
							<div
								className="progress-bar progress-bar-striped"
								role="progressbar"
								style={{ width: "10%" }}
								aria-valuenow="10"
								aria-valuemin="0"
								aria-valuemax="100"
							/>
						</div>
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
