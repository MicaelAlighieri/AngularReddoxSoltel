import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Mensaje } from 'src/app/modelos/mensaje.modelo';
import { Usuario } from 'src/app/modelos/usuario.modelo';
import { Bitacora } from 'src/app/modelos/bitacora.modelo';
import { LoginService } from 'src/app/servicios/login/login.service';
import { MensajeInfoService } from 'src/app/servicios/mensajeinfo/mensaje-info.service';
import { MensajeCommunicatorService } from 'src/app/servicios/communicator/mensaje-communicator.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit, OnDestroy {

  // El ID de la bitácora se recibe desde la vista y será esencial para cargar los mensajes asociados a ella
  @Input()
  idBitacora;

  // Esta variable contendrá los datos básicos de la bitácora, aunque en este caso sólo sirve para mostrar el título de la misma
  bitacora: Bitacora;

  // Estas listas se utilizan en la vista para visualización y para contener los resultados realizados durante los filtrados
  listaMensajes : Mensaje[];
  listaUsuarios: Usuario[];

  // Esta variable contiene el id de un usuario que seleccionemos en la vista, es un componente esencial para los filtrados por usuario
  idUsuario = ""

  // Estas variables sirven para gestionar las suscripciones
  suscripcionDevolverMensajes: Subscription
  suscripcionFiltradoMensajes: Subscription

  constructor( private router: Router, private loginLoginService: LoginService, private mensajeInfoService: MensajeInfoService, private mensajeCommunicatorService: MensajeCommunicatorService ) {
    
  }

  ngOnInit(): void {
    this.cargarBitacora()
    this.cargarMensajes()
    this.cargarUsuarios()
  }

  ngOnDestroy(): void {

  }

  cargarMensajes() {
    this.listaMensajes = [];
    this.suscripcionDevolverMensajes = this.mensajeInfoService.devolverMensajes(this.idBitacora).subscribe( mensajes => 
      {
      this.listaMensajes = mensajes
      //console.log(this.listaMensajes)
      }
    )
  }

  cargarUsuarios() {
    this.listaUsuarios = []
    this.listaUsuarios = this.mensajeInfoService.devolverUsuarios(this.idBitacora)
  }

  // Rescata la bitácora según el id que se haya recibido
  cargarBitacora(){
    $.ajax({
      url: `${environment.host}:${environment.port}/bitacoras/${this.idBitacora}`,
      success: (respuesta) => {
        this.bitacora = new Bitacora(respuesta.id, respuesta.nombre, respuesta.enrutamiento)
      },
      error: () => {
            this.router.navigate(['/no-encontrado']);
        }
    });
  }

  // Este método permite filtrar según el id del usuario que se haya seleccionado en la vista
  filtrar(): void{
    this.mensajeCommunicatorService.anunciarFiltrado(this.idBitacora,this.idUsuario)
    this.suscripcionFiltradoMensajes = this.mensajeCommunicatorService.mensajesCargados$.subscribe((data) => {
      this.listaMensajes = data
    })
  }

  estaConectado(): boolean{
    return this.loginLoginService.estaConectado()
  }

}
