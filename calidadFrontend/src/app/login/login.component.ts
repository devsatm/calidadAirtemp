import { Component, OnInit } from '@angular/core';
import { Empleados } from '../interfaces/shared';
import { EmpleadosService } from '../services/empleados.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  usuario:string='';
  contrasenia:string='';
  error:boolean=false;
  mostrarContrasenia: boolean = false;

  constructor(private empleadosS:EmpleadosService,private router:Router){}

  ngOnInit(): void {

  }
  submit() {
    if (this.usuario === '@CalidadAirtemp' && this.contrasenia === 'AdminCalidad') {
      // Usuario y contraseña predeterminados, navegar a la página del administrador
      this.router.navigate(['Panel/Administrador']);
    } else {
      const datos = { usuario: this.usuario, contrasenia: this.contrasenia };
      this.empleadosS.verificarCredenciales(datos).subscribe(
        res => {
          this.error = false;
          const id = res.id;
          const perfil = res.perfil.toLowerCase();
          const estatus = res.estatus;
          if(estatus === 'Activo'){
            this.router.navigate(['panel/',perfil, id]);
          }else{
            this.error = true;
          }
        },
        error => {
          console.error('Credenciales inválidas');
          this.error = true;
        }
      );
    }
  }
}
