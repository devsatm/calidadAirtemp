import { Component, OnInit } from '@angular/core';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { Departamento } from 'src/app/shared/interface';

@Component({
  selector: 'app-alta-departamentos',
  templateUrl: './alta-departamentos.component.html',
  styleUrls: ['./alta-departamentos.component.css']
})
export class AltaDepartamentosComponent implements OnInit{

  crearDpto!:Departamento;
  departamentos:Departamento[]=[];
  idDepto:string='';
  filtro: string = '';
  mostrarMensaje: boolean = false;

  constructor(private departamentoS:DepartamentoService){}

  ngOnInit(): void {
    this.departamentoS.getAll().subscribe((data:Departamento[])=>{
      this.departamentos=data;
    });
    this.crearDpto={
      id:'',
      numero:'',
      nombre:'',
      encargado:'',
      tipo:''
    }
  }

  submit(element:Departamento){
    this.departamentoS.create(this.crearDpto).subscribe(res =>{
      //console.log('Departamento agregado');
      const newDepto={
        id: res.id,
        numero: element.numero,
        nombre: element.nombre,
        encargado: element.encargado,
        tipo: element.tipo
      }
      this.departamentos.unshift(newDepto);
      this.crearDpto = {
        id: '',
        numero: '',
        nombre: '',
        encargado: '',
        tipo: '',
      }
    })
  }
  submitedit(element:Departamento){
    this.departamentoS.update(this.idDepto,this.crearDpto).subscribe(res=>{
      //console.log('Departamento aditado');
      // Encuentra el índice del departamento en el arreglo
    const index = this.departamentos.findIndex(d => d.id === this.idDepto);

    if (index !== -1) {
      // Actualiza el departamento en el arreglo
      this.departamentos[index] = { ...this.crearDpto, id: this.idDepto };
    }
    })
  }
  editDepto(id:string){
    this.idDepto=id;
    this.departamentoS.find(id).subscribe((data:Departamento)=>{
      this.crearDpto=data;
    });
  }
  nuevo(){
    this.crearDpto = {
      id: '',
      numero: '',
      nombre: '',
      encargado: '',
      tipo: ''
    };
  }
  filtrarTabla() {
    const resultados = this.departamentos.filter(departamento =>
      (departamento.numero && typeof departamento.numero === 'string' && departamento.numero.toLowerCase().includes(this.filtro.toLowerCase())) ||
      departamento.nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
      departamento.encargado.toLowerCase().includes(this.filtro.toLowerCase()) ||
      departamento.tipo.toLowerCase().includes(this.filtro.toLowerCase())
    );

    this.mostrarMensaje = resultados.length === 0;

    return resultados;
  }

}
