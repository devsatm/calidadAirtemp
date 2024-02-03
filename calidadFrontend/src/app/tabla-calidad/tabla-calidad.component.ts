import { Component, OnInit } from '@angular/core';
import { Registrodefecto, Departamento, Registrofinal, DetallesRegistro} from '../interfaces/shared';
import { CalidadService } from '../services/calidad.service';
import { DefectocalidadService } from '../services/defectocalidad.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-tabla-calidad',
  templateUrl: './tabla-calidad.component.html',
  styleUrls: ['./tabla-calidad.component.css']
})
export class TablaCalidadComponent implements OnInit{

  RegistroFinal:Registrofinal[]=[];
  defectos:Registrodefecto[]=[];
  detallesregistro!:DetallesRegistro;
  RegistroF!:Registrofinal;
  //departamento1!:Departamento;
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
  //de prueba
  fechaInicio: string = '';
  fechaFin: string = '';
  constructor(private registrofinalS:CalidadService, private registroFinalDefectoS:DefectocalidadService){}

  ngOnInit(): void {
    this.registrofinalS.getAll().subscribe((data:Registrofinal[])=>{
      this.RegistroFinal=data;
    });
    this.fechaInicio = '';
    this.fechaFin = ''
  }
  verInfo(id:string){
    this.registrofinalS.getDetallesRegistroPorId(id).subscribe(
      res=>{
        this.detallesregistro=res;
        this.departamento=res.nombre_departamento;
        this.maquina=res.nombre_maquina;
        this.subensamble=res.subensamble;
        this.empleado=res.nombre +' '+res.apellido;
    });
    this.registrofinalS.find(id).subscribe(res=>{
      this.RegistroF=res;
      this.turno=res.turno;
      this.fecha=res.fecha;
      this.semana=res.semana;
      this.numdepto=res.numerodp;
      this.codmaq=res.codigomq;
      this.numparte=res.numerop;
      this.pzainspec=res.pzainspc;
      this.pzarecha=res.pzarecha;
      this.pzaretra=res.pzaretra;
      this.pzatotalrecha=res.totalrecha;
    });
    this.registroFinalDefectoS.getList(id).subscribe((data:Registrodefecto[])=>{
      this.defectos=data;
    });
  }

  Filtrar(inicio:String,fin:String){
    this.registrofinalS.getByDateRange(inicio,fin).subscribe((data:Registrofinal[])=>{
      this.RegistroFinal=data;
    });
  }

  /*exportToExcel(): void {
    // Crear un objeto con los datos que deseas exportar
    const dataToExport = {
      Empleado: this.empleado,
      Turno: this.turno,
      Fecha: this.fecha,
      Semana: this.semana,
      Departamento: this.departamento,
      NumDepartamento: this.numdepto,
      Maquina: this.maquina,
      CodMaquina: this.codmaq,
      Subensamble: this.subensamble,
      NumParte: this.numparte,
      PzaInspeccionadas: this.pzainspec,
      PzaRechazadas: this.pzarecha,
      PzaRetrabajo: this.pzaretra,
      TotalPzaRechazadas: this.pzatotalrecha,
      Defectos: this.defectos.map(defecto => defecto.defecto).join(', ')
    };

    // Crear un libro de Excel
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([dataToExport]);

    // Guardar el archivo
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    XLSX.writeFile(wb, 'miArchivo.xlsx');
  }*/
  exportToExcel(): void {
    // Obtener los datos de la tabla
    const data = this.RegistroFinal.map(registro => {
      return {
        Empleado: registro.empleado,
        Fecha: registro.fecha,
        NoDepto: registro.numerodp,
        CodMaquina: registro.codigomq,
        NoParte: registro.numerop,
        PzInspeccionadas: registro.pzainspc,
        PzRechazadas: registro.pzarecha,
        PzRetrabajo: registro.pzaretra,
        TotalPR: registro.totalrecha,
      };
    });

    // Crear un libro de Excel
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    // Eliminar la columna 'Acciones'
    delete ws['A10'];

    // Guardar el archivo
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    XLSX.writeFile(wb, 'Calidad.xlsx');
  }




}
