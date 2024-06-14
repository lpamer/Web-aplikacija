const portRest = 12000;
const url = "http://localhost:" + portRest + "/api";

class SerijePretrazivanje {
	async dohvatiSerije(stranica, kljucnaRijec = "") {
		let putanja =
			url + "/tmdb/tv?stranica=" + stranica + "&trazi=" + kljucnaRijec;
		console.log(putanja);
		let odgovor = await fetch(putanja);
		let podaci = await odgovor.text();
		let serije = JSON.parse(podaci);
		return serije;
	}

	async dohvatiSeriju(series_id) {
		let putanja = url + "/tv?id=" + series_id;
		console.log(putanja);
		let odgovor = await fetch(putanja);
		let podaci = await odgovor.text();
		let serija = JSON.parse(podaci);
		return serija;
	}
}

module.exports = SerijePretrazivanje;
