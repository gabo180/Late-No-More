import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import userImage from "../../../img/userImage.jpg";
import "../../../styles/home.scss";
import { useHistory } from "react-router-dom";
import moment from "moment";

export const Main = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();
	const [shiftDate, setShiftDate] = useState("");
	const [hoursDone, setHoursDone] = useState("");
	const cardPStyle = {
		"border-bottom": "solid 5px red",
		"padding-bottom": "25%"
	};

	const findShift = store.shift.find(shift => {
		const clockOutFormat = moment(shift.clock_out).format("YYYY-MM-DD");
		return clockOutFormat === shiftDate;
	});

	useEffect(
		() => {
			if (findShift) {
				const starting_time = moment(findShift.clock_in);
				console.log(starting_time);
				const ending_time = moment(findShift.clock_out);
				console.log(ending_time);
				const hoursWorked = ending_time.diff(starting_time, "hours", true);
				setHoursDone(hoursWorked);
			}
		},
		[shiftDate]
	);

	console.log("HORAS", hoursDone);
	return (
		<>
			<div className="fadein-animation d-flex flex-column">
				<div className="d-flex justify-content-start mx-2">
					<img className="user-img" src={userImage} />
					<h4 className="justify-content-start my-auto">
						<span className="pl-2">{store.profile.username}</span> <br /> <span className="pr-5">Role</span>
					</h4>
				</div>
				<div className="card text-center mt-5 ml-5" style={{ width: "18rem", height: "25rem" }}>
					<input
						className="form-control"
						type="date"
						onChange={e => setShiftDate(e.target.value)}
						value={shiftDate}
					/>
					<div className="card-body">
						<div className="card-text" style={cardPStyle}>
							<h2 className="card-title">Hours Completed: {hoursDone}</h2>
						</div>
						<h2 className="mt-4">Total Earnings</h2>
					</div>
				</div>
			</div>
		</>
	);
};
