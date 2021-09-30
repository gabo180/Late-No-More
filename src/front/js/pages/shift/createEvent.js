import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import userImage from "../../../img/userImage.jpg";
import empty_profile from "../../../img/empty_profile.jpg";
import { Context } from "../../store/appContext";
import "../../../styles/home.scss";
import swal from "sweetalert";

export const CreateEvent = () => {
	const { store, actions } = useContext(Context);
	const [createShift, setCreateShift] = useState({
		profile_id: "Choose...",
		role_id: "Choose...",
		starting_time: "Choose...",
		ending_time: "Choose...",
		employer_id: store.profile.employer
	});
	const history = useHistory();
	const handleSubmit = event => {
		event.preventDefault();
		if (createShift.role_id === "Choose...") return swal("Missing role!");
		else if (createShift.profile_id === "Choose...") return swal("Missing employee!");
		else if (createShift.starting_time === "Choose...") return swal("Missing starting time!");
		else if (createShift.ending_time === "Choose...") return swal("Missing ending time!");
		else return actions.createShift(createShift, history);
	};

	return (
		<div className="text-center mb-5 pb-5">
			<div className="my-3">
				<div className="fadein-animation d-flex flex-column">
					<div className="d-flex justify-content-start mx-2">
						<img className="user-img" src={store.profile.employer !== null ? userImage : empty_profile} />
						<h4 className="justify-content-start my-auto">
							<span className="pl-2">{store.profile.username}</span> <br />{" "}
							<span className="pl-2">{store.profile.employer === null ? "Employee" : "Employer"}</span>
						</h4>
						<h2 className="mx-auto my-auto font-weight-bold">
							Create <br /> Shift
						</h2>
					</div>
					<form className="d-flex flex-column mx-auto" onSubmit={handleSubmit}>
						<div className="my-2 d-flex flex-column mr-auto">
							<span className="mr-auto ml-2">Select role for the shift</span>{" "}
							<div className="input-group mb-3 ml-4 ">
								<select
									className="custom-select"
									id="inputGroupSelect01"
									onChange={e =>
										setCreateShift({
											...createShift,
											role_id: e.target.value
										})
									}
									value={createShift.role_id}>
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
										setCreateShift({
											...createShift,
											profile_id: e.target.value
										})
									}
									value={createShift.profile_id}>
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
									setCreateShift({
										...createShift,
										starting_time: e.target.value
									})
								}
								value={createShift.starting_time}
							/>
						</div>
						<div className="my-2 d-flex flex-column mx-auto">
							<span className="mr-auto ml-2">Select ending date and time:</span>{" "}
							<input
								className="ml-4 form-control"
								type="datetime-local"
								onChange={e =>
									setCreateShift({
										...createShift,
										ending_time: e.target.value
									})
								}
								value={createShift.ending_time}
							/>
						</div>
						<div className="ml-2 d-flex justify-content-around">
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
