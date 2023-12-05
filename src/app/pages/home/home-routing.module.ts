import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:  [
      
      {
        path: 'escanear',
        loadChildren: () => import('../escanear/escanear.module').then( m => m.EscanearPageModule)
      },
      {
        path: 'alumno',
        loadChildren: () => import('../alumno/alumno.module').then( m => m.AlumnoPageModule)
      },
      {
        path: 'docente',
        loadChildren: () => import('../Docente/docente.module').then( m => m.DocentePageModule)
      },
      {
        path: 'registro',
        loadChildren: () => import('../registroAdmin/registro.module').then( m => m.RegistroPageModule)
      },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
