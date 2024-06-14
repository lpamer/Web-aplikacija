import express from "express";
import sesija from "express-session";
import kolacici from "cookie-parser";
import Konfiguracija from "./konfiguracija.js";
import RestTMDB from "./servisi/restTMDB.js";
import restKorisnik from "./servisi/restKorisnik.js";
import HtmlUpravitelj from "./aplikacija/htmlUpravitelj.js";
import FetchUpravitelj from "./aplikacija/fetchUpravitelj.js";
import cors from "cors";

const port = 12000;

const server = express();

server.use(cors());

let konf = new Konfiguracija();
konf
	.ucitajKonfiguraciju()
	.then(pokreniServer)
	.catch((greska) => {
		console.log(greska);
		if (process.argv.length == 2) {
			console.error("Niste naveli naziv konfiguracijske datoteke!");
		} else {
			console.error("Datoteka ne postoji: " + greska.path);
		}
	});

function pokreniServer() {
	server.use(express.urlencoded({ extended: true }));
	server.use(express.json());
	server.use("/dokumentacija", express.static("dokumentacija"));
	server.use(express.static("css"));

	server.use(kolacici());
	server.use(
		sesija({
			secret: konf.dajKonf().tajniKljucSesija,
			saveUninitialized: true,
			cookie: { maxAge: 1000 * 60 * 60 * 3 },
			resave: false,
		})
	);

	server.use("/js", express.static("./aplikacija/js"));
	pripremiPutanjeKorisnik();
	pripremiPutanjeTMDB();
	pripremiPutanjePocetna();
	pripremiPutanjeDokumentacije();
	pripremiPutanjePretrazivanjeSerija();
	pripremiPutanjeAutentifikacija();

	server.use((zahtjev, odgovor) => {
		odgovor.status(404);
		odgovor.json({ opis: "nema resursa" });
	});
	server.listen(port, () => {
		console.log(`Server pokrenut na portu: ${port}`);
	});
}

function pripremiPutanjeKorisnik() {
	server.get("/api/korisnici", restKorisnik.getKorisnici);
	server.post("/api/korisnici", restKorisnik.postKorisnici);
	server.delete("/api/korisnici", restKorisnik.deleteKorisnici);
	server.put("/api/korisnici", restKorisnik.putKorisnici);

	server.get("/api/korisnici/:username", restKorisnik.getKorisnik);
	server.post("/api/korisnici/:username", restKorisnik.postKorisnikPrijava);
	server.delete("/api/korisnici/:username", restKorisnik.deleteKorisnik);
	server.put("/api/korisnici/:username", restKorisnik.putKorisnik);

	server.get("/baza/favoriti/:korisnik_id", restKorisnik.getFavoriti);
	server.post("/baza/favoriti/", restKorisnik.postFavoriti);
	server.post("/baza/favoritiSerija/", restKorisnik.postSerija);
	server.get("/baza/favoritiSerija/:id", restKorisnik.getSerija);
	server.get("/baza/SerijaFavoriti/:id", restKorisnik.getSerijaFavoriti);

	let htmlUpravitelj = new HtmlUpravitelj(konf.dajKonf().jwtTajniKljuc);
	server.get("/korisnici", htmlUpravitelj.korisnici.bind(htmlUpravitelj));
	server.get("/profil", htmlUpravitelj.profil.bind(htmlUpravitelj));
}

function pripremiPutanjeTMDB() {
	let restTMDB = new RestTMDB(konf.dajKonf()["tmdb.apikey.v3"]);
	server.get("/api/tmdb/tv", restTMDB.getSerije.bind(restTMDB));
	server.post("/api/tmdb/tv", restTMDB.getSerije.bind(restTMDB));
	server.post("/api/tmdb/tv1", restTMDB.getSeriju.bind(restTMDB));
}

function pripremiPutanjeDokumentacije() {
	let htmlUpravitelj = new HtmlUpravitelj(konf.dajKonf().jwtTajniKljuc);
	server.get(
		"/dokumentacija",
		htmlUpravitelj.dokumentacija.bind(htmlUpravitelj)
	);
}

function pripremiPutanjePocetna() {
	let htmlUpravitelj = new HtmlUpravitelj(konf.dajKonf().jwtTajniKljuc);
	server.get("/", htmlUpravitelj.pocetna.bind(htmlUpravitelj));
}

function pripremiPutanjePretrazivanjeSerija() {
	let htmlUpravitelj = new HtmlUpravitelj(konf.dajKonf().jwtTajniKljuc);
	let fetchUpravitelj = new FetchUpravitelj(konf.dajKonf().jwtTajniKljuc);
	server.get(
		"/serijePretrazivanje",
		htmlUpravitelj.serijePretrazivanje.bind(htmlUpravitelj)
	);
	server.post(
		"/serijePretrazivanje",
		fetchUpravitelj.serijePretrazivanje.bind(fetchUpravitelj)
	);
	server.get(
		"/serijaDetalji",
		htmlUpravitelj.serijaDetalji.bind(htmlUpravitelj)
	);
}

function pripremiPutanjeAutentifikacija() {
	let htmlUpravitelj = new HtmlUpravitelj(konf.dajKonf().jwtTajniKljuc);
	server.get("/registracija", htmlUpravitelj.registracija.bind(htmlUpravitelj));
	server.post(
		"/registracija",
		htmlUpravitelj.registracija.bind(htmlUpravitelj)
	);
	server.get("/odjava", htmlUpravitelj.odjava.bind(htmlUpravitelj));
	//server.get("/prijava", htmlUpravitelj.prijava.bind(htmlUpravitelj));
	server.post("/prijava", htmlUpravitelj.prijava.bind(htmlUpravitelj));
}
