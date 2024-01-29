import { Component, OnInit } from '@angular/core';
import { Registrodefecto, Departamento, Registrofinal} from '../interfaces/shared';
import { CalidadService } from '../services/calidad.service';
import { DepartamentoService } from '../services/departamento.service';
import { MaquinaService } from '../services/maquina.service';
import { ParteService } from '../services/parte.service';
import { EmpleadosService } from '../services/empleados.service';
import { DefectocalidadService } from '../services/defectocalidad.service';

@Component({
  selector: 'app-tabla-calidad',
  templateUrl: './tabla-calidad.component.html',
  styleUrls: ['./tabla-calidad.component.css']
})
export class TablaCalidadComponent implements OnInit{

  RegistroFinal:Registrofinal[]=[];
  defectos:Registrodefecto[]=[];
  RegistroF!:Registrofinal;
  departamento1!:Departamento;
  empleado:string='';
  turno:string='';
  fecha:string='';
  semana:number | null=0;
  departamento:string='';
  numdepto:string='';
  maquina:string='';
  codmaq:string='';
  subensamble:string='';
  numparte:string='';
  pzainspec:number | null=0;
  pzarecha:number | null=0;
  pzaretra:number | null=0;
  pzatotalrecha:number | null=0;
  filtroBusqueda:string='';
  constructor(private registrofinalS:CalidadService, private departamentoS:DepartamentoService, private maquinaS:MaquinaService,
              private parteS:ParteService, private empleadoS:EmpleadosService, private registroFinalDefectoS:DefectocalidadService){}

  ngOnInit(): void {
    this.registrofinalS.getAll().subscribe((data:Registrofinal[])=>{
      this.RegistroFinal=data;
    });
  }
  verInfo(id:string){
    this.registrofinalS.find(id).subscribe(res=>{
      this.RegistroF=res;
      this.empleadoS.find(res.empleado).subscribe(res=>{
        this.empleado = res.nombre +' '+ res.apellido;
      })
      this.turno = res.turno;
      this.fecha = res.fecha;
      this.semana = res.semana;
      this.numdepto = res.numerodp;
      this.departamentoS.getList(res.numerodp).subscribe(res=>{
        this.departamento = res.nombre;
      });
      this.codmaq = res.codigomq;
      this.maquinaS.getByCodigo(res.codigomq).subscribe(ress=>{
        this.maquina = ress.nombre;
      });
      this.numparte = res.numerop;
      this.parteS.getByNumero(res.numerop).subscribe(res=>{
        this.subensamble = res.descripcion;
      });
      this.pzainspec = res.pzainspc;
      this.pzarecha = res.pzarecha;
      this.pzaretra = res.pzaretra;
      this.pzatotalrecha = res.totalrecha;
    });
    this.registroFinalDefectoS.getList(id).subscribe((data:Registrodefecto[])=>{
      this.defectos=data;
    })
  }
  filtrarRegistros(): any[] {
    const valorBusqueda = this.filtroBusqueda.toLowerCase();

    // Asegúrate de que RegistroFinal no sea null ni undefined
    if (this.RegistroFinal) {
      return this.RegistroFinal.filter((registro) => {
        // Asegúrate de que registro.empleado y registro.codigomq no sean null ni undefined
        const empleado = registro.empleado ? registro.empleado.toString().toLowerCase() : '';
        const semana = registro.semana ? registro.semana.toString().toLowerCase() : '';
        const numerodp = registro.numerodp ? registro.numerodp.toString().toLowerCase() : '';
        const codigomq = registro.codigomq ? registro.codigomq.toLowerCase() : '';
        const numerop = registro.numerop ? registro.numerop.toLowerCase() : '';
        const pzainspc = registro.pzainspc ? registro.pzainspc.toString() : '';
        const pzarecha = registro.pzarecha ? registro.pzarecha.toString() : '';
        const pzaretra = registro.pzaretra ? registro.pzaretra.toString() : '';
        const totalrecha = registro.totalrecha ? registro.totalrecha.toString() : '';

        return empleado.includes(valorBusqueda) || semana.includes(valorBusqueda) || numerodp.includes(valorBusqueda) || codigomq.includes(valorBusqueda) ||
              numerop.includes(valorBusqueda) || pzainspc.includes(valorBusqueda) || pzarecha.includes(valorBusqueda) || pzaretra.includes(valorBusqueda) ||
              totalrecha.includes(valorBusqueda);
      });
    } else {
      return [];
    }
  }


}
