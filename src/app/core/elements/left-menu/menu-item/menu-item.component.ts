import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";


@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  @Input() menuDetails;
  @Input() menuIndex;

  showChildIndex;

  constructor(private router: Router) { }

  ngOnInit(): void {
	  console.log(this.menuDetails)
  }

  showChild(index){
    if(this.showChildIndex == index){
      this.showChildIndex = null
    }else{
      this.showChildIndex = index
    }

  }

  goToPage(url, index){
	

	this.router.navigateByUrl(url).then(e => {
		if (e) {
		  console.log("Navigation is successful!");
		} else {
		  console.log("Navigation has failed!");
		}
	  });
}

}
