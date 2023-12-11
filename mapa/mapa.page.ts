import { Component, OnInit } from '@angular/core';

//1. debemos llamar a una variable de google, se declara e invoca:
declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  //2.variables locales para controlar el mapa:
  map: any;
  marker: any;

  constructor() { }

  async ngOnInit() {  
    await this.cargarMapa();
    this.autocompetadoInput(this.map,this.marker);
  }

  //3.metodos que trabajen el mapa
   async cargarMapa(){
   const mapa: any = document.getElementById('map');
   this.map = new google.maps.Map(mapa,{
    center:{lat:-33.59841231293147,lng: -70.5790763682629},
    zoom: 18
   });

   this.marker = new google.maps.Marker({
    position:{lat:-33.59841231293147,lng: -70.5790763682629},
    map: this.map,
    title:'Duoc Puente alto'
   });
  }
  
  autocompetadoInput(mapaLocal: any,marcadorLocal: any){
   var autocomplete : any = document.getElementById("autocomplete");
   const search = new google.maps.Autocomplete(autocomplete);
   search.bindTo('bounds',this.map);

   search.addListener('place_changed',function(){
    var place = search.getPlace().geometry.location;
    mapaLocal.setCenter(place);
    mapaLocal.setZoom(15);

    marcadorLocal.setPosition(place);
    marcadorLocal.setMap(mapaLocal);
   });
  }
}
