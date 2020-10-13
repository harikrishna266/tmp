import { browser } from 'protractor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { ModulesModule } from './modules/modules.module';
import { AppRoutingModule } from './app-routing.module';
import { ServicesModule } from './core/services.module';
import { CoreModule } from './core/core.module';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { MaterialModules } from './material';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ModulesModule,
    AppRoutingModule,
    ServicesModule,
    CoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModules
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
