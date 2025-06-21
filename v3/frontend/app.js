////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import switchTemplate from "./library/modules/switchTemplate.js";
import * as tokenJS from "./library/modules/tokenStuff.js";
import * as currentAccountJS from "./library/modules/currentAccount.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Full Screen Container
export const fullScreenContentID = "full-screen-content";

// Other Screens
import { loadMainScreen } from "./screens/main-screen/main-screen.js";
import { loadLoginScreen } from "./screens/login-screen/login-screen.js";
import { loadRegisterScreen } from "./screens/register-screen/register-screen.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// This Screen

const rootScreenTemplateID = "root-screen-template";
const rootScreenButtonsContainerID = "root-screen-buttons-container";

export async function loadRootScreen() {
	switchTemplate(fullScreenContentID, rootScreenTemplateID);
	await initializeRootScreen();
}

async function initializeRootScreen() {
	const isValidToken = await tokenJS.verify();
	if (isValidToken) {
		await loadRootScreenLoggedInTemplate();}
	else { loadRootScreenLoggedOutTemplate(); }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const rootScreenLoggedOutTemplateID = "root-screen-logged-out-template";

function loadRootScreenLoggedOutTemplate() {
	switchTemplate(rootScreenButtonsContainerID, rootScreenLoggedOutTemplateID);
	initializeRootScreenLoggedOutTemplate();
}

function initializeRootScreenLoggedOutTemplate() {
	const logInButton = document.getElementById("log-in");
	const createAccountButton = document.getElementById("create-account");
	const continueAsGuestButton = document.getElementById("continue-as-guest");

	logInButton.addEventListener("click", function() {
		loadLoginScreen();
	});
	createAccountButton.addEventListener("click", function() {
		loadRegisterScreen();
	});
	continueAsGuestButton.addEventListener("click", function() {
		loadMainScreen();
	});
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const rootScreenLoggedInTemplateID = "root-screen-logged-in-template";

function loadRootScreenLoggedInTemplate() {
	switchTemplate(rootScreenButtonsContainerID, rootScreenLoggedInTemplateID);
	initializeRootScreenLoggedInTemplate();
}

async function initializeRootScreenLoggedInTemplate() {
	const usernameElement = document.getElementById("username");
	usernameElement.innerText = `Continue as ${await currentAccountJS.getUsername()}`;

	const continueAsUserButton = document.getElementById("continue-as-user");
	const logOutButton = document.getElementById("log-out");

	continueAsUserButton.addEventListener("click", function() {
		loadMainScreen();
	});
	logOutButton.addEventListener("click", function() {
		tokenJS.clear();
		console.log("Token Cleared");

		const message = "Logged Out Successfully";
		console.log(message);
		alert(message);
		loadRootScreenLoggedOutTemplate();
	});
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function() { loadRootScreen(); });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
