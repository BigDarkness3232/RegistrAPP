import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { FirebaseService } from './firebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClasesStorageService {


  
  clases: any[] = [];

  constructor(private fireBase: FirebaseService, private fireStore: AngularFirestore) {
  }

  async agregar(data: any) {
    try {
      const documentRef = await this.fireStore.collection("Asistencia").add(data);
      const idDocumento = documentRef.id;
      data.idClase = idDocumento;
      // Llama a tu función modificar() aquí para hacer cambios adicionales en el documento si es necesario
      this.fireBase.modificar("Asistencia", idDocumento, data);
      return true;
    } catch (error) {
      console.error('Error al agregar clase: ', error);
      return false;
    }
  }

  eliminar(id: string) {
    for (let index = 0; index < this.clases.length; index++) {
      const usu = this.clases[index];
      if (usu.id === id) {
        if (this.fireBase.eliminarc("Asistencia", id)) {
          this.clases.splice(index, 1);
          return true;
        } else {
          console.log("No se pudo borrar la clase")
          return false;
        }
      }
    }
    return false;
  }


  listar() {
    this.fireBase.getDatos('Asistencia').subscribe((asignaturasSnapshot: any) => {
      this.clases = []
      asignaturasSnapshot.forEach((asignaturasData: any) => {
        const asignatura = {
          id: asignaturasData.payload.doc.id,
          ...asignaturasData.payload.doc.data()
        };
        this.clases.push(asignatura);
      });
    });
    return this.clases;
  }

  buscar(id: string) {
    return this.clases.find(asi => asi.id == id);
  }

  async modificar(id: string, clase: any) {
    let asi = this.buscar(id);
    console.log(asi)
    if (asi == undefined) {
      return false;
    }
    await this.fireBase.modificar("Asistencia", id, clase);
    return true;
  }

  async regAsis(idClase: string, idEstudiante: string) {
    let clase = this.buscar(idClase);
  
    if (clase.idEstudiantes.includes(idEstudiante)) {
      return false; // El estudiante ya está registrado en esta clase
    } else {
      clase.idEstudiantes.push(idEstudiante);
      this.modificar(idClase, clase)
      return true; // El estudiante se registró con éxito
    }
  }


}
