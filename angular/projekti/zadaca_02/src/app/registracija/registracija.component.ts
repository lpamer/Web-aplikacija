import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SerijeService } from '../servisi/serije.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrl: './registracija.component.scss',
})
export class RegistracijaComponent {
  registrationForm: FormGroup;
  korisnici: any[] = [];

  constructor(private fb: FormBuilder, private serijeServis: SerijeService) {
    this.registrationForm = this.fb.group({
      ime: ['', [Validators.required]],
      prezime: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      username: ['', [Validators.required]],
      tip_korisnika_id: ['', [Validators.required]],
    });
  }

  register() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      console.log(formData);
      this.serijeServis.dodajKorisnika(formData).subscribe((podaci) => {
        this.korisnici = podaci;
      });
    }
  }
}
