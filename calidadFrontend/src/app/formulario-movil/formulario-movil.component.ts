import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit} from '@angular/core';
import { Registrofinal, Defecto, Registrodefecto, Departamento, Maquina, Parte } from '../interfaces/shared';
import { CalidadService } from '../services/calidad.service';
import { DepartamentoService } from '../services/departamento.service';
import { MaquinaService } from '../services/maquina.service';
import { ParteService } from '../services/parte.service';
import { DefectoService } from '../services/defecto.service';
import { DefectocalidadService } from '../services/defectocalidad.service';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-formulario-movil',
  templateUrl: './formulario-movil.component.html',
  styleUrls: ['./formulario-movil.component.css'],
  providers: [DatePipe]  // Agrega DatePipe como un proveedor
})
export class FormularioMovilComponent  implements OnInit{
  idEmpleado:string='';
  /*variables para los input de las pzas*/
  pzainspInput: number=0;
  rechaInput: number=0;
  retraInput: number=0;
  totalPzas:number=0;
  numeroSemana: number=0;
  cantidadInput:number=0;
  //Para guardar los valores de los registros
  crearRegis!:Registrofinal;
  departamentos:Departamento[]=[];
  maquinas:Maquina[]=[];
  partes:Parte[]=[];
  listaDefectos: Defecto[] = [];
  defectosAgregados:Registrodefecto[]=[];
  defectosAgregados2:Registrodefecto[]=[];
  valorRechaRetra:Registrodefecto[]=[];
  calidad!:Registrofinal;
  //registrofinal:Registrofinal[]=[];
  //variables que guardan los valores seleccionados
  numeroDeptoSeleccionado: number | null = null; // variable para almacenar el número de departamento seleccionado
  codigoMaquinaSeleccionado: string='';
  numParteSeleccionado: string = '';
  defectoSeleccionado: string = '';
  //id del registro recien creado
  idCalidad:string='';
  //variables para mostrar las vistas
  verFormulario:boolean=true;
  verDefectos:boolean=false;
  verCantidad:boolean=false;

