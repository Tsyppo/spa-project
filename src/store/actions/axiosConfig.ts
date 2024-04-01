import axios from 'axios'

//json-server --watch src/db.json --port 3001
const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
})

instance.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

instance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error)
    },
)

export default instance
