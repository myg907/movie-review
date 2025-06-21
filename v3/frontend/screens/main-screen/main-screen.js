////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import switchFile from "../../library/modules/switchFile.js";
import switchTemplate from "../../library/modules/switchTemplate.js";
import * as tokenJS from "../../library/modules/tokenStuff.js";
import * as currentAccountJS from "../../library/modules/currentAccount.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Parent Container
import { fullScreenContentID } from "../../app.js";

// Other Screens
import { loadRootScreen } from "../../app.js";
import { loadNavigationPage } from "../navigation-page/navigation-page.js";
import { loadAccountTab } from "../account-tab/account-tab.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// This Screen

const mainScreenFileID = "main-screen";
export const mainScreenContentID = "main-screen-content";

export async function loadMainScreen() {
	await switchFile(fullScreenContentID, mainScreenFileID);
	await initializeMainScreen();
}

async function initializeMainScreen() {
	const isValidToken = await tokenJS.verify();
	if (isValidToken) {
		await loadMainScreenLoggedInTemplate();
		activatePage();
	} else {
		loadMainScreenLoggedOutTemplate();
		activatePage();
	}

	await loadNavigationPage();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mainScreenLoggedOutTemplateID = "main-screen-logged-out-template";

function loadMainScreenLoggedOutTemplate() {
	switchTemplate(mainScreenContentID, mainScreenLoggedOutTemplateID);
	initializeMainScreenLoggedOutTemplate();
}

function initializeMainScreenLoggedOutTemplate() {}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mainScreenLoggedInTemplateID = "main-screen-logged-in-template";

async function loadMainScreenLoggedInTemplate() {
	switchTemplate(mainScreenContentID, mainScreenLoggedInTemplateID);
	await initializeMainScreenLoggedInTemplate();
}

async function initializeMainScreenLoggedInTemplate() {
	const currentAccountData = await currentAccountJS.getData();

	const currentProfilePictureElement = document.getElementById("current-profile-picture");
	currentProfilePictureElement.src = `data:${currentAccountData.mimeType};base64,${currentAccountData.picture}`;

	const currentProfileUsernameElement = document.getElementById("current-profile-username");
	currentProfileUsernameElement.innerText = currentAccountData.username;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function activatePage() {
	// Main Page Element References
	const mainScreenOverlay = document.getElementById("main-screen-overlay");

	// Current Profile Element References
	const currentProfile = document.getElementById("current-profile");
	const currentProfileButton = document.getElementById("current-profile-button");
	const currentProfileDropdownMenu = currentProfile.querySelector("div.dropdown-menu");
	const currentProfileDropdownButtons = currentProfileDropdownMenu.querySelectorAll("li.button");

	// Current Profile Dropdown Menu - Click to Activate
	currentProfileButton.addEventListener("click", function() {
		mainScreenOverlay.classList.toggle("active");
		currentProfileDropdownMenu.classList.toggle("active");
	});

	// Current Profile Dropdown Menu - Click to Deactivate
	mainScreenOverlay.addEventListener("click", function() {
		mainScreenOverlay.classList.remove("active");
		currentProfileDropdownMenu.classList.remove("active");
	})

	// Dropdown Button References
	const navigationPageButton = document.getElementById("navigation-page-button");
	const accountTabButton = document.getElementById("account-tab-button");
	const logOutButton = document.getElementById("log-out-button");

	// Dropdown Button Activation
	navigationPageButton.addEventListener("click", async function() {
		try {
			await loadNavigationPage();
		}
		catch (error) { console.error("Error switching tabs:", error.message); }
		finally {
			mainScreenOverlay.classList.toggle("active");
			currentProfileDropdownMenu.classList.toggle("active");
		}
	});
	accountTabButton.addEventListener("click", async function() {
		try {
			await loadAccountTab();
		}
		catch (error) { console.error("Error switching tabs:", error.message); }
		finally {
			mainScreenOverlay.classList.toggle("active");
			currentProfileDropdownMenu.classList.toggle("active");
		}
	});
	logOutButton.addEventListener("click", async function() {
		try {
			tokenJS.clear();
			await loadRootScreen();
		}
		catch (error) {console.error("Error switching tabs:", error.message); }
		finally {
			mainScreenOverlay.classList.toggle("active");
			currentProfileDropdownMenu.classList.toggle("active");
		}
	});
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
