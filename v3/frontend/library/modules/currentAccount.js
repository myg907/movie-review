////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import * as tokenJS from "./tokenStuff.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getData() {
	const token = tokenJS.get();
	const response = await fetch("/api/account", {
		method: "GET",
		headers: {
			"authentication": `Bearer ${token}`,
			"content-type": "application/json"
		}
	});
	if (!response.ok) {
		localStorage.clear();
		throw new Error("Failed to Fetch Account Data... Refresh the Page");
	}
	const result = await response.json();
	return result;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getID() {
	const response = await getData();
	return response.id;
}

export async function getName() {
	const response = await getData();
	return response.name;
}

export async function getEmail() {
	const response = await getData();
	return response.email;
}

async function getPassword() {
	const response = await getData();
	return response.password;
}

export async function getUsername() {
	const response = await getData();
	return response.username;
}

export async function getPicture() {
	const response = await getData();
	return response.picture;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
