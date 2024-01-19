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
  {path:'header',component:HeaderComponent},
  {path:'admin',component:VistaAdminComponent},
  {path:'alta',component:AltaInfoComponent},
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'empleados',component:RegisEmpleadosComponent},
  {path:'departamentos',component:RegisDepartamentosComponent},
  {path:'maquinas',component:RegisMaquinasComponent},
  {path:'partes',component:RegisPartesComponent},
  {path:'tabla',component:TablaCalidadComponent},
  {path:'vistaempleados',component:VistaEmpleadoComponent},
  {path:'misregistros',component:MisRegistrosComponent},
  {path:'headermovil',component:HeaderMovilComponent},
  {path:'formulario',component:FormularioMovilComponent},
  {path:'defectos',component:RegisDefectosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
