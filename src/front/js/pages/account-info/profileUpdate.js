import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../../store/appContext";
import userImage from "../../../img/userImage.jpg";
import "../../../styles/home.scss";
import empty_profile from "../../../img/empty_profile.jpg";

export const ProfileUpdate = () => {
	const { store, actions } = useContext(Context);

	const [updateProfile, setUpdateProfile] = useState({
		name: store.profile.name,
		last_name: store.profile.last_name,
		username: store.profile.username,
		phone_number: store.profile.phone_number,
		email: store.profile.email,
		working_for: store.profile.working_for
	});
	const history = useHistory();
	const handleSubmit = event => {
		event.preventDefault();
		actions.updateProfile(updateProfile, history);
	};

	return (
		<div className="text-center mb-5 pb-5">
			<div className="fadein-animation d-flex flex-column mb-5 pb-5">
				<div className="d-flex justify-content-start mx-2 my-3">
					<img className="user-img" src={store.profile.employer !== null ? userImage : empty_profile} />
					<h4 className="justify-content-start my-auto">
						<span className="pl-2">{store.profile.username}</span> <br />{" "}
						<span className="pl-2">{store.profile.employer === null ? "Employee" : "Employer"}</span>
					</h4>
					<h2 className="mx-auto my-2 font-weight-bold">
						Update
						<br />
						Profile
					</h2>
				</div>
				<form className="d-flex flex-column mr-auto" onSubmit={handleSubmit}>
					<div className="my-2 d-flex flex-column mx-auto">
						<span className="mr-auto ml-2">Username</span>{" "}
						<input
							onChange={e =>
								setUpdateProfile({
									...updateProfile,
									username: e.target.value
								})
							}
							value={updateProfile.username}
							className="ml-4 form-control"
							placeholder={store.profile.username}
							type="text"
						/>
					</div>
					<div className="my-2 d-flex flex-column mx-auto">
						<span className="mr-auto ml-2">First name</span>{" "}
						<input
							onChange={e =>
								setUpdateProfile({
									...updateProfile,
									name: e.target.value
								})
							}
							value={updateProfile.name}
							className="ml-4 form-control"
							placeholder={store.profile.name}
							type="text"
						/>
					</div>
					<div className="my-2 d-flex flex-column mx-auto">
						<span className="mr-auto ml-2">Last name</span>{" "}
						<input
							onChange={e =>
								setUpdateProfile({
									...updateProfile,
									last_name: e.target.value
								})
							}
							value={updateProfile.last_name}
							className="ml-4 form-control"
							placeholder={store.profile.last_name}
							type="text"
						/>
					</div>
					<div className="my-2 d-flex flex-column mx-auto">
						<span className="mr-auto ml-2">Email address</span>{" "}
						<input
							onChange={e =>
								setUpdateProfile({
									...updateProfile,
									email: e.target.value
								})
							}
							value={updateProfile.email}
							className="ml-4 form-control"
							placeholder={store.profile.email}
							type="text"
						/>
					</div>
					<div className="my-2 d-flex flex-column mx-auto">
						<span className="mr-auto ml-2">Phone number</span>{" "}
						<input
							onChange={e =>
								setUpdateProfile({
									...updateProfile,
									phone_number: e.target.value
								})
							}
							value={updateProfile.phone_number}
							className="ml-4 form-control"
							placeholder={store.profile.phone_number}
							type="text"
						/>
					</div>
					<div className="my-2 d-flex flex-column mx-auto">
						<span className="mr-auto ml-2">
							Update the company you
							{"'"}
							re working for:
						</span>{" "}
						<select
							className="ml-4 form-control"
							onChange={e =>
								setUpdateProfile({
									...updateProfile,
									working_for: e.target.value
								})
							}
							value={updateProfile.working_for}>
							<option selected>Choose...</option>
							{store.employer &&
								store.employer.map((item, index) => {
									return (
										<option key={index} value={item.company_name}>
											{item.company_name}
										</option>
									);
								})}
						</select>
					</div>
					<button
						onClick={() => {
							setTimeout(
								() => {
									history.push("/account");
									history.go(0);
								},
								[200]
							);
						}}
						type="submit"
						className="btn btn-primary mb-2 my-5 ml-auto px-5 mr-2"
						value="edit">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};
