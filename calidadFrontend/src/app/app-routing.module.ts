import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { VistaAdminComponent } from './vista-admin/vista-admin.component';
import { AltaInfoComponent } from './alta-info/alta-info.component';
import { LoginComponent } from './login/login.component';
import { RegisEmpleadosComponent } from './regis-empleados/regis-empleados.component';
import { RegisDepartamentosComponent } from './regis-departamentos/regis-departamentos.component';
import { RegisMaquinasComponent } from './regis-maquinas/regis-maquinas.component';
import { RegisPartesComponent } from './regis-partes/regis-partes.component';
import { TablaCalidadComponent } from './tabla-calidad/tabla-calidad.component';
import { VistaEmpleadoComponent } from './vista-empleado/vista-empleado.component';
import { MisRegistrosComponent } from './mis-registros/mis-registros.component';
import { HeaderMovilComponent } from './header-movil/header-movil.component';
import { FormularioMovilComponent } from './formulario-movil/formulario-movil.component';
import { RegisDefectosComponent } from './regis-defectos/regis-defectos.component';

const routes: Routes = [
  //{path:'header',component:HeaderComponent},
  {path:'Panel/Administrador',component:VistaAdminComponent},
  {path:'administrador/alta-informacion',component:AltaInfoComponent},
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'administrador/alta-empleados',component:RegisEmpleadosComponent},
  {path:'administrador/alta-departamentos',component:RegisDepartamentosComponent},
  {path:'administrador/alta-maquinas',component:RegisMaquinasComponent},
  {path:'administrador/alta-partes',component:RegisPartesComponent},
  {path:'administrador/tabla/todos-registros',component:TablaCalidadComponent},
  {path:'panel/empleado/:id',component:VistaEmpleadoComponent},
  {path:'empleado/mis-registros/:id',component:MisRegistrosComponent},
  //{path:'headermovil',component:HeaderMovilComponent},
  {path:'empleado/nuevo-registro/:id',component:FormularioMovilComponent},
  {path:'administrador/alta-defectos',component:RegisDefectosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
