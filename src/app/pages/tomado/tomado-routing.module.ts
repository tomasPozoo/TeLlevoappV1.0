import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TomadoPage } from './tomado.page';

const routes: Routes = [
  {
    path: '',
    component: TomadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TomadoPageRoutingModule {}
