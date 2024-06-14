const mail = require("./moduli/mail.js");
const kodovi = require("./moduli/kodovi.js");
const portRest = 12000;
class Autentifikacija {
	async dodajKorisnika(korisnik) {
		let tijelo = {
			ime: korisnik.ime,
			prezime: korisnik.prezime,
			password: kodovi.kreirajSHA256(korisnik.password, "moja sol"),
			email: korisnik.email,
			username: korisnik.username,
			tip_korisnika_id: korisnik.tip_korisnika_id,
		};

		let zaglavlje = new Headers();
		zaglavlje.set("Content-Type", "application/json");

		let parametri = {
			method: "POST",
			body: JSON.stringify(tijelo),
			headers: zaglavlje,
		};
		let odgovor = await fetch(
			"http://localhost:" + portRest + "/api/korisnici",
			parametri
		);

		if (odgovor.status == 201) {
			console.log("Korisnik ubačen na servisu");
			let mailPoruka =
				" http://localhost:12000/aktivacijaRacuna?korime=" + korisnik.username;
			let poruka = await mail.posaljiMail(
				"rwa@foi.hr",
				korisnik.email,
				"Aktivacijski kod",
				mailPoruka
			);
			return true;
		} else {
			console.log(odgovor.status);
			console.log(await odgovor.text());
			return false;
		}
	}

	async prijaviKorisnika(username, password) {
		password = kodovi.kreirajSHA256(password, "moja sol");
		let tijelo = {
			password: password,
		};
		let zaglavlje = new Headers();
		zaglavlje.set("Content-Type", "application/json");

		let parametri = {
			method: "POST",
			body: JSON.stringify(tijelo),
			headers: zaglavlje,
		};
		let odgovor = await fetch(
			"http://localhost:" + portRest + "/api/korisnici/" + username,
			parametri
		);
		console.log(odgovor);
		if (odgovor.status == 201) {
			return await odgovor.text();
		} else {
			return false;
		}
	}
}

module.exports = Autentifikacija;
