import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaStorageService {

  asistencia: any [] = [];

  constructor(private storage: Storage ) { 
    storage.create();
  }

 //Buscar Clases
 async buscarAsistencia(codigo : string, key : string): Promise<any>{
  this.asistencia = await this.storage.get(key) || [];
  return this.asistencia.find(Asis => Asis.codigo == codigo);
 }
 
//Agregar Clases
 async agregarAsistencia(Asistencia: any, key: string): Promise<boolean>{
   this.asistencia = await this.storage.get(key) || [];
   let claseEncontrada = await this.buscarAsistencia(Asistencia.codigo, key);
   if (claseEncontrada === undefined) {
     this.asistencia.push(Asistencia);
     await this.storage.set(key, this.asistencia);
     return true;
   }
   return false;
 }

 //Modificar Clases

 async modificarAsistencia(Asistencia: any, key: string): Promise<boolean>{
   this.asistencia = await this.storage.get(key) || [];
   let index = this.asistencia.findIndex(clase => clase.codigo == Asistencia.codigo);
   if(index == -1){
       return false;
   }

   this.asistencia[index] = Asistencia;
   await this.storage.set(key, this.asistencia);
   return true;
   
}


//Eliminar Clases
  async eliminarAsistencia(codigo: string, key: string): Promise<boolean>{
   var resp: boolean = false;
   this.asistencia = await this.storage.get(key) || [];
   this.asistencia.forEach((Asistencia, index) => {
     if(Asistencia.codigo == codigo){
       this.asistencia.splice(index, 1);
       resp = true;
     }
   });
   await this.storage.set(key, this.asistencia);
   return resp;
  }


}
