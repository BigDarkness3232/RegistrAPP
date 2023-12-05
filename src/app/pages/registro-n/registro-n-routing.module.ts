import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroNPage } from './registro-n.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroNPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroNPageRoutingModule {}
