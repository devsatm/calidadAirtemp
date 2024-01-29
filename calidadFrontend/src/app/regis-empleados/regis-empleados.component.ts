import { Component, OnInit } from '@angular/core';
import { Empleados } from '../interfaces/shared';
import { EmpleadosService } from '../services/empleados.service';

@Component({
  selector: 'app-regis-empleados',
  templateUrl: './regis-empleados.component.html',
  styleUrls: ['./regis-empleados.component.css']
})
export class RegisEmpleadosComponent implements OnInit{
  crearEmp!:Empleados;
  empleados:Empleados[]=[];
  idEmp:string='';
  filtroBusqueda: string = '';
  mostrarMensaje: boolean = false;

  constructor(private empleadosS:EmpleadosService){}

  ngOnInit(): void {
    this.empleadosS.getAll().subscribe((data:Empleados[])=>{
      this.empleados=data;
    });
    this.crearEmp={
      id:'',
      nombre:'',
      apellido:'',
      usuario:'',
      contrasenia:'',
      perfil:'',
      estatus:''
    }
  }

  submit(element:Empleados){
    this.empleadosS.create(this.crearEmp).subscribe(res =>{
      console.log('empleado agregado');
      const newEmp={
        id: res.id,
        nombre: element.nombre,
        apellido: element.apellido,
        usuario: element.usuario,
        contrasenia: element.contrasenia,
        perfil: element.perfil,
        estatus: element.estatus
      }
      this.empleados.push(newEmp);
      this.crearEmp = {
        id:'',
        nombre:'',
        apellido:'',
        usuario:'',
        contrasenia:'',
        perfil:'',
        estatus:''
      };
    })
  }
  submitedit(element:Empleados){
    this.empleadosS.update(this.idEmp,this.crearEmp).subscribe(res=>{
      console.log('Departamento aditado');
      // Encuentra el índice del departamento en el arreglo
    const index = this.empleados.findIndex(d => d.id === this.idEmp);

    if (index !== -1) {
      // Actualiza el departamento en el arreglo
      this.empleados[index] = { ...this.crearEmp, id: this.idEmp };
    }
    })
  }
  editDepto(id:string){
    this.idEmp=id;
    this.empleadosS.find(id).subscribe((data:Empleados)=>{
      this.crearEmp=data;
    });
  }
  nuevo(){
    this.crearEmp = {
      id:'',
      nombre:'',
      apellido:'',
      usuario:'',
      contrasenia:'',
      perfil:'',
      estatus:''
    };
  }
  //filtro para el buscador
  filtrarEmpleados(): any[] {
    const valorBusqueda = this.filtroBusqueda.toLowerCase();
    return this.empleados.filter((empleado) => {
      return empleado.nombre.toString().toLowerCase().includes(valorBusqueda) ||
             empleado.apellido.toLowerCase().includes(valorBusqueda) ||
             empleado.usuario.toLowerCase().includes(valorBusqueda) ||
             empleado.contrasenia.toLowerCase().includes(valorBusqueda)||
             empleado.perfil.toLowerCase().includes(valorBusqueda)||
             empleado.estatus.toLowerCase().includes(valorBusqueda);
    });
  }

}
