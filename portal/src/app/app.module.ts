import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AltaEmpleadosComponent } from './altaInformacion/alta-empleados/alta-empleados.component';
import { AltaDepartamentosComponent } from './altaInformacion/alta-departamentos/alta-departamentos.component';
import { AltaMaquinasComponent } from './altaInformacion/alta-maquinas/alta-maquinas.component';
import { AltaPartesComponent } from './altaInformacion/alta-partes/alta-partes.component';
import { AltaDefectosComponent } from './altaInformacion/alta-defectos/alta-defectos.component';
import { PanelAdminComponent } from './Administrador/panel-admin/panel-admin.component';
import { AltaInformacionComponent } from './Administrador/alta-informacion/alta-informacion.component';
import { PanelEmpleadoComponent } from './Empleado/panel-empleado/panel-empleado.component';
import { FormularioRegistroComponent } from './Empleado/formulario-registro/formulario-registro.component';
import { VerMisRegistrosComponent } from './Empleado/ver-mis-registros/ver-mis-registros.component';
import { LoginComponent } from './login/login.component';
import { HeaderAdminComponent } from './Administrador/header-admin/header-admin.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderEmpleadoComponent } from './Empleado/header-empleado/header-empleado.component';
import { AgregarDefectosComponent } from "./Empleado/formulario-registro/agregar-defectos/agregar-defectos.component";

@NgModule({
    declarations: [
        AppComponent,
        AltaEmpleadosComponent,
        AltaDepartamentosComponent,
        AltaMaquinasComponent,
        AltaPartesComponent,
        AltaDefectosComponent,
        PanelAdminComponent,
        AltaInformacionComponent,
        PanelEmpleadoComponent,
        FormularioRegistroComponent,
        VerMisRegistrosComponent,
        LoginComponent,
        HeaderAdminComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        HeaderEmpleadoComponent,
        AgregarDefectosComponent,
    ]
})
export class AppModule { }
