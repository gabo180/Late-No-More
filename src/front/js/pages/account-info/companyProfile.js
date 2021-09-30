import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import userImage from "../../../img/userImage.jpg";
import { Context } from "../../store/appContext";
import "../../../styles/home.scss";
import empty_profile from "../../../img/empty_profile.jpg";

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
			[200]
		);
	};

	if (store.profile.employer === null)
		return (
			<div className="text-center mb-5 pb-5">
				<div className="my-3 mb-5 pb-5">
					<div className="text-center fadein-animation">
						<div className="d-flex justify-content-start mx-2 my-3">
							<img
								className="user-img"
								src={store.profile.employer !== null ? userImage : empty_profile}
							/>
							<h4 className="justify-content-start my-auto">
								<span className="pl-2">{store.profile.username}</span> <br />{" "}
								<span className="pl-2">
									{store.profile.employer === null ? "Employee" : "Employer"}
								</span>
							</h4>
							<h2 className="mx-auto my-2 font-weight-bold">
								Manage
								<br />
								Company
							</h2>
						</div>
						<form className="d-flex flex-column mr-auto" onSubmit={handleSubmit}>
							<div className="mt-2 d-flex flex-column mr-5 mb-5">
								<span className="mr-auto ml-2">Create company name:</span>{" "}
								<input
									onChange={e => setFields(e.target.value)}
									value={fields}
									className="ml-4 form-control"
									type="text"
								/>
							</div>
							<div className="justify-content-start my-auto my-4">
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
				</div>
			</div>
		);
	else
		return (
			<div className="text-center mb-5 pb-5">
				<div className="my-3 mb-5 pb-5">
					<div className="text-center fadein-animation">
						<div className="d-flex justify-content-start mx-2">
							<img className="user-img" src={userImage} />
							<h4 className="justify-content-start my-auto">
								<span className="pl-2">{store.profile.username}</span> <br />{" "}
								<span className="pl-2">
									{store.profile.employer === null ? "Employee" : "Employer"}
								</span>
							</h4>
							<h2 className="mx-auto my-2 font-weight-bold">
								Manage
								<br />
								Company
							</h2>
						</div>

						<h2 className="mx-auto mt-4 mb-3">{store.profile.employer}</h2>

						<table className="table container">
							<thead>
								<tr>
									<th scope="col">Employee Name</th>
									<th scope="col" />
								</tr>
							</thead>
							<tbody>
								{store.allProfiles &&
									store.allProfiles.map((item, index) => {
										console.log(item.working_for);
										if (item.working_for !== store.profile.employer) return undefined;
										else
											return (
												<tr scope="row" key={index}>
													<td>{item.name + " " + item.last_name}</td>
													<td className="d-flex justify-content-around">
														<i
															className="text-danger far fa-trash-alt"
															onClick={() =>
																swal({
																	title: "Are you sure?",
																	text: `${item.name +
																		" " +
																		item.last_name} won't have acces to your company anymore!`,
																	icon: "warning",
																	buttons: true,
																	dangerMode: true
																}).then(willDelete => {
																	if (willDelete) {
																		actions.updateEmployeeProfile(
																			item.id,
																			{ working_for: null },
																			history
																		);
																		setTimeout(
																			() => {
																				history.push("/account");
																				history.go(0);
																			},
																			[200]
																		);
																	} else {
																		swal(
																			`${item.name +
																				" " +
																				item.last_name} is safe!`
																		);
																	}
																})
															}
														/>
													</td>
												</tr>
											);
									})}
							</tbody>
						</table>

						<spam className="d-flex justify-content-start mt-5">
							<button
								onClick={() =>
									swal({
										title: "Are you sure?",
										text: "Once deleted, you will not be able to recover this role!",
										icon: "warning",
										buttons: true,
										dangerMode: true
									}).then(willDelete => {
										if (willDelete) {
											actions.deleteSingleEmployer(
												store.employer.map((item, index) => {
													if (item.company_name === store.profile.employer) return item.id;
												}),
												history
											);
											swal("Your company has been deleted succesfully!", {
												icon: "success"
											});
										} else {
											swal("Your company file is safe!");
										}
									})
								}
								type="submit"
								className="font-navbar text-danger btn mt-4 mx-auto"
								value="Sign up">
								<h2>DELETE COMPANY</h2>
							</button>
						</spam>
					</div>
				</div>
			</div>
		);
};
