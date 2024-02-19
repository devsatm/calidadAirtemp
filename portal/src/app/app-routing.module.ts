import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaEmpleadosComponent } from './altaInformacion/alta-empleados/alta-empleados.component';

const routes: Routes = [
  {path:'alta-empleados',component:AltaEmpleadosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
