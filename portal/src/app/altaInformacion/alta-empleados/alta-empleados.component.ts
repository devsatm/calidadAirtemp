import { Component, OnInit} from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { Empleados } from 'src/app/shared/interface';

@Component({
  selector: 'app-alta-empleados',
  templateUrl: './alta-empleados.component.html',
  styleUrls: ['./alta-empleados.component.css']
})
export class AltaEmpleadosComponent implements OnInit{

  formEmpleados!:FormGroup;
  empleados:Empleados[]=[];
  empleado!:Empleados;
  filtroBusqueda: string = '';
  idEmpleado:string='';

  constructor(private empleadoS:EmpleadosService){}

  ngOnInit(): void {
    this.empleadoS.getAll().subscribe((data:Empleados[])=>{
      this.empleados=data;
    })
    this.formEmpleados = new FormGroup({
      'nombre': new FormControl('',Validators.required),
      'apellido': new FormControl('',Validators.required),
      'usuario': new FormControl('',Validators.required),
      'contrasenia': new FormControl('',Validators.required),
      'perfil': new FormControl('Empleado',Validators.required),
      'estatus': new FormControl('Activo',Validators.required)
    });
  }

  submit(){
    this.empleadoS.create(this.formEmpleados.value).subscribe(res=>{
      const empleado={
        id:res.id,
        nombre:this.formEmpleados.value.nombre,
        apellido:this.formEmpleados.value.apellido,
        usuario:this.formEmpleados.value.usuario,
        contrasenia:this.formEmpleados.value.contrasenia,
        perfil:this.formEmpleados.value.perfil,
        estatus:this.formEmpleados.value.estatus,
      }
      this.empleados.unshift(empleado);
      this.formEmpleados.reset();
      /*this.formEmpleados.patchValue({
        nombre: '' // Establece el campo 'nombre' en blanco
      });*/
    });
  }
  obtener(id: string) {
    this.idEmpleado = id;
    this.empleadoS.find(id).subscribe((data: Empleados) => {
      this.empleado = data;
      //console.log(this.empleado);

      // Asignar los valores del empleado al formulario
      this.formEmpleados.patchValue({
        nombre: this.empleado.nombre,
        apellido: this.empleado.apellido,
        usuario: this.empleado.usuario,
        contrasenia: this.empleado.contrasenia,
        perfil: this.empleado.perfil,
        estatus: this.empleado.estatus
      });
    });
  }

  edit(formulario:FormGroup){
    //console.log('Nuevos datos:', formulario.value);
    this.empleadoS.update(this.idEmpleado,formulario.value).subscribe(res=>{
      console.log('empleado editado');
      const index = this.empleados.findIndex(d => d.id === this.idEmpleado);
      if (index !== -1) {
        this.empleados[index] = { ...formulario.value, id: this.idEmpleado };
      }
    });
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
