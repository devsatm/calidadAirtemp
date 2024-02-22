import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-panel-empleado',
  templateUrl: './panel-empleado.component.html',
  styleUrls: ['./panel-empleado.component.css']
})
export class PanelEmpleadoComponent implements OnInit{

  id:string='';
  constructor( private route:ActivatedRoute, private router:Router){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.id=id;
      //console.log('ID recuperado de la URL en el Menu:', id);
    });
  }
  navegarNuevoRegis(id:string){
    this.router.navigate(['empleado/nuevo-registro/',id]);
  }
  navegarMisRegis(id:string){
    this.router.navigate(['empleado/mis-registros/',id]);
  }

}
