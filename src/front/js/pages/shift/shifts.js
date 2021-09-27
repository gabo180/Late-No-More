import React, { useContext, useState, useEffect } from "react";
import userImage from "../../../img/userImage.jpg";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { Context } from "../../store/appContext";
// import rigoImageUrl from "../../img/clock-(no-background).jpg";
import "../../../styles/home.scss";
import { Container, Card, Button, Nav, ListGroup, ListGroupItem } from "react-bootstrap";

export const Shifts = () => {
	const { store, actions } = useContext(Context);
	const [shift, setShift] = useState(null);
	const params = useParams();

	return (
		<div className="text-center pb-5">
			<div className="my-3">
				<div className="fadein-animation d-flex flex-column mb-5">
					<div className="d-flex justify-content-start mx-2">
						<img className="user-img" src={userImage} />
						<h4 className="justify-content-start my-auto">
							<span className="pl-2">{store.profile.username}</span> <br />{" "}
							<span className="pr-5">Role</span>
						</h4>
						<h1 className="mx-auto my-2 font-weight-bold">Shifts</h1>
					</div>
					<div className="d-flex justify-content-around">
						<Link to="/shifts/timesheet">
							<button type="submit" className="btn btn-primary mb-2 px-4 my-2" value="Log in">
								Timesheet
							</button>
						</Link>
						{store.profile.employer !== null ? (
							<Link to="/shifts/create-event">
								<button type="submit" className="btn btn-primary mb-2 px-4 my-2" value="Log in">
									+ Create shift
								</button>
							</Link>
						) : (
							undefined
						)}
					</div>
					<div>
						<table className="table">
							<thead>
								<tr>
									<th scope="rowgroup">{moment().format("ll")}</th>
									{/* TODO: change the format so it gives the date of the shifts */}
								</tr>
							</thead>
						</table>
						<table className="table">
							<thead>
								<tr>
									<th scope="col">Role</th>
									<th scope="col">Starting time</th>
									<th scope="col">Ending time</th>
									<th scope="col">Hours</th>
									<th scope="col" />
								</tr>
							</thead>
							<tbody>
								{store.shift &&
									store.shift.map((item, index) => {
										const starting_time = new Date(item.starting_time);
										const ending_time = new Date(item.ending_time);
										const hours_ending_time =
											ending_time.getUTCHours() + (ending_time.getUTCMinutes() * 100) / 60;
										const hours_starting_time =
											starting_time.getUTCHours() + (starting_time.getUTCMinutes() * 100) / 60;
										const hours = hours_ending_time - hours_starting_time;

										if (item.profile_id == store.profile.id)
											return (
												<tr key={index}>
													<td>
														{store.employee.map((i, ind) => {
															if (i.id === item.role_id) return i.role;
														})}
													</td>
													<td>
														{starting_time.getUTCHours()}:
														{starting_time.getUTCMinutes() < 10
															? "0" + starting_time.getUTCMinutes()
															: starting_time.getUTCMinutes()}
													</td>
													<td>
														{ending_time.getUTCHours()}:
														{ending_time.getUTCMinutes() < 10
															? "0" + starting_time.getUTCMinutes()
															: starting_time.getUTCMinutes()}
													</td>

													<td>{hours < 0 ? hours + 24 : hours}</td>
													{store.profile.employer === null ? (
														<td>
															<Link to={"/shifts/shift-info/" + item.id}>
																<i className="text-success fas fa-arrow-right" />
															</Link>
														</td>
													) : (
														<td>
															<i className="text-success far fa-edit" />
															<i
																className="text-danger far fa-trash-alt"
																onClick={() => actions.deleteSingleEmployee(item.id)}
															/>
														</td>
													)}
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
