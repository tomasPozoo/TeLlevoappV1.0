import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomecPage } from './homec.page';

const routes: Routes = [
  {
    path: '',
    component: HomecPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
