import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Defectocalidad } from '../interfaces/shared';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DefectocalidadService {
  private readonly ApiUrl:string="http://127.0.0.1:8000/api/registrodefecto/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  create(defectocalidad: any): Observable<Defectocalidad> {
    return this.httpClient.post<Defectocalidad>(this.ApiUrl, JSON.stringify(defectocalidad), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  delete(id: string){
    return this.httpClient.delete<Defectocalidad>(this.ApiUrl + id, this.httpOptions)
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
