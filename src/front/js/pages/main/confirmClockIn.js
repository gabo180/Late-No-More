import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
// import rigoImageUrl from "../../img/clock-(no-background).jpg";
import "../../../styles/home.scss";
import { Container, Card, Button, Nav, ListGroup, ListGroupItem } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Link, useParams } from "react-router-dom";

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

	return (
		<>
			<div className="container d-flex justify-content-center w-100">
				<div className="row">
					<div className="col">
						<img
							src="https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png"
							className="img-thumbnail rounded-circle"
							alt="..."
						/>
					</div>
					<div className="col">
						<h3>{store.profile.username}</h3>
						<h3>roll</h3>
					</div>
					<div className="col">
						<button type="button" className="btn btn-primary">
							Clock In/Out
						</button>
					</div>
				</div>
			</div>
			<div className="container border border-dark m-3">
				<div className="row">
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
				<div className="row">
					<div className="col-6">
						<h3>Earned!</h3>
					</div>
					<div className="col-6">
						<h3>Hours!</h3>
					</div>
				</div>
			</div>
		</>
	);
};
