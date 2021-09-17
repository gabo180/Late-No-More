import React, { useContext } from "react";
import userImage from "../../../img/userImage.jpg";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
// import rigoImageUrl from "../../img/clock-(no-background).jpg";
import "../../../styles/home.scss";
import { Container, Card, Button, Nav, ListGroup, ListGroupItem } from "react-bootstrap";

export const Timesheet = () => {
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
						<h2 className="mx-auto my-auto font-weight-bold">Timesheet</h2>
					</div>
					<form className="">
						<span className="font-weight-bold">Select period</span>
						<div className="">
							<input className="form-control" type="date" />
						</div>{" "}
						<span className="font-weight-bold">to</span>
						<div className="">
							<input className="form-control" type="date" />
						</div>
					</form>
					<div className="my-2">
						<table className="table">
							<thead>
								<tr>
									<th scope="col">Date</th>
									<th scope="col">Role</th>
									<th scope="col">Hours worked</th>
									<th scope="col">Earnings</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th scope="row">12/20/2020</th>
									<td>Mark</td>
									<td>Otto</td>
									<td>Otto</td>
								</tr>
								<tr>
									<th scope="row">12/20/2020</th>
									<td>Jacob</td>
									<td>Thornton</td>
									<td>Otto</td>
								</tr>
								<tr>
									<th scope="row">12/20/2020</th>
									<td>Larry</td>
									<td>the Bird</td>
									<td>Otto</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};
