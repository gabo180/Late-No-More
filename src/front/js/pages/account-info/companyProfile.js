import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import userImage from "../../../img/userImage.jpg";
import { Context } from "../../store/appContext";
import "../../../styles/home.scss";

export const CompanyProfile = () => {
	const { store, actions } = useContext(Context);
	const [fields, setFields] = useState("");

	const history = useHistory();
	const handleSubmit = event => {
		event.preventDefault();
		actions.createEmployer({ company_name: fields }, history);
		setTimeout(
			() => {
				actions.updateProfile({ employer: fields });
			},
			[1000]
		);
	};

	return (
		<div className="text-center fadein-animation">
			<div className="d-flex mx-2">
				<img className="user-img" src={userImage} />
				<h4 className="justify-content-start my-auto">
					<span className="pl-2">{store.profile.username}</span> <br />{" "}
					<span className="mr-5">
						{store.profile.employer === null ? "Employee" : store.profile.employer}
					</span>
				</h4>
				<h2 className="ml-4 my-2 font-weight-bold">
					Manage
					<br />
					Company
				</h2>
			</div>
			<form className="d-flex flex-column mr-auto" onSubmit={handleSubmit}>
				<div className="mt-4 d-flex flex-column mr-5">
					<span className="mr-auto ml-2">Select company name:</span>{" "}
					<input
						onChange={e => setFields(e.target.value)}
						value={fields}
						className="ml-4 form-control"
						type="text"
					/>
				</div>
				<div className="justify-content-start my-auto">
					<Link to="/">
						<button type="button" className="btn btn-danger mx-2" value="Sign up">
							Cancel
						</button>
					</Link>
					{/* <Link to="/"> */}
					<button type="submit" className="btn btn-info mx-2" value="Sign up">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};
