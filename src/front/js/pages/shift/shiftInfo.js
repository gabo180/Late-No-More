import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import userImage from "../../../img/userImage.jpg";
import "../../../styles/home.scss";
import { Link, useParams, useHistory } from "react-router-dom";

export const ShiftInfo = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();
	const params = useParams();
	const [shift, setShift] = useState("");

	useEffect(() => {
		actions.loadSingleShift(params.shift_id).then(shift => setShift(shift));
	}, []);

	if (!shift)
		return (
			<div className="spinner-border" role="status">
				<span className="sr-only">Loading shift...</span>
			</div>
		);

	const handleClock = () => {
		if (shift.clock_in !== null) {
			history.push("/confirm-CO/" + params.shift_id);
		} else {
			history.push("/confirm-CI/" + params.shift_id);
		}
	};

	const ifHandleButton = () => {
		if (shift.clock_in !== null) {
			return (
				<button type="button" className="btn mx-auto text-white" onClick={handleClock}>
					<i className="fas fa-sign-out-alt text-white btn-danger rounded-circle shadow rounded-sm px-4 py-4" />
				</button>
			);
		} else {
			return (
				<button type="button" className="btn mx-auto text-white" onClick={handleClock}>
					<i className="fas fa-sign-in-alt text-white btn-success rounded-circle shadow rounded-sm px-4 py-4" />
				</button>
			);
		}
	};

	const handleButton = ifHandleButton();

	return (
		<>
			<div className="fadein-animation d-flex flex-column">
				<div className="d-flex justify-content-start mx-2 my-3">
					<img className="user-img" src={userImage} />
					<h4 className="justify-content-start my-auto">
						<span className="pl-2">{store.profile.username}</span> <br /> <span className="pr-5">Role</span>
					</h4>
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
