import { DeicingFloorComponent } from './../../core/elements/deicing-floor/deicing-floor.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
	CdkDragDrop,
	moveItemInArray,
	transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

	public iconDetails = {
		color: 'yellow',
	};

	public cardContent = {
		title: 'Air Costa',
		content: '#125425',
	};

	public gyColStatus: Number;

	public inBoundFlights = [
		{
			property: 'inbound',
			data: [
				{
					iconDetails: {
						color: 'red',
					},
					cardContent: {
						title: 'Air Costa',
						content: '#125425',
					},
				},

				{
					iconDetails: {
						color: 'red',
					},
					cardContent: {
						title: 'Air Costa',
						content: '#125425',
					},
				},

				{
					iconDetails: {
						color: 'red',
					},
					cardContent: {
						title: 'Air Costa',
						content: '#125425',
					},
				},

				{
					iconDetails: {
						color: 'red',
					},
					cardContent: {
						title: 'Air Costa',
						content: '#125425',
					},
				},
			],
		},
	];

	queueFlights = [
		{
			property: 'queue',
			data: [
				{
					iconDetails: {
						color: 'yellow',
					},
					cardContent: {
						title: 'Air Costa',
						content: '#125425',
					},
				},

				{
					iconDetails: {
						color: 'yellow',
					},
					cardContent: {
						title: 'Air Costa',
						content: '#125425',
					},
				},

				{
					iconDetails: {
						color: 'yellow',
					},
					cardContent: {
						title: 'Air Costa',
						content: '#125425',
					},
				},

				{
					iconDetails: {
						color: 'yellow',
					},
					cardContent: {
						title: 'Air Costa',
						content: '#125425',
					},
				},
			],
		},
	];

	outBoundFlights = [
		{
			property: 'outbound',
			data: [
				{
					iconDetails: {
						color: 'red',
					},
					cardContent: {
						title: 'Air Costa',
						content: '#125425',
					},
				},

				{
					iconDetails: {
						color: 'red',
					},
					cardContent: {
						title: 'Air Costa',
						content: '#125425',
					},
				},
			],
		},
	];

	padQueueList = [];
	gateQueueList = [];

	drop(event: CdkDragDrop<string[]>) {
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

	openDeicingFloor() {
		this.dialog.open(DeicingFloorComponent, { panelClass: 'deicing-floor' })
	}

	constructor(public dialog: MatDialog) { }

	ngOnInit(): void {
		setTimeout(() => {
			this.gyColStatus = 75
		})
	}
}
