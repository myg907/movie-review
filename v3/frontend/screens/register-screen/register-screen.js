////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import switchFile from "../../library/modules/switchFile.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Parent Container
import { fullScreenContentID } from "../../app.js";

// Other Screens
import { loadRootScreen } from "../../app.js";
import { loadLoginScreen } from "../login-screen/login-screen.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// This Screen

const registerScreenFileID = "register-screen";

export async function loadRegisterScreen() {
	await switchFile(fullScreenContentID, registerScreenFileID);
	initializeRegisterScreen();
}

function initializeRegisterScreen() {
	const form = document.getElementById("register-form");
	const loginButton = document.getElementById("register-form-login-button");

	form.addEventListener("submit", handleRegisterClick);
	loginButton.addEventListener("click", handleLoginClick);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function handleLoginClick() {
	await loadLoginScreen();
}

async function handleRegisterClick(event) {
	event.preventDefault();

	const formData = new FormData();

	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const username = document.getElementById("username").value;
	const picture = document.getElementById("picture").files[0];

	formData.append("email", email);
	formData.append("password", password);
	formData.append("username", username);
	if (picture) { formData.append("picture", picture); }

	try {
		const response = await fetch("/api/register", {
			method: "POST",
			body: formData
		});

		const message = await response.text();
		if (!response.ok) { throw new Error(message); }
		console.log(message);
		alert(message);
		await loadRootScreen();
	}
	catch (error) {
		console.error("Error Registering Account:", error.message);
		alert(error.message);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
