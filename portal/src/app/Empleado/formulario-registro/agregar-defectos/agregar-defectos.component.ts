import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DefectoService } from 'src/app/services/defecto.service';
import { RegistrodefectoService } from 'src/app/services/registrodefecto.service';
import { Defecto, Registrodefecto } from 'src/app/shared/interface';

@Component({
  selector: 'app-agregar-defectos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agregar-defectos.component.html',
  styleUrl: './agregar-defectos.component.css'
})
export class AgregarDefectosComponent implements OnInit{
  @Input() datos: any;
  @Input() idRecuperado:string='';
  @Output() registrarClicked = new EventEmitter<boolean>();
  defectos:Defecto[]=[];
  defectoScrap:Registrodefecto[]=[];
  defectoRetrabajo:Registrodefecto[]=[];
  Defecto!:Registrodefecto;
  defecto:string='';
  /*para el contenido interactivo*/
  verSeleccionar:boolean=true;
  verAsignarValor:boolean=false;
  valorAgregar:number=0;
  habilitarRegistrar:boolean=false;

  constructor(private defectoS:DefectoService, private registroDefectoS:RegistrodefectoService){}

  ngOnInit(): void {
    this.defectoS.getList(this.datos.numerodp).subscribe((data:Defecto[])=>{
      this.defectos=data;
    });
  }
  saberTipo(event:any){
    const defectoSeleccionado = event?.target?.value;
    if (defectoSeleccionado) {
      this.defecto=defectoSeleccionado;
      //console.log(this.defecto);
    }
  }
  agregarDefecto(tipo: string) {
    const nuevoDefecto = {
        id: '',
        idregistrofinal: this.idRecuperado,
        defecto: this.defecto,
        tipo: tipo,
        cantidad: 0,
    };

    if (tipo === 'Scrap') {
        const defectoExistenteScrap = this.defectoScrap.some(defecto => defecto.defecto === this.defecto);
        if (!defectoExistenteScrap) {
            this.registroDefectoS.create(nuevoDefecto).subscribe(res => {
                const pushDefecto = {
                    id: res.id,
                    idregistrofinal: this.idRecuperado,
                    defecto: this.defecto,
                    tipo: tipo,
                    cantidad: 0,
                };
                this.defectoScrap.push(pushDefecto);
            });
        } else {
            window.alert('El defecto ya existe en el Scrap');
        }
    } else {
        const defectoExistenteRetrabajo = this.defectoRetrabajo.some(defecto => defecto.defecto === this.defecto);
        if (!defectoExistenteRetrabajo) {
            this.registroDefectoS.create(nuevoDefecto).subscribe(res => {
                const pushDefecto = {
                    id: res.id,
                    idregistrofinal: this.idRecuperado,
                    defecto: this.defecto,
                    tipo: tipo,
                    cantidad: 0,
                };
                this.defectoRetrabajo.push(pushDefecto);
            });
        } else {
            window.alert('El defecto ya existe en el Retrabajo');
        }
    }
}

  cambiarVista(estado:boolean){
    this.verSeleccionar=!estado;
    this.verAsignarValor=estado;
    this.saberCantidades();
  }
  valorInput(event:any){
    //console.log('entre en valorInput')
    const valorIngresado = event?.target?.value;
    if (valorIngresado) {
      this.valorAgregar=valorIngresado;
      //console.log('valor agregado',this.valorAgregar);
    }
  }
  eliminarDefecto(id:string){
    this.registroDefectoS.delete(id).subscribe(res=>{
      this.defectoScrap=this.defectoScrap.filter(item => item.id !== id);
      this.defectoRetrabajo=this.defectoRetrabajo.filter(item => item.id !== id);
    });
  }
  asignarValor(id: string) {
    if (this.valorAgregar !== null && Number.isInteger(Number(this.valorAgregar)) && Number(this.valorAgregar) >= 0) {
      const cantidadInputNumber = Number(this.valorAgregar);
      const valor = {
        cantidad: cantidadInputNumber
      };
      this.registroDefectoS.update(id, valor).subscribe(res => {
        //console.log('editado correctamente');
        // Actualizar el arreglo defectoScrap si el defecto se encuentra en ese arreglo
        const defectoScrapIndex = this.defectoScrap.findIndex(defecto => defecto.id === id);
        if (defectoScrapIndex !== -1) {
          this.defectoScrap[defectoScrapIndex].cantidad = cantidadInputNumber;
        }
        // Actualizar el arreglo defectoRetrabajo si el defecto se encuentra en ese arreglo
        const defectoRetrabajoIndex = this.defectoRetrabajo.findIndex(defecto => defecto.id === id);
        if (defectoRetrabajoIndex !== -1) {
          this.defectoRetrabajo[defectoRetrabajoIndex].cantidad = cantidadInputNumber;
        }
        // Después de actualizar, calcular las sumas
        this.saberCantidades();
      });
    } else {
      window.alert('Ingresa una cantidad valida');
    }
  }

  saberCantidades() {
    let sumaScrap = 0;
    let sumaRetrabajo = 0;

    // Sumar las cantidades para el tipo 'Scrap'
    for (const defecto of this.defectoScrap) {
      sumaScrap += defecto.cantidad;
    }
    // Sumar las cantidades para el tipo 'Retrabajo'
    for (const defecto of this.defectoRetrabajo) {
      sumaRetrabajo += defecto.cantidad;
    }
    //console.log('Suma de Scrap:', sumaScrap);
    //console.log('Suma de Retrabajo:',sumaRetrabajo);
    if ((this.datos.pzarecha === sumaScrap)&&(this.datos.pzaretra === sumaRetrabajo) && (!this.defectoScrap.some(defecto => defecto.cantidad === 0))&&(!this.defectoRetrabajo.some(defecto => defecto.cantidad === 0))) {
      this.habilitarRegistrar=true;
    } else {
      this.habilitarRegistrar=false;
    }
    // Aquí puedes hacer lo que necesites con las sumas, como mostrarlas en la interfaz de usuario o realizar otras operaciones.
  }



  enviarRegistro() {
    // Emite el evento con el valor booleano true
    this.registrarClicked.emit(true);
  }

}
