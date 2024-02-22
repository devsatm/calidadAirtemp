import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Parte } from '../shared/interface';

@Injectable({
  providedIn: 'root'
})
export class ParteService {

  private readonly ApiUrl:string="http://calidad.airtemp.mx:8088/calidadBackend/public/api/parte";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Parte[]> {
    return this.httpClient.get<Parte[]>(this.ApiUrl)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getList(id:number | null): Observable<Parte[]>{
    return this.httpClient.get<Parte[]>(this.ApiUrl+'/list/'+id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getByNumero(numero:string):Observable<Parte>{
    return this.httpClient.get<Parte>(this.ApiUrl+'/numero/'+numero)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  find(id:string): Observable<Parte> {
    return this.httpClient.get<Parte>(this.ApiUrl+'/'+ id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  create(parte: any): Observable<Parte> {
    return this.httpClient.post<Parte>(this.ApiUrl, JSON.stringify(parte), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  update(id:string, parte: Parte): Observable<Parte> {
    return this.httpClient.put<Parte>(this.ApiUrl + id, JSON.stringify(parte), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id: string){
    return this.httpClient.delete<Parte>(this.ApiUrl + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
