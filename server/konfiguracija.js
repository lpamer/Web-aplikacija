const ds = require("fs/promises");

class Konfiguracija {
	constructor() {
		this.conf = {};
	}
	dajKonf() {
		return this.conf;
	}

	async ucitajKonfiguraciju() {
		console.log(this.conf);
		let podaci = await ds.readFile(process.argv[2], "UTF-8");
		if (podaci) {
			console.log("Konfiguracijska datoteka postoji.");
			this.conf = pretvoriJSONkonfig(podaci);
			console.log(this.conf);
		} else {
			console.error("Konfiguracijska datoteka ne postoji.");
		}
	}
}

function pretvoriJSONkonfig(podaci) {
	try {
		console.log(podaci);
		let konf = {};
		var nizPodataka = podaci.split("\n");
		for (let podatak of nizPodataka) {
			var podatakNiz = podatak.split(":");
			var naziv = podatakNiz[0];
			var vrijednost = podatakNiz[1];
			konf[naziv] = vrijednost;
		}
		console.log("Konfiguracija je ispravna!");
		return konf;
	} catch (error) {
		console.error("Greška prilikom parsiranja konfiguracije:", error.message);
	}
}

module.exports = Konfiguracija;
