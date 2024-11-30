import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CopPageRoutingModule } from './cop-routing.module';

import { CopPage } from './cop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CopPageRoutingModule
  ],
  declarations: [CopPage]
})
export class CopPageModule {}
