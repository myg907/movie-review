////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function logStorage() {
	// Log Local Storage
	console.log("LOCAL STORAGE CONTENTS");
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		const value = localStorage.getItem(key);
		console.log(`${key}: ${value}`);
	}

	// Log Session Storage
	console.log("SESSION STORAGE CONTENTS");
	for (let i = 0; i < sessionStorage.length; i++) {
		const key = sessionStorage.key(i);
		const value = sessionStorage.getItem(key);
		console.log(`${key}: ${value}`);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
