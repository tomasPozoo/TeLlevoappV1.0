// viaje.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export interface Viaje {
  id?: string;
  direccion: string;
  valor: number;
  capacidad: number;
  hora_encuentro: string;
  lugar_encuentro: string;
  precio: string;
}

@Injectable({
  providedIn: 'root',
})
export class ViajeService {
  constructor(private firestore: AngularFirestore) {}

  obtenerViajes(): Observable<Viaje[]> {
    return this.firestore
      .collection<Viaje>('viajes')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Viaje;
            const id = a.payload.doc.id; // Incluye el ID del documento
            return { id, ...data }; // Retorna el objeto con el ID y los datos
          })
        )
      );
  }
  
  agregarViaje(viaje: Viaje): Promise<void> {
    const id = this.firestore.createId(); // Creamos un ID único
    return this.firestore.collection('viajes').doc(id).set(viaje);
  }

  eliminarViaje(id: string): Promise<void> {
    return this.firestore.collection('viajes').doc(id).delete();
  }

  actualizarViaje(id: string, viaje: Partial<Viaje>): Promise<void> {
    return this.firestore.collection('viajes').doc(id).update(viaje);
  }

}
