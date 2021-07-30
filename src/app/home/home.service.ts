import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getData(dataIni: any, dataFim: any): Observable<any>{
    return this.http.get(`https://api.covid19api.com/country/brazil/status/confirmed?from=${dataIni}&to=${dataFim}`).pipe(map(x => x));
}

  getDeaths(dataIni: any, dataFim: any): Observable<any> {
    return this.http.get(`https://api.covid19api.com/country/brazil/status/deaths?from=${dataIni}&to=${dataFim}`).pipe(map(x => x));
  }

}
