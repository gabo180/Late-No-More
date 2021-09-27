const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			myURL: "https://3001-blush-egret-h8cs868o.ws-us18.gitpod.io/api",
			messagesAuthor: [],
			messagesRecipient: [],
			shift: [],
			// TODO: rename shift to allShifts
			profile: {},
			employee: [],
			isClockIn: false
		},

		actions: {
			initializeFunction: () => {
				getActions().loadProfile();
				getActions().loadShift();
				getActions().loadEmployee();
				getActions().loadMessageAuthor();
				getActions().loadMessageRecipient();
			},
			//TODO: add return to all asyncs fucntions

			//  PROFILE

			loadProfile: async () => {
				const endPoint = "/profile";
				const token = localStorage.getItem("jwt-token");
				try {
					const response = await fetch(`${getStore().myURL}${endPoint}`, {
						method: "GET",
						headers: { Authorization: "Bearer " + token }
					});
					const data = await response.json();
					console.log(data);
					setStore({ profile: data });
				} catch (error) {
					throw new Error(error);
				}
			},

			createProfile: async () => {
				const endPoint = "/profile";
				const token = localStorage.getItem("jwt-token");
				try {
					const response = await fetch(`${getStore().myURL}${endPoint}`, {
						method: "POST",
						headers: {
							Authorization: "Bearer " + token,
							"Content-Type": "application/json"
						}
					});
					const data = await response.json();
					if (data.ok) {
						console.log(data);
						setStore({ profile: data });
					}
				} catch (error) {
					throw new Error(error);
				}
			},

			updateProfile: async () => {
				const endPoint = "/profile";
				const token = localStorage.getItem("jwt-token");
				try {
					const response = await fetch(`${getStore().myURL}${endPoint}`, {
						method: "PUT",
						headers: { Authorization: "Bearer " + token }
					});
					const data = await response.json();
					if (data.ok) {
						console.log(data);
						setStore({ profile: data });
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
					console.log(data);
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

			updateShift: async shift_id => {
				const endPoint = "/shift/" + shift_id;
				const token = localStorage.getItem("jwt-token");
				try {
					const response = await fetch(`${getStore().myURL}${endPoint}`, {
						method: "PUT",
						headers: { Authorization: "Bearer " + token }
					});
					const data = await response.json();
					if (data.ok) {
						console.log(data);
						setStore({ shift: data });
					}
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
						console.log("HOLIWIS KISSES KISSES", data);
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
					console.log(data);
					setStore({ shift: data });
				} catch (error) {
					throw new Error(error);
				}
			},

			setIsClockIn: () => {
				const clockIn = getStore().isClockIn;
				setStore({ isClockIn: !clockIn });
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
					console.log(data);
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

			updateEmployee: async employee_id => {
				const endPoint = "/employee/" + employee_id;
				const token = localStorage.getItem("jwt-token");
				try {
					const response = await fetch(`${getStore().myURL}${endPoint}`, {
						method: "PUT",
						headers: { Authorization: "Bearer " + token }
					});
					const data = await response.json();
					if (data.ok) {
						console.log(data);
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
					console.log(data);
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
					console.log(data);
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
						// save your token in the localStorage
						localStorage.setItem("jwt-token", data.token);
						history.push("/home");
					})

					.catch(error => console.error("There has been an uknown error", error));
			}
		}
	};
};

export default getState;
