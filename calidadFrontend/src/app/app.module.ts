import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VistaAdminComponent,
    AltaInfoComponent,
    LoginComponent,
    RegisEmpleadosComponent,
    RegisDepartamentosComponent,
    RegisMaquinasComponent,
    RegisPartesComponent,
    TablaCalidadComponent,
    VistaEmpleadoComponent,
    MisRegistrosComponent,
    HeaderMovilComponent,
    FormularioMovilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
