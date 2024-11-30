import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-qr',
  templateUrl: './crear-qr.page.html',
  styleUrls: ['./crear-qr.page.scss'],
})
export class CrearQrPage implements OnInit {

  constructor() { }

  ngOnInit() {
    this.QRTexto=JSON.stringify(this.valueQRJSON)
  }
  QRTexto:string=''
  
  valueQRJSON={
    capacidad:'',
    direccion:'',
    hora_encuentro:'6/11/2024 13:00',
    lugar_encuentro:'frontis',
    precio:3000,
    fecha:'10/10/2015 11:30'
  }
}
