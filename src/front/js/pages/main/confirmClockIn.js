import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/home.scss";
import { Container, Card, Button, Nav, ListGroup, ListGroupItem } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import userImage from "../../../img/userImage.jpg";
import moment from "moment";

export const ConfirmClockIn = () => {
	const { store, actions } = useContext(Context);
	const [shift, setShift] = useState(null);
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

	console.log("ESTE ES EL SHIFT", shift);
	const starting_time = moment(shift.starting_time);
	const ending_time = moment(shift.ending_time);
	console.log("MINUTOS", starting_time);
	// const hours_ending_time = ending_time.getUTCHours() + ending_time.getUTCMinutes() / 60;
	// const hours_starting_time = starting_time.getUTCHours() + starting_time.getUTCMinutes() / 60;
	// const expected_hours = hours_ending_time - hours_starting_time;
	console.log(ending_time.diff(starting_time, "hours", true));
	const expected_hours = ending_time.diff(starting_time, "hours", true); //******** THIS ONE WORKS TO KNOW THE EXPECTED HOURS *******
	console.log(ending_time.diff(starting_time, "minutes"));

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
						<div className="font-weight-bold">CONFIRM SHIFT</div>
					</div>
					<div>EXPECTED HOURS {expected_hours}</div>
					<div>START SHIFT</div>
					<div className="d-flex justify-content-between">
						<div>
							<button
								type="button"
								className="btn btn-success"
								onClick={() => {
									actions.setIsClockIn();
									actions.doClockIn(shift.id);
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

{
	/* <div className="text-center">
			<div className="my-3">
				<div className="fadein-animation d-flex flex-column">
					<div className="d-flex justify-content-start mx-2 row">
						<img className="user-img" src={userImage} />
						<h4 className="justify-content-start my-auto">
							<span className="pl-2">{store.profile.username}</span> <br />{" "}
							<span className="pr-5">Role</span>
						</h4>
						<h3 className="mx-2 my-2 font-weight-bold">
							Confirm
							<br />
							Shift
						</h3>
					</div>
					<div className="d-flex flex-column mr-auto row">EXPECTED HOLURS</div>
					<div className="d-flex mr-auto row">
						<div className="col-6">
							<button
								type="button"
								className="btn btn-success"
								onClick={() => {
									actions.setIsClockIn();
									actions.doClockIn(shift.id);
									history.push("/home");
								}}>
								Yes
							</button>
						</div>
						<div className="col-6">
							<button
								type="button"
								className="btn btn-danger"
								onClick={() => {
									history.push("/shifts");
								}}>
								No
							</button>
						</div>
					</div>
				</div>
			</div>
		</div> */
}
