import { MaterialModules } from './../../material';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { MenuItemComponent } from './left-menu/menu-item/menu-item.component';




@NgModule({
  declarations: [LeftMenuComponent, ButtonComponent, MenuItemComponent],
  imports: [
    CommonModule,
    MaterialModules
  ],
  exports:[
    LeftMenuComponent,
    ButtonComponent,
    MenuItemComponent
  ]
})
export class ElementsModule { }
