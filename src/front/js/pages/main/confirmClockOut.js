import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/home.scss";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import userImage from "../../../img/userImage.jpg";
import moment from "moment";

export const ConfirmClockOut = () => {
	const { store, actions } = useContext(Context);
	const [shift, setShift] = useState("");
	const history = useHistory();
	const params = useParams();

	useEffect(() => {
		actions.loadSingleShift(params.shift_id).then(shift => setShift(shift));
	}, []);

	const roleId = shift.role_id;

	const targetEmployee = store.employee.find(employee => employee.id == roleId);

	if (!shift)
		return (
			<div className="spinner-border" role="status">
				<span className="sr-only">Loading shift...</span>
			</div>
		);

	const starting_time = moment(shift.clock_in);
	const ending_time = moment();
	const hours_done = ending_time.diff(starting_time, "hours", true);
	console.log(clockInNewFormat);
	console.log(typeof hours_done);
	// const hours = Math.round(hours_done * 100) / 100;
	const amount_earned = () => {
		if (targetEmployee) {
			return hours_done * targetEmployee.hourly_rate;
		}
	};

	return (
		<>
			<div className="fadein-animation d-flex flex-column">
				<div className="d-flex justify-content-start mx-2 my-3">
					<img className="user-img" src={userImage} />
					<h4 className="justify-content-start my-auto">
						<span className="pl-2">{store.profile.username}</span> <br /> <span className="pr-5">Role</span>
					</h4>
					<button
						type="button"
						className="btn mx-auto text-white"
						onClick={() => {
							actions.doClockOut(shift.id);
							setTimeout(
								() => {
									history.push("/home");
									history.go(0);
								},
								[500]
							);
						}}>
						<i className="fas fa-sign-out-alt text-white btn-danger rounded-circle shadow rounded-sm px-4 py-4" />
					</button>
				</div>
				<div className="text-center">
					<div className="my-3">
						<div>
							<div className="font-weight-bold mt-3">
								<h2>CONFIRM CLOCK OUT</h2>
							</div>
						</div>
						<div className="font-weight-bold mt-5">
							<h4>HOURS DONE: {hours}</h4>
							<br />
							<h4>AMOUNT EARNED: {parseFloat(amount_earned()).toFixed(2)}</h4>
							<br />
							<h3>ROLE</h3>
							<div className="font-weight-bold text-primary">
								<h3>{targetEmployee.role}</h3>
							</div>
						</div>
						<div className="d-flex justify-content-between mt-5">
							<div className="mx-auto">
								<button
									type="button"
									className="btn btn-info"
									onClick={() => {
										history.push("/shifts");
									}}>
									GO BACK
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
