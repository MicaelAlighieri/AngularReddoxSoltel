import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { PruebasComponent } from './paginas/bitacoras/pruebas/pruebas.component';
import { NoEncontradoComponent } from './paginas/no-encontrado/no-encontrado.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './paginas/login/login.component';
import { RegistroComponent } from './paginas/registro/registro.component';
import { NavegacionComponent } from './componentes/navegacion/navegacion.component';
import { PanelmensajenuevoComponent } from './componentes/panelmensajenuevo/panelmensajenuevo.component';
import { PaneleditarmensajeComponent } from './componentes/paneleditarmensaje/paneleditarmensaje.component';
import { BitacoraComponent } from './componentes/bitacora/bitacora.component';
import { RegistroAngularComponent } from './paginas/bitacoras/registro-angular/registro-angular.component';
import { ListadoComponent } from './paginas/bitacoras/listado/listado.component';
import { PerfilComponent } from './paginas/perfil/perfil.component';
import { MostrarAntiguedadPipe } from './tuberias/mostrar-antiguedad/mostrar-antiguedad.pipe';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { MostrarEdadPipe } from './tuberias/mostrar-edad/mostrar-edad.pipe';
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PruebasComponent,
    NoEncontradoComponent,
    LoginComponent,
    RegistroComponent,
    NavegacionComponent,
    PanelmensajenuevoComponent,
    PaneleditarmensajeComponent,
    BitacoraComponent,
    RegistroAngularComponent,
    ListadoComponent,
    PerfilComponent,
    MostrarAntiguedadPipe,
    MostrarEdadPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
