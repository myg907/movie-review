////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Container {
	id;
	label;
	reference;

	constructor(data) {
		const { id, label } = data;
		this.id = id;
		this.label = label;
		this.reference = null;
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	setReference(element) { this.reference = element; }

	async load(screen) {
		try {
			// Start Message
			console.log(`Loading ${screen.label} into ${this.label}...`);

			// Get Content
			if (!screen.template.content) { await screen.trinity.importContents(); }
			const startContent = screen.clone();
			console.log(`Successfully Retrieved Content for ${screen.label}!`);

			// Update History Stack
			if (this instanceof StateContainer && screen !== this.historyStack[this.currentIndex]) {
				this.pushHistory(screen);
			}

			// Initialize Content
			const finalContent = await screen.initializer(startContent);
			console.log(`Successfully Initialized Content for ${screen.label}!`);

			// Render Content
			this.reference.replaceChildren(finalContent);
			console.log(`Successfully Rendered Content for ${screen.label}!`);

			// Final Message
			console.log(`Successfully Loaded ${screen.label} into ${this.label}!`);
		}
		catch (error) {
			console.error(`Error Loading ${screen.label} into ${this.label}:`, error.message);
			throw error;
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class StateContainer extends Container {
	historyStack;
	currentIndex;

	constructor(data) {
		super(data);
		this.historyStack = [];
		this.currentIndex = -1;
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// History Functions

	pushHistory(screen) {
		this.historyStack.push(screen);
		this.currentIndex++;
		console.log(`${screen.label} has been Pushed into the History Stack for ${this.label}!`);
		console.log(this.historyStack);
	}

	async refresh() {
		console.log(`Attempting to Refresh ${this.label}...`);
		if (this.currentIndex === -1) {
			console.warn(`${this.label} is Empty... there's Nothing to Refresh!`);
			return;
		}
		try {
			await this.load(this.historyStack[this.currentIndex]);
			console.log(`Successfully Refreshed ${this.label}!`);
		}
		catch (error) {
			console.error(`Error Refreshing ${this.label}:`, error.message);
			throw error;
		}
	}

	async goBack() {
		console.log(`Attempting to Go Back in the History Stack for ${this.label}...`);
		if (this.currentIndex <= 0) {
			console.warn(`You're Already at the Beginning of the History Stack for ${this.label}!`);
			return;
		}
		try {
			this.currentIndex--;
			await this.load(this.historyStack[this.currentIndex]);
			console.log(`Successfully Went Back in the History Stack for ${this.label}!`);
			console.log(this.currentIndex);
		}
		catch (error) {
			console.error(`Error Going Back in the History Stack for ${this.label}:`, error.message);
			throw error;
		}
	}

	async goForward() {
		console.log(`Attempting to Go Forward in the History Stack for ${this.label}...`);
		if (this.currentIndex >= this.historyStack.length - 1) {
			console.warn(`You're Already at the End of the History Stack for ${this.label}!`);
			return;
		}
		try {
			this.currentIndex++;
			await this.load(this.historyStack[this.currentIndex]);
			console.log(`Successfully Went Forward in the History Stack for ${this.label}!`);
			console.log(this.currentIndex);
		}
		catch (error) {
			console.error(`Error Going Forward in the History Stack for ${this.label}:`, error.message);
			throw error;
		}
	}

	clearFuture() {
		this.historyStack = this.historyStack.slice(0, this.currentIndex + 1);
		console.log(`The Future of the History Stack for ${this.label} has been Cleared!`);
		console.log(this.historyStack);
	}

	clearHistory() {
		this.historyStack = this.historyStack.slice(this.currentIndex);
		console.log(`The History of the History Stack for ${this.label} has been Cleared!`);
		console.log(this.historyStack);
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export { Container, StateContainer }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
