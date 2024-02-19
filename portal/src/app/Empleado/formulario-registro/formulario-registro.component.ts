import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.css']
})
export class FormularioRegistroComponent implements OnInit{

  /*variables para los select*/
  numeroDeptoSeleccionado: number | null = null;
  codigoMaquinaSeleccionado: string='';
  numParteSeleccionado: string = '';
  /*-----------*/
  pzainspInput:number=0;
  rechaInput:number=0;
  retraInput:number=0;

  formRegistro!:FormGroup;

  ngOnInit(): void {
    this.formRegistro = new FormGroup({
      'empleado': new FormControl('',[ Validators.required, Validators.pattern("^[1-9][0-9]*$") ]),
      'semana': new FormControl('',[ Validators.required, Validators.pattern("^[1-9][0-9]*$") ]),
      'fecha': new FormControl('',[ Validators.required, Validators.pattern("/^(\d{4})-(\d{2})-(\d{2})$/") ]),
      'turno': new FormControl('',[ Validators.required, Validators.pattern("^[1-9][0-9]*$") ]),
      'numerodp': new FormControl('',[ Validators.required, Validators.pattern("^[0-9]*$") ]),
      'codigomq': new FormControl('',[ Validators.required, Validators.pattern("^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ]+$") ]),
      'numerop': new FormControl('',[ Validators.required, Validators.pattern("^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ]+$") ]),
      'pzainspc': new FormControl('', [ Validators.required, Validators.pattern("^[1-9][0-9]*$") ]),
      'pzarecha': new FormControl('',[ Validators.required, Validators.pattern("^[0-9]*$") ]),
      'pzaretra': new FormControl('',[ Validators.required, Validators.pattern("^[0-9]*$") ]),
      'totalrecha': new FormControl('',[ Validators.required, Validators.pattern("^[0-9]*$") ]),
    });
  }
  actualizarNoDepto(){

  }
  actualizarCodMq(){

  }
  actualizarNumPt(){

  }
  get valorInput(): number {
    // Si rechaInput es null o undefined, asigna 0; de lo contrario, utiliza su valor actual
    const recha = this.rechaInput !== null && this.rechaInput !== undefined ? this.rechaInput : 0;
    // Si retraInput es null o undefined, asigna 0; de lo contrario, utiliza su valor actual
    const retra = this.retraInput !== null && this.retraInput !== undefined ? this.retraInput : 0;
    // Realiza la suma con los valores actualizados
    return recha + retra;
  }
  submit(){}


}