  constructor(private datePipe: DatePipe, private calidadS:CalidadService, private departamentoS:DepartamentoService,
              private maquinaS:MaquinaService, private parteS:ParteService, private defectoS:DefectoService, private AddDefectoS:DefectocalidadService,
              private route:ActivatedRoute){}

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
      pzainspc:this.pzainspInput,
      pzarecha:this.rechaInput,
      pzaretra:this.retraInput,
      totalrecha:this.totalPzas
    };
    this.departamentoS.getAll().subscribe((data:Departamento[])=>{
      this.departamentos=data;
    });
    this.route.params.subscribe(params => {
      this.idEmpleado = params['id'];
    });
  }
  comportamientoVista1(ver:boolean){
    this.verFormulario = !ver;
    this.verDefectos = ver;
    this.verCantidad = !ver;
  }
  comportamientoVista2(ver:boolean){
    this.verFormulario = !ver;
    this.verDefectos = !ver;
    this.verCantidad = ver;
  }
  comportamientoVista3(ver: boolean) {
      this.verFormulario = ver;
      this.verDefectos = !ver;
      this.verCantidad = !ver;
      this.defectosAgregados = [];
      this.defectosAgregados2 = [];
      this.listaDefectos = [];
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
    // Si rechaInput es null o undefined, asigna 0; de lo contrario, utiliza su valor actual
    const recha = this.rechaInput !== null && this.rechaInput !== undefined ? this.rechaInput : 0;
    // Si retraInput es null o undefined, asigna 0; de lo contrario, utiliza su valor actual
    const retra = this.retraInput !== null && this.retraInput !== undefined ? this.retraInput : 0;
    // Realiza la suma con los valores actualizados
    return recha + retra;
  }

  pzaRechaEstatico:number=0;
  pzaRetraEstatico:number=0;
  submit(element:Registrofinal){
    this.defectoS.getList(element.numerodp).subscribe((data:Defecto[])=>{
      this.listaDefectos=data;
    });
    if ((this.rechaInput === null && this.retraInput === null)||(this.rechaInput === null || this.retraInput === null)) {
      this.rechaInput = 0;
      this.retraInput = 0;
    }if (this.rechaInput + this.retraInput != 0) {
      this.verFormulario = false;
      this.verDefectos = true;
      this.verCantidad = false;
    }
    this.calidadS.create(
      this.crearRegis={
        id:'',
        empleado:this.idEmpleado,
        semana:this.numeroSemana,
        fecha:element.fecha,
        turno:element.turno,
        numerodp:element.numerodp,
        codigomq:element.codigomq,
        numerop:element.numerop,
        pzainspc:this.pzainspInput,
        pzarecha:this.rechaInput,
        pzaretra:this.retraInput,
        totalrecha:this.valorInput
      }
    ).subscribe(res=>{
      console.log('Registro exitosooo');
      this.idCalidad=res.id;
      this.pzaRechaEstatico=res.pzarecha;
      this.pzaRetraEstatico=res.pzaretra;
      this.pzainspInput=0;
      this.totalPzas=0;
      this.rechaInput=0;
      this.retraInput=0;
      /*this.calidadS.find(res.id).subscribe(response=>{
        this.calidad=response;
        this.defectoS.getList(response.numerodp).subscribe((data:Defecto[])=>{
          this.listaDefectos=data;
        });
      });*/
    });
  }
  /*aqui trabajare con los defectos*/
  agregarDefecto(tipo:string) {
    //console.log(tipo);
    if (this.defectoSeleccionado) {
      // Se verifica si el defecto ya existe en el arrreglo defectosAgregados
      const defectoExistente = this.defectosAgregados.some(defecto => defecto.defecto === this.defectoSeleccionado);
      const defectoExistente2 = this.defectosAgregados2.some(defecto => defecto.defecto === this.defectoSeleccionado);
      // Si el defecto no existe se agrega
      if (!defectoExistente && !defectoExistente2) {
        const defectoForm = {
          id: '',
          idregistrofinal: this.idCalidad,
          defecto: this.defectoSeleccionado,
          tipo: tipo,
          cantidad: 0,
        };
        //console.log(defectoForm);
        this.AddDefectoS.create(defectoForm).subscribe(res=>{
          console.log('Defecto agregado');
          const defectoAdd={
            id:res.id,
            idregistrofinal: this.idCalidad,
            defecto: this.defectoSeleccionado,
            tipo: tipo,
            cantidad:0,
          }
          // Se agrega el defecto solo si no existe en defectosAgregados
          //this.defectosAgregados.push(defectoAdd);
          if (tipo === 'Rechazado') {
            this.defectosAgregados.push(defectoAdd);
          }else{
            this.defectosAgregados2.push(defectoAdd);
          }
        });
      } else {
        console.log('El defecto ya está en la lista.');
      }
    }
  }

  eliminarDefecto(id: string) {
    this.AddDefectoS.delete(id).subscribe(res=>{
      this.defectosAgregados = this.defectosAgregados.filter(item => item.id !== id);
      this.defectosAgregados2 = this.defectosAgregados2.filter(item => item.id !== id);
      console.log('defecto eliminado')
    })
  }
  /*captura la cantidad que tiene de pzas rechazadas y de retrabajo*/
  contarCantidad(idN:string) {
    this.AddDefectoS.getList(idN).subscribe((data: Registrodefecto[]) => {
      // Filtrar elementos con tipo 'Rechazado'
      const rechazados = data.filter(item => item.tipo === 'Rechazado');
      // Filtrar elementos con tipo 'Retrabajo'
      const retrabajos = data.filter(item => item.tipo === 'Retrabajo');

      // Sumar la cantidad para 'Rechazado'
      const sumaRechazados = this.sumarCantidad(rechazados);
      // Sumar la cantidad para 'Retrabajo'
      const sumaRetrabajos = this.sumarCantidad(retrabajos);
      const diferenciaRechazados = this.pzaRechaEstatico - sumaRechazados;
      const diferenciaRetrabajos = this.pzaRetraEstatico - sumaRetrabajos;

      if (diferenciaRechazados === 0 && diferenciaRetrabajos === 0) {
        this.comportamientoVista3(true);
      } else {
        if (diferenciaRechazados > 0 || diferenciaRetrabajos > 0) {
          //console.log(`Te faltan ${diferenciaRechazados} en rechazados.`);
          window.alert('Te faltan piezas por agregar');
        } else {
          //console.log(`Te has pasado por ${Math.abs(diferenciaRechazados)} en rechazados.`);
          window.alert('Agregaste piezas de más');
        }

        /*if (diferenciaRetrabajos > 0) {
          console.log(`Te faltan ${diferenciaRetrabajos} en retrabajos.`);
        } else {
          console.log(`Te has pasado por ${Math.abs(diferenciaRetrabajos)} en retrabajos.`);
        }*/
      }
      // Imprimir los resultados
      //console.log('Suma de Rechazados:', sumaRechazados);
      //console.log('Suma de Retrabajos:', sumaRetrabajos);
    });
    this.cantidadInput=0;
  }

  // Función para sumar la cantidad de elementos
  sumarCantidad(items: Registrodefecto[]): number {
    return items.reduce((total, item) => total + Number(item.cantidad), 0);
  }


  //actualizar el valor de cantidad en la tabla
  addValor(id: string) {
    const cantidadInputNumber = Number(this.cantidadInput);

    // Verifica si cantidadInput es un número entero
    if (!Number.isNaN(cantidadInputNumber) && Number.isInteger(cantidadInputNumber)) {
      const valorNew = {
        cantidad: cantidadInputNumber
      };

      // Intenta actualizar en defectosAgregados
      this.updateCantidadInArray(id, valorNew, this.defectosAgregados);
      // Si no se encontró en defectosAgregados, intenta actualizar en defectosAgregados2
      this.updateCantidadInArray(id, valorNew, this.defectosAgregados2);
    } else {
      console.error('La cantidad ingresada no es un número entero.');
      window.alert('La cantidad ingresada no es un número entero.')
    }
  }

  //actualizar el valor de cantidad en la tabla
  updateCantidadInArray(id: string, newValue: any, array: Registrodefecto[]) {
    const defectoIndex = array.findIndex(defecto => defecto.id === id);

    if (defectoIndex !== -1) {
      // Almacena la cantidad actual antes de la actualización
      const cantidadAnterior = array[defectoIndex].cantidad;
      //console.log(cantidadAnterior);
      // Actualiza la cantidad en el array local
      array[defectoIndex].cantidad = this.cantidadInput;
      // También puedes realizar la solicitud de actualización a la base de datos aquí si es necesario
      this.AddDefectoS.update(id, newValue).subscribe(res => {
        console.log('Valor agregado');
      });
    }
  }

}
