import { Component, OnInit } from '@angular/core';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { MaquinaService } from 'src/app/services/maquina.service';
import { Departamento, Maquina } from 'src/app/shared/interface';

@Component({
  selector: 'app-alta-maquinas',
  templateUrl: './alta-maquinas.component.html',
  styleUrls: ['./alta-maquinas.component.css']
})
export class AltaMaquinasComponent implements OnInit{
  maquinas:Maquina[]=[];
  crearMq!:Maquina;
  idMq:string='';
  departamentos:Departamento[]=[];
  filtro: string = '';
  mostrarMensaje: boolean = false;

  constructor(private maquinaS:MaquinaService,private departamentoS:DepartamentoService){}
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
    this.departamentoS.getAll().subscribe((data:Departamento[])=>{
      this.departamentos=data;
    });
  }
  submit(element:Maquina){
    this.maquinaS.create(this.crearMq).subscribe(res =>{
      //console.log('Maquinas agregado');
      const newMq={
        id: res.id,
        codigo: element.codigo,
        nombre: element.nombre,
        codproceso: element.codproceso,
        departamento: element.departamento
      }
      this.maquinas.unshift(newMq);
      this.crearMq = {
        id: '',
        codigo: '',
        nombre: '',
        codproceso: '',
        departamento: element.departamento,
      }
    });
  }
  submitedit(element:Maquina){
    this.maquinaS.update(this.idMq,this.crearMq).subscribe(res=>{
      //console.log('Maquina aditado');
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
  nuevo(){
    this.crearMq = {
      id: '',
      codigo: '',
      nombre: '',
      codproceso: '',
      departamento: ''
    };
  }
  filtrarTabla() {
    const resultados = this.maquinas.filter(maquina =>
      maquina.nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
      maquina.codigo.toLowerCase().includes(this.filtro.toLowerCase()) ||
      maquina.codproceso.toLowerCase().includes(this.filtro.toLowerCase()) ||
      maquina.departamento.toLowerCase().includes(this.filtro.toLowerCase())
    );

    this.mostrarMensaje = resultados.length === 0;

    return resultados;
  }
}
