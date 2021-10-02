import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import userImage from "../../../img/userImage.jpg";
import "../../../styles/home.scss";
import empty_profile from "../../../img/empty_profile.jpg";

export const Profile = () => {
	const { store } = useContext(Context);
	return (
		<div className="text-center mb-5 pb-5">
			<div className="fadein-animation d-flex flex-column  mb-5 pb-5">
				<div className="d-flex justify-content-start mx-2 my-3">
					<img className="user-img" src={store.profile.employer !== null ? userImage : empty_profile} />
					<h4 className="justify-content-start my-auto">
						<span className="pl-2">{store.profile.username}</span> <br />{" "}
						<span className="pl-2">{store.profile.employer === null ? "Employee" : "Employer"}</span>
					</h4>
					<h3 className="mx-auto my-2 font-weight-bold">
						Update
						<br />
						Information
					</h3>
				</div>
				<form className="d-flex flex-column mr-auto">
					<div className="my-2 d-flex flex-column mx-auto">
						<span className="mr-auto ml-2">Username</span>{" "}
						<input
							className="ml-4 form-control"
							placeholder={store.profile.username}
							type="text"
							disabled
						/>
					</div>
					<div className="my-2 d-flex flex-column mr-auto">
						<span className="mr-auto ml-2">First name</span>{" "}
						<input className="ml-4 form-control" placeholder={store.profile.name} type="text" disabled />
					</div>
					<div className="my-2 d-flex flex-column mr-auto">
						<span className="mr-auto ml-2">Last name</span>{" "}
						<input
							className="ml-4 form-control"
							placeholder={store.profile.last_name}
							type="text"
							disabled
						/>
					</div>
					<div className="my-2 d-flex flex-column mr-auto">
						<span className="mr-auto ml-2">Email address</span>{" "}
						<input className="ml-4 form-control" placeholder={store.profile.email} type="text" disabled />
					</div>
					<div className="my-2 d-flex flex-column mr-auto">
						<span className="mr-auto ml-2">Password</span>{" "}
						<input className="ml-4 form-control" type="password" disabled />
					</div>
					<div className="my-2 d-flex flex-column mr-auto">
						<span className="mr-auto ml-2">Phone number</span>{" "}
						<input
							className="ml-4 form-control"
							placeholder={store.profile.phone_number}
							type="text"
							disabled
						/>
					</div>
				</form>
				<Link key={0} to={"/account/profile/" + 0 + "/update"}>
					<button type="submit" className="btn btn-primary mb-2 px-5 my-5" value="Log in">
						Edit
					</button>
				</Link>
			</div>
		</div>
	);
};
