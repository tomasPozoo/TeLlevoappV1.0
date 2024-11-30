import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViajeService, Viaje } from 'src/app/servicio/viaje.service'; 
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  viajes: Viaje[] = [];
  buscar_direccion = 'https://api.mapbox.com/geocoding/v5/mapbox.places/XXXXX.json?access_token=pk.eyJ1IjoiZnJlZGNhbXBvczEyMzAiLCJhIjoiY2xudTl2d2VrMDlpbzJrcWpnYnJkc3JqbCJ9.hjid1kkpkU37wvVJrj2pQg';
  mi_direccion = 'bombero mario clavero 1709';
  arreglo_direcciones: Direccion[] = [];
  map: mapboxgl.Map;

  constructor(private https: HttpClient, private viajeService: ViajeService) {}

  ngOnInit(): void {
    this.mapa();
    this.obtenerViajes();
  }

  ionViewWillEnter() {
    this.mapa();
  }

  mapa() {    
    this.map = new mapboxgl.Map({
      accessToken: environment.TOKEN_MAPBOX,
      container: 'mapa-box',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-70.57879450922837, -33.59843921776792],
      zoom: 16
    });
    new mapboxgl.Marker({ color: 'rojo' }).setLngLat([-70.57879450922837, -33.59843921776792]).addTo(this.map);
  }

  obtenerViajes() {
    this.viajeService.obtenerViajes().subscribe((data) => {
      this.viajes = data;
    });
  }

  buscarDireccion() {
    const buscarDireccionURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.mi_direccion}.json?access_token=pk.eyJ1IjoiZnJlZGNhbXBvczEyMzAiLCJhIjoiY2xudTl2d2VrMDlpbzJrcWpnYnJkc3JqbCJ9.hjid1kkpkU37wvVJrj2pQg`;
    this.https.get(buscarDireccionURL).subscribe((data: any) => {
      for (let index = 0; index < data.features.length; index++) {
        const element = data.features[index];
        const reg: Direccion = {
          place_name: element.place_name,
          lng: element.center[0],
          lat: element.center[1]
        };
        this.arreglo_direcciones.push(reg);
      }
    });
  }

  seleccion(ev) {
    new mapboxgl.Marker({ color: 'blue' })
      .setLngLat([ev.target.value.lng, ev.target.value.lat])
      .addTo(this.map);
    
    const lng_fin = ev.target.value.lng;
    const lat_fin = ev.target.value.lat;
    const ruta = `https://api.mapbox.com/directions/v5/mapbox/driving/-70.57879450922837,-33.59843921776792;${lng_fin},${lat_fin}?geometries=geojson&access_token=pk.eyJ1IjoiZnJlZGNhbXBvczEyMzAiLCJhIjoiY2xudTl2d2VrMDlpbzJrcWpnYnJkc3JqbCJ9.hjid1kkpkU37wvVJrj2pQg`;
    
    this.https.get(ruta).subscribe((data: any) => {
      const geometria = data.routes[0].geometry;
      this.map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: geometria,
          properties: {}
        }
      });
      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          "line-cap": "round",
          "line-join": "round"
        },
        paint: {
          "line-color": "green",
          "line-width": 5
        }
      });
    });
  }
}

export interface Direccion {
  place_name: string;
  lng: number;
  lat: number;
}
