import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../../../styles/home.scss";

export const SignUp = () => {
	const { store, actions } = useContext(Context);
	const [createProfile, setCreateProfile] = useState({
		name: "",
		last_name: "",
		username: "",
		phone_number: "",
		email: "",
		password: "",
		working_for: null
	});
	const history = useHistory();
	const handleSubmit = event => {
		event.preventDefault();
		actions.createProfile(createProfile, history);
	};

	return (
		<div className="text-center mb-5 pb-5">
			<h2>
				Welcome and thank you for choosing us!
				<br />
				Sign up so you can enjoy of our benefits <i className="far fa-thumbs-up" />
			</h2>
			<form className="mx-1 my-2" onSubmit={handleSubmit}>
				<div className="form-group mb-2">
					<input
						type="datetime"
						className="form-control"
						placeholder="First Name"
						onChange={e =>
							setCreateProfile({
								...createProfile,
								name: e.target.value
							})
						}
						value={createProfile.name}
					/>
				</div>
				<div className="form-group mx-sm-3 mb-2">
					<input
						type="text"
						className="form-control"
						placeholder="Last Name"
						onChange={e =>
							setCreateProfile({
								...createProfile,
								last_name: e.target.value
							})
						}
						value={createProfile.last_name}
					/>
				</div>
				<div className="form-group mx-sm-3 mb-2">
					<input
						type="text"
						className="form-control"
						placeholder="Phone Number"
						onChange={e =>
							setCreateProfile({
								...createProfile,
								phone_number: e.target.value
							})
						}
						value={createProfile.phone_number}
					/>
				</div>
				<div className="form-group mx-sm-3 mb-2">
					<input
						type="text"
						className="form-control"
						placeholder="Email"
						onChange={e =>
							setCreateProfile({
								...createProfile,
								email: e.target.value
							})
						}
						value={createProfile.email}
					/>
				</div>
				<div className="form-group mx-sm-3 mb-2">
					<input
						type="text"
						className="form-control"
						placeholder="Username"
						onChange={e =>
							setCreateProfile({
								...createProfile,
								username: e.target.value
							})
						}
						value={createProfile.username}
					/>
				</div>
				<div className="form-group mx-sm-3 mb-2">
					<input
						type="password"
						className="form-control"
						placeholder="Password"
						onChange={e =>
							setCreateProfile({
								...createProfile,
								password: e.target.value
							})
						}
						value={createProfile.password}
					/>
				</div>
				<span className="mr-auto ml-2">Select the company to work for:</span>{" "}
				<div className="input-group mb-3 mr-4 px-4">
					<select
						className="custom-select"
						id="inputGroupSelect01"
						onChange={e =>
							setCreateProfile({
								...createProfile,
								working_for: e.target.value
							})
						}
						value={createProfile.working_for}>
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
				<Link to="/">
					<button type="button" className="btn btn-danger my-4 mx-2" value="Sign up">
						Cancel
					</button>
				</Link>
				{/* <Link to="/"> */}
				<button type="submit" className="btn btn-info my-4 mx-2" value="Sign up">
					Submit
				</button>
			</form>
		</div>
	);
};
