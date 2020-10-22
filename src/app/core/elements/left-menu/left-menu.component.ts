import { leftMenu } from './../../interfaces/leftMenu.interface';
import { MenusService } from './../../services/menus.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-left-menu',
	templateUrl: './left-menu.component.html',
	styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {
	menus: any
	constructor(
		public MenusService: MenusService,
	) { }


	ngOnInit(): void {
		// this.MenusService.get().subscribe((res:any) => {
		//   this.menus = res.data;
		// });

		this.menus = [
			{
				"icon": "Profile",
				"menuText": "company profile",
				"router": "/dashboard",
				"children": []
			},
			{
				"icon": "flight-common",
				"menuText": "Flight schedule",
				"router": "/flight_schedule",
				"children": []
			},
			{
				"icon": "equipments",
				"menuText": "Equipments",
				"router": "/equipments",
				"children": []
			},
			{
				"icon": "glycol",
				"menuText": "Glycol storage",
				"router": "/glycol_storage",
				"children": [

					{
						"icon": "glycol",
						"menuText": "Child one",
						"router": "",
					},
					{
						"icon": "glycol",
						"menuText": "Child two",
						"router": "",
					},
				]
			},
			{
				"icon": "truck-oporaters",
				"menuText": "Truck operator",
				"router": "/truck_oporator",
				"children": []
			},
			{
				"icon": "Staffs",
				"menuText": "Staffs",
				"router": "/staffs",
				"children": []
			},
			{
				"icon": "Contracts",
				"menuText": "Contracts",
				"router": "/contract",
				"children": []
			},
		]
	}

}
