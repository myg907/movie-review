////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import switchFile from "../../library/modules/switchFile.js";
import switchTemplate from "../../library/modules/switchTemplate.js";
import { getToken, verifyToken, getTokenData } from "../../app.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Parent Tab
import { fullScreenContentID, loadRootScreenTemplate } from "../../app.js";

// Sibling Tab
import { loadLoginScreenFile } from "../login-screen/login-screen.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Register Screen Variables

export const registerScreenFileID = "register-screen";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function loadRegisterScreenFile() {
    await switchFile(fullScreenContentID, registerScreenFileID);
    initializeRegisterScreenFile();
}

function initializeRegisterScreenFile() {
    const form = document.getElementById("register-form");
    const loginButton = document.getElementById("register-form-login-button");

    form.addEventListener("submit", handleRegisterClick);
    loginButton.addEventListener("click", handleLoginClick);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function handleLoginClick() { loadLoginScreenFile(); }

async function handleRegisterClick(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const formData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    try {
        const response = await fetch("/api/registerScreen", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(formData)
        });

        const message = await response.text();
        if (!response.ok) { throw new Error(message); }
        console.log(message);
        alert(message);
        loadRootScreenTemplate();
    }
    catch (error) {
        console.error("Error Registering Account:", error.message);
        alert(error.message);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
