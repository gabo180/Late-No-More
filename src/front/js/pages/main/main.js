import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import userImage from "../../../img/userImage.jpg";
import "../../../styles/home.scss";
import moment from "moment";

export const Main = () => {
	const { store } = useContext(Context);
	const [shiftDate, setShiftDate] = useState("");
	const cardPStyle = {
		"border-bottom": "solid 5px red",
		"padding-bottom": "25%"
	};

	const findShift =
		store.shift.length > 0 &&
		store.shift.filter(shift => {
			const clockOutFormat = moment(shift.clock_out).format("YYYY-MM-DD");
			return clockOutFormat === shiftDate;
		});

	let sTime;
	let eTime;
	let allHours;
	let amountEarned;
	const hoursArray = [];
	const amountEarnedArray = [];

	findShift &&
		findShift.map(item => {
			(sTime = moment(item.clock_in)),
				(eTime = moment(item.clock_out)),
				(allHours = eTime.diff(sTime, "hours", true)),
				hoursArray.push(allHours);
			amountEarned = parseFloat(item.earned);
			amountEarnedArray.push(amountEarned);
		});

	const hoursArrayToNumber = hoursArray.map(i => Number(i));

	let sumHours = 0;
	for (let i = 0; i < hoursArrayToNumber.length; i++) {
		sumHours += hoursArrayToNumber[i];
	}

	let sumEarnings = 0;
	for (let i = 0; i < amountEarnedArray.length; i++) {
		sumEarnings += amountEarnedArray[i];
	}

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
								Hours Completed: <h2 className="text-success mt-2">{sumHours.toFixed(2)}</h2>
							</h2>
						</div>
						<h2>Total Earnings: </h2>
						<h2 className="mt-4 text-success">{`${sumEarnings.toFixed(2)} $`}</h2>
					</div>
				</div>
			</div>
		</>
	);
};
