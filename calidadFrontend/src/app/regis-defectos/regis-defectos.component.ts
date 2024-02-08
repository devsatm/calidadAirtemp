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
  mostrarMensaje: boolean = false;
  partes:Parte[]=[];
  maquinas:Maquina[]=[];
  departamentos:Departamento[]=[];
  filtroBusqueda:string='';

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
      //console.log('Defecto agregado');
      const newDef={
        id: res.id,
        codigomq: element.codigomq,
        numerodp: element.numerodp,
        numerop: element.numerop,
        tipodefecto: element.tipodefecto
      }
      this.defectos.unshift(newDef);
      this.crearDef = {
        id:'',
        codigomq:element.codigomq,
        numerodp:element.numerodp,
        numerop:element.numerop,
        tipodefecto:''
      };
    })
  }
  submitedit(element:Defecto){
    this.defectosS.update(this.idDef,this.crearDef).subscribe(res=>{
      //console.log('Defecto aditado');
      // Encuentra el índice del departamento en el arreglo
    const index = this.defectos.findIndex(d => d.id === this.idDef);

    if (index !== -1) {
      // Actualiza el departamento en el arreglo
      this.defectos[index] = { ...this.crearDef, id: this.idDef };
    }
    })
  }
  editDefecto(id:string){
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
  filtrarDefectos(): any[] {
    const valorBusqueda = this.filtroBusqueda.toLowerCase();

    // Asegúrate de que RegistroFinal no sea null ni undefined
    if (this.defectos) {
      return this.defectos.filter((defecto) => {
        // Asegúrate de que registro.empleado y registro.codigomq no sean null ni undefined
        const codigomq = defecto.codigomq ? defecto.codigomq.toString().toLowerCase() : '';
        const numerodp = defecto.numerodp ? defecto.numerodp.toString().toLowerCase() : '';
        const numerop = defecto.numerop ? defecto.numerop.toLowerCase() : '';
        const tipodefecto = defecto.tipodefecto ? defecto.tipodefecto.toLowerCase() : '';

        return numerodp.includes(valorBusqueda) || codigomq.includes(valorBusqueda) || numerop.includes(valorBusqueda) || tipodefecto.includes(valorBusqueda);
      });
    } else {
      return [];
    }
  }

}
