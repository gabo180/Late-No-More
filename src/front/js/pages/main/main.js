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

	const allHourlyRates = [];
	const allEmployees = store.employee.filter(employee => {
		return employee;
	});
	console.log(allEmployees);

	// const findShift = () => {
	// 	store.shift.filter(shift => {
	// 		const clockOutFormat = moment(shift.clock_out).format("YYYY-MM-DD");
	// 		return clockOutFormat === shiftDate;
	// 	});
	// };
	const findShift = store.shift.filter(shift => {
		const clockOutFormat = moment(shift.clock_out).format("YYYY-MM-DD");
		return clockOutFormat === shiftDate;
	});
	console.log("SHIFT", findShift);

	useEffect(
		() => {
			if (findShift) {
				const starting_time = moment(findShift.clock_in);
				const ending_time = moment(findShift.clock_out);
				const hoursWorked = ending_time.diff(starting_time, "hours", true);
				setHoursDone(hoursWorked);
			}
		},
		[shiftDate]
	);

	// if (findShift) {
	// 	const findRoleId = store.employee.filter(employee => {
	// 		employee.id == findShift.role_id;
	// 	});
	// 	console.log("ROLE ID", findRoleId);
	// }

	let sTime;
	let eTime;
	let allHours;
	const hoursArray = [];

	findShift.map(anObjectMapped => {
		(sTime = moment(anObjectMapped.clock_in)),
			(eTime = moment(anObjectMapped.clock_out)),
			(allHours = eTime.diff(sTime, "hours", true));
		hoursArray.push(allHours);
		return <p key={`${anObjectMapped.clock_in} ${anObjectMapped.clock_out}`}>{allHours}</p>;
	});

	// if (findRoleId) {
	// 	console.log("ALL ROLES", findRoleId);
	// }

	console.log("Hours Array", hoursArray);
	const hoursArrayToNumber = hoursArray.map(i => Number(i));
	console.log("Hours Array Numbers", hoursArrayToNumber);

	let sum = 0;

	for (let i = 0; i < hoursArrayToNumber.length; i++) {
		sum += hoursArrayToNumber[i];
	}
	console.log("SUMA TODAS LAS HORAS", sum);

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
							<h2 className="card-title">
								Hours Completed: <h3 className="text-success mt-2">{sum.toFixed(2)}</h3>
							</h2>
						</div>
						<h2 className="mt-4">Total Earnings: </h2>
					</div>
				</div>
			</div>
		</>
	);
};
