////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function switchTemplate(container_id, template_id) {
	try {
		const container = document.getElementById(container_id);
		const template = document.getElementById(template_id);
		const clone = template.content.cloneNode(true);
		while (container.firstChild) { container.removeChild(container.firstChild); }
		container.appendChild(clone);
		console.log("<> Successfully Switched Template <>")
	} catch (error) {
		console.error("Error Switching Template:", error.message);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
