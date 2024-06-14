const ds = require("fs/promises");
const Autentifikacija = require("./autentifikacija.js");

class HtmlUpravitelj {
	constructor() {
		this.auth = new Autentifikacija();
	}

	pocetna = async function (zahtjev, odgovor) {
		let pocetna = await ucitajStranicu("pocetna");
		odgovor.send(pocetna);
	};

	serijePretrazivanje = async function (zahtjev, odgovor) {
		let stranica = await ucitajStranicu("pocetna");
		odgovor.send(stranica);
	};

	serijaDetalji = async function (zahtjev, odgovor) {
		let serijaDetalji = await ucitajStranicu("serijaDetalji");
		odgovor.send(serijaDetalji);
	};

	dokumentacija = async function (zahtjev, odgovor) {
		let dokumentacija = await ucitajStranicu("dokumentacija");
		odgovor.send(dokumentacija);
	};

	korisnici = async function (zahtjev, odgovor) {
		if (
			zahtjev.session.korisnik == null ||
			(zahtjev.session.korisnik != null &&
				zahtjev.session.korisnik.tip_korisnika_id != 1)
		) {
			let greska = "Neautorizirani pristup";
			console.log(zahtjev.session.korisnik.tip_korisnika_id);
			odgovor.send(greska);
			return false;
		}

		let korisnici = await ucitajStranicu("korisnici");
		odgovor.send(korisnici);
	};

	registracija = async function (zahtjev, odgovor) {
		console.log(zahtjev.body);
		let greska = "";
		if (zahtjev.method == "POST") {
			let uspjeh = await this.auth.dodajKorisnika(zahtjev.body);
			if (uspjeh) {
				//odgovor.redirect("/prijava");
				return;
			} else {
				greska = "Dodavanje nije uspjelo provjerite podatke!";
			}
		}
		let stranica = await ucitajStranicu("registracija", greska);
		odgovor.send(stranica);
	};

	odjava = async function (zahtjev, odgovor) {
		odgovor.clearCookie("korisnik");
		odgovor.redirect("/prijava");
	};

	profil = async function (zahtjev, odgovor) {
		let profil = await ucitajStranicu("profil");
		odgovor.send(profil);
	};

	prijava = async function (zahtjev, odgovor) {
		let greska = "";
		if (zahtjev.method == "POST") {
			var username = zahtjev.body.username;
			var password = zahtjev.body.password;
			console.log(username + password);
			var korisnik = await this.auth.prijaviKorisnika(username, password);
			if (korisnik) {
				console.log(korisnik);
				zahtjev.session.korisnik = korisnik.ime + " " + korisnik.prezime;
				zahtjev.session.username = korisnik.username;
				odgovor.cookie("korisnik", username);
				//odgovor.redirect("/pocetna");
				return;
			}
		}

		let stranica = await ucitajStranicu("prijava", greska);
		odgovor.send(stranica);
	};
}

module.exports = HtmlUpravitelj;

async function ucitajStranicu(nazivStranice, poruka = "") {
	let stranice = [ucitajHTML(nazivStranice), ucitajHTML("navigacija")];
	let [stranica, nav] = await Promise.all(stranice);
	stranica = stranica.replace("#navigacija#", nav);
	stranica = stranica.replace("#poruka#", poruka);
	return stranica;
}

function ucitajHTML(htmlStranica) {
	return ds.readFile(__dirname + "/html/" + htmlStranica + ".html", "UTF-8");
}
