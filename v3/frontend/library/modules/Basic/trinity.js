////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Trinity {
	label;
	directory;
	screenName;
	screens;

	constructor(data) {
		const { label, directory, screenName } = data;
		this.label = label;
		this.directory = directory;
		this.screenName = screenName;
		this.screens = new Set();
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	link(screen) { this.screens.add(screen); }

	constructPath(extension) { return this.directory + this.screenName + "/" + this.screenName + "." + extension; }
	constructPathCSS() { return this.constructPath("css"); }
	constructPathHTML() { return this.constructPath("html"); }

	async importContents() {
		try {
			// Start Message
			console.log(`Import Contents from ${this.label}...`);

			// Validate CSS File
			const cssFilePath = this.constructPathCSS();
			const cssResponse = await fetch(cssFilePath);
			if (!cssResponse.ok) { throw new Error("Invalid Network Response"); }
			console.log(`Successfully Validated CSS!`)

			// Link CSS File
			const link = document.createElement("link");
			link.rel = "stylesheet";
			link.href = cssFilePath;
			document.head.appendChild(link);
			console.log(`Successfully Linked CSS!`)

			// Get HTML Fragment
			const htmlFilePath = this.constructPathHTML();
			const htmlResponse = await fetch(htmlFilePath);
			if (!htmlResponse.ok) { throw new Error("Invalid Network Response"); }
			const htmlString = await htmlResponse.text();
			const htmlFragment = document.createRange().createContextualFragment(htmlString);
			console.log(`Successfully Obtained Fragment!`);

			// Set Content for Each Template
			for (const screen of this.screens) {
				const template = screen.template
				const templateID = template.id;
				const templateReference = htmlFragment.getElementById(templateID);
				const templateContent = templateReference.content.cloneNode(true);
				template.content = templateContent;
				console.log(`Successfully Set Content for ${template.label}!`);
			}

			// Final Message
			console.log(`Successfully Imported Contents from ${this.label}!`);
		}
		catch (error) {
			console.error(`Error Importing Contents from ${this.label}:`, error.message);
			throw error;
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default Trinity;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
