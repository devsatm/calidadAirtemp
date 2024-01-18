import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-formulario-movil',
  templateUrl: './formulario-movil.component.html',
  styleUrls: ['./formulario-movil.component.css'],
  providers: [DatePipe]  // Agrega DatePipe como un proveedor
})
export class FormularioMovilComponent {
  rechaInput: number=0;
  retraInput: number=0;
  totalPzas:number=0;
  //valorInput= this.rechaInput + this.retraInput;
  defectoSeleccionado: string = '';
  listaDefectos: string[] = [];
  numeroSemana: number=0;

  /*imprimirValorEnConsola() {
    console.log('Valor ingresado:', this.valorInput);
  }*/
  constructor(private datePipe: DatePipe){}

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
}
