import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { DetallesRegistro, Registrofinal } from '../interfaces/shared';

@Injectable({
  providedIn: 'root'
})
export class CalidadService {

  private readonly ApiUrl:string="http://127.0.0.1:8000/api/registrofinal/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Registrofinal[]> {
    return this.httpClient.get<Registrofinal[]>(this.ApiUrl)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  find(id:string): Observable<Registrofinal> {
    return this.httpClient.get<Registrofinal>(this.ApiUrl + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getList(empleado:string):Observable<Registrofinal[]>{
    return this.httpClient.get<Registrofinal[]>(this.ApiUrl+'list/'+empleado)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getByDateRange(start_date:String,end_date:String):Observable<Registrofinal[]>{
    return this.httpClient.get<Registrofinal[]>(this.ApiUrl+'date-range/'+start_date+'/'+end_date)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getDetallesRegistroPorId(id:string): Observable<DetallesRegistro> {
    return this.httpClient.get<DetallesRegistro>(this.ApiUrl + 'detalles-registrofinal/'+id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(calidad: any): Observable<Registrofinal> {
    return this.httpClient.post<Registrofinal>(this.ApiUrl, JSON.stringify(calidad), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id:string, calidad: Registrofinal): Observable<Registrofinal> {
    return this.httpClient.put<Registrofinal>(this.ApiUrl + id, JSON.stringify(calidad), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id: string){
    return this.httpClient.delete<Registrofinal>(this.ApiUrl + id, this.httpOptions)
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
