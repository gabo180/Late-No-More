import React, { useContext, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import userImage from "../../../img/userImage.jpg";
import { Context } from "../../store/appContext";
import "../../../styles/home.scss";

export const CreateEvent = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const [fields, setFields] = useState({
		role_id: "",
		starting_time: "",
		ending_time: "",
		employer_id: store.profile.employer
	});
	console.log(fields);
	const history = useHistory();
	const handleSubmit = event => {
		event.preventDefault();
		actions.createShift(fields, history);
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
						<div className="my-2 d-flex flex-column mr-auto">
							<span className="mr-auto ml-2">Select role for the shift</span>{" "}
							<div className="input-group mb-3 ml-4 ">
								<select
									className="custom-select"
									id="inputGroupSelect01"
									onChange={e =>
										setFields({
											...fields,
											role_id: e.target.value
										})
									}
									value={fields.role_id}>
									<option selected>Choose...</option>
									{store.employee &&
										store.employee.map((item, index) => {
											if (item.employer_id === store.profile.employer)
												return (
													<option key={index} value={item.id}>
														{item.role}
													</option>
												);
										})}
								</select>
							</div>
						</div>
						<div className="my-2 d-flex flex-column mr-auto">
							<span className="mr-auto ml-2">Select employee for the shift</span>{" "}
							<div className="input-group mb-3 ml-4 ">
								<select
									className="custom-select"
									id="inputGroupSelect01"
									onChange={e =>
										setFields({
											...fields,
											profile_id: e.target.value
										})
									}
									value={fields.profile_id}>
									<option selected>Choose...</option>
									{store.allProfiles &&
										store.allProfiles.map((item, index) => {
											if (item.working_for === store.profile.employer)
												return (
													<option key={index} value={item.id}>
														{item.name} {item.last_name}
													</option>
												);
										})}
								</select>
							</div>
						</div>
						<div className="my-2 d-flex flex-column mx-auto">
							<span className="mr-auto ml-2">Select starting date and time:</span>{" "}
							<input
								className="ml-4 form-control"
								type="datetime-local"
								onChange={e =>
									setFields({
										...fields,
										starting_time: e.target.value
									})
								}
								value={fields.starting_time}
							/>
						</div>
						<div className="my-2 d-flex flex-column mx-auto">
							<span className="mr-auto ml-2">Select ending date and time:</span>{" "}
							<input
								className="ml-4 form-control"
								type="datetime-local"
								onChange={e =>
									setFields({
										...fields,
										ending_time: e.target.value
									})
								}
								value={fields.ending_time}
							/>
						</div>
						<div className="ml-5 d-flex justify-content-around">
							<Link to="/shifts">
								<button type="submit" className="btn btn-primary mb-2 px-4 my-2" value="Log in">
									Cancel
								</button>
							</Link>
							{/* <Link to="/shifts"> */}
							<button type="submit" className="btn btn-success mb-2 px-4 my-2" value="Log in">
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
