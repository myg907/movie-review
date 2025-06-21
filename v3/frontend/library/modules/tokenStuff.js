////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { jwtDecode } from 'https://cdn.skypack.dev/jwt-decode';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const tokenID = "authToken";

export function set(value) {
	localStorage.setItem(tokenID, value);
}

export function get() {
	return localStorage.getItem(tokenID);
}

export function clear() {
	localStorage.removeItem(tokenID);
}

export async function verify() {
	try {
		const token = get();
		if (!token) {
			console.log("Token is Undefined");
			return false;
		}

		const response = await fetch("/api/verifyToken", {
			method: "POST",
			headers: {
				"authentication": `Bearer ${token}`,
				"content-type": "application/json"
			}
		});

		const message = await response.text();
		if (!response.ok) { throw new Error(message); }
		console.log(message);
		return true;
	}
	catch (error) {
		console.error("Error Validating Token:", error.message);
		clear();
		throw error;
	}
}

export async function getData() {
	const token = get();
	try {
		const isValidToken = await verify();
		if (!isValidToken) { throw new Error("Token is Invalid"); }
		const tokenData = jwtDecode(token);
		return tokenData;
	}
	catch (error) {
		console.error("Error Decoding Token:", error.message);
		throw error;
	}
}

export async function getItem(id) {
	try {
		const tokenData = await getData();
		return tokenData[id];
	} catch (error) {
		console.error("Error Getting Token Item:", error.message);
		throw error;
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
