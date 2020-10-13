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
        "icon":"icon",
        "menuText":"company profile",
        "router":"",
        "children":[]
      },
      {
        "icon":"icon",
        "menuText":"Flight schedule",
        "router":"",
        "children":[]
      },
      {
        "icon":"icon",
        "menuText":"Glycol storage",
        "router":"",
        "children":[

          {
            "icon":"icon",
            "menuText":"Child one",
            "router":"",
          },
          {
            "icon":"icon",
            "menuText":"Child two",
            "router":"",
          },
        ]
      }
    ]
  }

}
