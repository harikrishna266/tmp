import {CommonModule} from '@angular/common';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { CoreModule } from './../../core/core.module';



@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule
  ]
})
export class AuthModule { }
