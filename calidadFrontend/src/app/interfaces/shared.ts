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
export interface Empleados{
  id:string;
  nombre:string;
  apellido:string;
  usuario:string;
  contrasenia:string;
  perfil:string;
  estatus:string;
}
export interface Defecto{
  id:string;
  codigomq:string;
  numerodp:string;
  numerop:string;
  tipodefecto:string;
}
