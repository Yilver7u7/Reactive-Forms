import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; //Modulo FormModule
import { CommonModule } from '@angular/common';

import { ReactiveRoutingModule } from './reactive-routing.module';
import { BasicPageComponent } from './pages/basic-page/basic-page.component';
import { DynamicPageComponent } from './pages/dynamic-page/dynamic-page.component';
import { SwitchesPageComponent } from './pages/switches-page/switches-page.component';
import { SelectoresPageComponent } from './pages/selectores/selectores.component';


@NgModule({
  declarations: [
    BasicPageComponent,
    DynamicPageComponent,
    SwitchesPageComponent,
    SelectoresPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,//Modulo FormModule
    ReactiveRoutingModule,

  ]
})
export class ReactiveModule { }
