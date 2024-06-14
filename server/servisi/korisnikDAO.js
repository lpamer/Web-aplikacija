const Baza = require("./baza.js");

class KorisnikDAO {
	constructor() {
		this.baza = new Baza("RWA2023lpamer20.sqlite");
	}

	dajSve = async function () {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM korisnik;";
		var podaci = await this.baza.izvrsiUpit(sql, []);
		this.baza.zatvoriVezu();
		return podaci;
	};

	dajSveFavoriti = async function (korisnik_id) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM favoriti WHERE korisnik_id=?;";
		var podaci = await this.baza.izvrsiUpit(sql, [korisnik_id]);
		this.baza.zatvoriVezu();
		return podaci;
	};

	daj = async function (username) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM korisnik WHERE username=?;";
		var podaci = await this.baza.izvrsiUpit(sql, [username]);
		this.baza.zatvoriVezu();
		if (podaci != null) return podaci[0];
		else return null;
	};

	dajSerijuFavoriti = async function (id_serija) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM serija WHERE id_serija=?;";
		var podaci = await this.baza.izvrsiUpit(sql, [id_serija]);
		this.baza.zatvoriVezu();
		return podaci[0];
		//else return null;
	};

	dajSeriju = async function (tmdb_id) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM serija WHERE tmdb_id=?;";
		var podaci = await this.baza.izvrsiUpit(sql, [tmdb_id]);
		this.baza.zatvoriVezu();
		if (podaci[0] != null) return podaci[0];
		else return null;
	};

	dodaj = async function (korisnik) {
		console.log(korisnik);
		let sql = `INSERT INTO korisnik (ime,prezime,password,email,username,tip_korisnika_id) VALUES (?,?,?,?,?,?)`;
		let podaci = [
			korisnik.ime,
			korisnik.prezime,
			korisnik.password,
			korisnik.email,
			korisnik.username,
			korisnik.tip_korisnika_id,
		];
		await this.baza.izvrsiUpit(sql, podaci);
		return true;
	};

	dodajSeriju = async function (serija) {
		console.log(serija);
		let sql = `INSERT INTO serija (ime,opis_serije,br_sezona,br_epizoda,popularnost,slika,poveznica,tmdb_id) VALUES (?,?,?,?,?,?,?,?)`;
		let podaci = [
			serija[0],
			serija[1],
			serija[2],
			serija[3],
			serija[4],
			serija[5],
			serija[6],
			serija[7],
			serija[8],
		];
		await this.baza.izvrsiUpit(sql, podaci);
		return true;
	};

	dodajSezonu = async function (serija) {
		console.log(serija);
		let sql = `INSERT INTO sezona (opis_sezona,br_epizoda,poveznica,tmdb_id_sezone, serija_id_serija) VALUES (?,?,?,?,?,?,?,?)`;
		let podaci = [
			serija[0],
			serija[1],
			serija[2],
			serija[3],
			serija[4],
			serija[5],
			serija[6],
			serija[7],
			serija[8],
		];
		await this.baza.izvrsiUpit(sql, podaci);
		return true;
	};

	dodajFavoriti = async function (favoriti) {
		console.log(favoriti);
		let sql = `INSERT INTO favoriti (korisnik_id,serija_id_serija)  VALUES (?,?)`;
		let podaci = [favoriti.korisnik_id, favoriti.serija_id_serija];
		await this.baza.izvrsiUpit(sql, podaci);
		return true;
	};

	obrisi = async function (korime) {
		let sql = "DELETE FROM korisnik WHERE username=?";
		await this.baza.izvrsiUpit(sql, [korime]);
		return true;
	};

	azuriraj = async function (korime, korisnik) {
		let sql = `UPDATE korisnik SET ime=?, prezime=? WHERE username=?`;
		let podaci = [korisnik.ime, korisnik.prezime, korime];
		await this.baza.izvrsiUpit(sql, podaci);
		return true;
	};
}

module.exports = KorisnikDAO;
