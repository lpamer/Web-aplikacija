import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { KorisniciComponent } from './korisnici/korisnici.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { SerijaDetaljiComponent } from './serija-detalji/serija-detalji.component';
import { DokumentacijaComponent } from './dokumentacija/dokumentacija.component';
import { CookieService } from 'ngx-cookie-service';
import { ProfilComponent } from './profil/profil.component';
import { FavoritiComponent } from './favoriti/favoriti.component';
import { FavoritiDetaljiComponent } from './favoriti-detalji/favoriti-detalji.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

const routes: Routes = [
  { path: 'pocetna', component: PocetnaComponent },
  { path: 'korisnici', component: KorisniciComponent },
  { path: 'registracija', component: RegistracijaComponent },
  { path: 'prijava', component: PrijavaComponent },
  { path: 'serijaDetalji/:id', component: SerijaDetaljiComponent },
  { path: 'dokumentacija', component: DokumentacijaComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'favoriti', component: FavoritiComponent },
  { path: 'favoritiDetalji/:id', component: FavoritiDetaljiComponent },
  { path: '', redirectTo: '/pocetna', pathMatch: 'full' },
];
@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    KorisniciComponent,
    RegistracijaComponent,
    PrijavaComponent,
    SerijaDetaljiComponent,
    DokumentacijaComponent,
    ProfilComponent,
    FavoritiComponent,
    FavoritiDetaljiComponent,
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot(routes),
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
