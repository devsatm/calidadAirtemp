import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Defecto } from '../shared/interface';

@Injectable({
  providedIn: 'root'
})
export class DefectoService {

  private readonly ApiUrl:string="http://calidad.airtemp.mx:8088/calidadBackend/public/api/defecto";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Defecto[]> {
    return this.httpClient.get<Defecto[]>(this.ApiUrl)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getList(id:string): Observable<Defecto[]>{
    return this.httpClient.get<Defecto[]>(this.ApiUrl+'/list/'+id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  find(id:string): Observable<Defecto> {
    return this.httpClient.get<Defecto>(this.ApiUrl+'/'+ id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(defecto: any): Observable<Defecto> {
    return this.httpClient.post<Defecto>(this.ApiUrl, JSON.stringify(defecto), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id:string, defecto: Defecto): Observable<Defecto> {
    return this.httpClient.put<Defecto>(this.ApiUrl +'/'+ id, JSON.stringify(defecto), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id: string){
    return this.httpClient.delete<Defecto>(this.ApiUrl+'/' + id, this.httpOptions)
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
