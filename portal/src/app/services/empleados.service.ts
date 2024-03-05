import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empleados } from '../shared/interface';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  private readonly ApiUrl:string="http://calidad.airtemp.mx:8088/calidadBackend/public/api/empleados";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Empleados[]> {
    return this.httpClient.get<Empleados[]>(this.ApiUrl)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  find(id:string): Observable<Empleados> {
    return this.httpClient.get<Empleados>(this.ApiUrl+'/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(empleados: any): Observable<Empleados> {
    return this.httpClient.post<Empleados>(this.ApiUrl, JSON.stringify(empleados), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  verificarCredenciales(empleados: any): Observable<Empleados> {
    return this.httpClient.post<Empleados>(this.ApiUrl + '/verificar-credenciales', empleados, this.httpOptions);
  }

  update(id:string, empleados: Empleados): Observable<Empleados> {
    return this.httpClient.put<Empleados>(this.ApiUrl +'/' + id, JSON.stringify(empleados), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id: string){
    return this.httpClient.delete<Empleados>(this.ApiUrl+'/' + id, this.httpOptions)
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
