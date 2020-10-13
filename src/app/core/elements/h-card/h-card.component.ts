import { Component, OnInit, Input } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-h-card',
  templateUrl: './h-card.component.html',
  styleUrls: ['./h-card.component.scss']
})
export class HCardComponent implements OnInit {
  @Input() icon;
  @Input() content;
  constructor() { }

  ngOnInit(): void {
    console.log(this.icon);
    console.log(this.content);
  }

}
