import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import userImage from "../../../img/userImage.jpg";
import empty_profile from "../../../img/empty_profile.jpg";
import { Context } from "../../store/appContext";
import "../../../styles/home.scss";
import swal from "sweetalert";

export const ShiftEdit = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const [shift, setShift] = useState(undefined);
	const [updateSingleShift, setUpdateSingleShift] = useState({
		profile_id: "Choose...",
		role_id: "Choose...",
		starting_time: "Choose...",
		ending_time: "Choose..."
	});
	const history = useHistory();

	console.log("single shift", updateSingleShift);

	const handleSubmit = event => {
		event.preventDefault();
		if (updateSingleShift.role_id === "Choose...") return swal("Missing role!");
		else if (updateSingleShift.profile_id === "Choose...") return swal("Missing employee!");
		else if (updateSingleShift.starting_time === "Choose...") return swal("Missing starting time!");
		else if (updateSingleShift.ending_time === "Choose...") return swal("Missing ending time!");
		else return actions.updateShift(updateSingleShift, history, shift.id);
	};

	useEffect(() => {
		actions.loadSingleShift(params.shift_id).then(shift => setShift(shift));
	}, []);

	if (!shift)
		return (
			<div className="spinner-border mx-auto my-auto text-primary mb-5" role="status">
				<span className="sr-only">Loading shift...</span>
			</div>
		);
	console.log("shift credentials", shift);
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
							Update <br /> Shift
						</h2>
					</div>
					<h2 className="my-3 text-danger">Make sure to place all the information</h2>
					<form className="d-flex flex-column mx-auto" onSubmit={handleSubmit}>
						<div className="my-2 d-flex flex-column mr-auto">
							<span className="mr-auto ml-2">Change role for the shift</span>{" "}
							<div className="input-group mb-3 ml-4 ">
								<select
									className="custom-select"
									id="inputGroupSelect01"
									onChange={e =>
										setUpdateSingleShift({
											...updateSingleShift,
											role_id: e.target.value
										})
									}
									value={updateSingleShift.role_id}>
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
							<span className="mr-auto ml-2">Change employee for the shift</span>{" "}
							<div className="input-group mb-3 ml-4 ">
								<select
									className="custom-select"
									id="inputGroupSelect01"
									onChange={e =>
										setUpdateSingleShift({
											...updateSingleShift,
											profile_id: e.target.value
										})
									}
									value={updateSingleShift.profile_id}>
									<option selected>Choose...</option>
									{store.allProfiles &&
										store.allProfiles.map((item, index) => {
											if (item.working_for === store.profile.employer)
												return (
													<option key={index} value={item.id}>
														{item.name + " " + item.last_name}
													</option>
												);
										})}
								</select>
							</div>
						</div>
						<div className="my-2 d-flex flex-column mx-auto">
							<span className="mr-auto ml-2">Change starting date and time:</span>{" "}
							<input
								className="ml-4 form-control"
								type="datetime-local"
								onChange={e =>
									setUpdateSingleShift({
										...updateSingleShift,
										starting_time: e.target.value
									})
								}
								value={updateSingleShift.starting_time}
							/>
						</div>
						<div className="my-2 d-flex flex-column mx-auto">
							<span className="mr-auto ml-2">Change ending date and time:</span>{" "}
							<input
								className="ml-4 form-control"
								type="datetime-local"
								onChange={e =>
									setUpdateSingleShift({
										...updateSingleShift,
										ending_time: e.target.value
									})
								}
								value={updateSingleShift.ending_time}
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
