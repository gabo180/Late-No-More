import React, { useContext } from "react";
import userImage from "../../../img/userImage.jpg";
import { Context } from "../../store/appContext";
import "../../../styles/home.scss";

export const Timesheet = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mb-5 pb-5">
			<div className="my-3 mb-5 pb-5">
				<div className="fadein-animation d-flex flex-column mb-4">
					<div className="d-flex justify-content-start mx-2 my-2">
						<img className="user-img" src={userImage} />
						<h4 className="justify-content-start my-auto">
							<span className="pl-2">{store.profile.username}</span> <br />{" "}
							<span className="pr-5">Role</span>
						</h4>
						<h2 className="mx-auto my-auto font-weight-bold">Timesheet</h2>
					</div>
					{/* TODO: filter dates */}
					{/* <form className="">
						<span className="font-weight-bold">Select period</span>
						<div className="">
							<input className="form-control" type="date" />
						</div>{" "}
						<span className="font-weight-bold">to</span>
						<div className="">
							<input className="form-control" type="date" />
						</div>
					</form> */}
					<div className="">
						<table className="table container table-striped">
							<thead>
								<tr>
									<th scope="col">Date</th>
									{store.profile.employer !== null ? <th scope="col">Name</th> : null}
									<th scope="col">Role</th>
									<th scope="col">H/W</th>
									<th scope="col">$$</th>
								</tr>
							</thead>
							<tbody>
								{store.shift &&
									store.shift.map((item, index) => {
										const startingTime = new Date(item.clock_in);
										const endingTime = new Date(item.clock_out);
										const month = startingTime.getUTCMonth();
										const day = startingTime.getUTCDate();
										const year = startingTime.getUTCFullYear();
										const date = month + "/" + day + "/" + year;
										const hoursStartingTime =
											startingTime.getUTCHours() + startingTime.getUTCMinutes() / 60;
										const hoursEndingTime =
											endingTime.getUTCHours() + endingTime.getUTCMinutes() / 60;
										const totalHours =
											Math.round((hoursEndingTime - hoursStartingTime) * 100) / 100;
										if (item.profile_id === store.profile.id && item.clock_out !== null)
											return (
												<tr key={index}>
													<th scope="row">{date}</th>
													<td>
														{store.employee.map((i, ind) => {
															if (i.id === item.role_id) return i.role;
														})}
													</td>
													<td>{totalHours}</td>
													<td>
														{store.employee.map((i, ind) => {
															if (i.id === item.role_id)
																return (totalHours * i.hourly_rate).toFixed(2);
														})}
													</td>
												</tr>
											);
										else if (item.employer_id === store.profile.employer && item.clock_out !== null)
											return (
												<tr key={index}>
													<td scope="row">{date}</td>
													<td scope="row">
														{store.allProfiles.map((i, ind) => {
															if (i.id === item.profile_id)
																return `${i.name + " " + i.last_name}`;
														})}
													</td>
													<td>
														{store.employee.map((i, ind) => {
															if (i.id === item.role_id) return i.role;
														})}
													</td>
													<td>{totalHours}</td>
													<td>
														{store.employee.map((i, ind) => {
															if (i.id === item.role_id)
																return (totalHours * i.hourly_rate).toFixed(2);
														})}
													</td>
												</tr>
											);
										else null;
									})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};
