import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Departamento } from '../interfaces/shared';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private readonly ApiUrl:string="http://127.0.0.1:8000/api/departamento/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Departamento[]> {
    return this.httpClient.get<Departamento[]>(this.ApiUrl)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  find(id:string): Observable<Departamento> {
    return this.httpClient.get<Departamento>(this.ApiUrl + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(departamento: any): Observable<Departamento> {
    return this.httpClient.post<Departamento>(this.ApiUrl, JSON.stringify(departamento), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id:string, departamento: Departamento): Observable<Departamento> {
    return this.httpClient.put<Departamento>(this.ApiUrl + id, JSON.stringify(departamento), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id: string){
    return this.httpClient.delete<Departamento>(this.ApiUrl + id, this.httpOptions)
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
