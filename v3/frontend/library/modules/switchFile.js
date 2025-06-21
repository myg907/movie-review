////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function constructFilePath(file_name, extension) { return `./screens/${file_name}/${file_name}.${extension}`; }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function validateCSS(file_name) {
	try {
		const filePath = constructFilePath(file_name, "css");
		const response = await fetch(filePath);
		console.log("<> Successfully Validated CSS <>");
		return filePath;
	} catch (error) {
		console.error("Error Validating CSS File:", error.message);
		throw error;
	}
}

async function linkCSS(file_name) {
	try {
		const filePath = await validateCSS(file_name);
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = filePath;
		document.head.appendChild(link);
		console.log("<> Successfully Linked CSS <>");
	} catch (error) {
		console.error("Error Linking CSS File:", error.message);
		throw error;
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let htmlCache = {};

async function getHTML(file_name) {
	try {
		const filePath = constructFilePath(file_name, "html");
		const response = await fetch(filePath);
		console.log("<> Successfully Fetched HTML <>");
		return response;
	} catch (error) {
		console.error("Error Getting HTML:", error.message);
		throw error
	}
}

function cacheHTML(html_cache, file_name, html_string) {
	try {
		html_cache[file_name] = html_string;
		console.log("<> Successfully Cached HTML <>");
	} catch (error) {
		console.error("Error Caching HTML:", error.message);
		throw error;
	}
}

async function getString(file_name, html_cache) {
	try {
		if (html_cache[file_name]) { return html_cache[file_name]; }
		else {
			const response = await getHTML(file_name);
			const string = await response.text();
			cacheHTML(html_cache, file_name, string);
			return string;
		}
	} catch (error) {
		console.error("Error Getting HTML String:", error.message);
		throw error;
	}
}

async function loadHTML(container_id, file_name, html_cache) {
	try {
		const container = document.getElementById(container_id);
		const string = await getString(file_name, html_cache);
		container.innerHTML = string;
		console.log("<> Successfully Loaded HTML <>");
	} catch (error) {
		console.error("Error Loading HTML:", error.message);
		throw error;
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default async function switchFile(container_id, file_name) {
	try {
		await linkCSS(file_name);
		await loadHTML(container_id, file_name, htmlCache);
		console.log("<> Successfully Switched File <>")
	} catch (error) {
		console.error("Error Switching File:", error.message);
		throw error;
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
