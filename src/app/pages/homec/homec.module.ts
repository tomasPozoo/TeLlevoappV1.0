import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
//import { FormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HomecPage } from './homec.page';

import { HomePageRoutingModule } from './homec-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule
  ],
  declarations: [HomecPage]
})
export class HomePageModule {}
