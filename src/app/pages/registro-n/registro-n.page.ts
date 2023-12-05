import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-registro-n',
  templateUrl: './registro-n.page.html',
  styleUrls: ['./registro-n.page.scss'],
})

export class RegistroNPage implements OnInit {
 //VAMOS A CREAR UNA VARIABLE DEL TIPO Form Group:
 usuario = new FormGroup({
  codigo_firebase: new FormControl(''),
  rut : new FormControl('', [Validators.required,Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}'), validarRutChileno]),
  nombre: new FormControl('',[ Validators.required,Validators.minLength(3)]),
  ap_paterno: new FormControl('', [Validators.minLength(3),Validators.maxLength(20)]),
  fecha_nac: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.pattern("^(.+)@(duocuc\\.cl|profesor\\.duoc\\.cl|duoc\\.cl)$")]),
  perfil: new FormControl('Alumno'),
  contrasena: new FormControl('', [Validators.required,Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}')]),
  confirmar_contrasena: new FormControl('', [Validators.required,Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}')]),
});

usuarios: any[] = [];


constructor(private fireService : FirebaseService,private usuarioService: UsuarioStorageService,private toastController: ToastController, private router: Router) { }

ngOnInit() {

  

}




 cerrar(){

  this.router.navigate(['/login'])
}

 GuardarUsu(){
  var perfil = this.usuario.controls.perfil.value || '';
  var nom = this.usuario.controls.nombre.value || '';
  var apellido = this.usuario.controls.ap_paterno.value|| '';
  var correo = "";



if (perfil == "Alumno") {
    correo = nom + '.'+ apellido +"@duocuc.cl"
    this.usuario.controls.email.setValue(correo);
  } else if (perfil == "Docente") {
    correo = nom + '.'+ apellido +"@profesor.duoc.cl"
    this.usuario.controls.email.setValue(correo);
  } else {
    correo = nom + '.'+ apellido +"@duoc.cl";
    this.usuario.controls.email.setValue(correo);
  }

  this.fireService.agregar('Usuarios',this.usuario.value);
  this.mostrarToast('middle',"Usuario Agregado correctamente",3000)
  this.router.navigate(['/login'])
}

async cargarUsuarios(){

  this.fireService.getDatos('Usuarios')?.subscribe(data => {
  
  console.log(data);
   this.usuarios = [];
   for(let producto of data){
  console.log(producto.payload.doc.data())
  let p: any = producto.payload.doc.data();
  p['codigo_firebase'] = producto.payload.doc.id;
  this.usuarios.push(p);
   }
  });

}

 //metodo par la tostada
 async mostrarToast(position: 'top' | 'middle' | 'bottom',message: string,duration: number) {
   const toast = await this.toastController.create({
     message,
     duration,
     position,
   });

   await toast.present();
 }

 



}

function validarRut(rut: string): boolean {
  rut = rut.replace(/\./g, '').replace(/-/g, '').trim();

  const dv = rut.slice(-1).toUpperCase();
  let rutNumerico = parseInt(rut.slice(0, -1), 10);

  let suma = 0;
  let multiplicador = 2;

  while (rutNumerico > 0) {
    suma += (rutNumerico % 10) * multiplicador;
    rutNumerico = Math.floor(rutNumerico / 10);
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const dvEsperado = 11 - (suma % 11);
  const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

  return dv === dvCalculado;
}

function validarRutChileno(control: FormControl): ValidationErrors | null {
  if (!control.value) {
    return null;
  }

  const esValido = validarRut(control.value);

  return esValido ? null : { rutInvalido: true };
}