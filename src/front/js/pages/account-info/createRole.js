import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import userImage from "../../../img/userImage.jpg";
import { Context } from "../../store/appContext";
import "../../../styles/home.scss";
import empty_profile from "../../../img/empty_profile.jpg";

export const CreateRole = () => {
	const { store, actions } = useContext(Context);
	const [fields, setFields] = useState({
		role: "",
		hourly_rate: "",
		employer_id: store.profile.employer
	});
	const history = useHistory();
	const handleSubmit = event => {
		event.preventDefault();
		actions.createEmployee(fields, history);
	};

	return (
		<div className="text-center mb-5 pb-5">
			<div className="my-3 mb-5 pb-5">
				<div className="fadein-animation d-flex flex-column">
					<div className="d-flex justify-content-start mx-2">
						<img className="user-img" src={store.profile.employer !== null ? userImage : empty_profile} />
						<h4 className="justify-content-start my-auto">
							<span className="pl-2">{store.profile.username}</span> <br />{" "}
							<span className="pl-2">{store.profile.employer === null ? "Employee" : "Employer"}</span>
						</h4>
						<h2 className="mx-auto my-auto font-weight-bold">
							Create <br /> Role
						</h2>
					</div>
					<form className="d-flex flex-column mx-auto" onSubmit={handleSubmit}>
						<div className="my-3 d-flex flex-column mx-auto">
							<span className="mr-auto">Role name:</span>{" "}
							<input
								className="form-control"
								type="text"
								onChange={e =>
									setFields({
										...fields,
										role: e.target.value
									})
								}
								value={fields.role}
							/>
						</div>
						<div className="d-flex flex-column mx-auto mb-4">
							<span className="mr-auto">Hourly rate:</span>{" "}
							<input
								className="form-control"
								type="text"
								onChange={e =>
									setFields({
										...fields,
										hourly_rate: e.target.value
									})
								}
								value={fields.hourly_rate}
							/>
						</div>
						<div className="d-flex justify-content-around">
							<Link to="/account">
								<button type="submit" className="btn btn-primary mb-2 px-4 my-2 mx-3" value="Log in">
									Cancel
								</button>
							</Link>
							{/* <Link to="/shifts"> */}
							<button type="submit" className="btn btn-success mb-2 px-4 my-2 mx-3" value="Log in">
								Submit
							</button>
							{/* </Link> */}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
