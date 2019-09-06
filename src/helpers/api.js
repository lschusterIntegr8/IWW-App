import axios from 'axios';

const BASE_ENDPOINT = 'https://www.vogel.de/api/iww';

export const userLogin = (email, password) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${BASE_ENDPOINT}/oauth`, {
				grant_type: 'password',
				client_id: 'IWW',
				username: email,
				password: password
			})
			.then(response => {
				const { access_token: accessToken, refresh_token: refreshToken } = response.data;
				console.log('ACCESS TOKEN:');
				console.log(accessToken);
				console.log('done login');

				// resolve(response.data);
				return resolve({ success: true, accessToken, refreshToken });
			})
			.catch(err => {
				return reject(false);
			});
	});
};
