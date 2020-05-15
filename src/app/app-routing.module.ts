import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { PruebasComponent } from './paginas/bitacoras/pruebas/pruebas.component';
import { NoEncontradoComponent } from './paginas/no-encontrado/no-encontrado.component';
import { LoginComponent } from './paginas/login/login.component';
import { RegistroComponent } from './paginas/registro/registro.component';
import { RegistroAngularComponent } from './paginas/bitacoras/registro-angular/registro-angular.component';
import { ListadoComponent } from './paginas/bitacoras/listado/listado.component';
import { PerfilComponent } from './paginas/perfil/perfil.component';


const routes: Routes = [
  {path: '', component: InicioComponent },
  {path: 'b', component: ListadoComponent },
  {path: 'b/pruebas', component: PruebasComponent },
  {path: 'b/registro-angular', component: RegistroAngularComponent },
  {path: 'perfil/:id', component: PerfilComponent },
  {path: 'no-encontrado', component: NoEncontradoComponent },
  {path: 'login', component: LoginComponent },
  {path: 'registro', component: RegistroComponent },
  {path: '**', redirectTo: 'no-encontrado' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
