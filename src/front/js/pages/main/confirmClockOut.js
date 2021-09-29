import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/home.scss";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import userImage from "../../../img/userImage.jpg";
import moment from "moment";

export const ConfirmClockOut = () => {
	const { store, actions } = useContext(Context);
	const [shift, setShift] = useState(undefined);
	const history = useHistory();
	const params = useParams();

	useEffect(() => {
		actions.loadSingleShift(params.shift_id).then(shift => setShift(shift));
	}, []);

	if (!shift)
		return (
			<div className="spinner-border" role="status">
				<span className="sr-only">Loading shift...</span>
			</div>
		);

	const targetEmployee = store.employee.find(employee => employee.id == shift.role_id);
	const starting_time = moment(shift.clock_in);
	const ending_time = moment();
	const hours_done = ending_time.diff(starting_time, "hours", true);
	const amount_earned = () => {
		if (targetEmployee) {
			return hours_done * targetEmployee.hourly_rate;
		}
	};

	return (
		<div className="text-center">
			<div className="my-3">
				<div className="fadein-animation d-flex flex-column">
					<div className="d-flex justify-content-start mx-2">
						<div>
							<img className="user-img" src={userImage} />
						</div>
						<div>
							<h4 className="justify-content-start my-auto">
								<span className="pl-2">{store.profile.username}</span> <br />{" "}
								<span className="pr-5">Role</span>
							</h4>
						</div>
					</div>
					<div>
						<div className="font-weight-bold mt-3">
							<h2>CONFIRM CLOCK OUT</h2>
						</div>
					</div>
					<div className="font-weight-bold mt-5">
						<h4>HOURS DONE: {parseFloat(hours_done).toFixed(2)}</h4>
						<br />
						<h4>AMOUNT EARNED: {parseFloat(amount_earned()).toFixed(2)}</h4>
						<br />
						<h3>ROLE</h3>
						<div className="font-weight-bold text-primary">
							<h3>{targetEmployee && targetEmployee.role}</h3>
						</div>
					</div>
					<div className="font-weight-bold mt-5">
						<h2>END SHIFT</h2>
					</div>
					<div className="d-flex justify-content-between mt-2">
						<div>
							<button
								type="button"
								className="btn btn-success ml-5"
								onClick={() => {
									actions.doClockOut(shift.id);
									setTimeout(
										() => {
											history.push("/home");
											history.go(0);
										},
										[200]
									);
								}}>
								Yes
							</button>
						</div>
						<div>
							<button
								type="button"
								className="btn btn-danger mr-5"
								onClick={() => {
									history.push("/shifts");
								}}>
								No
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
