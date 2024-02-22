import { Component, OnInit } from '@angular/core';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { ParteService } from 'src/app/services/parte.service';
import { Departamento, Parte } from 'src/app/shared/interface';

@Component({
  selector: 'app-alta-partes',
  templateUrl: './alta-partes.component.html',
  styleUrls: ['./alta-partes.component.css']
})
export class AltaPartesComponent implements OnInit{
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
      //console.log('Parte creada');
      const newPrt={
        id:res.id,
        numero:element.numero,
        descripcion:element.descripcion,
        tipo:element.tipo,
        cliente:element.cliente,
        departamento:element.departamento
      }
      this.partes.unshift(newPrt);
      this.crearPrt={
        id:'',
        numero:'',
        descripcion:'',
        tipo:element.tipo,
        cliente:'',
        departamento:element.departamento
      }
    });
  }
  submitedit(element:Parte){
    this.parteS.update(this.idPrt,this.crearPrt).subscribe(res=>{
      //console.log('Departamento aditado');
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
      parte.numero.toLowerCase().includes(this.filtro.toLowerCase())||
      parte.descripcion.toLowerCase().includes(this.filtro.toLowerCase())||
      parte.tipo.toLowerCase().includes(this.filtro.toLowerCase())||
      //parte.cliente.toLowerCase().includes(this.filtro.toLowerCase())||
      (parte.departamento && typeof parte.departamento === 'string' && parte.departamento.toLowerCase().includes(this.filtro.toLowerCase()))
    );

    this.mostrarMensaje = resultados.length === 0;

    return resultados;
  }
}
