import React, { useContext } from "react";
import { Link } from "react-router-dom";
import userImage from "../../../img/userImage.jpg";
import { Context } from "../../store/appContext";
import "../../../styles/home.scss";

export const Settings = () => {
	const { store } = useContext(Context);

	return (
		<div className="text-center">
			<div className="my-3">
				<div className="fadein-animation d-flex flex-column">
					<div className="d-flex justify-content-start mx-2">
						<img className="user-img" src={userImage} />
						<h4 className="justify-content-start my-auto">
							<span className="pl-2">{store.profile.username}</span> <br />{" "}
							<span className="pl-2">{store.profile.employer === null ? "Employee" : "Employer"}</span>
						</h4>
						<h2 className=" my-2 font-weight-boldc mx-auto">Settings</h2>
					</div>
					<div className="position-try">
						<ul className="text-primary mx-3">
							<li>
								<span to="/settings/about" className="d-flex justify-content-start">
									<button type="submit" className="font-navbar text-dark btn my-2" value="Sign up">
										<h2>About</h2>
									</button>
								</span>
							</li>
							<li>
								<span to="/settings/help" className="d-flex justify-content-start">
									<button
										type="submit"
										className="font-navbar text-dark btn mt-1 border-top"
										value="Sign up">
										<h2>Help</h2>
									</button>
								</span>
							</li>
						</ul>
						<span>
							<Link to="/" className="d-flex justify-content-start">
								<button type="submit" className="font-navbar text-danger btn mt-4" value="Sign up">
									<h2>Sign Out</h2>
								</button>
							</Link>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
