import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Calidad, Departamento, Maquina, Parte } from '../interfaces/shared';
import { CalidadService } from '../services/calidad.service';
import { DepartamentoService } from '../services/departamento.service';
import { MaquinaService } from '../services/maquina.service';
import { ParteService } from '../services/parte.service';

@Component({
  selector: 'app-formulario-movil',
  templateUrl: './formulario-movil.component.html',
  styleUrls: ['./formulario-movil.component.css'],
  providers: [DatePipe]  // Agrega DatePipe como un proveedor
})
export class FormularioMovilComponent  implements OnInit{
  rechaInput: number=0;
  retraInput: number=0;
  totalPzas:number=0;
  //valorInput= this.rechaInput + this.retraInput;
  defectoSeleccionado: string = '';
  listaDefectos: string[] = [];
  numeroSemana: number=0;
  //Para guardar los valores de los registros
  crearRegis!:Calidad;
  departamentos:Departamento[]=[];
  maquinas:Maquina[]=[];
  partes:Parte[]=[];
  //para saber los valores seleccionados
  numeroDeptoSeleccionado: number | null = null; // variable para almacenar el número de departamento seleccionado
  codigoMaquinaSeleccionado: string='';
  numParteSeleccionado: string = '';
  //id del registro recien creado
  idCalidad:string='';

  constructor(private datePipe: DatePipe, private calidadS:CalidadService, private departamentoS:DepartamentoService,
    private maquinaS:MaquinaService, private parteS:ParteService){}
  ngOnInit(): void {
    this.crearRegis={
      id:'',
      empleado:'',
      semana:null,
      fecha:'',
      turno:'',
      numerodp:'',
      codigomq:'',
      numerop:'',
      pzainspc:null,
      pzarecha:this.rechaInput,
      pzaretra:this.retraInput,
      totalrecha:this.totalPzas
    };
    this.departamentoS.getAll().subscribe((data:Departamento[])=>{
      this.departamentos=data;
    });
  }
  actualizarNoDepto() {
    // Busca el objeto departamento correspondiente al número seleccionado
    const departamentoSeleccionado = this.departamentos.find(depto => depto.numero === this.crearRegis.numerodp);
    // Convierte el valor a número antes de asignarlo
    this.numeroDeptoSeleccionado = departamentoSeleccionado ? parseInt(departamentoSeleccionado.numero, 10) : null;
    this.maquinaS.getList(this.numeroDeptoSeleccionado).subscribe((data:Maquina[])=>{
      this.maquinas=data;
    });
    this.parteS.getList(this.numeroDeptoSeleccionado).subscribe((data:Parte[])=>{
      this.partes=data;
    });
    this.codigoMaquinaSeleccionado='';
    this.numParteSeleccionado='';
  }
  actualizarCodMq(){
    // Busca el objeto de máquina correspondiente al código seleccionado
    const maquinaSeleccionada = this.maquinas.find(maquina => maquina.codigo === this.crearRegis.codigomq);
    // Actualiza el valor en el campo "Código Mq"
    this.codigoMaquinaSeleccionado = maquinaSeleccionada ? maquinaSeleccionada.codigo : '';
  }
  actualizarNumPt(){
    const parteSeleccionada = this.partes.find(parte => parte.numero === this.crearRegis.numerop);
    this.numParteSeleccionado = parteSeleccionada ? parteSeleccionada.numero : '';
  }


  obtenerNumeroSemana(fecha: Date): number {
    const formattedDate = this.datePipe.transform(fecha, 'yyyy-MM-dd');
    const fechaConFormato = new Date(formattedDate + 'T00:00:00'); // Agrega la parte de la hora
    const numeroSemana = this.datePipe.transform(fechaConFormato, 'w');
    // Verifica si numeroSemana no es null antes de llamar a parseInt
    return numeroSemana !== null ? parseInt(numeroSemana, 10) : 0; // Puedes elegir un valor por defecto en caso de null
  }
  actualizarNumeroSemana(event: any): void {
    const fechaSeleccionada = new Date(event.target.value);
    this.numeroSemana = this.obtenerNumeroSemana(fechaSeleccionada);
  }

  get valorInput(): number {
    return this.rechaInput + this.retraInput;
  }
  valores(){
    console.log(this.rechaInput);
    console.log(this.retraInput);
    console.log(this.valorInput);
    console.log(this.numeroSemana);
  }
  agregarDefecto() {
    if (this.defectoSeleccionado && !this.listaDefectos.includes(this.defectoSeleccionado)) {
      this.listaDefectos.push(this.defectoSeleccionado);
    }
  }

  eliminarDefecto(index: number) {
    this.listaDefectos.splice(index, 1);
  }
  submit(element:Calidad){
    this.calidadS.create(
      this.crearRegis={
        id:'',
        empleado:'1',
        semana:this.numeroSemana,
        fecha:element.fecha,
        turno:element.turno,
        numerodp:element.numerodp,
        codigomq:element.codigomq,
        numerop:element.numerop,
        pzainspc:element.pzainspc,
        pzarecha:this.rechaInput,
        pzaretra:this.retraInput,
        totalrecha:this.valorInput
      }
    ).subscribe(res=>{
      console.log('Registro exitosooo');
      this.crearRegis={
        id:'',
        empleado:'',
        semana:null,
        fecha:'',
        turno:'',
        numerodp:'',
        codigomq:'',
        numerop:'',
        pzainspc:null,
        pzarecha:this.rechaInput,
        pzaretra:this.retraInput,
        totalrecha:this.totalPzas
      };
      this.idCalidad=res.id
      this.numeroSemana=0;
      this.numeroDeptoSeleccionado=null;
      this.codigoMaquinaSeleccionado='';
      this.numParteSeleccionado='';
    })
  }
}
