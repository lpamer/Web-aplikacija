import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SerijeService } from '../servisi/serije.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-korisnici',
  templateUrl: './korisnici.component.html',
  styleUrl: './korisnici.component.scss',
})
export class KorisniciComponent implements OnInit {
  @Output() odabranaSerija = new EventEmitter<String>();
  korisnici: any[] = [];
  oznaceniNaziv?: String;
  filter = '';
  brojac!: number;
  stranica: number = 1;
  tipKorisnika!: number;
  constructor(private serijeServis: SerijeService) {}
  ngOnInit(): void {
    this.dohvatiPonovo();
  }
  dohvatiPonovo() {
    this.serijeServis.dajKorisnike().subscribe((podaci) => {
      this.korisnici = podaci;
    });
  }

  prikaziOpis(naziv: String) {
    this.oznaceniNaziv = naziv;
  }

  prikaziVise(nazivSerije: String) {
    this.odabranaSerija.emit(nazivSerije);
  }

  brisanje(username: string) {
    let korime = username;
    this.serijeServis.dajKorisnika(korime).subscribe((podaci) => {
      this.korisnici = podaci;
      console.log(this.korisnici);
      this.tipKorisnika = podaci.tip_korisnika_id;
      if (this.tipKorisnika != 1) {
        this.serijeServis.obrisiKorisnika(korime).subscribe((podaci) => {
          this.korisnici = podaci;
          this.dohvatiPonovo();
        });
      } else {
        alert('Nije dozvoljeno brisanje administratora!');
      }
    });
  }
}
