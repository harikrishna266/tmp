import { ElementsModule } from './elements/elements.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ElementsModule
  ],
  exports:[
    ElementsModule
  ]
})
export class CoreModule { }
