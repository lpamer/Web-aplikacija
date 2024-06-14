import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SerijeService {
  restServis = environment.restServis;

  constructor(private http: HttpClient) {}

  dajSerije(stranica: number, naziv: string): Observable<any> {
    const url = `${this.restServis}/api/tmdb/tv?stranica=${stranica}&trazi=${naziv}`;
    return this.http.get(url, {});
  }
  dajSeriju(id: number): Observable<any> {
    const url = `${this.restServis}/api/tmdb/tv1?id=${id}`;
    return this.http.post(url, {});
  }

  dajSerijuFavoriti(serija_id: any): Observable<any> {
    const url = `${this.restServis}/baza/SerijaFavoriti/${serija_id}`;
    return this.http.get(url, {});
  }

  dajSerijuBaza(tmdb_id: any): Observable<any> {
    const url = `${this.restServis}/baza/favoritiSerija/${tmdb_id}`;
    return this.http.get(url, {});
  }

  dodajFavorita(
    korisnik_id: number,
    serija_id_serija: number
  ): Observable<any> {
    return this.http.post(
      `${this.restServis}/baza/favoriti/`,
      { korisnik_id, serija_id_serija },
      { responseType: 'text' }
    );
  }

  dajFavorite(korisnik_id: number): Observable<any[]> {
    const url = `${this.restServis}/baza/favoriti/${korisnik_id}`;
    return this.http.get<any[]>(url);
  }

  dodajSeriju(zahtjev: any): Observable<any> {
    return this.http.post(`${this.restServis}/baza/favoritiSerija/`, zahtjev);
  }

  dajKorisnike(): Observable<any[]> {
    const url = `${this.restServis}/api/korisnici`;
    return this.http.get<any[]>(url);
  }

  dajKorisnika(username: string): Observable<any> {
    const url = `${this.restServis}/api/korisnici/${username}`;
    return this.http.get<any>(url);
  }

  obrisiKorisnika(username: string): Observable<any> {
    const url = `${this.restServis}/api/korisnici/${username}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  osvjeziKorisnika(username: string, podaci: any): Observable<any> {
    const url = `${this.restServis}/api/korisnici/${username}`;
    return this.http.put(url, podaci);
  }

  dodajKorisnika(zahtjev: string): Observable<any> {
    console.log(zahtjev);
    return this.http.post(`${this.restServis}/registracija`, zahtjev);
  }

  prijaviKorisnika(username: string, password: string): Observable<any> {
    return this.http.post(
      `${this.restServis}/prijava`,
      { username, password },
      { responseType: 'text' }
    );
  }
}
