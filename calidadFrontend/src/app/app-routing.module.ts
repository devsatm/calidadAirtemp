import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { VistaAdminComponent } from './vista-admin/vista-admin.component';
import { AltaInfoComponent } from './alta-info/alta-info.component';
import { LoginComponent } from './login/login.component';
import { RegisEmpleadosComponent } from './regis-empleados/regis-empleados.component';

const routes: Routes = [
  {path:'header',component:HeaderComponent},
  {path:'admin',component:VistaAdminComponent},
  {path:'alta',component:AltaInfoComponent},
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'empleados',component:RegisEmpleadosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
