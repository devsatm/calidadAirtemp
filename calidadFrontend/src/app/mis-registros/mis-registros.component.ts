import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CalidadService } from '../services/calidad.service';
import { Registrofinal } from '../interfaces/shared';

@Component({
  selector: 'app-mis-registros',
  templateUrl: './mis-registros.component.html',
  styleUrls: ['./mis-registros.component.css']
})
export class MisRegistrosComponent implements OnInit{
  registros:Registrofinal[]=[];
  filtro: string = '';
  mostrarMensaje: boolean = false;
  constructor(private registroFinalS:CalidadService){}
  ngOnInit(): void {
    this.registroFinalS.getList('1').subscribe((data:Registrofinal[])=>{
      this.registros=data;
    })
  }
  filtrarTabla() {
    const resultados = this.registros.filter(registro =>
      (registro.id && typeof registro.id === 'string' && registro.id.toLowerCase().includes(this.filtro.toLowerCase())) ||
      registro.fecha.toLowerCase().includes(this.filtro.toLowerCase()) ||
      registro.numerodp.toLowerCase().includes(this.filtro.toLowerCase()) ||
      registro.codigomq.toLowerCase().includes(this.filtro.toLowerCase()) ||
      registro.numerop.toLowerCase().includes(this.filtro.toLowerCase()) ||
      (registro.pzainspc && registro.pzainspc.toString().toLowerCase().includes(this.filtro.toLowerCase())) ||
      registro.pzarecha.toString().toLowerCase().includes(this.filtro.toLowerCase()) ||
      registro.pzaretra.toString().toLowerCase().includes(this.filtro.toLowerCase()) ||
      registro.totalrecha.toString().toLowerCase().includes(this.filtro.toLowerCase())
    );

    this.mostrarMensaje = resultados.length === 0;

    return resultados;
  }


}
