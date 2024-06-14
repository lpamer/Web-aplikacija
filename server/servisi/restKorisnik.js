const KorisnikDAO = require("./korisnikDAO.js");
const session = require("express-session");

exports.getKorisnici = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let kdao = new KorisnikDAO();
	kdao.dajSve().then((korisnici) => {
		console.log(korisnici);
		odgovor.status(200);
		odgovor.send(JSON.stringify(korisnici));
	});
};

exports.postKorisnici = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let podaci = zahtjev.body;
	let kdao = new KorisnikDAO();
	kdao.dodaj(podaci).then((poruka) => {
		odgovor.status(201);
		odgovor.send(JSON.stringify(poruka));
	});
};

exports.deleteKorisnici = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(501);
	let poruka = { greska: "metoda nije implementirana" };
	odgovor.send(JSON.stringify(poruka));
};

exports.putKorisnici = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(501);
	let poruka = { greska: "metoda nije implementirana" };
	odgovor.send(JSON.stringify(poruka));
};

exports.getKorisnik = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let kdao = new KorisnikDAO();
	let username = zahtjev.params.username;
	kdao.daj(username).then((korisnik) => {
		console.log(korisnik);
		odgovor.status(201);
		odgovor.send(JSON.stringify(korisnik));
	});
};

exports.postKorisnik = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { greska: "zabranjeno" };
	odgovor.send(JSON.stringify(poruka));
};

exports.putKorisnik = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let username = zahtjev.params.username;
	let podaci = zahtjev.body;
	let kdao = new KorisnikDAO();
	kdao.azuriraj(username, podaci).then((poruka) => {
		odgovor.status(201);
		odgovor.send(JSON.stringify(poruka));
	});
};

exports.deleteKorisnik = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let username = zahtjev.params.username;
	let podaci = zahtjev.body;
	let kdao = new KorisnikDAO();
	kdao.obrisi(username, podaci).then((poruka) => {
		odgovor.status(201);
		odgovor.send(JSON.stringify(poruka));
	});
};

exports.getKorisnikPrijava = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let kdao = new KorisnikDAO();
	let username = zahtjev.params.username;
	kdao.daj(username).then((korisnik) => {
		console.log(korisnik);
		console.log(zahtjev.body);
		if (korisnik != null && korisnik.password == zahtjev.body.password) {
			session.korisnik = korisnik;
			odgovor.status(201);
			odgovor.send(JSON.stringify(korisnik));
		} else {
			odgovor.status(401);
			odgovor.send(JSON.stringify({ greska: "zabranjen pristup" }));
		}
	});
};

exports.postKorisnikPrijava = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let kdao = new KorisnikDAO();
	let username = zahtjev.params.username;
	let password = zahtjev.params.password;
	kdao.daj(username).then((korisnik) => {
		console.log(password);
		console.log(zahtjev.body.password);
		if (korisnik != null && korisnik.password == zahtjev.body.password) {
			session.korisnik = korisnik;
			console.log(korisnik);
			odgovor.status(201);
			odgovor.send(JSON.stringify(korisnik));
		} else {
			odgovor.status(401);
			odgovor.send(JSON.stringify({ greska: "zabranjen pristup" }));
		}
	});
};

exports.getFavoriti = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let podaci = zahtjev.params.korisnik_id;
	let kdao = new KorisnikDAO();
	kdao.dajSveFavoriti(podaci).then((favorit) => {
		console.log(favorit);
		odgovor.status(200);
		odgovor.send(JSON.stringify(favorit));
	});
};

exports.postSerija = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let podaci = zahtjev.body;
	let kdao = new KorisnikDAO();
	kdao.dodajSeriju(podaci).then((serija) => {
		console.log(serija);
		odgovor.status(201);
		odgovor.send(JSON.stringify(serija));
	});
};

exports.getSerija = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let podaci = zahtjev.params.id;
	let kdao = new KorisnikDAO();
	kdao.dajSeriju(podaci).then((serija) => {
		console.log(serija);
		odgovor.status(201);
		odgovor.send(JSON.stringify(serija));
	});
};

exports.getSerijaFavoriti = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let podaci = zahtjev.params.id;
	let kdao = new KorisnikDAO();
	kdao.dajSerijuFavoriti(podaci).then((serija) => {
		console.log(serija);
		odgovor.status(201);
		odgovor.send(JSON.stringify(serija));
	});
};

exports.postSerijaFavoriti = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { greska: "zabranjeno" };
	odgovor.send(JSON.stringify(poruka));
};

exports.putSerijaFavoriti = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { greska: "zabranjeno" };
	odgovor.send(JSON.stringify(poruka));
};
exports.deleteSerijaFavoriti = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { greska: "zabranjeno" };
	odgovor.send(JSON.stringify(poruka));
};

exports.postFavoriti = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let podaci = zahtjev.body;
	let kdao = new KorisnikDAO();
	kdao.dodajFavoriti(podaci).then((favorit) => {
		console.log(favorit);
		odgovor.status(201);
		odgovor.send(JSON.stringify(favorit));
	});
};
