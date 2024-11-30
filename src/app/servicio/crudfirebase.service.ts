import { Injectable } from '@angular/core';
//libreriass
import { item } from '../model/Item';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudfirebaseService {

  constructor(private afs:AngularFirestore) { }
  item:item={nombre:'',apellido:''}
  lista:item[]=[]

  
  grabar(item:item){
    return this.afs.collection('item').add(item)
  }
  eliminar(id:any){
    return this.afs.collection('item').doc(id).delete()
  }
  listar(): Observable<item[]>{
    return this.afs.collection<item>('item')
            .valueChanges({idfiel:'id'})
  }
  edititem(item_nuevo:item,id:any){
    return this.afs.collection('item').doc(id).update(item_nuevo)
  }
  deleteItem(id:any){
    return this.afs.collection('item').doc(id).delete()
  }
  

}
