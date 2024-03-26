import axios from 'axios'

//json-server --watch src/db.json --port 3001
const instance = axios.create({
	baseURL: 'http://localhost:3001',
})

instance.interceptors.request.use(
	config => {
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

instance.interceptors.response.use(
	response => {
		return response
	},
	error => {
		return Promise.reject(error)
	}
)

export default instance
