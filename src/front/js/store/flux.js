const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			myURL: "https://3001-moccasin-leech-cqixhw04.ws-us18.gitpod.io/api",

			// messagesAuthor: [],
			// messagesRecipient: [],
			shift: [],
			// TODO: rename shift to allShifts
			profile: {},
			allProfiles: [],
			employee: [],
			employer: []
		},

		actions: {
			initializeFunction: () => {
				getActions().loadAllProfile();
				getActions().loadProfile();
				getActions().loadShift();
				getActions().loadEmployer();
				getActions().loadEmployee();
				// getActions().loadMessageAuthor();
				// getActions().loadMessageRecipient();
			},
			//TODO: add return to all asyncs fucntions

			//  PROFILE

			loadAllProfile: async () => {
				const endPoint = "/profile";
				const token = localStorage.getItem("jwt-token");
				try {
					const response = await fetch(`${getStore().myURL}${endPoint}`, {
						method: "GET",
						headers: { Authorization: "Bearer " + token }
					});
					const data = await response.json();
					setStore({ allProfiles: data });
				} catch (error) {
					throw new Error(error);
				}
			},

			loadProfile: async () => {
				const endPoint = "/profile/singleProfile";
				const token = localStorage.getItem("jwt-token");
				try {
					const response = await fetch(`${getStore().myURL}${endPoint}`, {
						method: "GET",
						headers: { Authorization: "Bearer " + token }
					});
					const data = await response.json();
					setStore({ profile: data });
				} catch (error) {
					throw new Error(error);
				}
			},

			createProfile: async (profileCredentials, history) => {
				const endPoint = "/profile";
				const token = localStorage.getItem("jwt-token");
				try {
					const response = await fetch(`${getStore().myURL}${endPoint}`, {
						method: "POST",
						headers: {
							Authorization: "Bearer " + token,
							"Content-Type": "application/json"
						},
						body: JSON.stringify(profileCredentials)
					});
					const data = await response.json();
					if (response.ok) {
						history.push("/");
					}
				} catch (error) {
					throw new Error(error);
				}
			},

			updateProfile: async (profileCredentials, history) => {
				const endPoint = "/profile";
				const token = localStorage.getItem("jwt-token");
				try {
					const response = await fetch(`${getStore().myURL}${endPoint}`, {
						method: "PUT",
						headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
						body: JSON.stringify(profileCredentials)
					});
					const data = await response.json();
					if (data.ok) {
						setStore({ profile: data });
					}
				} catch (error) {
					throw new Error(error);
				}
			},

			updateEmployeeProfile: async (profile_id, profileCredentials, history) => {
				const endPoint = "/profile/" + profile_id;
				const token = localStorage.getItem("jwt-token");
				try {
					const response = await fetch(`${getStore().myURL}${endPoint}`, {
						method: "PUT",
						headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
						body: JSON.stringify(profileCredentials)
					});
					const data = await response.json();
					if (data.ok) {
						setStore({ allProfiles: data });
						history.push("/account");
						history.go(0);
					}
				} catch (error) {
					throw new Error(error);
				}
			},

			//  SHIFTS

			loadShift: async () => {
				const endPoint = "/shift";
				const token = localStorage.getItem("jwt-token");
				try {
					const response = await fetch(`${getStore().myURL}${endPoint}`, {
						method: "GET",
						headers: { Authorization: "Bearer " + token }
					});
					const data = await response.json();
					setStore({ shift: data });
					return data;
				} catch (error) {
					throw new Error(error);
				}
			},

			loadSingleShift: async shift_id => {
				const endPoint = "/shift/" + shift_id;
				const token = localStorage.getItem("jwt-token");
				try {
					const response = await fetch(`${getStore().myURL}${endPoint}`, {
						method: "GET",
						headers: { Authorization: "Bearer " + token }
					});
					const data = await response.json();
					return data;
				} catch (error) {
					throw new Error(error);
				}
			},

			createShift: async (shiftCredentials, history) => {
				const endPoint = "/shift";
				const token = localStorage.getItem("jwt-token");
				try {
					const response = await fetch(`${getStore().myURL}${endPoint}`, {
						method: "POST",
						headers: {
							Authorization: "Bearer " + token,
							"Content-Type": "application/json"
						},
						body: JSON.stringify(shiftCredentials)
					});
					const data = await response.json();
					if (response.ok) {
						history.push("/shifts");
						history.go(0);
					}
				} catch (error) {
					throw new Error(error);
				}
			},

			updateShift: async (shiftCredentials, history, shift_id) => {
				const endPoint = "/shift/" + shift_id;
				const token = localStorage.getItem("jwt-token");
				try {
					const response = await fetch(`${getStore().myURL}${endPoint}`, {
						method: "PUT",
						headers: {
							Authorization: "Bearer " + token,
							"Content-Type": "application/json"
						},
						body: JSON.stringify(shiftCredentials)
					});
					const data = await response.json();
					if (response.ok) {
						setStore({ shift: data });
						setTimeout(
							() => {
								setTimeout(
									() => {
										history.go(0);
									},
									[100]
								);
								history.push("/shifts");
							},
							[300]
						);
					}
				} catch (error) {
					throw new Error(error);
				}
			},

			deleteSingleShift: async shift_id => {
				const endPoint = "/shift/" + shift_id;
				const token = localStorage.getItem("jwt-token");
				try {
					const response = await fetch(`${getStore().myURL}${endPoint}`, {
						method: "DELETE",
						headers: { Authorization: "Bearer " + token }
					});
					const data = await response.json();
					setStore({ shift: data });
				} catch (error) {
					throw new Error(error);
				}
			},

			doClockIn: async shift_id => {
				const token = localStorage.getItem("jwt-token");
				try {
					const response = await fetch(`${getStore().myURL}/shift/${shift_id}/CI`, {
						method: "PUT",
						headers: { Authorization: "Bearer " + token }
					});
					const data = await response.json();
					if (data.ok) {
						setStore({ shift: data });
					}
					return data;
				} catch (error) {
					throw new Error(error);
				}
			},

			doClockOut: async shift_id => {
				const token = localStorage.getItem("jwt-token");
				try {
					const response = await fetch(`${getStore().myURL}/shift/${shift_id}/CO`, {
						method: "PUT",
						headers: { Authorization: "Bearer " + token }
					});
					const data = await response.json();
					setStore({ shift: data });
				} catch (error) {
					throw new Error(error);
				}
			},

			setIsClockIn: () => {
				const clockIn = getStore().isClockIn;
				setStore({ isClockIn: !clockIn });
			},

			//  EMPLOYER

			loadEmployer: async () => {
				const endPoint = "/employer";
				const token = localStorage.getItem("jwt-token");
				try {
					const response = await fetch(`${getStore().myURL}${endPoint}`, {
						method: "GET",
						headers: { Authorization: "Bearer " + token }
					});
					const data = await response.json();
					setStore({ employer: data });
				} catch (error) {
					throw new Error(error);
				}
			},

			loadSingleEmployer: async employer_id => {
				const endPoint = "/employer/" + employer_id;
				const token = localStorage.getItem("jwt-token");
				try {
					const response = await fetch(`${getStore().myURL}${endPoint}`, {
						method: "GET",
						headers: { Authorization: "Bearer " + token }
					});
					const data = await response.json();
					return data;
				} catch (error) {
					throw new Error(error);
				}
			},

			createEmployer: async (employerCredentials, history) => {
				const endPoint = "/employer";
				const token = localStorage.getItem("jwt-token");
				try {
					const response = await fetch(`${getStore().myURL}${endPoint}`, {
						method: "POST",
						headers: {
							Authorization: "Bearer " + token,
							"Content-Type": "application/json"
						},
						body: JSON.stringify(employerCredentials)
					});
					const data = await response.json();
					if (response.ok) {
						setTimeout(
							() => {
								history.push("/account");
								history.go(0);
							},
							[500]
						);
					}
					return data;
				} catch (error) {
					throw new Error(error);
				}
			},

			updateEmployer: async employer_id => {
				const endPoint = "/employer/" + employer_id;
				const token = localStorage.getItem("jwt-token");
				try {
					const response = await fetch(`${getStore().myURL}${endPoint}`, {
						method: "PUT",
						headers: {
							Authorization: "Bearer " + token,
							"Content-Type": "application/json"
						}
					});
					const data = await response.json();
					if (data.ok) {
						setStore({ employer: data });
					}
				} catch (error) {
					throw new Error(error);
				}
			},

			deleteSingleEmployer: async (employer_id, history) => {
				const endPoint = "/employer/" + employer_id;
				const token = localStorage.getItem("jwt-token");
				try {
					const response = await fetch(`${getStore().myURL}${endPoint}`, {
						method: "DELETE",
						headers: { Authorization: "Bearer " + token }
					});
					const data = await response.json();
					setStore({ employer: data });
					setTimeout(
						() => {
							history.go(0);
						},
						[200]
					);
				} catch (error) {
					throw new Error(error);
				}
			},

			//  EMPLOYEE

			loadEmployee: async () => {
				const endPoint = "/employee";
				const token = localStorage.getItem("jwt-token");
				try {
					const response = await fetch(`${getStore().myURL}${endPoint}`, {
						method: "GET",
						headers: { Authorization: "Bearer " + token }
					});
					const data = await response.json();
					setStore({ employee: data });
				} catch (error) {
					throw new Error(error);
				}
			},

			loadSingleEmployee: async employee_id => {
				const endPoint = "/employee/" + employee_id;
				const token = localStorage.getItem("jwt-token");
				try {
					const response = await fetch(`${getStore().myURL}${endPoint}`, {
						method: "GET",
						headers: { Authorization: "Bearer " + token }
					});
					const data = await response.json();
					return data;
				} catch (error) {
					throw new Error(error);
				}
			},

			createEmployee: async (employeeCredentials, history) => {
				const endPoint = "/employee";
				const token = localStorage.getItem("jwt-token");
				try {
					const response = await fetch(`${getStore().myURL}${endPoint}`, {
						method: "POST",
						headers: {
							Authorization: "Bearer " + token,
							"Content-Type": "application/json"
						},
						body: JSON.stringify(employeeCredentials)
					});
					const data = await response.json();
					if (response.ok) {
						history.push("/account/roles");
						history.go(0);
					}
					return data;
				} catch (error) {
					throw new Error(error);
				}
			},

			updateEmployee: async (employee_id, employeeCredentials) => {
				const endPoint = "/employee/" + employee_id;
				const token = localStorage.getItem("jwt-token");
				try {
					const response = await fetch(`${getStore().myURL}${endPoint}`, {
						method: "PUT",
						headers: {
							Authorization: "Bearer " + token,
							"Content-Type": "application/json"
						},
						body: JSON.stringify(employeeCredentials)
					});
					const data = await response.json();
					if (response.ok) {
						setStore({ employee: data });
					}
				} catch (error) {
					throw new Error(error);
				}
			},

			deleteSingleEmployee: async employee_id => {
				const endPoint = "/employee/" + employee_id;
				const token = localStorage.getItem("jwt-token");
				try {
					const response = await fetch(`${getStore().myURL}${endPoint}`, {
						method: "DELETE",
						headers: { Authorization: "Bearer " + token }
					});
					const data = await response.json();
					setStore({ employee: data });
				} catch (error) {
					throw new Error(error);
				}
			},

			//  MESSAGES

			loadMessageAuthor: async () => {
				const endPoint = "/messages-author";
				const token = localStorage.getItem("jwt-token");
				try {
					const response = await fetch(`${getStore().myURL}${endPoint}`, {
						method: "GET",
						headers: { Authorization: "Bearer " + token }
					});
					const data = await response.json();
					setStore({ messagesAuthor: data });
				} catch (error) {
					throw new Error(error);
				}
			},

			loadMessageRecipient: async () => {
				const endPoint = "/messages-recipient";
				const token = localStorage.getItem("jwt-token");
				try {
					const response = await fetch(`${getStore().myURL}${endPoint}`, {
						method: "GET",
						headers: { Authorization: "Bearer " + token }
					});
					const data = await response.json();
					setStore({ messagesRecipient: data });
				} catch (error) {
					throw new Error(error);
				}
			},

			//  LOGIN

			login: (username, password, history) => {
				fetch(`${getStore().myURL}/login`, {
					headers: { "Content-type": "application/json" },
					method: "POST",
					body: JSON.stringify({
						username,
						password
					})
				})
					.then(resp => {
						if (resp.ok) return resp.json();
						else if (resp.status === 401) {
							console.log("Invalid credentials");
						} else if (resp.status === 400) {
							console.log("Invalid email or password format");
						} else throw Error("Uknown error");
					})
					.then(data => {
						localStorage.setItem("jwt-token", data.token);
						history.push("/home");
					})
					.then(() => {
						history.go(0);
					})

					.catch(error => console.error("There has been an uknown error", error));
			}
		}
	};
};

export default getState;
