import { Component } from '@angular/core';
import { Defecto, Departamento, Maquina, Parte } from '../interfaces/shared';
import { DefectoService } from '../services/defecto.service';
import { ParteService } from '../services/parte.service';
import { MaquinaService } from '../services/maquina.service';
import { DepartamentoService } from '../services/departamento.service';

@Component({
  selector: 'app-regis-defectos',
  templateUrl: './regis-defectos.component.html',
  styleUrls: ['./regis-defectos.component.css']
})
export class RegisDefectosComponent {

  crearDef!:Defecto;
  defectos:Defecto[]=[];
  idDef:string='';
  filtro: string = '';
  mostrarMensaje: boolean = false;
  partes:Parte[]=[];
  maquinas:Maquina[]=[];
  departamentos:Departamento[]=[];


  constructor(private defectosS:DefectoService, private parteS:ParteService, private maquinaS:MaquinaService,
    private departamentoS:DepartamentoService){}

  ngOnInit(): void {
    this.defectosS.getAll().subscribe((data:Defecto[])=>{
      this.defectos=data;
    });
    this.crearDef={
      id:'',
      codigomq:'',
      numerodp:'',
      numerop:'',
      tipodefecto:''
    };
    this.parteS.getAll().subscribe((data:Parte[])=>{
      this.partes=data;
    });
    this.maquinaS.getAll().subscribe((data:Maquina[])=>{
      this.maquinas=data;
    });
    this.departamentoS.getAll().subscribe((data:Departamento[])=>{
      this.departamentos=data;
    });
  }

  submit(element:Defecto){
    this.defectosS.create(this.crearDef).subscribe(res =>{
      console.log('Departamento agregado');
      const newDepto={
        id: res.id,
        codigomq: element.codigomq,
        numerodp: element.numerodp,
        numerop: element.numerop,
        tipodefecto: element.tipodefecto
      }
      this.defectos.push(newDepto);
      this.crearDef = {
        id:'',
        codigomq:'',
        numerodp:'',
        numerop:'',
        tipodefecto:''
      };
    })
  }
  submitedit(element:Defecto){
    this.defectosS.update(this.idDef,this.crearDef).subscribe(res=>{
      console.log('Departamento aditado');
      // Encuentra el índice del departamento en el arreglo
    const index = this.defectos.findIndex(d => d.id === this.idDef);

    if (index !== -1) {
      // Actualiza el departamento en el arreglo
      this.defectos[index] = { ...this.crearDef, id: this.idDef };
    }
    })
  }
  editDepto(id:string){
    this.idDef=id;
    this.defectosS.find(id).subscribe((data:Defecto)=>{
      this.crearDef=data;
    });
  }
  nuevo(){
    this.crearDef = {
      id:'',
      codigomq:'',
      numerodp:'',
      numerop:'',
      tipodefecto:''
    };
  }
  /*filtrarTabla() {
    const resultados = this.departamentos.filter(departamento =>
      departamento.numero.toLowerCase().includes(this.filtro.toLowerCase()) ||
      departamento.nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
      departamento.encargado.toLowerCase().includes(this.filtro.toLowerCase()) ||
      departamento.tipo.toLowerCase().includes(this.filtro.toLowerCase())
    );

    this.mostrarMensaje = resultados.length === 0;

    return resultados;
  }*/

}
