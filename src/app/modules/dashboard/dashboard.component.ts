import { Component, OnInit } from "@angular/core";
import {
	CdkDragDrop,
	moveItemInArray,
	transferArrayItem,
} from "@angular/cdk/drag-drop";

@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
	iconDetails = {
		color: "yellow",
	};
	cardContent = {
		title: "Air Costa",
		content: "#125425",
	};

	gyColStatus:Number;

	inBoundFlights = [
		{
			property: "inbound",
			data: [
				{
					iconDetails: {
						color: "red",
					},
					cardContent: {
						title: "Air Costa",
						content: "#125425",
					},
				},

				{
					iconDetails: {
						color: "red",
					},
					cardContent: {
						title: "Air Costa",
						content: "#125425",
					},
				},

				{
					iconDetails: {
						color: "red",
					},
					cardContent: {
						title: "Air Costa",
						content: "#125425",
					},
				},

				{
					iconDetails: {
						color: "red",
					},
					cardContent: {
						title: "Air Costa",
						content: "#125425",
					},
				},
			],
		},
	];

	queueFlights = [
		{
			property: "queue",
			data: [
				{
					iconDetails: {
						color: "yellow",
					},
					cardContent: {
						title: "Air Costa",
						content: "#125425",
					},
				},

				{
					iconDetails: {
						color: "yellow",
					},
					cardContent: {
						title: "Air Costa",
						content: "#125425",
					},
				},

				{
					iconDetails: {
						color: "yellow",
					},
					cardContent: {
						title: "Air Costa",
						content: "#125425",
					},
				},

				{
					iconDetails: {
						color: "yellow",
					},
					cardContent: {
						title: "Air Costa",
						content: "#125425",
					},
				},
			],
		},
	];

	outBoundFlights = [
		{
			property: "outbound",
			data: [
				{
					iconDetails: {
						color: "red",
					},
					cardContent: {
						title: "Air Costa",
						content: "#125425",
					},
				},

				{
					iconDetails: {
						color: "red",
					},
					cardContent: {
						title: "Air Costa",
						content: "#125425",
					},
				},
			],
		},
	];

	padQueueList = [];
	gateQueueList = [];

	drop(event: CdkDragDrop<string[]>) {
		console.log(event);
		if (event.previousContainer === event.container) {
			moveItemInArray(
				event.container.data,
				event.previousIndex,
				event.currentIndex
			);
		} else {
			transferArrayItem(
				event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex
			);
		}
	}

	constructor() {}

	ngOnInit(): void {
		setTimeout(()=>{
			this.gyColStatus = 75	
		})
	}
}
