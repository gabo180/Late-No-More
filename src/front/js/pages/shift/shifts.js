import React, { useContext } from "react";
import userImage from "../../../img/userImage.jpg";
import { Link } from "react-router-dom";
import moment from "moment";
import { Context } from "../../store/appContext";
// import rigoImageUrl from "../../img/clock-(no-background).jpg";
import "../../../styles/home.scss";
import { Container, Card, Button, Nav, ListGroup, ListGroupItem } from "react-bootstrap";

export const Shifts = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center">
			<div className="my-3">
				<div className="fadein-animation d-flex flex-column">
					<div className="d-flex justify-content-start mx-2">
						<img className="user-img" src={userImage} />
						<h4 className="justify-content-start my-auto">
							<span className="pl-2">Username</span> <br /> <span className="pr-5">Role</span>
						</h4>
						<h1 className="mx-auto my-2 font-weight-bold">Shifts</h1>
					</div>
					<div className="d-flex justify-content-around">
						<Link to="/shifts/timesheet">
							<button type="submit" className="btn btn-primary mb-2 px-4 my-2" value="Log in">
								Timesheet
							</button>
						</Link>
						<Link to="/shifts/create-event">
							<button type="submit" className="btn btn-primary mb-2 px-4 my-2" value="Log in">
								+ Create shift
							</button>
						</Link>
					</div>
					<div>
						<table className="table">
							<thead>
								<tr>
									<th scope="rowgroup">{moment().format("ll")}</th>
								</tr>
							</thead>
							<tbody>
								{store.shift.map((item, index) => {
									return (
										<Link key={index} to={"/shifts/shift-info/" + index}>
											<tr>
												<td>
													<i className="text-success far fa-edit" />{" "}
													<i className="text-danger far fa-trash-alt" />
												</td>
												<td>{item.role}</td>
												<td>{item.ending_time}</td>
												<td>{item.starting_time}</td>
												<td>{item.hours}</td>
											</tr>
										</Link>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};
