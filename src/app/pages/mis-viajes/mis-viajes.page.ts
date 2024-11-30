import { Component, OnInit } from '@angular/core';
import { Viaje, ViajeService } from 'src/app/servicio/viaje.service';

@Component({
  selector: 'app-mis-viajes',
  templateUrl: './mis-viajes.page.html',
  styleUrls: ['./mis-viajes.page.scss'],
})
export class MisViajesPage implements OnInit {
  viajes: Viaje[] = []; // Arreglo para almacenar los viajes

  constructor(private viajeService: ViajeService) {}

  ngOnInit() {
    // Obtén la lista de viajes desde Firebase
    this.viajeService.obtenerViajes().subscribe(data => {
      this.viajes = data;
    });
  }

  eliminarViaje(id: string | undefined) {
    if (id) {
      this.viajeService.eliminarViaje(id).then(() => {
        console.log('Viaje eliminado con éxito');
      }).catch(error => {
        console.error('Error al eliminar el viaje:', error);
      });
    }
  }
}
