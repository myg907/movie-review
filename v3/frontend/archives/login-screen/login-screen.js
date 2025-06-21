////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import switchFile from "../../library/modules/switchFile.js";
import switchTemplate from "../../library/modules/switchTemplate.js";
import { getToken, verifyToken, getTokenData } from "../../app.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Parent Container
import { fullScreenContentID, loadRootScreenTemplate } from "../../app.js";

// Sibling File
import { loadRegisterScreenFile } from "../register-screen/register-screen.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Login Screen Variables

export const loginScreenFileID = "login-screen";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function loadLoginScreenFile() {
	await switchFile(fullScreenContentID, loginScreenFileID);
	initializeLoginScreenFile();
}

function initializeLoginScreenFile() {
	const form = document.getElementById("login-form");
	const registerButton = document.getElementById("login-form-register-button");

	form.addEventListener("submit", handleLoginClick);
	registerButton.addEventListener("click", handleRegisterClick);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function handleRegisterClick() { loadRegisterScreenFile(); }

async function handleLoginClick(event) {
	event.preventDefault();

	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	const formData = {
		email: document.getElementById("email").value,
		password: document.getElementById("password").value
	};

	try {
		const response = await fetch("/api/loginScreen", {
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

		localStorage.setItem("authToken", token);
		console.log("Token Stored");
		
		const message = "Logged In Successfully";
		console.log(message);
		alert(message);
		loadRootScreenTemplate();
	}
	catch (error) {
		console.error("Error Logging In:", error.message);
		alert(error.message);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
