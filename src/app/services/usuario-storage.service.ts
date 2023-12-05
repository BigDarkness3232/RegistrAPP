import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//1.importar Storage

import{ Storage }from '@ionic/storage-angular';
import { FirebaseService } from './firebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuarioStorageService {

//vamos a crear una variable auxiliar
usuarios: any []=[];

estado_login: boolean = false;

nombre_usuario: string = "";

rut_usuario: string = "";

//2. crear la variable a utilizar de storage en el contructor
  constructor(private storage: Storage, private router: Router,private fireBase: FirebaseService, private fireStore: AngularFirestore) { 
//3. Instanciar y permitir acceso al storage.
this.listar();
}

//metodos del crud:
/*
Comandos del storage
storage.create(): crea o me permite utilizar el storage
storage.get(KEY):obtener la informacion dl storage.(selec....)
storage.get(KEY,VALOR): modificar o entregar valor al storage
storage.clear():Limpia el storage.
storage.keys(): nombre de las llaves que tiene el storage.
storage.length():tamaño del storage.
*/
//buscar: que buscar y donde buscarlo.
async agregar(data: any) {
  try {
    const documentRef = await this.fireStore.collection("Usuarios").add(data);
    const idDocumento = documentRef.id;
    data.id = idDocumento;
    // Llama a tu función modificar() aquí para hacer cambios adicionales en el documento si es necesario
    this.fireBase.modificar("Usuarios", idDocumento, data);
    return true;
  } catch (error) {
    console.error('Error al agregar usuario: ', error);
    return false;
  }
}

eliminar(id: string) {
  for (let index = 0; index < this.usuarios.length; index++) {
    const usu = this.usuarios[index];
    if (usu.id === id) {
      this.fireBase.eliminar("Usuarios", id)
      this.usuarios.splice(index, 1);
      return true;
    }
  }
  return false;
}

buscar(id: string) {
  return this.usuarios.find(usu => usu.rut == id);
}

async modificar(id: string, usuario: any) {
  let usu = this.buscar(id);
  if (usu == undefined) {
    return false;
  }
  await this.fireBase.modificar("Usuarios", id, usuario);
  return true;
}

listar() {
  this.fireBase.getDatos('Usuarios').subscribe((usuariosSnapshot: any) => {
    this.usuarios = []
    usuariosSnapshot.forEach((usuarioData: any) => {
      const usuario = {
        id: usuarioData.payload.doc.id,
        ...usuarioData.payload.doc.data()
      };
      this.usuarios.push(usuario);
    });
  });
  return this.usuarios;
}

login(correo: string, clave: string) {
  var usuarioEncontrado = this.usuarios.find((usu: any) => usu.email == correo && usu.clave == clave);
  if (usuarioEncontrado != undefined) {
    this.estado_login = true;
    return usuarioEncontrado;
  }
  return undefined;
}

logout(){
this.estado_login = false;
this.router.navigate(['/login']);
}



getEstadoLogin(): boolean{
  return this.estado_login;
}

setEstadoLogin(estado: boolean){
  return this.estado_login = estado;
}



async validarCorreo(email: string, key: string): Promise<boolean> { 
  this.usuarios = await this.storage.get(key) || [];
  var resp: boolean = this.usuarios.some(usuario => usuario.correo == email);

  if(resp){
     return true;
  }else {
    return false;
  }

}

setusuarioNom(nombre_usu: string){

  this.nombre_usuario = nombre_usu;


}


getusuarioNom(){

return this.nombre_usuario;

}

setRutUsu(rut_usu: string){

this.rut_usuario = rut_usu;

}

getRutUsu(){

return this.rut_usuario;
  
}

}

