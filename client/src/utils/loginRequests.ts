import axios from 'axios'

export const loginWithToken = async (token:string) => {
	axios.post('http://localhost:5000', {
		token
	}).then(res => console.log(res))
}