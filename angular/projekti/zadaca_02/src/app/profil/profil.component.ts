import { Component } from '@angular/core';
import { SerijeService } from '../servisi/serije.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss',
})
export class ProfilComponent {
  korisnici: any[] = [];
  ime?: String;
  prezime?: String;
  username?: string;
  email?: string;
  tip_korisnika_id?: number;
  osvjeziForm: FormGroup;
  readonlyForm: boolean = false;
  constructor(
    private serijeServis: SerijeService,
    private cookieService: CookieService,
    private fb: FormBuilder
  ) {
    this.osvjeziForm = this.fb.group({
      ime: ['', [Validators.required]],
      prezime: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
    });
    this.readonlyForm = true;
  }
  ngOnInit(): void {
    this.dohvatiPonovo();
  }
  dohvatiPonovo() {
    const value: string = this.cookieService.get('Korisnik');
    console.log(value);
    this.serijeServis.dajKorisnika(value).subscribe((podaci) => {
      this.korisnici = podaci;
      console.log(this.korisnici);
      this.ime = podaci.ime;
      this.prezime = podaci.prezime;
      this.username = podaci.username;
      this.email = podaci.email;
    });
  }

  osvjezi() {
    if (this.osvjeziForm.valid) {
      const formData = this.osvjeziForm.value;
      const username = formData.username;
      console.log(formData);
      this.serijeServis
        .osvjeziKorisnika(username, formData)
        .subscribe((podaci) => {
          this.korisnici = podaci;
        });
    }
  }
}
