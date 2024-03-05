import { Component, OnInit } from '@angular/core';
import { RegistrodefectoService } from 'src/app/services/registrodefecto.service';
import { RegistrofinalService } from 'src/app/services/registrofinal.service';
import { DatosExportar, DefectData, DetallesRegistro, Registrodefecto, Registrofinal } from 'src/app/shared/interface';
import * as XLSX from 'xlsx';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todos-los-registros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todos-los-registros.component.html',
  styleUrl: './todos-los-registros.component.css'
})
export class TodosLosRegistrosComponent implements OnInit{

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
  fechaInicio: string='';
  fechaFin:string='';
  constructor(private router:Router,private registrofinalS:RegistrofinalService, private registroFinalDefectoS:RegistrodefectoService){}

  ngOnInit(): void {
    this.registrofinalS.getAll().subscribe((data: DatosExportar[]) => {
      this.RegistroFinal = data;
      //console.log(this.RegistroFinal); // Verificar que los datos se reciben correctamente
    });
  }
  saberFechaInicio(event: any): void {
    const fechaInicioSeleccionadaUTC = new Date(event.target.value); // Fecha en UTC
    const fechaInicioSeleccionadaLocal = new Date(fechaInicioSeleccionadaUTC.getTime() + fechaInicioSeleccionadaUTC.getTimezoneOffset() * 60000); // Convertir a la zona horaria local

    // Obtener los componentes de la fecha
    const dia = fechaInicioSeleccionadaLocal.getDate();
    const mes = fechaInicioSeleccionadaLocal.getMonth() + 1; // Nota: getMonth devuelve un índice basado en cero, por lo que se suma 1
    const año = fechaInicioSeleccionadaLocal.getFullYear();

    // Formatear la fecha como Año-Mes-Día (YYYY-MM-DD)
    const fechaFormateada = `${año}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;

    //console.log(fechaFormateada); // Muestra la fecha formateada
    this.fechaInicio=fechaFormateada;
  }


  saberFechaFinal(event:any):void{
    const fechaFinSeleccionadaUTC = new Date(event.target.value); // Fecha en UTC
    const fechaFinSeleccionadaLocal = new Date(fechaFinSeleccionadaUTC.getTime() + fechaFinSeleccionadaUTC.getTimezoneOffset() * 60000); // Convertir a la zona horaria local

    // Obtener los componentes de la fecha
    const dia = fechaFinSeleccionadaLocal.getDate();
    const mes = fechaFinSeleccionadaLocal.getMonth() + 1; // Nota: getMonth devuelve un índice basado en cero, por lo que se suma 1
    const año = fechaFinSeleccionadaLocal.getFullYear();

    // Formatear la fecha como Año-Mes-Día (YYYY-MM-DD)
    const fechaFormateada = `${año}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;

    //console.log(fechaFormateada); // Muestra la fecha formateada
    this.fechaFin=fechaFormateada;
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

  Filtrar(inicio:string,fin:string){
    this.registrofinalS.getByDateRange(inicio,fin).subscribe((data:DatosExportar[])=>{
      this.RegistroFinal=data;
    });
  }
  exportToExcel(): void {
    // Obtener los datos generales de la tabla
    const generalData = this.RegistroFinal.map(registro => {
      // Verificar si hay datos de empleado
      const nombreEmpleado = registro.empleados ? registro.empleados.nombre : '';
      const apellidoEmpleado = registro.empleados ? registro.empleados.apellido : '';

      return {
        Folio:registro.id,
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
        PzScrap: registro.pzarecha,
        PzRetrabajo: registro.pzaretra,
        TotalPR: registro.totalrecha,
      };
    });

    // Obtener los datos de los defectos
    const defectData: DefectData[] = this.RegistroFinal.reduce((acc: DefectData[], registro) => {
      registro.registrodefecto.forEach(defecto => {
        acc.push({
          Folio: registro.id,
          Defecto: defecto.defecto,
          Tipo: defecto.tipo,
          Cantidad: defecto.cantidad,
        });
      });
      return acc;
    }, []);

    // Crear un libro de Excel
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    // Hoja 1: Datos Generales
    const generalWs: XLSX.WorkSheet = XLSX.utils.json_to_sheet(generalData);
    XLSX.utils.book_append_sheet(wb, generalWs, 'Calidad');

    // Hoja 2: Defectos
    const defectWs: XLSX.WorkSheet = XLSX.utils.json_to_sheet(defectData);
    XLSX.utils.book_append_sheet(wb, defectWs, 'Defectos');

    // Guardar el archivo
    XLSX.writeFile(wb, 'Reporte_Calidad.xlsx');
  }

  formatNumber(number: number | null): string {
    if (number === null || number === undefined) {
      return ''; // O cualquier otro valor predeterminado
    }

    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  panelInicio(){
    this.router.navigate(['Panel/Administrador']);
  }
  navegarVerRegistros(){
    this.router.navigate(['administrador/tabla/todos-registros']);
  }
  navegarAltaInformacion(){
    this.router.navigate(['administrador/alta-informacion']);
  }
  salir(){
    this.router.navigate(['login']);
  }

}
