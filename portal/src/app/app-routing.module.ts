import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaEmpleadosComponent } from './altaInformacion/alta-empleados/alta-empleados.component';
import { FormularioRegistroComponent } from './Empleado/formulario-registro/formulario-registro.component';
import { HeaderEmpleadoComponent } from './Empleado/header-empleado/header-empleado.component';

const routes: Routes = [
  {path:'alta-empleados',component:AltaEmpleadosComponent},
  {path:'formulario',component:FormularioRegistroComponent},
  {path:'headerEmpleado',component:HeaderEmpleadoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
