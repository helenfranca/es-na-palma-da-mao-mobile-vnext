import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, Loading, NavController } from 'ionic-angular';
import { AirService } from '../../provider/services';
import { Mapa } from '../../model/mapa.model';
import leaflet from 'leaflet';

@IonicPage()
@Component({
  selector: 'page-air',
  templateUrl: 'air.html',
})

export class AirPage {

  Air: Mapa[];
  mapaId: any[];
  loading: Loading;
  map: any;
  @ViewChild('map') mapContainer: ElementRef;
  constructor(
    private service: AirService, 
    private navCtrl: NavController,
    ) {
  }

  
  ionViewDidEnter() {
    this.allDataQualityAir();     
    setTimeout(()=>{this.loadMapa();},5000);   
  }

  /**
   * puxa todos os dados 
   */
  allDataQualityAir = () => {
    this.service.getAllQualityAir().subscribe(dados => {
      this.Air = dados;
      

    });
  }
 
  
  /**
   * carrega o mapa
   */
  loadMapa() {
    let map = leaflet.map('map').setView([-20.2602057, -40.3405489], 11);

    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    this.pin(map);

   
  }

  /**
   * 
   */
  pin(map){
    this.Air.map(item =>{
      let mark = leaflet.marker([item.Latitude,item.Longitude]);
      map.addLayer(mark);
      mark.on('click', () => {
        // abrir modal com as informações

        // this.loadQualityId(item.IdEstacao);
               
        this.modal(item.IdEstacao, this.Air.find( a => a.IdEstacao == item.IdEstacao));

        
      });
    });
    
  }

  modal(id, Air){
    this.navCtrl.push('QualityPoint', { id : id, air:Air });
  }

}