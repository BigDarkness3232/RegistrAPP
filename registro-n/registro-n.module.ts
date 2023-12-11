import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroNPageRoutingModule } from './registro-n-routing.module';

import { RegistroNPage } from './registro-n.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroNPageRoutingModule,    ReactiveFormsModule,  ],
  declarations: [RegistroNPage]
})
export class RegistroNPageModule {}
