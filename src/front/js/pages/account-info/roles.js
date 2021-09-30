import React, { useContext } from "react";
import userImage from "../../../img/userImage.jpg";
import { Context } from "../../store/appContext";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import empty_profile from "../../../img/empty_profile.jpg";
import "../../../styles/home.scss";

export const Roles = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

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
						<h2 className="ml-4 my-2 font-weight-bold">
							Manage
							<br />
							Roles
						</h2>
					</div>
					<div>
						<table className="table">
							<thead>
								<tr>
									<th scope="col" />
									<th scope="col">Role</th>
									<th scope="col">Hourly rate</th>
								</tr>
							</thead>
							<tbody>
								{store.employee &&
									store.employee.map((item, index) => {
										if (item.employer_id === store.profile.employer)
											return (
												<tr key={index}>
													<td>
														<i
															className="text-danger far fa-trash-alt"
															onClick={() =>
																swal({
																	title: "Are you sure?",
																	text:
																		"Once deleted, you will not be able to recover this role!",
																	icon: "warning",
																	buttons: true,
																	dangerMode: true
																}).then(willDelete => {
																	if (willDelete) {
																		actions.updateEmployee(item.id, {
																			employer_id: null
																		});
																		swal(
																			"Your role has been deleted succesfully!",
																			{
																				icon: "success"
																			}
																		);
																	} else {
																		swal("Your role is safe!");
																	}
																})
															}
														/>
													</td>
													<td>{item.role}</td>
													<td>{item.hourly_rate}</td>
												</tr>
											);
									})}
							</tbody>
						</table>
						<div className="d-flex justify-content-around">
							<Link to="/account/create-role">
								<button type="button" className="btn btn-primary mb-2 px-5 my-2">
									{" "}
									Create
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
