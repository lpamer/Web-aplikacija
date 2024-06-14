import { Component, Input, SimpleChanges } from '@angular/core';
import { environment } from '../../enviroments/environment';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SerijeService } from '../servisi/serije.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-serija-detalji',
  templateUrl: './serija-detalji.component.html',
  styleUrl: './serija-detalji.component.scss',
})
export class SerijaDetaljiComponent {
  serije: any[] = [];
  korisnici: any[] = [];
  favoriti: any[] = [];
  naziv!: string;
  ime!: string;
  opis?: String;
  slikaUrl?: String;
  korisnikId!: number;
  serijaId!: number;
  serijaSezona!: number;
  serijaEpizoda!: number;
  serijaPopularnost!: number;
  serijaSlika!: string;
  serijaPoveznica!: string;
  tmdbId!: number;
  serija: any[] = [
    this.ime,
    this.opis,
    this.serijaSezona,
    this.serijaEpizoda,
    this.serijaPopularnost,
    this.serijaSlika,
    this.serijaPoveznica,
    this.tmdbId,
  ];
  id_serija_baza!: number;
  serijatmdbid!: number;

  constructor(
    private lokacija: Location,
    private aktivnaPutanja: ActivatedRoute,
    private serijeServis: SerijeService,
    private cookieService: CookieService
  ) {
    lokacija.onUrlChange((putanja) => {
      console.log(putanja);
    });
    aktivnaPutanja.paramMap.subscribe((parametri) => {
      let serijaId: number = Number(parametri.get('id'));
      console.log(serijaId);
      if (serijaId != null) {
        this.dohvatiPonovo(serijaId);
      }
    });
  }

  dohvatiPonovo(serijaId: number) {
    this.serijeServis.dajSeriju(serijaId).subscribe((podaci) => {
      this.serije = podaci;
      this.naziv = podaci.name;
      this.opis = podaci.overview;
      this.slikaUrl = podaci.poster_path;
      this.serijaId = podaci.id;
      this.serijaSezona = podaci.number_of_seasons;
      this.serijaEpizoda = podaci.number_of_episodes;
      this.serijaPopularnost = podaci.popularity;
      if (podaci.homepage == '' || podaci.homepage == null) {
        this.serijaPoveznica = 'Poveznica nije dostupna';
      } else {
        this.serijaPoveznica = podaci.homepage;
      }
    });
  }

  provjeraBaze() {
    this.serijeServis.dajSeriju(this.serijaId).subscribe((podaci) => {
      this.serije = podaci;
      this.serijatmdbid = podaci.id;
      console.log(this.serije);
      this.serijeServis.dajSerijuBaza(this.serijaId).subscribe((podaci) => {
        console.log(podaci);
        if (podaci == null) {
          this.dodajSeriju(this.serije);
        } else {
          this.dodavanjeUFavorite(this.serijaId);
        }
      });
    });
  }

  dodavanjeUFavorite(serijaId: number) {
    this.serijeServis.dajSerijuBaza(serijaId).subscribe((podaci) => {
      this.id_serija_baza = podaci.id_serija;
      console.log(this.id_serija_baza);

      const value: string = this.cookieService.get('Korisnik');

      this.serijeServis.dajKorisnika(value).subscribe((podaci) => {
        this.korisnici = podaci;
        this.korisnikId = podaci.id;
        console.log(this.korisnikId);
        console.log(this.id_serija_baza);

        this.serijeServis
          .dodajFavorita(this.korisnikId, this.id_serija_baza)
          .subscribe((podaci) => {
            this.favoriti = podaci;
            console.log(this.favoriti);
          });
      });
    });
  }

  dodajSeriju(serije: any) {
    this.serija[0] = serije.name;
    this.serija[1] = serije.overview;
    this.serija[2] = serije.number_of_seasons;
    this.serija[3] = serije.number_of_episodes;
    this.serija[4] = serije.popularity;
    this.serija[5] = serije.poster_path;
    this.serija[6] = serije.homepage;
    this.serija[7] = serije.id;
    console.log(this.serija);
    this.serijeServis.dodajSeriju(this.serija).subscribe((podaci) => {
      this.serije = podaci;
      console.log(this.serije);
    });
    console.log(this.serijaId);
    this.dodavanjeUFavorite(this.serijaId);
  }
}
