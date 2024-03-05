import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistrofinalService } from 'src/app/services/registrofinal.service';
import { Registrofinal } from 'src/app/shared/interface';

@Component({
  selector: 'app-ver-mis-registros',
  templateUrl: './ver-mis-registros.component.html',
  styleUrls: ['./ver-mis-registros.component.css']
})
export class VerMisRegistrosComponent implements OnInit{

  registros:Registrofinal[]=[];
  filtroBusqueda:string='';

  constructor(private registroFinalS:RegistrofinalService, private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.registroFinalS.getList(id).subscribe((data:Registrofinal[])=>{
        this.registros=data;
      })
    });
  }
  filtrarMisregistros(): any[] {
    const valorBusqueda = this.filtroBusqueda.toLowerCase();

    // Asegúrate de que RegistroFinal no sea null ni undefined
    if (this.registros) {
      return this.registros.filter((registro) => {
        // Asegúrate de que registro.empleado y registro.codigomq no sean null ni undefined
        const id = registro.id ? registro.id.toString().toLowerCase() : '';
        const fecha = registro.fecha ? registro.fecha.toString().toLowerCase() : '';
        const codigomq = registro.codigomq ? registro.codigomq.toString().toLowerCase() : '';
        const numerodp = registro.numerodp ? registro.numerodp.toString().toLowerCase() : '';
        const numerop = registro.numerop ? registro.numerop.toLowerCase() : '';
        const pzainspc = registro.pzainspc ? registro.pzainspc.toString() : '';
        const pzarecha = registro.pzarecha ? registro.pzarecha.toString() : '';
        const pzaretra = registro.pzaretra ? registro.pzaretra.toString() : '';
        const totalrecha = registro.totalrecha ? registro.totalrecha.toString() : '';

        return id.includes(valorBusqueda) || fecha.includes(valorBusqueda) || numerodp.includes(valorBusqueda) || codigomq.includes(valorBusqueda) || numerop.includes(valorBusqueda) ||
              pzainspc.includes(valorBusqueda) || pzarecha.includes(valorBusqueda) || pzaretra.includes(valorBusqueda) || totalrecha.includes(valorBusqueda);
      });
    } else {
      return [];
    }
  }

}
