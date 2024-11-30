import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-homec',
  templateUrl: 'homec.page.html',
  styleUrls: ['homec.page.scss'],
})
export class HomecPage implements OnInit {
  buscar_direccion = 'https://api.mapbox.com/geocoding/v5/mapbox.places/XXXXX.json?access_token=pk.eyJ1IjoiZnJlZGNhbXBvczEyMzAiLCJhIjoiY2xudTl2d2VrMDlpbzJrcWpnYnJkc3JqbCJ9.hjid1kkpkU37wvVJrj2pQg';
  mi_direccion = 'bombero mario clavero 1709';
  arreglo_direcciones: Direccion[] = [];
  map: mapboxgl.Map; //  mapa
  valorViaje: number; // Nueva
  capacidadPasajeros: number; // 
  destino: string; // Destino 
  horaEncuentro: string; // Hora 
  lugarEncuentro: string; // Lugar 
  precio: number; // Precio 

  constructor(private https: HttpClient, private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.mapa();
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
      zoom: 16,
    });

    new mapboxgl.Marker({ color: 'rojo' }).setLngLat([-70.57879450922837, -33.59843921776792]).addTo(this.map);
  }

  buscarDireccion() {
    const buscar_direccion = `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.mi_direccion}.json?access_token=pk.eyJ1IjoiZnJlZGNhbXBvczEyMzAiLCJhIjoiY2xudTl2d2VrMDlpbzJrcWpnYnJkc3JqbCJ9.hjid1kkpkU37wvVJrj2pQg`;
    this.https.get(buscar_direccion).subscribe((data: any) => {
      this.arreglo_direcciones = []; // Limpiar la lista antes de agregar nuevas direcciones
      for (let index = 0; index < data.features.length; index++) {
        const element = data.features[index];
        console.log(element.place_name);
        const reg: Direccion = {
          place_name: element.place_name,
          lng: element.center[0],
          lat: element.center[1],
        };
        this.arreglo_direcciones.push(reg);
      }
    });
  }

  seleccion(ev) {
    console.log(ev.target.value);
    new mapboxgl.Marker({ color: 'blue' })
      .setLngLat([ev.target.value.lng, ev.target.value.lat])
      .addTo(this.map);
    const lng_fin = ev.target.value.lng;
    const lat_fin = ev.target.value.lat;
    const ruta = `https://api.mapbox.com/directions/v5/mapbox/driving/-70.57879450922837,-33.59843921776792;${lng_fin},${lat_fin}?geometries=geojson&access_token=pk.eyJ1IjoiZnJlZGNhbXBvczEyMzAiLCJhIjoiY2xudTl2d2VrMDlpbzJrcWpnYnJkc3JqbCJ9.hjid1kkpkU37wvVJrj2pQg`;
    
    this.https.get(ruta).subscribe((data: any) => {
      const geometria = data.routes[0].geometry;
      console.log(geometria);
      this.map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: geometria,
          properties: {},
        },
      });
      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': 'green',
          'line-width': 5,
        },
      });
    });
  }

  publicarViaje() {
    const viaje = {
      direccion: this.mi_direccion,
      capacidad: this.capacidadPasajeros,
      destino: this.destino,
      hora_encuentro: this.horaEncuentro,
      lugar_encuentro: this.lugarEncuentro,
      valor: this.precio
    };

    this.firestore.collection('viajes').add(viaje).then(() => {
      console.log('Viaje publicado con éxito!');
    }).catch(error => {
      console.error('Error al publicar el viaje:', error);
    });
  }
}

export interface Direccion {
  place_name: string;
  lng: number;
  lat: number;
}

