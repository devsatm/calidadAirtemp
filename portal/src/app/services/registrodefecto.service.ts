import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Registrodefecto, Valor } from '../shared/interface';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrodefectoService {

  private readonly ApiUrl:string="http://calidad.airtemp.mx:8088/calidadBackend/public/api/registrodefecto";
  //private readonly ApiUrl:string="http://127.0.0.1:8000/api/registrodefecto";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  create(defectocalidad: any): Observable<Registrodefecto> {
    return this.httpClient.post<Registrodefecto>(this.ApiUrl, JSON.stringify(defectocalidad), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  delete(id: string){
    return this.httpClient.delete<Registrodefecto>(this.ApiUrl+'/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getList(idregistrofinal:string):Observable<Registrodefecto[]>{
    return this.httpClient.get<Registrodefecto[]>(this.ApiUrl+'/list/'+idregistrofinal)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  update(id:string, registro: Valor): Observable<Valor> {
    return this.httpClient.put<Valor>(this.ApiUrl+'/' + id, JSON.stringify(registro), this.httpOptions)
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
