export interface Shared {
}
export interface Departamento{
  id:string;
  numero:string;
  nombre:string;
  encargado:string;
  tipo:string;
}
export interface Maquina{
  id:string;
  codigo:string;
  nombre:string;
  codproceso:string;
  departamento:string;
}
export interface Parte{
  id:string;
  numero:string;
  descripcion:string;
  tipo:string;
  cliente:string;
  departamento:string
}
