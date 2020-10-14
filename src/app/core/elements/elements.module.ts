import { MaterialModules } from './../../material';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { MenuItemComponent } from './left-menu/menu-item/menu-item.component';
import { FlightIconComponent } from './flight-icon/flight-icon.component';
import { HCardComponent } from './h-card/h-card.component';
import { LogoComponent } from './logo/logo.component';




@NgModule({
  declarations: [
	  LeftMenuComponent, 
	  ButtonComponent, 
	  MenuItemComponent, 
	  FlightIconComponent, 
	  HCardComponent, 
	  LogoComponent
	],
  imports: [
    CommonModule,
    MaterialModules
  ],
  exports:[
    LeftMenuComponent,
    ButtonComponent,
    MenuItemComponent,
    FlightIconComponent,
	HCardComponent,
	LogoComponent
  ]
})
export class ElementsModule { }
