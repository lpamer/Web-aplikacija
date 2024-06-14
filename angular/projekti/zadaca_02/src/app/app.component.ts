import { Component } from '@angular/core';
import { SerijeService } from './servisi/serije.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'zadaca_02';
  putanja = 'pocetna';

  constructor(
    private serijeServis: SerijeService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  odjava() {
    this.cookieService.deleteAll();
    localStorage.removeItem('code');
    localStorage.clear();
  }

  provjeraFavoriti() {
    const value: string = this.cookieService.get('Korisnik');
    console.log(value);
    this.serijeServis.dajKorisnika(value).subscribe((podaci) => {
      console.log(podaci);
      if (podaci.tip_korisnika_id != null) {
        this.router.navigate(['/favoriti']);
      } else {
        this.router.navigate(['']);
        alert('Nije dozvoljen pristup');
      }
    });
  }

  provjeraKorisnici() {
    const value: string = this.cookieService.get('Korisnik');
    console.log(value);
    this.serijeServis.dajKorisnika(value).subscribe((podaci) => {
      console.log(podaci);
      if (podaci.tip_korisnika_id == 1) {
        this.router.navigate(['/korisnici']);
      } else {
        this.router.navigate(['']);
        alert('Nije dozvoljen pristup');
      }
    });
  }

  provjeraRegistracija() {
    const value: string = this.cookieService.get('Korisnik');
    console.log(value);
    this.serijeServis.dajKorisnika(value).subscribe((podaci) => {
      console.log(podaci);
      if (podaci.tip_korisnika_id == 1) {
        this.router.navigate(['/registracija']);
      } else {
        this.router.navigate(['']);
        alert('Nije dozvoljen pristup');
      }
    });
  }

  provjeraProfil() {
    const value: string = this.cookieService.get('Korisnik');
    console.log(value);
    this.serijeServis.dajKorisnika(value).subscribe((podaci) => {
      console.log(podaci);
      if (podaci.tip_korisnika_id != null) {
        this.router.navigate(['/profil']);
      } else {
        this.router.navigate(['']);
        alert('Nije dozvoljen pristup');
      }
    });
  }
}
