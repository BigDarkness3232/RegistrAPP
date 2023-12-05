import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-api',
  templateUrl: './api.page.html',
  styleUrls: ['./api.page.scss'],
})
export class ApiPage implements OnInit {
  respuesta: any;

  constructor(private http: HttpClient,private router:Router) { }

  ngOnInit() {
    this.consumirApi();
    this.obtenerHoraPorIP();
  }

  consumirApi() {
    this.http.get('http://worldtimeapi.org/api/timezone/America/Santiago').subscribe((data: any) => {
      this.respuesta = data;
      console.table(this.respuesta);
    });
  }

  obtenerHoraPorIP() {
    this.http.get('http://worldtimeapi.org/api/ip').subscribe((data: any) => {
   
    });
  }

  devolverse(){

    this.router.navigate(['/login'])

  }

  descripcion(id_per: number) {

  }
}
