import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Departamento } from '../shared/interface';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private readonly ApiUrl:string="http://calidad.airtemp.mx:8088/calidadBackend/public/api/departamento";
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
    return this.httpClient.get<Departamento>(this.ApiUrl +'/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getList(numero:string):Observable<Departamento>{
    return this.httpClient.get<Departamento>(this.ApiUrl+'/numero/'+numero)
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
    return this.httpClient.put<Departamento>(this.ApiUrl+'/' + id, JSON.stringify(departamento), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id: string){
    return this.httpClient.delete<Departamento>(this.ApiUrl+'/' + id, this.httpOptions)
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
