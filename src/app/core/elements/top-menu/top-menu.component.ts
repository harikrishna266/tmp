import { Component, OnInit } from "@angular/core";


@Component({
	selector: "app-top-menu",
	templateUrl: "./top-menu.component.html",
	styleUrls: ["./top-menu.component.scss"],
})
export class TopMenuComponent implements OnInit {
	menus:any
	
	constructor() {}

	

	ngOnInit(): void {
		this.menus = [
			{
				icon: "order",
				menuText: "Order",
				router: "/dashboard",
				children: [],
			},
			{
				icon: "Send",
				menuText: "Dispatch",
				router: "/no-page",
				children: [],
			},
			{
				icon: "schedule",
				menuText: "Staff Scheduling",
				router: "/no-page",
				children: [],
			},
			{
				icon: "payroll",
				menuText: "Payroll",
				router: "/no-page",
				children: [],
			},
			{
				icon: "report",
				menuText: "Reporting",
				router: "/no-page",
				children: [],
			},
			{
				icon: "lms",
				menuText: "LMS",
				router: "/no-page",
				children: [],
			},
			{
				icon: "work-orders",
				menuText: "Work Orders",
				router: "/no-page",
				children: [],
			},
			{
				icon: "invoicing",
				menuText: "Invoicing",
				router: "/no-page",
				children: [],
			}
		];
	}
}
