import { Component, OnInit } from '@angular/core';
import { item } from 'src/app/model/Item';
import { CrudfirebaseService } from 'src/app/servicio/crudfirebase.service';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {

  constructor(private cfs:CrudfirebaseService,
    private tc:ToastController,
    private firestore:AngularFirestore
  ) { }
  item:item={nombre:'',apellido:''}
  lista: item[]=[]
  ngOnInit() {
    this.cfs.listar().subscribe(data=>{
      this.lista=data
    })
  }
  grabar(){
    this.cfs.grabar(this.item).then(()=>{
      this.mensaje('Guardado')
    })
  }
  delete(id:any){
    this.cfs.deleteItem(id).then(()=>{
      this.mensaje('eliminado')
    })
  }
 eliminar(id: string | undefined){
  if (id){
    this.firestore.collection("item").doc(id).delete().then(()=>{
      console.log('usuario eliminado');
    }).catch(error => console.error('error al eliminar ',error));
  }else{
    console.error('ID DE USUARIO NO VALIDO')
  }
 }

  async mensaje(texto:string){
    const toast=await this.tc.create({
      message:texto,
      duration:1000,
      position:'bottom'
    });
    await toast.present()
  }
}
