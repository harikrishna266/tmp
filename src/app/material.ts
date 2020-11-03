import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';



@NgModule({
  imports: [MatButtonModule, MatIconModule, MatDialogModule, MatTabsModule],
  exports: [MatButtonModule, MatIconModule, MatDialogModule, MatTabsModule]
})

export class MaterialModules { }
