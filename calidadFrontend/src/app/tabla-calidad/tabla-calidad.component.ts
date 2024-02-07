import { Component, OnInit } from '@angular/core';
import { Registrodefecto, Departamento, Registrofinal, DetallesRegistro, DatosExportar} from '../interfaces/shared';
import { CalidadService } from '../services/calidad.service';
import { DefectocalidadService } from '../services/defectocalidad.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-tabla-calidad',
  templateUrl: './tabla-calidad.component.html',
  styleUrls: ['./tabla-calidad.component.css']
})
export class TablaCalidadComponent implements OnInit{

  RegistroFinal:DatosExportar[]=[];
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
    this.registrofinalS.getAll().subscribe((data: DatosExportar[]) => {
      this.RegistroFinal = data;
      //console.log(this.RegistroFinal); // Verificar que los datos se reciben correctamente
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
    this.registrofinalS.getByDateRange(inicio,fin).subscribe((data:DatosExportar[])=>{
      this.RegistroFinal=data;
    });
  }

  exportToExcel(): void {
    // Obtener los datos de la tabla
    const data = this.RegistroFinal.map(registro => {
      // Verificar si hay datos de empleado
      const nombreEmpleado = registro.empleados ? registro.empleados.nombre : '';
      const apellidoEmpleado = registro.empleados ? registro.empleados.apellido : '';

      // Obtener los nombres de los defectos
      const defectos = registro.registrodefecto.map(defecto => defecto.defecto+ ','+defecto.tipo+':'+defecto.cantidad).join(', ');

      return {
        Empleado: nombreEmpleado + ' ' + apellidoEmpleado,
        NoDepto: registro.numerodp,
        CodMaquina: registro.codigomq,
        Semana: registro.semana,
        Fecha: registro.fecha,
        Turno: registro.turno,
        Departamento: registro.departamento.nombre,
        NombreMaquina: registro.maquina.nombre,
        NombreSubensamble: registro.parte ? registro.parte.descripcion : '',
        NoParte: registro.numerop,
        PzInspeccionadas: registro.pzainspc,
        PzRechazadas: registro.pzarecha,
        PzRetrabajo: registro.pzaretra,
        TotalPR: registro.totalrecha,
        Defectos: defectos, // Agregar los nombres de los defectos aquí
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
  formatNumber(number: number | null): string {
    if (number === null || number === undefined) {
      return ''; // O cualquier otro valor predeterminado
    }

    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }


}
