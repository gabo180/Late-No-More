import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../../../styles/home.scss";
import { Card } from "react-bootstrap";
import logo from "../../../img/logo.png";

export const HomePage = () => {
	const { actions } = useContext(Context);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	return (
		<div className="pb-5 mb-5 text-center mb-5 pb-5 fadein-animation">
			<div className="d-flex flex-column mx-1 mt-3">
				<form
					className="d-flex justify-content-around"
					onSubmit={e => {
						e.preventDefault();
						actions.login(username, password, history);
					}}>
					<div className="form-group mb-2">
						<input
							type="text"
							className="form-control"
							placeholder="Username"
							onChange={e => setUsername(e.target.value)}
							value={username}
						/>
					</div>
					<div className="form-group mx-sm-3 mb-2">
						<input
							type="password"
							className="form-control"
							placeholder="Password"
							onChange={e => setPassword(e.target.value)}
							value={password}
						/>
					</div>
					{/* <Link to="/home"> */}
					<button type="submit" className="btn btn-primary mb-2" value="Log in">
						Login
					</button>
					{/* </Link> */}
				</form>
				<img src="" />
				<div>
					<span>Dont have an account?</span>
					<Link to="/sign-up">
						<button type="submit" className="btn btn-success ml-2" value="Sign up">
							Signup
						</button>
					</Link>
				</div>
			</div>
			<img src={logo} />
			<div className="mb-3">
				<div className="d-flex flex-column">
					<div className="position-try">
						<br />
						<sapn className=" text-dark font-body text-justify">
							LateNoMore APP has been brought to you to ensure that your workers feel on a safe place
							regarding their job, you can control clock-in and clock-out and manage payments and wages so
							they can be aware of what
							{"'"}s going on.{" "}
						</sapn>
					</div>
				</div>
			</div>
			<div className="mx-auto d-flex flex-wrap text-white">
				<div className="mx-auto my-2">
					<Card style={{ width: "18rem" }} className="shade-color3 border-0 fadein-animation">
						<Card.Body>
							<Card.Title>
								<i className="fas fa-user-cog font-size-xl" />
							</Card.Title>
							<Card.Title>Create and manage your company</Card.Title>
							<Card.Text className="text-justify">
								Be able to create a company and then manage it as you like by creating shifts and keep
								records of the hours and payments that you have made.
							</Card.Text>
						</Card.Body>
					</Card>
				</div>
				<div className="mx-auto my-2">
					<Card style={{ width: "18rem" }} className="shade-color3 border-0 fadein-animation">
						<Card.Body>
							<Card.Title>
								<i className="far fa-clock font-size-xl" />
							</Card.Title>
							<Card.Title>Clock In/Out</Card.Title>
							<Card.Text className="text-justify">
								Be able to register when you or your employees make clock in and out from their shift.
							</Card.Text>
						</Card.Body>
					</Card>
				</div>
				<div className="mx-auto my-2">
					<Card style={{ width: "18rem" }} className="shade-color3 border-0 fadein-animation">
						<Card.Body>
							<Card.Title>
								<i className="fas fa-book font-size-xl" />
							</Card.Title>
							<Card.Title>Record</Card.Title>
							<Card.Text className="text-justify">
								Keep records of every shift, clock In/Out and earnings that you or your emplolyees have
								made since they joined your company.
							</Card.Text>
						</Card.Body>
					</Card>
				</div>
				<div className="mx-auto my-2 mb-5">
					<Card style={{ width: "18rem" }} className="shade-color3 border-0 fadein-animation">
						<Card.Body>
							<Card.Title>
								<i className="fas fa-globe font-size-xl" />
							</Card.Title>
							<Card.Title>Universal</Card.Title>
							<Card.Text className="text-justify">
								Everyone can join your company easily from around the world, just invite them or tell
								them to join and all set.
							</Card.Text>
						</Card.Body>
					</Card>
				</div>
			</div>
			<div />
		</div>
	);
};
