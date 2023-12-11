import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //admin:
  administrador: any = {
    rut: '21.452.954-8',
    nombre: 'Freddy',
    ap_paterno: 'Cardenas',
    fecha_nac: '2000-09-11',
    email: 'admin@duoc.cl',
    contrasena: 'judasM',
    confirmar_contrasena: 'judasM',
    perfil: 'Admin'
  }

  Alumno: any = {
    rut: '21.112.136-2',
    nombre: 'Luis',
    ap_paterno: 'Gonzalez',
    fecha_nac: '2000-09-11',
    email: 'Luis.gonzales@duocuc.cl',
    contrasena: 'judasM',
    confirmar_contrasena: 'judasM',
    perfil: 'Alumno'
  }

  Docente: any = {
    rut: '21.244.616-5',
    nombre: 'Felipe',
    ap_paterno: 'Valenzuela',
    fecha_nac: '2000-09-11',
    email: 'Felipe.Valenzuela@profesor.duoc.cl',
    contrasena: 'judasM',
    confirmar_contrasena: 'judasM',
    perfil: 'Docente'
  }

  //variables
  email: string = "";
  contrasena: string = "";

  listaUsuarios: any = [];



  constructor(private Firebase : FirebaseService,private alertController:AlertController,private router: Router,private toastController: ToastController, private usuStorage: UsuarioStorageService) { 
  
  }

  mapa(){
    this.router.navigate(['/mapa'])
  
  }
   ngOnInit() {

    this.Firebase.getDatos('Usuarios').subscribe((usuariosSnapshot: any) => {
      this.listaUsuarios = [];
      usuariosSnapshot.forEach((usuarioData: any) => {
        const usuario = {
          id: usuarioData.payload.doc.id,
          ...usuarioData.payload.doc.data()
        };
        this.listaUsuarios.push(usuario);
      });
    });

    
  }


  //metodo 
redireccionar(){

 this.router.navigate(['/registroAlumno'])

};

async presentAlert(header: string, message: string) {
  const alert = await this.alertController.create({
    header: header,
    message: message,
    buttons: ['OK'],
  });

  await alert.present();
}

 ingresar() {
    var lista_usuario: any [] =  this.usuStorage.listar(); 
    var usuario_encontrado = lista_usuario.find(usu => usu.email == this.email && usu.contrasena == this.contrasena);
     console.log(usuario_encontrado)
    if (usuario_encontrado == undefined){
      this.mostrarToast("top","Usuario o Contraseña incorrecta!!",3000);
    }else{
      let navigationExtras: NavigationExtras = {
        state: {
          user: usuario_encontrado
        }
      }

      this.usuStorage.setEstadoLogin(true);
     this.router.navigate(['/home'], navigationExtras);
     return usuario_encontrado;
    }

  }

async olvidar(){


  this.router.navigate(['/restablecer'])
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
