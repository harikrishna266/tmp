import { leftMenu } from './../../interfaces/leftMenu.interface';
import { MenusService } from './../../services/menus.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {
  menus:any
  constructor(
    public MenusService: MenusService,
    ) { }


  ngOnInit(): void {
    // this.MenusService.get().subscribe((res:any) => {
    //   this.menus = res.data;
    //   console.log(this.menus)
    // });

    this.menus = [
      {
        "icon":"Profile",
        "menuText":"company profile",
        "router":"/dashboard",
        "children":[]
      },
      {
        "icon":"flight-common",
        "menuText":"Flight schedule",
        "router":"/no-page",
        "children":[]
	  },
	  {
        "icon":"equipments",
        "menuText":"Equipments",
        "router":"/no-page",
        "children":[]
      },
      {
        "icon":"glycol",
        "menuText":"Glycol storage",
        "router":"/no-page",
        "children":[

          {
            "icon":"glycol",
            "menuText":"Child one",
            "router":"",
          },
          {
            "icon":"glycol",
            "menuText":"Child two",
            "router":"",
          },
        ]
	  },
	  {
        "icon":"truck-oporaters",
        "menuText":"Truck operator",
        "router":"/no-page",
        "children":[]
	  },
	  {
        "icon":"Staffs",
        "menuText":"Staffs",
        "router":"/no-page",
        "children":[]
	  },
	  {
        "icon":"Contracts",
        "menuText":"Contracts",
        "router":"/no-page",
        "children":[]
      },
    ]
  }

}
