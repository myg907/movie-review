////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Template {
	id;
	label;
	content;

	constructor(data) {
		const { id, label } = data;
		this.id = id;
		this.label = label;
		this.content = null;
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default Template;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
