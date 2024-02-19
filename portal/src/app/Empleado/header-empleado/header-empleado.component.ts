import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header-empleado',
  standalone: true,
  imports: [],
  templateUrl: './header-empleado.component.html',
  styleUrl: './header-empleado.component.css'
})
export class HeaderEmpleadoComponent implements OnInit{
  id:string='';
  constructor(private route:ActivatedRoute, private router:Router){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.id=id;
      //console.log('ID recuperado de la URL:', id);
    });
  }
  navegarNuevoRegis(id:string){
    this.router.navigate(['empleado/nuevo-registro/',id]);
  }
  navegarMisRegis(id:string){
    this.router.navigate(['empleado/mis-registros/',id]);
  }
  navegarMenu(id:string){
    this.router.navigate(['panel/empleado/',id]);
  }


}
