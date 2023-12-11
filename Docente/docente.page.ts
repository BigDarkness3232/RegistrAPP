import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignaturaStorageService } from 'src/app/services/asignatura-storage.service';
import { ClasesStorageService } from 'src/app/services/clases-storage.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';


@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
})
export class DocentePage implements OnInit {

  isModalOpen = false;
  
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  clases : any [] = []
  clas : any[]  =[];
  ca : any = {};

  data : string = '';

  asignaturas : any[] = [];

  asigna : any[]  =[];
  a : any = {};
  nombre : string = "";
  rut: string= "";
  codigo: string = "";
  

  usuario: any = {};
  listaClases: any[] = [];
  clase: any = {}
  listaUsuarios: any[] = [];
  listaEstudiantes: any[] = []
  listaProfesores: any[] = []

  constructor(private claseStore : ClasesStorageService,private firebase:FirebaseService,private asigStorage: AsignaturaStorageService, private router:Router,private asuStorage: UsuarioStorageService) { }

  async ngOnInit() {


    this.codigo = this.asigStorage.getCodigo()

    this.nombre = this.asuStorage.getusuarioNom();
    this.rut = this.asuStorage.getRutUsu();
    console.log(this.rut)

    this.cargarAsignaturas();
    console.log(this.asigna)
    this.filtrarAsig();
    

    
  }


  qr(){



  }
  

  cargarAsignaturas(){

    this.firebase.getDatos('asignaturas')?.subscribe(data => {
      
      this.asignaturas = [];
      data.forEach((asig : any) => {
      const asi = {id : asig.payload.doc.id,...asig.payload.doc.data()}
        this.a = {};
       this.a['Rut_Docente']= asi.Rut_Docente
       this.a['codigo_firebase']= asi.codigo_firebase
       this.a['codigo']= asi.codigo
       this.a['nombre_asig']= asi.nombre_asig
       if(this.a.Rut_Docente == this.rut){
       this.asigna.push(this.a)
       }
      });
      
    });
  

   
  }

   filtrarAsig() {
    this.asigna = this.asigna.filter(asig => asig.Rut_Docente === this.rut);
  }

  vercodigo(codigo : string ){
  var clase = this.asigna.find(asig => asig.codigo_firebase == codigo)
  
  if(clase != undefined){

   this.data = clase.codigo_firebase

 }
}

 cerrar(){

    this.router.navigate(['/login'])
    }

horaria(){

      this.router.navigate(['/api']);
      }
generar(){

    this.router.navigate(['/qr'])


  }

}
