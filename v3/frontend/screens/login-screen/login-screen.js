////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import switchFile from "../../library/modules/switchFile.js";
import * as tokenJS from "../../library/modules/tokenStuff.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Parent Container
import { fullScreenContentID } from "../../app.js";

// Other Screens
import { loadRootScreen } from "../../app.js";
import { loadRegisterScreen } from "../register-screen/register-screen.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// This Screen

const loginScreenFileID = "login-screen";

export async function loadLoginScreen() {
	await switchFile(fullScreenContentID, loginScreenFileID);
	initializeLoginScreen();
}

function initializeLoginScreen() {
	const form = document.getElementById("login-form");
	const registerButton = document.getElementById("login-form-register-button");

	form.addEventListener("submit", handleLoginClick);
	registerButton.addEventListener("click", handleRegisterClick);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Login Screen Helper Functions

async function handleRegisterClick() {
	await loadRegisterScreen();
}

async function handleLoginClick(event) {
	event.preventDefault();

	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	const formData = {
		email: email,
		password: password
	};

	try {
		const response = await fetch("/api/login", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(formData)
		});

		if (!response.ok) {
			const message = await response.text();
			throw new Error(message);
		}

		const data = await response.json();

		const token = data.token;
		if (!token) { throw new Error("Token is Undefined"); }

		tokenJS.set(token);
		console.log("Token Stored");
		
		const message = "Logged In Successfully";
		console.log(message);
		alert(message);
		await loadRootScreen();
	}
	catch (error) {
		console.error("Error Logging In:", error.message);
		alert(error.message);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
