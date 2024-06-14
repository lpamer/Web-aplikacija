const SerijePretrazivanje = require("./serijePretrazivanje");
const Autentifikacija = require("./autentifikacija.js");

class FetchUpravitelj {
	constructor() {
		this.auth = new Autentifikacija();
		this.fp = new SerijePretrazivanje();
	}

	serijePretrazivanje = async function (zahtjev, odgovor) {
		let str = zahtjev.query.str;
		let filter = zahtjev.query.filter;
		//console.log(zahtjev.query);
		odgovor.json(await this.fp.dohvatiSerije(str, filter));
	};
}
module.exports = FetchUpravitelj;
