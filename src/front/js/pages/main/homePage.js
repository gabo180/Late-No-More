import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../../../styles/home.scss";
import { Card } from "react-bootstrap";

export const HomePage = () => {
	const { actions } = useContext(Context);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	return (
		<div className="pb-5 mb-5 text-center mb-5 pb-5">
			<div className="d-flex justify-content-end mx-1 my-1">
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
				<Link to="/sign-up">
					<button type="submit" className="btn btn-success ml-2" value="Sign up">
						Signup
					</button>
				</Link>
			</div>
			<div className="my-3">
				<div className="fadein-animation d-flex">
					<div className="position-try">
						<sapn className="font-title">LateNoMore APP</sapn>
						<br />
						<sapn className="font-body text-justify">
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
								<i className="far fa-clock font-size-xl" />
							</Card.Title>
							<Card.Title>Clock In/Out</Card.Title>
							<Card.Text>
								Be able to register when your employees make clock in and out from their shift and have
								a .
							</Card.Text>
						</Card.Body>
						<Card.Body>
							<Card.Link href="#" className="btn shade-button text-white">
								Card Link
							</Card.Link>
						</Card.Body>
					</Card>
				</div>
				<div className="mx-auto my-2">
					<Card style={{ width: "18rem" }} className="shade-color3 border-0 fadein-animation">
						<Card.Body>
							<Card.Title>
								<i className="fas fa-book font-size-xl" />
							</Card.Title>
							<Card.Title>Card Title</Card.Title>
							<Card.Text>
								Some quick example text to build on the card title and make up the bulk of the card
								{"'"}s content.
							</Card.Text>
						</Card.Body>
						<Card.Body>
							<Card.Link href="#" className="btn shade-button text-white">
								Card Link
							</Card.Link>
						</Card.Body>
					</Card>
				</div>
				<div className="mx-auto my-2">
					<Card style={{ width: "18rem" }} className="shade-color3 border-0 fadein-animation">
						<Card.Body>
							<Card.Title>
								<i className="fas fa-user-cog font-size-xl" />
							</Card.Title>
							<Card.Title>Card Title</Card.Title>
							<Card.Text>
								Some quick example text to build on the card title and make up the bulk of the card
								{"'"}s content.
							</Card.Text>
						</Card.Body>
						<Card.Body>
							<Card.Link href="#" className="btn shade-button text-white">
								Card Link
							</Card.Link>
						</Card.Body>
					</Card>
				</div>
				<div className="mx-auto my-2 mb-5">
					<Card style={{ width: "18rem" }} className="shade-color3 border-0 fadein-animation">
						<Card.Body>
							<Card.Title>
								<i className="fas fa-globe font-size-xl" />
							</Card.Title>
							<Card.Title>Card Title</Card.Title>
							<Card.Text>
								Some quick example text to build on the card title and make up the bulk of the card
								{"'"}s content.
							</Card.Text>
						</Card.Body>
						<Card.Body>
							<Card.Link href="#" className="btn shade-button text-white">
								Card Link
							</Card.Link>
						</Card.Body>
					</Card>
				</div>
			</div>
			<div />
		</div>
	);
};
