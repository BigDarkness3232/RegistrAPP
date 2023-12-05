import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  usuarios: any[] = [];

  constructor(private fireStore: AngularFirestore, private router: Router) { }
  //crud:

  async agregar(colection: string, data: any) {
    try {
     await this.fireStore.collection(colection).add(data);
    } catch (error) {
      console.log(error);

    }

  }

  eliminar(colection: string, id: string) {
    try {
      this.fireStore.collection(colection).doc(id).delete();
    } catch (error) {
      console.log(error);

    }


  }

  eliminarc(coleccion: string, id: string) {
    let ward = false;
    try {
      this.fireStore.collection(coleccion).doc(id).delete();
      ward = true;
    } catch (error) {
      console.log(error)
    } finally {
      return ward;
    }
  }

  modificar(colection: string, id: string, data: any) {
    try {
      this.fireStore.collection(colection).doc(id).set(data);
    } catch (error) {
      console.log(error);

    }

  }

  getDato(colection: string, id: string) {

    return this.fireStore.collection(colection).doc(id).get();


  }

  getDatos(coleccion: string) {

    return this.fireStore.collection(coleccion).snapshotChanges();



  }

  login(correo: string, clave: string) {
    this.fireStore.collection("Usuarios").snapshotChanges().subscribe
    var usuarioEncontrado = this.usuarios.find((usu: any) => usu.email == correo && usu.clave == clave);
    if (usuarioEncontrado != undefined) {
      return usuarioEncontrado;
    } else {

      return undefined;

    }

  }
}


