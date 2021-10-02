import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../../../styles/home.scss";
import userImage from "../../../img/userImage.jpg";
import empty_profile from "../../../img/empty_profile.jpg";

export const Account = () => {
	const { store } = useContext(Context);
	return (
		<div className="text-center">
			<div className="my-3 mb-5 pb-5">
				<div className="fadein-animation d-flex flex-column">
					<div className="d-flex justify-content-start mx-2">
						<img className="user-img" src={store.profile.employer !== null ? userImage : empty_profile} />
						<h4 className="justify-content-start my-auto">
							<span className="pl-2">{store.profile.username}</span> <br />{" "}
							<span className="pl-2">{store.profile.employer === null ? "Employee" : "Employer"}</span>
						</h4>
						<h1 className="mx-auto my-2 font-weight-bold">Account</h1>
					</div>
					<div className="position-try mt-3">
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
										<h2>{store.profile.employer !== null ? "Manage company" : "Create company"}</h2>
									</button>
								</Link>
							</li>
							{store.profile.employer !== null ? (
								<li className="mx-auto">
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
