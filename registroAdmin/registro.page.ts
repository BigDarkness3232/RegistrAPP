import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';
import { AsignaturaStorageService } from 'src/app/services/asignatura-storage.service';
import { ClasesStorageService } from 'src/app/services/clases-storage.service';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})


export class RegistroPage implements OnInit {

  isModalOpenA = false;
  isModalOpenC = false;
  isModalOpen = false;
  isModalOpenM = false;
  isModalOpenMA = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  setOpenA(isOpenA: boolean) {
    this.isModalOpenA = isOpenA;
  }
  setOpenC(isOpenC: boolean) {
    this.isModalOpenC = isOpenC;
  }
  setOpenM(isOpenM: boolean) {
    this.isModalOpenM = isOpenM;
  }
  setOpenMA(isOpenMA: boolean) {
    this.isModalOpenMA = isOpenMA;
  }

  //VAMOS A CREAR UNA VARIABLE DEL TIPO Form Group:
  usuario = new FormGroup({
    codigo_firebase: new FormControl('', []),
    rut : new FormControl('', [Validators.required,Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}'), validarRutChileno]),
    nombre: new FormControl('',[ Validators.required,Validators.minLength(3)]),
    ap_paterno: new FormControl('', [ Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    fecha_nac: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email]),
    perfil: new FormControl(''),
    contrasena: new FormControl('', [Validators.required,Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}')]),
    confirmar_contrasena: new FormControl('', [Validators.required,Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}')]),
  });
  asignatura = new FormGroup({
    codigo_firebase: new FormControl('', []),
    codigo :  new FormControl('',[Validators.required])  ,
    nombre_asig : new FormControl('',[Validators.required]) ,
    Rut_Docente :new FormControl('',[Validators.required,Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}'), validarRutChileno])  
  });



  usuarios: any[] = [];
  asignaturas: any []=[];
  clases: any[] = [];
  asistencias: any[]=[];
  nombre_usuario: string = "";





  constructor(private fireService: FirebaseService,private toastController: ToastController, private router: Router,private usuStorage: UsuarioStorageService,private asigStorage: AsignaturaStorageService,private claseStorage:ClasesStorageService) { }

  async ngOnInit() {
  
    this.cargarUsuarios();
    this.cargarAsignaturas();


    const nombre = this.usuarios.find(user => user.nombre === this.nombre_usuario);

  }
  

  cerrar(){

    this.router.navigate(['/login'])

  }


  //Crud Usuarios FireBase

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

    this.usuStorage.agregar(this.usuario.value);

  }

modificarusu(){
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

    this.fireService.modificar('Usuarios',this.usuario.controls.codigo_firebase.value || '', this.usuario.value);
  }

buscarusu(id : string){
    
  this.fireService.getDato('Usuarios',id).subscribe(data =>{ 
    let p:  any = data.data();
    p['codigo_firebase'] = id;
      this.usuario.setValue(p)

  })

  }

cargarUsuarios(){

this.fireService.getDatos('Usuarios')?.subscribe(data => {

//console.log(data);
 this.usuarios = [];
 for(let producto of data){
// console.log(producto.payload.doc.data())
let p: any = producto.payload.doc.data();
p['codigo_firebase'] = producto.payload.doc.id;
this.usuarios.push(p);
 }
});

  }

eliminarusu(id : string){

  this.usuStorage.eliminar(id);

}

// Crud asignaturas firebase
GuardarAsig(){
  this.fireService.agregar('asignaturas',this.asignatura.value);
  this.setOpen(false)
}

cargarAsignaturas(){

  this.fireService.getDatos('asignaturas')?.subscribe(data => {
  
  //console.log(data);
   this.asignaturas = [];
   for(let asignatura of data){
  // console.log(producto.payload.doc.data())
  let p: any = asignatura.payload.doc.data();
  p['codigo_firebase'] = asignatura.payload.doc.id;
  this.asignaturas.push(p);
   }
  });


}

modificarasig(){

  this.fireService.modificar('asignaturas',this.asignatura.controls.codigo_firebase.value || '',this.asignatura.value);
}
eliminarasig(id : string){
  this.fireService.eliminar('asignaturas',id);
}

buscarasig(id : string){
    
  this.fireService.getDato('asignaturas',id).subscribe(data =>{ 
    let p:  any = data.data();
    p['codigo_firebase'] = id;
      this.asignatura.setValue(p)


  })

  }

DocentesA(){
  const Docentes = this.usuarios.filter(usuario => usuario.perfil === 'Docente');
  return Docentes;
  
}

async mostrarToast(position: 'top' | 'middle' | 'bottom',
message: string,
duration: number) {
const toast = await this.toastController.create({
  message,
  duration,
  position,
});

await toast.present();
}

validaEdad(fechaIngresada: string): boolean {
  // Obtener la fecha actual
  const fechaActual = new Date();

  // Convertir la fecha ingresada en un objeto Date
  const partesFecha = fechaIngresada.split("-");
  const anioNacimiento = parseInt(partesFecha[0], 10);
  const mesNacimiento = parseInt(partesFecha[1], 10);
  const diaNacimiento = parseInt(partesFecha[2], 10);

  const fechaNacimiento = new Date(anioNacimiento, mesNacimiento - 1, diaNacimiento);

  // Calcular la diferencia de años
  const diferenciaAnios = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

  // Comprobar si la diferencia es al menos de 17 años
  if (diferenciaAnios >= 17) {
    return true;
  } else {
    return false;
  }
}


}
  function validarRut(rut: string): boolean {
  // Limpia el RUT de puntos y guión
  rut = rut.replace(/\./g, '').replace(/-/g, '').trim();

  // Extrae el dígito verificador
  const dv = rut.slice(-1).toUpperCase();
  let rutNumerico = parseInt(rut.slice(0, -1), 10);

  // Calcula el dígito verificador esperado
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

