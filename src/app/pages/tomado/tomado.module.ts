import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TomadoPageRoutingModule } from './tomado-routing.module';

import { TomadoPage } from './tomado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TomadoPageRoutingModule
  ],
  declarations: [TomadoPage]
})
export class TomadoPageModule {}
