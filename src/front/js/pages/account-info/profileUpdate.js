import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../../store/appContext";
import userImage from "../../../img/userImage.jpg";
import "../../../styles/home.scss";

export const ProfileUpdate = () => {
	const { store, actions } = useContext(Context);
	const rgb = {
		boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)"
	};
	const [updateProfile, setUpdateProfile] = useState({
		name: store.profile.name,
		last_name: store.profile.last_name,
		username: store.profile.username,
		phone_number: store.profile.phone_number,
		email: store.profile.email,
		working_for: store.profile.working_for
	});
	const history = useHistory();
	console.log(updateProfile);
	const handleSubmit = event => {
		event.preventDefault();
		actions.updateProfile(updateProfile, history);
	};

	return (
		<div className="fadein-animation d-flex flex-column profile-container">
			<div className="d-flex justify-content-start role-container">
				<img className="user-img" src={userImage} />
				<div className="justify-content-start my-auto profile-name">
					<span>{store.profile.username}</span> <br /> <span>Role</span>
				</div>
				<div className="font-weight-bold screen-info" style={rgb}>
					Update
					<br />
					Information
				</div>
			</div>
			<form className="d-flex flex-column info-container" onSubmit={handleSubmit}>
				<div className="d-flex flex-column single-info-element">
					<span className="mr-auto ml-2">Username</span>{" "}
					<input
						onChange={e =>
							setUpdateProfile({
								...updateProfile,
								username: e.target.value
							})
						}
						value={updateProfile.username}
						className="form-control"
						placeholder={store.profile.username}
						type="text"
					/>
				</div>
				<div className="d-flex flex-column single-info-element">
					<span className="mr-auto ml-2">First name</span>{" "}
					<input
						onChange={e =>
							setUpdateProfile({
								...updateProfile,
								name: e.target.value
							})
						}
						value={updateProfile.name}
						className="form-control"
						placeholder={store.profile.name}
						type="text"
					/>
				</div>
				<div className="d-flex flex-column single-info-element">
					<span className="mr-auto ml-2">Last name</span>{" "}
					<input
						onChange={e =>
							setUpdateProfile({
								...updateProfile,
								last_name: e.target.value
							})
						}
						value={updateProfile.last_name}
						className="form-control"
						placeholder={store.profile.last_name}
						type="text"
					/>
				</div>
				<div className="d-flex flex-column single-info-element">
					<span className="mr-auto ml-2">Email address</span>{" "}
					<input
						onChange={e =>
							setUpdateProfile({
								...updateProfile,
								email: e.target.value
							})
						}
						value={updateProfile.email}
						className="form-control"
						placeholder={store.profile.email}
						type="text"
					/>
				</div>
				<div className="d-flex flex-column single-info-element">
					<span className="mr-auto ml-2">Phone number</span>{" "}
					<input
						onChange={e =>
							setUpdateProfile({
								...updateProfile,
								phone_number: e.target.value
							})
						}
						value={updateProfile.phone_number}
						className="form-control"
						placeholder={store.profile.phone_number}
						type="text"
					/>
				</div>
				<div>
					<span className="mr-auto ml-2">
						Update the company you
						{"'"}
						re working for:
					</span>{" "}
					<select
						className="custom-select"
						id="inputGroupSelect01"
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
				<button type="submit" className="btn btn-primary mb-2 px-5 my-2" value="edit">
					Submit
				</button>
			</form>
		</div>
	);
};
