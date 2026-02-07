export class Warn extends Error {
	constructor(message) {
		super(message);
		this.name = "Warning";
	}
}