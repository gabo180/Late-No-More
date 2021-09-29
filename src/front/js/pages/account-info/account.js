import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../../../styles/home.scss";
import userImage from "../../../img/userImage.jpg";

export const Account = () => {
	const { store } = useContext(Context);
	return (
		<div className="text-center">
			<div className="my-3">
				<div className="fadein-animation d-flex flex-column">
					<div>
						<div className="d-flex justify-content-start">
							<img className="user-img" src={userImage} />
							<h4 className="justify-content-start my-auto pl-2">
								<span>{store.profile.username}</span> <br />{" "}
								<span>{store.profile.employer === null ? "Employee" : "Employer"}</span>
							</h4>
						</div>

						<br />
						<h1 className="mx-auto mb-2 font-weight-bold">Account</h1>
					</div>
					<div className="position-try">
						<ul className="text-primary mx-3">
							<li key={0}>
								<Link to={"/account/profile/" + 0}>
									<button type="submit" className="font-navbar text-dark btn my-2" value="Sign up">
										<h2>Update information</h2>
									</button>
								</Link>
							</li>
							<li>
								<Link to="/account/company-profile">
									<button
										type="submit"
										className="font-navbar text-dark btn my-2 border-bottom border-top"
										value="Sign up">
										<h2>Manage or crate company</h2>
									</button>
								</Link>
							</li>
							{store.profile.employer !== null ? (
								<li>
									<Link to="/account/roles">
										<button
											type="submit"
											className="font-navbar text-dark btn my-2"
											value="Sign up">
											<h2>Manage roles</h2>
										</button>
									</Link>
								</li>
							) : (
								undefined
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
