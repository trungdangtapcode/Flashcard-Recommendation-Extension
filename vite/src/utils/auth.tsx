export const LogoutHandler = (navigate: (url: string)=>void) => {
	localStorage.removeItem("token");
	navigate("/login");
};
export const ProfileHandler = (navigate: (url: string)=>void) => {
	navigate("/profile");
}

export const verifyToken = async (callback: (data: any) => void, navigate: (url: string)=>void) => {
	try {
		const url = import.meta.env.VITE_BACKEND_URL;
		const token = localStorage.getItem("token");
		if (!token || token===null) {
			LogoutHandler(navigate)
			return;
		}
		const response = await fetch(url + "/account/status", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		});
		const data = await response.json();
		if (response.ok) {
			console.log('verified user data: ',data);
			callback(data)
		} else {
			console.log(data.message);
			if (response.status === 401) {
				LogoutHandler(navigate);
			}
		}
	} catch (err) {
		console.log(`An error occurred ${err}`);
	}
};
