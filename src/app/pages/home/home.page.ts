import { Component,OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { UsuarioStorageService } from 'src/app/services/usuario-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  nombre_user: string="";
  usuario: any = {};
  rut: string="";

  constructor(private router:Router, private usuStorage:UsuarioStorageService) {

    

  }

  ngOnInit(){

    this.usuario = this.router.getCurrentNavigation()?.extras.state;
    this.usuario = this.usuario.user;

    this.nombre_user = this.usuario.nombre
  console.log(this.nombre_user)

  this.rut = this.usuario.rut

  this.usuStorage.setusuarioNom(this.nombre_user);

  this.usuStorage.setRutUsu(this.rut);


  }



}
