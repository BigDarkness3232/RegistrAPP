import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {
  usuario = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required])

  })

  usuarios: any[] = [];
  
  email : string = "";
  KEY : string = 'usuarios'

  constructor(private toastController: ToastController,private router:Router, private usuStorage: UsuarioStorageService) { }

  ngOnInit() {
    this.usuarios =  this.usuStorage.listar();
  }

  
   


   validar() {
    const emailToValidate = this.usuario.controls.email.value;
    const usuarioEncontrado = this.usuarios.find(usuario => usuario.email === emailToValidate);
    if (usuarioEncontrado) {
      this.mostrarToast( 'bottom',"Se envió un enlace para restablecer contraseña a tu correo", 4000);
      this.router.navigate(['/login']);
    } else {
      this.mostrarToast('bottom',"El correo no se encuentra registrado, verifíquelo y vuelva a intentar.", 3000);
    }
  }





  




  

  async mostrarToast(position: 'top' | 'middle' | 'bottom',message: string,duration: number) {
    const toast = await this.toastController.create({
      message,
      duration,
      position,
    });
  
    await toast.present();
  }


}
