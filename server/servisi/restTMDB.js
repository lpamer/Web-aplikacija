const TMDBklijent = require("./klijentTMDB.js");

class RestTMDB {
	constructor(api_kljuc) {
		this.tmdbKlijent = new TMDBklijent(api_kljuc);
		console.log(api_kljuc);

		this.tmdbKlijent.dohvatiSeriju(500).then(console.log).catch(console.log);
	}

	getSeriju(zahtjev, odgovor) {
		console.log("asdaf" + zahtjev.query.id);
		odgovor.type("application/json");
		let id = zahtjev.query.id;
		this.tmdbKlijent
			.dohvatiSeriju(id)
			.then((seriju) => {
				odgovor.type("application/json");
				odgovor.send(seriju);
			})
			.catch((greska) => {
				odgovor.json(greska);
			});
	}

	getSerije(zahtjev, odgovor) {
		odgovor.type("application/json");
		let stranica = zahtjev.query.stranica;
		let trazi = zahtjev.query.trazi;
		console.log(trazi + stranica);
		if (stranica == null || trazi == null) {
			odgovor.status("417");
			odgovor.send({ greska: "neocekivani podaci" });
			return;
		}

		this.tmdbKlijent
			.pretraziSerijePoNazivu(trazi, stranica)
			.then((serije) => {
				odgovor.send(serije);
			})
			.catch((greska) => {
				odgovor.json(greska);
			});
	}
}

module.exports = RestTMDB;
