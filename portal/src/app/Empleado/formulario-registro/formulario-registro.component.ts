import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { MaquinaService } from 'src/app/services/maquina.service';
import { ParteService } from 'src/app/services/parte.service';
import { RegistrofinalService } from 'src/app/services/registrofinal.service';
import { Departamento, Maquina, Parte, Registrofinal } from 'src/app/shared/interface';

@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.css'],
  providers: [DatePipe]
})
export class FormularioRegistroComponent implements OnInit{

  /*variables para los select*/
  numeroDeptoSeleccionado: number | null = null;
  codigoMaquinaSeleccionado: string='';
  numParteSeleccionado: string = '';
  //numeroSemana:number=0;
  /*-----------*/
  sumaInput:number=0;
  semanaInput:number=0;
  formRegistro!:FormGroup;
  calidadATM!:Registrofinal;
  departamentos:Departamento[]=[];
  maquinas:Maquina[]=[];
  partes:Parte[]=[];
  /*para las vistas dinamicas*/
  verFormulario:boolean=true;
  verDefectos:boolean=false;
  /*para mandar los datos al componente hijo*/
  datosParaComponenteHijo: any = {};
  idEmpleado:string='';
  idRegistro:string='';

  constructor(private registroFinalServices:RegistrofinalService, private departamentoS:DepartamentoService,
              private maquinaS:MaquinaService, private parteS:ParteService,private datePipe: DatePipe,private route:ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idEmpleado = params['id'];
      //console.log('ID EMPLEADO:',this.idEmpleado);
    });
    this.formRegistro = new FormGroup({
      'semana': new FormControl({ value: '', disabled: true }, [Validators.required]),
      'fecha': new FormControl('',[ Validators.required ]),
      'turno': new FormControl('',[ Validators.required ]),
      'numerodp': new FormControl('',[ Validators.required ]),
      'codigomq': new FormControl('',[ Validators.required ]),
      'numerop': new FormControl('',[ Validators.required ]),
      'pzainspc': new FormControl('', [ Validators.required ]),
      'pzarecha': new FormControl(0,[ Validators.required ]),
      'pzaretra': new FormControl(0,[ Validators.required ]),
      'totalrecha': new FormControl({ value: 0, disabled: true }, [Validators.required])
    });
    //Suscribirse y obtener los departamentos
    this.departamentoS.getAll().subscribe((data:Departamento[])=>{
      this.departamentos=data;
    })
    // Suscribirse a los cambios en los valores de los controles
    this.formRegistro.get('pzarecha')?.valueChanges.subscribe(() => {
      this.calcularSuma();
    });

    this.formRegistro.get('pzaretra')?.valueChanges.subscribe(() => {
      this.calcularSuma();
    });
  }
  obtenerNumeroSemana(fecha: Date): number {
    const formattedDate = this.datePipe.transform(fecha, 'yyyy-MM-dd');
    const fechaConFormato = new Date(formattedDate + 'T00:00:00'); // Agrega la parte de la hora
    const numeroSemana = this.datePipe.transform(fechaConFormato, 'w');
    // Verifica si numeroSemana no es null antes de llamar a parseInt
    return numeroSemana !== null ? parseInt(numeroSemana, 10) : 0; // Puedes elegir un valor por defecto en caso de null
  }
  actualizarNumeroSemana(event:any):void{
    const fechaSeleccionada = new Date(event.target.value);
    this.formRegistro.patchValue({
      'semana':this.obtenerNumeroSemana(fechaSeleccionada)
    });
    this.semanaInput = this.obtenerNumeroSemana(fechaSeleccionada);
  }
  actualizarNoDepto(event:any){
    const valorSeleccionado = event?.target?.value;
    if (valorSeleccionado) {
      this.numeroDeptoSeleccionado = parseInt(valorSeleccionado, 10);
      this.maquinaS.getList(valorSeleccionado).subscribe((data:Maquina[])=>{
        this.maquinas=data;
      });
      this.parteS.getList(valorSeleccionado).subscribe((data:Parte[])=>{
        this.partes=data;
      });
    } else {
      // Manejar el caso donde no hay valor seleccionado
      this.actualizarNoDepto(event)
    }
  }
  actualizarCodMq(event:any){
    const maquinaSeleccionada = event?.target?.value;
    if (maquinaSeleccionada) {
      this.codigoMaquinaSeleccionado = maquinaSeleccionada;
    } else {
      //Manejar el caso donde no hay valor seleccionado
      console.log('se acabo el tiempo de carga');
    }
  }
  actualizarNumPt(event:any){
    const parteSeleccionada = event?.target?.value;
    if (parteSeleccionada) {
      this.numParteSeleccionado = parteSeleccionada;
    } else {

    }
  }
  calcularSuma() {
    const pzarechaValue = this.formRegistro.get('pzarecha')?.value || 0;
    const pzaretraValue = this.formRegistro.get('pzaretra')?.value || 0;
    this.sumaInput = pzarechaValue + pzaretraValue;
    // Asignar la suma al control total
    this.formRegistro.patchValue({
      'totalrecha': this.sumaInput
    });
  }

  submit(){
    /*let pzarechaValue = this.formRegistro.value.pzarecha;
    let pzaretraValue = this.formRegistro.value.pzaretra;
    if (pzarechaValue === null || pzarechaValue === '') {
      pzarechaValue = 0;
    }
    if(pzaretraValue === null || pzaretraValue === ''){
      pzaretraValue = 0;
    }*/
    this.calidadATM={
      id:'',
      empleado:this.idEmpleado,
      semana:this.semanaInput,
      fecha:this.formRegistro.value.fecha,
      turno:this.formRegistro.value.turno,
      numerodp:this.formRegistro.value.numerodp,
      codigomq:this.formRegistro.value.codigomq,
      numerop:this.formRegistro.value.numerop,
      pzainspc:this.formRegistro.value.pzainspc,
      /*pzarecha:pzarechaValue,
      pzaretra:pzaretraValue,*/
      pzarecha:this.formRegistro.value.pzarecha,
      pzaretra:this.formRegistro.value.pzaretra,
      totalrecha:this.sumaInput
    }
    //console.log(this.calidadATM);
    this.registroFinalServices.create(this.calidadATM).subscribe(res=>{
      //console.log('registro agregado',res.id);
      this.idRegistro=res.id;
      this.formRegistro.patchValue({
        'pzainspc':'',
        'pzarecha':'',
        'pzaretra':'',
        'totalrecha':'',
      });
    });
    //console.log('obtuve, rechazados:',this.formRegistro.value.pzarecha,',retrabajo:',this.formRegistro.value.pzaretra,'y suma total:',this.sumaInput);
    this.datosParaComponenteHijo={
      pzarecha: this.formRegistro.value.pzarecha,
      pzaretra: this.formRegistro.value.pzaretra,
      sumaInput: this.sumaInput,
      numerodp: this.formRegistro.value.numerodp,
      codigomq: this.formRegistro.value.codigomq,
      numerop: this.formRegistro.value.numerop
    }
    if (this.sumaInput !== 0) {
      this.verFormulario=false;
      this.verDefectos=true;
    }
  }
  manejarRegistro(valor: boolean) {
    // Aquí puedes manejar el valor booleano que recibes del componente hijo como desees
    //console.log('Se hizo clic en el botón "Registrar" con el valor:', valor);
    this.verFormulario=valor;
    this.verDefectos=!valor;
  }


}
