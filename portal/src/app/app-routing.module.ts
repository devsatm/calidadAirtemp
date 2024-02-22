import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaEmpleadosComponent } from './altaInformacion/alta-empleados/alta-empleados.component';
import { FormularioRegistroComponent } from './Empleado/formulario-registro/formulario-registro.component';
import { HeaderEmpleadoComponent } from './Empleado/header-empleado/header-empleado.component';
import { AgregarDefectosComponent } from './Empleado/formulario-registro/agregar-defectos/agregar-defectos.component';
import { LoginComponent } from './login/login.component';
import { PanelAdminComponent } from './Administrador/panel-admin/panel-admin.component';
import { PanelEmpleadoComponent } from './Empleado/panel-empleado/panel-empleado.component';
import { VerMisRegistrosComponent } from './Empleado/ver-mis-registros/ver-mis-registros.component';
import { AltaInformacionComponent } from './Administrador/alta-informacion/alta-informacion.component';
import { AltaDepartamentosComponent } from './altaInformacion/alta-departamentos/alta-departamentos.component';
import { AltaMaquinasComponent } from './altaInformacion/alta-maquinas/alta-maquinas.component';
import { AltaPartesComponent } from './altaInformacion/alta-partes/alta-partes.component';
import { AltaDefectosComponent } from './altaInformacion/alta-defectos/alta-defectos.component';
import { TodosLosRegistrosComponent } from './Administrador/todos-los-registros/todos-los-registros.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'Panel/Administrador',component:PanelAdminComponent},
  {path:'panel/empleado/:id',component:PanelEmpleadoComponent},
  {path:'empleado/nuevo-registro/:id',component:FormularioRegistroComponent},
  {path:'empleado/mis-registros/:id', component:VerMisRegistrosComponent},
  {path:'administrador/alta-informacion',component:AltaInformacionComponent},
  {path:'administrador/alta-empleados',component:AltaEmpleadosComponent},
  {path:'administrador/alta-departamentos',component:AltaDepartamentosComponent},
  {path:'administrador/alta-maquinas',component:AltaMaquinasComponent},
  {path:'administrador/alta-partes',component:AltaPartesComponent},
  {path:'administrador/alta-defectos',component:AltaDefectosComponent},
  {path:'administrador/tabla/todos-registros',component:TodosLosRegistrosComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
