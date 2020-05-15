import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Mensaje } from 'src/app/modelos/mensaje.modelo';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GestionmensajeService } from 'src/app/servicios/gestionmensaje/gestionmensaje.service';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/servicios/login/login.service';
import { Rol } from 'src/app/modelos/rol.modelo';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-paneleditarmensaje',
  templateUrl: './paneleditarmensaje.component.html',
  styleUrls: ['./paneleditarmensaje.component.css']
})
export class PaneleditarmensajeComponent implements OnInit, OnDestroy {

// Datos de la bitácora y el mensaje que se reciben desde la vista
  @Input() mensaje: Mensaje;
  @Input() idBitacora: number;

  // Grupo de control del formulario de envío de mensajes
  mensajeForm: FormGroup;

  // Indicadores de edición y borrado
  editar: boolean;
  editable: boolean;
  borrable: boolean;

  // Variable que contendrá el rol del usuario para gestionar sus permisos sobre los mensajes
  rol: Rol;

  // Variables para la gestión de suscripciones
  suscripcionRol: Subscription;
  suscripcionActualizarMensaje: Subscription;
  suscripcionBorrarMensaje: Subscription;

  constructor( private loginService: LoginService, private gestionMensajeService: GestionmensajeService ) {
    this.mensajeForm = new FormGroup({
      'contenido': new FormControl('', [Validators.required, Validators.minLength(10)]),
    })
    this.suscripcionRol = null, this.suscripcionActualizarMensaje = null, this.suscripcionBorrarMensaje = null
    this.capturarRol()
  }

  ngOnInit(): void {
    if(this.mensaje != undefined) {
      this.mensajeForm.controls['contenido'].setValue(this.mensaje.contenido);
    }
    this.editar = false;
  }

  // Al destruir el componente, se procede a cerrar las suscripciones
  ngOnDestroy(): void {
    if(this.suscripcionRol != null) this.suscripcionRol.unsubscribe();
    if(this.suscripcionActualizarMensaje != null) this.suscripcionActualizarMensaje.unsubscribe();
    if(this.suscripcionBorrarMensaje != null) this.suscripcionBorrarMensaje.unsubscribe();
  }

  // Con este método se captura el rol del usuario conectado en esa sesión
  capturarRol(): void {
    let resultados;
    this.suscripcionRol = this.loginService.devolverRol().subscribe( {
      next: (data) => {
      resultados = data;
    },
    complete: () =>{
      this.rol = resultados == null ? null : new Rol(resultados[0].id, resultados[0].nombre, resultados[0].leer, resultados[0].escribir, resultados[0].editar, resultados[0].borrar)
      this.editable = this.tienePermisos()
      this.borrable = this.puedeBorrar()
    }
   })
  }

  // Este método actualiza 
  actualizarMensaje(){
    const contenido = this.mensajeForm.get('contenido').value
    const fechaPublicacion = new Date()
    this.gestionMensajeService.actualizar(this.mensaje.id, contenido, fechaPublicacion, this.mensaje.autor.id,this.idBitacora).subscribe(respuesta => {
      if (respuesta !== undefined) {
        // Actualiza el mensaje en la vista
        this.mensaje.contenido = respuesta.contenido;
        this.mensaje.fechaPublicacion = respuesta.fechaPublicacion;
      } 
    });
    this.editar = false;
  }

  borrarMensaje(){
    this.gestionMensajeService.borrar(this.mensaje.id).subscribe(respuesta => {
      if (respuesta !== undefined) {
        location.reload()
      } 
    }, error => {
      console.log("No se ha podido realizar el borrado del mensaje.")
    });
  }

  // TypeScript devuelve los booleanos dentro de objetos como cadenas
  // Para solucionarlo, en lugar de comparar booleanos directamente, compruebo cadenas
  tienePermisos(): boolean{
    if(this.rol == null) return false;
    let idAutor = this.mensaje.autor.id
    let idUsuario = sessionStorage.getItem(environment.userIdSessionToken);
    let editar = ''+this.rol.editar == 'true'
    return editar == true || ''+idAutor == ''+idUsuario
  }

  puedeBorrar(): boolean{
    if(this.rol == null) return false;
    return ''+this.rol.borrar == 'true'
  }

  hacerEditable(): void{
    this.editar = true;
  }

}
