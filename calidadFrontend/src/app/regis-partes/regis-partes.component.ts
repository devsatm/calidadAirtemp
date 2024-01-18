import { Component, OnInit } from '@angular/core';
import { ParteService } from '../services/parte.service';
import { DepartamentoService } from '../services/departamento.service';
import { Departamento, Parte } from '../interfaces/shared';

@Component({
  selector: 'app-regis-partes',
  templateUrl: './regis-partes.component.html',
  styleUrls: ['./regis-partes.component.css']
})
export class RegisPartesComponent implements OnInit{

  partes:Parte[]=[];
  crearPrt!:Parte;
  idPrt:string='';
  departamentos:Departamento[]=[];
  filtro: string = '';
  mostrarMensaje: boolean = false;

  constructor(private parteS:ParteService,private departamentoS:DepartamentoService){}

  ngOnInit(): void {
    this.parteS.getAll().subscribe((data:Parte[])=>{
      this.partes=data;
    });
    this.crearPrt={
      id:'',
      numero:'',
      descripcion:'',
      tipo:'',
      cliente:'',
      departamento:''
    }
    this.departamentoS.getAll().subscribe((data:Departamento[])=>{
      this.departamentos=data;
    });
  }
  submit(element:Parte){
    this.parteS.create(this.crearPrt).subscribe(res=>{
      console.log('Parte creada');
      const newPrt={
        id:res.id,
        numero:element.numero,
        descripcion:element.descripcion,
        tipo:element.tipo,
        cliente:element.cliente,
        departamento:element.departamento
      }
      this.partes.push(newPrt);
      this.crearPrt={
        id:'',
        numero:'',
        descripcion:'',
        tipo:'',
        cliente:'',
        departamento:''
      }
    });
  }
  submitedit(element:Parte){
    this.parteS.update(this.idPrt,this.crearPrt).subscribe(res=>{
      console.log('Departamento aditado');
      // Encuentra el índice del departamento en el arreglo
    const index = this.partes.findIndex(d => d.id === this.idPrt);

    if (index !== -1) {
      // Actualiza el departamento en el arreglo
      this.partes[index] = { ...this.crearPrt, id: this.idPrt };
    }
    })
  }
  editPrt(id:string){
    this.idPrt=id;
    this.parteS.find(id).subscribe((data:Parte)=>{
      this.crearPrt=data;
    });
  }
  nuevo(){
    this.crearPrt={
      id:'',
      numero:'',
      descripcion:'',
      tipo:'',
      cliente:'',
      departamento:''
    }
  }
  filtrarTabla() {
    const resultados = this.partes.filter(parte =>
      parte.numero.toLowerCase().includes(this.filtro.toLowerCase()) ||
      parte.descripcion.toLowerCase().includes(this.filtro.toLowerCase()) ||
      parte.tipo.toLowerCase().includes(this.filtro.toLowerCase()) ||
      parte.cliente.toLowerCase().includes(this.filtro.toLowerCase()) ||
      parte.departamento.toLowerCase().includes(this.filtro.toLowerCase())
    );

    this.mostrarMensaje = resultados.length === 0;

    return resultados;
  }

}
