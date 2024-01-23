import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Calidad } from '../interfaces/shared';

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

  getAll(): Observable<Calidad[]> {
    return this.httpClient.get<Calidad[]>(this.ApiUrl)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  find(id:string): Observable<Calidad> {
    return this.httpClient.get<Calidad>(this.ApiUrl + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(calidad: any): Observable<Calidad> {
    return this.httpClient.post<Calidad>(this.ApiUrl, JSON.stringify(calidad), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id:string, calidad: Calidad): Observable<Calidad> {
    return this.httpClient.put<Calidad>(this.ApiUrl + id, JSON.stringify(calidad), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id: string){
    return this.httpClient.delete<Calidad>(this.ApiUrl + id, this.httpOptions)
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
