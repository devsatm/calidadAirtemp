import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Maquina } from '../interfaces/shared';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaquinaService {

  private readonly ApiUrl:string="http://10.1.0.186:8088/calidadBackend/public/api/maquina";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Maquina[]> {
    return this.httpClient.get<Maquina[]>(this.ApiUrl)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getList(id:number | null): Observable<Maquina[]>{
    return this.httpClient.get<Maquina[]>(this.ApiUrl+'/list/'+id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getByCodigo(codigo:string):Observable<Maquina>{
    return this.httpClient.get<Maquina>(this.ApiUrl+'/codigo/'+codigo)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  find(id:string): Observable<Maquina> {
    return this.httpClient.get<Maquina>(this.ApiUrl+'/'+ id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(maquina: any): Observable<Maquina> {
    return this.httpClient.post<Maquina>(this.ApiUrl, JSON.stringify(maquina), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id:string, maquina: Maquina): Observable<Maquina> {
    return this.httpClient.put<Maquina>(this.ApiUrl+'/'+ id, JSON.stringify(maquina), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id: string){
    return this.httpClient.delete<Maquina>(this.ApiUrl+'/'+ id, this.httpOptions)
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
