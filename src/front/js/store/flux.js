const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			myURL: "https://3001-blush-egret-h8cs868o.ws-us15.gitpod.io/api",
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			initializeFunction: () => {},

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
