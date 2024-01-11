import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { VistaAdminComponent } from './vista-admin/vista-admin.component';
import { AltaInfoComponent } from './alta-info/alta-info.component';
import { LoginComponent } from './login/login.component';
import { RegisEmpleadosComponent } from './regis-empleados/regis-empleados.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VistaAdminComponent,
    AltaInfoComponent,
    LoginComponent,
    RegisEmpleadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
