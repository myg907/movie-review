////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import switchFile from "../../library/modules/switchFile.js";
import switchTemplate from "../../library/modules/switchTemplate.js";
import * as tokenJS from "../../library/modules/tokenStuff.js";
import * as currentAccountJS from "../../library/modules/currentAccount.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Parent Container
import { mainScreenContentID } from "../main-screen/main-screen.js";

// Other Screens
import { loadMainScreen } from "../main-screen/main-screen.js";
import { loadAccountTab } from "../account-tab/account-tab.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// This Screen

const editAccountTabID = "edit-account-tab";

export async function loadEditAccountTab() {
    await switchFile(mainScreenContentID, editAccountTabID);
    await initializeEditAccountTab();
}

async function initializeEditAccountTab() {
    const form = document.getElementById("editTabForm");
    form.addEventListener("submit", handleAccountSubmit);

    const backButton = document.querySelector("#button1");
    if (backButton) {
        backButton.addEventListener("click", async function() {
            await loadAccountTab();
        });
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function handleAccountSubmit(event) {
    event.preventDefault();  // Prevent form from submitting normally

    // Get the form values
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const picture = document.getElementById("picture").files[0];

    const accountID = await currentAccountJS.getID();

    const formData = new FormData();
    // Create an object to hold the form data
    formData.append("email", email);
    formData.append("username", username);
    formData.append("accountID", accountID)
    if (picture) {formData.append("picture", picture);}

    console.log("Form data ready to be sent:", formData);

    const response = await fetch('/api/accountEdit', {
        method: 'POST',
        body: formData
    });

    const message = await response.text();
    if (!response.ok) {throw new Error(message);
    }
    console.log(message);
    alert(message);
    // Simulate sending data to the server (AJAX could be used here for actual submission)

    // Clear any previous errors

    await loadMainScreen();
    await loadAccountTab();
}