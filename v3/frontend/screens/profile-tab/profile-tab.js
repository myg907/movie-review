////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import switchFile from "../../library/modules/switchFile.js";
import switchTemplate from "../../library/modules/switchTemplate.js";
import * as tokenJS from "../../library/modules/tokenStuff.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Parent Container
import { mainScreenContentID } from "../main-screen/main-screen.js";

// Other Screens

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// This Screen

const profileTabFileID = "profile-tab";

export async function loadProfileTab() {
    await switchFile(mainScreenContentID, profileTabFileID);
    await initializeProfileTab();
}

async function initializeProfileTab() {
    try {
        const isValidToken = await tokenJS.verify();
        if (isValidToken) { await fetchProfileData(); }
        else { console.log("You're not logged in... no data to see..."); }
    }
    catch (error) { console.error("Error Initializing Profile Tab:", error.message); }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to fetch profile data from the backend
async function fetchProfileData() {
    try {
        const token = tokenJS.get();
        const response = await fetch("/api/profile", {
            method: "GET",
            headers: {
                "authentication": `Bearer ${token}`,
                "content-type": "application/json"
            }
        });

        console.log('Response:', response);

        if (!response.ok) {
            throw new Error('Failed to fetch profile data');
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Received non-JSON response');
        }

        const profileData = await response.json();
        displayProfileData(profileData);
    } catch (error) {
        console.error('Error fetching profile data:', error);
    }
}

// Function to display the profile data on the page
function displayProfileData(profileData) {
    document.getElementById('username').textContent = `Username: ${profileData.username}`;
    //document.getElementById('profile-picture').src = profileData.profile_picture || 'default-profile.png';
    document.getElementById('favorite-genres').textContent = `Favorite Genres: ${profileData.favorite_genre}`;
    document.getElementById('watch-later').textContent = `Watch Later: ${profileData.watch_later}`;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
