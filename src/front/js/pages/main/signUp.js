import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
// import rigoImageUrl from "../../img/clock-(no-background).jpg";
import "../../../styles/home.scss";
import { Container, Card, Button, Nav, ListGroup, ListGroupItem } from "react-bootstrap";

export const SignUp = () => {
	const { store, actions } = useContext(Context);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	return (
		<div className="text-center">
			<form
				className=""
				// onSubmit={e => {
				// 	e.preventDefault();
				// 	actions.login(username, password);
				// }}
			>
				<div className="form-group mb-2">
					<input
						type="text"
						className="form-control"
						placeholder="First Name"
						// onChange={e => setUsername(e.target.value)}
						// value={username}
					/>
				</div>
				<div className="form-group mx-sm-3 mb-2">
					<input
						type="text"
						className="form-control"
						placeholder="Last Name"
						// onChange={e => setPassword(e.target.value)}
						// value={password}
					/>
				</div>
				<div className="form-group mx-sm-3 mb-2">
					<input
						type="text"
						className="form-control"
						placeholder="Password"
						// onChange={e => setPassword(e.target.value)}
						// value={password}
					/>
				</div>
				<div className="form-group mx-sm-3 mb-2">
					<input
						type="text"
						className="form-control"
						placeholder="Password"
						// onChange={e => setPassword(e.target.value)}
						// value={password}
					/>
				</div>
				<div className="form-group mx-sm-3 mb-2">
					<input
						type="text"
						className="form-control"
						placeholder="Password"
						// onChange={e => setPassword(e.target.value)}
						// value={password}
					/>
				</div>
				<div className="form-group mx-sm-3 mb-2">
					<input
						type="text"
						className="form-control"
						placeholder="Password"
						// onChange={e => setPassword(e.target.value)}
						// value={password}
					/>
				</div>
				<div className="form-group mx-sm-3 mb-2">
					<input
						type="password"
						className="form-control"
						placeholder="Password"
						// onChange={e => setPassword(e.target.value)}
						// value={password}
					/>
				</div>
				<div className="form-group mx-sm-3 mb-2">
					<input
						type="password"
						className="form-control"
						placeholder="Password"
						// onChange={e => setPassword(e.target.value)}
						// value={password}
					/>
				</div>
			</form>
			<div>
				<Link to="/">
					<button type="submit" className="btn btn-danger mb-2" value="Sign up">
						Cancel
					</button>
				</Link>
				<Link to="/confirm-email">
					<button type="submit" className="btn btn-info mb-2" value="Sign up">
						Submit
					</button>
				</Link>
			</div>
		</div>
	);
};
