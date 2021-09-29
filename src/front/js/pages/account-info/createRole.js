import React, { useContext, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import userImage from "../../../img/userImage.jpg";
import { Context } from "../../store/appContext";
import "../../../styles/home.scss";

export const CreateRole = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const [fields, setFields] = useState({
		role: "",
		hourly_rate: "",
		employer_id: store.profile.employer
	});
	console.log(fields);
	const history = useHistory();
	const handleSubmit = event => {
		event.preventDefault();
		actions.createEmployee(fields, history);
	};

	return (
		<div className="text-center">
			<div className="my-3">
				<div className="fadein-animation d-flex flex-column">
					<div className="d-flex justify-content-start mx-2">
						<img className="user-img" src={userImage} />
						<h4 className="justify-content-start my-auto">
							<span className="pl-2">{store.profile.username}</span> <br />{" "}
							<span className="pr-5">Role</span>
						</h4>
						<h2 className="mx-auto my-auto font-weight-bold">
							Create <br /> Shift
						</h2>
					</div>
					<form className="d-flex flex-column mr-auto" onSubmit={handleSubmit}>
						<div className="my-2 d-flex flex-column mx-auto">
							<span className="mr-auto ml-2">Role name:</span>{" "}
							<input
								className="ml-4 form-control"
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
						<div className=" d-flex flex-column mx-auto">
							<span className="mr-auto ml-2">Hourly rate:</span>{" "}
							<input
								className="ml-4 form-control"
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
						<div className="ml-5 d-flex justify-content-around">
							<Link to="/shifts">
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
