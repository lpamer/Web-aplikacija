import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SerijeService } from '../servisi/serije.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrl: './pocetna.component.scss',
})
export class PocetnaComponent implements OnInit {
  @Output() odabranaSerija = new EventEmitter<String>();
  serije: any[] = [];
  oznaceniNaziv?: String;
  filter = '';
  brojac!: number;
  stranica: number = 1;
  UserID = '';
  constructor(
    private serijeServis: SerijeService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.dohvatiPonovo();

    const code = this.route.snapshot.queryParamMap.get('code');
    localStorage.setItem('id', JSON.stringify(code));
  }

  dohvatiPonovo() {
    if (this.filter.length < 3) {
      return;
    } else {
      this.serijeServis
        .dajSerije(this.stranica, this.filter)
        .subscribe((podaci) => {
          this.serije = podaci.results;
        });
    }
  }
}
