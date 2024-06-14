import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SerijeService } from '../servisi/serije.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-favoritiDetalji',
  templateUrl: './favoriti-detalji.component.html',
  styleUrl: './favoriti-detalji.component.scss',
})
export class FavoritiDetaljiComponent {
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

  constructor(
    private lokacija: Location,
    private aktivnaPutanja: ActivatedRoute,
    private serijeServis: SerijeService
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
    this.serijeServis.dajSerijuFavoriti(serijaId).subscribe((podaci) => {
      this.serije = podaci;
      console.log(this.serije);
      this.naziv = podaci.ime;
      this.opis = podaci.opis_serije;
      this.slikaUrl = podaci.slika;
      this.serijaId = podaci.id;
    });
  }
}
