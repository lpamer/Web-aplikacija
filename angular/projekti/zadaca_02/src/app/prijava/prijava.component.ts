import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SerijeService } from '../servisi/serije.service';
import { CookieService } from 'ngx-cookie-service';

import * as otplib from 'otplib';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  providers: [CookieService],
  styleUrl: './prijava.component.scss',
})
export class PrijavaComponent {
  loginForm: FormGroup;
  korisnici: any[] = [];
  cookieValue?: string;
  secret!: string;

  //@ViewChild('recaptchaRef') recaptchaRef: any;

  constructor(
    private fb: FormBuilder,
    private serijeServis: SerijeService,
    private cookieService: CookieService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  handleToken(token: string) {
    // Ovdje postavite svoj kod nakon dobivanja tokena
  }

  login() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      const password = formData.password;
      const username = formData.username;

      //this.recaptchaRef.execute();

      this.serijeServis
        .prijaviKorisnika(username, password)
        .subscribe((podaci) => {
          this.korisnici = podaci;
          this.cookieService.set('Korisnik', username);
          this.cookieValue = this.cookieService.get('Korisnik');
          console.log(this.cookieValue);
        });
    }
  }

  loginGitHub() {
    const clientId = 'ec61f353f110f25570e5';
    const redirectUrl = 'http://localhost:4200/pocetna';

    window.location.href = `https:/github.com/login/oauth/authorize?client_id=${clientId}&redirect_url=${redirectUrl}`;
  }
}
