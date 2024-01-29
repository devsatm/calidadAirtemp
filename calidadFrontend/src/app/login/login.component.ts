import { Component, OnInit } from '@angular/core';
import { Empleados } from '../interfaces/shared';
import { EmpleadosService } from '../services/empleados.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  usuario:string='';
  contrasenia:string='';
  empleado!:Empleados;
  error:boolean=false;
  id:string='';
  perfil:string='';

  constructor(private empleadosS:EmpleadosService){}

  ngOnInit(): void {

  }

  /*submit() {
    const datos = { usuario: this.usuario, contrasenia: this.contrasenia };
    this.empleadosS.verificarCredenciales(datos).subscribe(
      res => {
        console.log('Credenciales válidas', res);
      },
      error => {
        console.error('Credenciales inválidas', error);
      }
    );
  }*/
  submit() {
    const datos = { usuario: this.usuario, contrasenia: this.contrasenia };
    this.empleadosS.verificarCredenciales(datos).subscribe(
      res => {
        this.error=false;
        console.log('Credenciales válidas');
        this.empleado=res;
        this.id=res.id;
        this.perfil=res.perfil;
        //console.log('RESPUESTA',this.empleado);
        // Hacer algo con los datos del empleado
      },
      error => {
        console.error('Credenciales inválidas', error);
        this.error=true;
      }
    );
  }



}
