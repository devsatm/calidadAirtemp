import { Component, OnInit } from '@angular/core';
import { MaquinaService } from '../services/maquina.service';
import { Maquina } from '../interfaces/shared';

@Component({
  selector: 'app-regis-maquinas',
  templateUrl: './regis-maquinas.component.html',
  styleUrls: ['./regis-maquinas.component.css']
})
export class RegisMaquinasComponent implements OnInit{

  maquinas:Maquina[]=[];
  crearMq!:Maquina;
  idMq:string='';

  constructor(private maquinaS:MaquinaService){}
  ngOnInit(): void {
    this.maquinaS.getAll().subscribe((data:Maquina[])=>{
      this.maquinas=data;
    });
    this.crearMq={
      id:'',
      codigo:'',
      nombre:'',
      codproceso:'',
      departamento:''
    }
  }
  submit(element:Maquina){
    this.maquinaS.create(this.crearMq).subscribe(res =>{
      console.log('Departamento agregado');
      const newMq={
        id: res.id,
        codigo: element.codigo,
        nombre: element.nombre,
        codproceso: element.codproceso,
        departamento: element.departamento
      }
      this.maquinas.push(newMq);
      this.crearMq = {
        id: '',
        codigo: '',
        nombre: '',
        codproceso: '',
        departamento: ''
      };
    })
  }
  submitedit(element:Maquina){
    this.maquinaS.update(this.idMq,this.crearMq).subscribe(res=>{
      console.log('Departamento aditado');
      // Encuentra el índice del departamento en el arreglo
    const index = this.maquinas.findIndex(d => d.id === this.idMq);

    if (index !== -1) {
      // Actualiza el departamento en el arreglo
      this.maquinas[index] = { ...this.crearMq, id: this.idMq };
    }
    })
  }
  editMq(id:string){
    this.idMq=id;
    this.maquinaS.find(id).subscribe((data:Maquina)=>{
      this.crearMq=data;
    });
  }

}
