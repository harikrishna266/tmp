import { CoreModule } from './../../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoPageComponent } from './no-page.component';
import { NoPageRoutingModule } from './noPage-routing.module';




@NgModule({
  declarations: [NoPageComponent],
  imports: [
    CommonModule,
	CoreModule,
	NoPageRoutingModule
  ]
})
export class NoPageModule { }
