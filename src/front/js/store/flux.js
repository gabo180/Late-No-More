const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			myURL: "https://3001-ivory-landfowl-eb74y3hg.ws-us15.gitpod.io/api",
			messagesAuthor: [],
			messagesRecipient: [],
			shift: [],
			profile: [],
			isClockIn: false
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			setIsClockIn: () => {
				const clockIn = getStore().isClockIn;
				setStore({ isClockIn: !clockIn });
			},

			initializeFunction: () => {
				getActions().loadProfile();
				getActions().loadShift();
				getActions().loadMessageAuthor();
				getActions().loadMessageRecipient();
			},

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
				} catch (error) {
					throw new Error(error);
				}
			},

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
			},

			// getMessage: () => {
			// 	// fetching data from the backend
			// 	fetch(process.env.BACKEND_URL + "/api/hello")
			// 		.then(resp => resp.json())
			// 		.then(data => setStore({ message: data.message }))
			// 		.catch(error => console.log("Error loading message from backend", error));
			// },
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
