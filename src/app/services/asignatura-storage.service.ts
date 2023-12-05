import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Storage } from '@ionic/storage-angular';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaStorageService {

  asignaturas: any[] = [];

  codigo_asig: string = "";

  constructor(private storage: Storage,private fireStore :AngularFirestore,private firebase:FirebaseService) {
    storage.create();
  }

  private Rut_Docente: string = '';

  setRutDocente(rut: string) {
    this.Rut_Docente = rut;
  }

  getRutDocente() {
    return this.Rut_Docente;
  }

  setCodigo(codigo : string){
  this.codigo_asig = codigo;
  };

  getCodigo(){
  return this.codigo_asig;
  };


  async asignaturasDocente(rut: string, key: string){
    this.asignaturas = await this.storage.get(key) || [];
    this.asignaturas = await this.asignaturas.filter(asig => asig.Rut_Docente == rut)
    return this.asignaturas;
  }

  //Buscar Asignatura:
  async agregar(data: any) {
    try {
      const documentRef = await this.fireStore.collection("asignaturas").add(data);
      const idDocumento = documentRef.id;
      data.id = idDocumento;
      // Llama a tu función modificar() aquí para hacer cambios adicionales en el documento si es necesario
      this.firebase.modificar("asignaturas", idDocumento, data);
      return true;
    } catch (error) {
      console.error('Error al agregar asignatura: ', error);
      return false;
    }
  }


  listar() {
    this.firebase.getDatos('asignaturas').subscribe((asignaturasSnapshot: any) => {
      this.asignaturas = []
      asignaturasSnapshot.forEach((asignaturasData: any) => {
        const asignatura = {
          id: asignaturasData.payload.doc.id,
          ...asignaturasData.payload.doc.data()
        };
        this.asignaturas.push(asignatura);
      });
    });
    return this.asignaturas;
  }

  buscar(id: string) {
    return this.asignaturas.find(asi => asi.cod_asig == id);
  }

  async modificar(id: string, asignatura: any) {
    let asi = this.buscar(id);
    console.log(asi)
    if (asi == undefined) {
      return false;
    }
    await this.firebase.modificar("asignaturas", id, asignatura);
    return true;
  }

  }




