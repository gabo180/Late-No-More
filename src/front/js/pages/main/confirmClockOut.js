import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/home.scss";
import { Container, Card, Button, Nav, ListGroup, ListGroupItem } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import userImage from "../../../img/userImage.jpg";
import moment from "moment";

export const ConfirmClockOut = () => {
	const { store, actions } = useContext(Context);
	const [shift, setShift] = useState("");
	const history = useHistory();
	const params = useParams();
	// const [amountEarned, setAmountEarned] = useState(undefined);
	// const [hours, setHours] = useState(undefined);

	useEffect(() => {
		actions.loadSingleShift(params.shift_id).then(shift => setShift(shift));
	}, []);

	const roleId = shift.role_id;
	console.log("ESTE ES EL SHIFT", roleId);

	const targetEmployee = store.employee.find(employee => employee.id == roleId);
	console.log("Target Employee", targetEmployee);

	if (!shift)
		return (
			<div className="spinner-border" role="status">
				<span className="sr-only">Loading shift...</span>
			</div>
		);

	console.log("ESTE ES EL SHIFT", shift);
	const starting_time = moment(shift.clock_in);
	const ending_time = moment();
	console.log("ENDING TIME", ending_time);
	console.log(ending_time.diff(starting_time, "hours", true));
	const hours_done = ending_time.diff(starting_time, "hours", true);
	const amount_earned = () => {
		if (targetEmployee) {
			return hours_done * targetEmployee.hourly_rate;
		}
	};
	console.log("HOURS DONE", hours_done);
	console.log("AMOUNT EARNED", amount_earned());

	// useEffect(
	// 	() => {
	// 		if (shift && shift.clock_out) {
	// 			const roleId = shift.role_id;
	// 			console.log("ROLE ID", roleId);
	// 			const targetEmployee = store.employee.find(employee => employee.id == roleId);
	// 			console.log("TARGET EMPLOYEE", targetEmployee);
	// 			const starting_time = moment(shift.clock_in);
	// 			const ending_time = moment(shift.clock_out);
	// 			console.log("HOURS DONE", ending_time.diff(starting_time, "hours", true));
	// 			const hours_done = ending_time.diff(starting_time, "hours", true); //******** THIS ONE WORKS TO KNOW THE EXPECTED HOURS *******
	// 			setHours(hours_done);
	// 			if (targetEmployee) {
	// 				setAmountEarned(amount_earned(hours_done, targetEmployee.hourly_rate));
	// 			}
	// 		}
	// 	},
	// 	[shift]
	// );

	// const amount_earned = (hours, hourly_rate) => {
	// 	return hours * hourly_rate;
	// };

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
						<div className="font-weight-bold">CONFIRM CLOCK OUT</div>
					</div>
					<div>
						HOURS DONE {hours_done}
						<br />
						AMOUNT EARNED {amount_earned()}
					</div>
					<div>END SHIFT</div>
					<div className="d-flex justify-content-between">
						<div>
							<button
								type="button"
								className="btn btn-success"
								onClick={() => {
									actions.setIsClockIn();
									actions.doClockOut(shift.id);
									history.push("/home");
								}}>
								Yes
							</button>
						</div>
						<div>
							<button
								type="button"
								className="btn btn-danger"
								onClick={() => {
									history.push("/home");
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
