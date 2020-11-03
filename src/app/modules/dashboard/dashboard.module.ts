import { MaterialModules } from './../../material';
import { CoreModule } from './../../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { D3PadGatesComponent } from './d3-pad-gates/d3-pad-gates.component';
import { PadsOverviewComponent } from './pads-overview/pads-overview.component';
@NgModule({
  declarations: [
	  DashboardComponent,
	  D3PadGatesComponent,
	  PadsOverviewComponent
	],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CoreModule,
	DragDropModule,
	MaterialModules
  ]
})
export class DashboardModule { }
