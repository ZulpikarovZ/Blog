export const addSession = async (hash, user) =>
	fetch('http://localhost:3004/sessions', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			hash: hash,
			user: user,
		}),
	});
