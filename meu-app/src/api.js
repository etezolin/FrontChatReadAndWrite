import axios from 'axios';

const api = axios.create({
	baseURL: "http://localhost:44307/",
	headers: {
		"Content-Type": "application/json"
		// "Access-Control-Allow-Origin": "*",
	},
});

export default api;