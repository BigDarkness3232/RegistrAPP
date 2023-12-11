import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
  nombre: string = "";
  rut : string = "";
  codigoQR: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private asuStorage: UsuarioStorageService  ) {}

  ngOnInit() {

    this.nombre = this.asuStorage.getusuarioNom();
    this.rut = this.asuStorage.getRutUsu();

  }

  procesarCodigoQR() {
    if (this.codigoQR) {
 
      console.log("Código QR ingresado:", this.codigoQR);

      // Reiniciar el campo de entrada después de procesar
      this.codigoQR = "";
    } else {
   
      console.log("Por favor, ingrese un código QR válido.");
    }
  }

  horaria(){

    this.router.navigate(['/api']);
  }

  cerrar() {
    this.router.navigate(['/login']);
  }
}
