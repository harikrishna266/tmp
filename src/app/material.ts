import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  imports: [MatButtonModule, MatIconModule, MatDialogModule],
  exports: [MatButtonModule, MatIconModule, MatDialogModule]
})

export class MaterialModules { }
