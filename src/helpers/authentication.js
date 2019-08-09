/* eslint-disable no-console */

export const sendPasswordResetEmail = async () => {
	return new Promise((resolve, reject) => {
		console.log('started password reset.');
		setTimeout(() => {
			console.log('done password reset.');
			return resolve('yes');
		}, 4000);
	});
};

export const authenticateLogin = async (email, password) => {
	return new Promise((resolve, reject) => {
		console.log('started password reset.');
		setTimeout(() => {
			console.log('done password reset.');
			if (email === 't@t.de' && password === 'test') return resolve(true);
			else return reject(false);
		}, 2000);
	});
};
