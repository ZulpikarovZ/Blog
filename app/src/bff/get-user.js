export const getUser = async (loginToFind) =>
	fetch(`http://localhost:3004/users/?login=${loginToFind}`).then((loadedUsers) =>
		loadedUsers.json().then(([user]) => user),
	);
