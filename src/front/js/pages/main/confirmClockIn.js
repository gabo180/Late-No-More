import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/home.scss";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import userImage from "../../../img/userImage.jpg";
import empty_profile from "../../../img/empty_profile.jpg";
import moment from "moment";

export const ConfirmClockIn = () => {
	const { store, actions } = useContext(Context);
	const [shift, setShift] = useState(undefined);
	const history = useHistory();
	const params = useParams();

	useEffect(() => {
		actions.loadSingleShift(params.shift_id).then(shift => setShift(shift));
	}, []);

	if (!shift)
		return (
			<div className="spinner-border mx-auto my-auto text-primary" role="status">
				<span className="sr-only">Loading shift...</span>
			</div>
		);

	const targetEmployee = store.employee.find(employee => employee.id == shift.role_id);
	const starting_time = moment(shift.starting_time);
	const ending_time = moment(shift.ending_time);
	const expected_hours = ending_time.diff(starting_time, "hours", true);
	const expected_earnings = () => {
		if (targetEmployee) {
			return expected_hours * targetEmployee.hourly_rate;
		}
	};

	return (
		<div className="fadein-animation d-flex flex-column mb-5 pb-5">
			<div className="d-flex justify-content-start mx-2 my-3">
				<img className="user-img" src={store.profile.employer !== null ? userImage : empty_profile} />
				<h4 className="justify-content-start mt-2">
					<span className="ml-3">{store.profile.username}</span> <br />{" "}
					<span className="ml-3">{store.profile.employer === null ? "Employee" : "Employer"}</span>
				</h4>
				<button
					type="button"
					className="btn ml-auto mr-2 my-auto text-white icon-size"
					onClick={() => {
						actions.doClockIn(shift.id);
						setTimeout(
							() => {
								history.push("/home");
								history.go(0);
							},
							[500]
						);
					}}>
					<i className="fas fa-sign-in-alt text-white btn-success rounded-circle shadow rounded-sm px-4 py-4" />
				</button>
			</div>
			<div className="text-center">
				<div className="my-3">
					<div>
						<div className="font-weight-bold mt-3">
							<h2>CONFIRM SHIFT</h2>
						</div>
					</div>
					<div className="font-weight-bold mt-5">
						<h4>EXPECTED HOURS: {parseFloat(expected_hours).toFixed(2)}</h4>
						<br />
						<h4>EXPECTED EARNINGS: {parseFloat(expected_earnings()).toFixed(2)}</h4>
						<br />
						<h3>ROLE</h3>
						<div className="font-weight-bold text-primary">
							<h3>{targetEmployee && targetEmployee.role}</h3>
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
	);
};
