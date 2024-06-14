import { Component, OnInit } from '@angular/core';
import { SerijeService } from '../servisi/serije.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-favoriti',
  templateUrl: './favoriti.component.html',
  styleUrl: './favoriti.component.scss',
})
export class FavoritiComponent implements OnInit {
  korisnik!: number;
  favoriti: any[] = [];
  oznaceniNaziv?: String;
  filter = '';
  brojac!: number;
  serijaBaza: any[] = [];
  stranica: number = 1;
  naziv!: string;
  constructor(
    private serijeServis: SerijeService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.dohvatiPonovo();
  }

  dohvatiPonovo() {
    const value: string = this.cookieService.get('Korisnik');
    this.serijeServis.dajKorisnika(value).subscribe((podaci) => {
      this.korisnik = podaci.id;
      console.log(this.korisnik);

      this.serijeServis.dajFavorite(this.korisnik).subscribe((podaci) => {
        this.favoriti = podaci;
        for (let i = 0; i < this.favoriti.length; i++) {
          this.serijaBaza = this.favoriti[i].serija_id_serija;
          console.log(this.serijaBaza);

          this.serijeServis
            .dajSerijuFavoriti(this.serijaBaza)
            .subscribe((podaci) => {
              this.favoriti[i] = podaci;
              console.log(this.favoriti);
            });
        }
      });
    });
  }
}
