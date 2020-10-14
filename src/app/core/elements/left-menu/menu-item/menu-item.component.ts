import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  @Input() menuIcon;
  @Input() menuText;
  @Input() children;
  @Input() menuIndex;
  @Input() routerUrl;

  showChildIndex;

  constructor() { }

  ngOnInit(): void {
  }

  showChild(index){
    if(this.showChildIndex == index){
      this.showChildIndex = null
    }else{
      this.showChildIndex = index
    }

  }

}
