///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import switchFile from "../../library/modules/switchFile.js";
import switchTemplate from "../../library/modules/switchTemplate.js";
import * as tokenJS from "../../library/modules/tokenStuff.js";
import * as currentAccountJS from "../../library/modules/currentAccount.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Parent Container
export const mainScreenContentID = "main-screen-content";

// Other Screens
import { loadEditAccountTab } from "../edit-account-tab/edit-account-tab.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// This Screen

const accountTabFileID = "account-tab";

export async function loadAccountTab() {
    await switchFile(mainScreenContentID, accountTabFileID);
    await initializeAccountTab();
}

async function initializeAccountTab() {
    try {
        const isValidToken = await tokenJS.verify();
        if (isValidToken) { await fetchLoginData(); }
        else { console.log("You're not logged in... no data to see..."); }

        const editButton = document.querySelector("#button1");
        if (editButton) {
            editButton.addEventListener("click", async function() {
                await loadEditAccountTab();
            });
        }
    } catch (error) { console.error("Error Initializing Account Tab:", error.message); }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function fetchLoginData() {
    try {
        const accountData = await currentAccountJS.getData();
        displayLoginData(accountData);
    } catch (error) {
        console.error('Error fetching profile data:', error);
    }
}

// Function to display the profile data on the page
function displayLoginData(accountData) {
    document.getElementById('id').textContent = `ID: ${accountData.id}`;
    //document.getElementById('profile-picture').src = profileData.profile_picture || 'default-profile.png';
    document.getElementById('email').textContent = `Email: ${accountData.email}`;
    document.getElementById('username').textContent = `Username: ${accountData.username}`;
    document.getElementById('picture').src = `data:${accountData.mimeType};base64,${accountData.picture}`;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
