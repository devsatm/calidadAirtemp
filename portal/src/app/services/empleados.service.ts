import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empleados } from '../shared/interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  private readonly ApiUrl:string="http://127.0.0.1:8000/api/empleados/"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Empleados[]> {
    return this.httpClient.get<Empleados[]>(this.ApiUrl)
    /*.pipe(
      catchError(this.errorHandler)
    )*/
  }
  find(id:string): Observable<Empleados> {
    return this.httpClient.get<Empleados>(this.ApiUrl+ id)
    /*.pipe(
      catchError(this.errorHandler)
    )*/
  }
  create(empleados: any): Observable<Empleados> {
    return this.httpClient.post<Empleados>(this.ApiUrl, JSON.stringify(empleados), this.httpOptions)
    /*.pipe(
      catchError(this.errorHandler)
    )*/
  }
  update(id:string, empleados: Empleados): Observable<Empleados> {
    return this.httpClient.put<Empleados>(this.ApiUrl+ id, JSON.stringify(empleados), this.httpOptions)
    /*.pipe(
      catchError(this.errorHandler)
    )*/
  }

  delete(id: string){
    return this.httpClient.delete<Empleados>(this.ApiUrl+ id, this.httpOptions)
    /*.pipe(
      catchError(this.errorHandler)
    )*/
  }
}
