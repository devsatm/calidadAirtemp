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
  filtro: string = '';
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
  /*filtrarTabla() {
    const resultados = this.departamentos.filter(departamento =>
      departamento.numero.toLowerCase().includes(this.filtro.toLowerCase()) ||
      departamento.nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
      departamento.encargado.toLowerCase().includes(this.filtro.toLowerCase()) ||
      departamento.tipo.toLowerCase().includes(this.filtro.toLowerCase())
    );

    this.mostrarMensaje = resultados.length === 0;

    return resultados;
  }*/

}
