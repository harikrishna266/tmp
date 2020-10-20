import { AfterViewInit, Component, ElementRef, HostBinding, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {sankey, align, sankeyLinkHorizontal} from 'd3-sankey';
import { drag } from 'd3-drag';
import {select, selectAll} from 'd3-selection';

import { link } from 'fs';
import { maxHeaderSize } from 'http';





@Component({
	selector: 'app-d3-pad-gates',
	templateUrl: './d3-pad-gates.component.html',
	styleUrls: ['./d3-pad-gates.component.scss']
})
export class D3PadGatesComponent implements OnInit, AfterViewInit {


	public svg;
	public data;
	public treeLayout;
	public height;
	public width;
	public pads = 15;
	public  margin = { top: 10, right: 10, bottom: 10, left: 10};
	public graph;
	public sankeyGraph: sankey;
	public path;
	public  d3 = {select, selectAll}
	public linkThickness  = 30;


	constructor(private el: ElementRef) { }

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		this.setinitialSVG();
		this.getData();
		this.renderGraph();
		
	}

	setinitialSVG(): void {
		this.height = this.el.nativeElement.clientHeight;
		this.width = this.el.nativeElement.clientWidth;
		console.log(this.height, this.width);
		this.svg = select('svg');
		this.svg
			.attr('width', this.width )
			.attr('height', this.height)
			// .append('g')
			.attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);


		// const sankeyObj = sankey()
		// .nodeWidth(36)
		// .nodePadding(10)
		// .size([this.width, this.height]);

	}

	getData(): void {
		const generateNodes = (type, start, count) => {
			const inBay = [];
			for (let i = start; i <= start + count; i++) {
				inBay.push({ id: i, name: `${type} ${i}`, type });
			}
			return inBay;
		};

		const inbays = generateNodes('inbay', 0, 14);
		const pads = generateNodes('pads', 15, 14);
		const outbay = generateNodes('outbay', 30, 0);
		const links = [];
		for (let i = 0; i < 14; i++) {
			links.push(
				{ source: i, target: i + 15, value: 1 },
				{ source: i + 15, target: 30, value: 1 },
			)
		}
		console.log(links);
		this.data = { nodes : [
				...inbays, ...pads , ...outbay
			],
			links
		};
	}

	renderGraph(): void {
		this.sankeyGraph = sankey()
			.iterations(6)
			.size([this.width, this.height]);

		const path = this.sankeyGraph.links();


		const {nodes, links}  = this.sankeyGraph(this.data);

		this.svg.append('g')
			.selectAll('.link')
			.data(links)
			.enter().append('path')
			.attr('class', 'link')
			.attr('d', sankeyLinkHorizontal())
			.attr('stroke-width', (d) => d.value * this.linkThickness );


		const node = this.svg.append('g')
			.selectAll('.node')
			.data(nodes)
			.enter().append('g')
			.attr('class', 'node');


		node
			.filter((d) =>  d.type === 'inbay' )
			.append('rect')
			.attr('x', (d) => d.x0)
			.attr('y', (d) => d.y0)
			.attr('height', (d) => d.y1 - d.y0)
			.attr('width', this.sankeyGraph.nodeWidth() *  2)
			.attr('class', (d) => `node-rect ${d.id} ${d.type}`)
			.append('image')
			.attr('xlink:href', (d) =>  'http://localhost:4200/assets/img/icons/Flight-red.png')
			.attr('width', 50);
			
			// .call(drag()
			// 	.on("drag", started)
			// 	.on("end", droped)
			// );

		// node
		// 	.filter((d) =>  d.type === 'pad')
	}

		// const started = (ele) => {
		// 	const draggedEle = select(`.node-rect-img-${ele.subject.id}`);
		// 	draggedEle.attr('x', ele.x);
		// 	draggedEle.attr('y', ele.y);
		// };


		// const droped = (ele) => {
		// 	console.log(ele);
		// 	// const draggedEle = select(`.node-rect-img-${ele.subject.id}`);
		// 	// draggedEle.attr('x', ele.x);
		// 	// draggedEle.attr('y', ele.y);
		// };


		// node
		// 	.filter((d) =>  d.type === 'inbay' )
		// 	.append('rect')
		// 	.attr('x', (d) => d.x0)
		// 	.attr('y', (d) => d.y0)
		// 	.attr('height', (d) => this.linkThickness * d.value - 15)
		// 	.attr('width', (d) =>  this.linkThickness * d.value - 15)
		// 	.attr('class', (d) => `node-rect ${d.id} ${d.type}`)
		// 	.append('image')
		// 	.attr('xlink:href', (d) =>  'http://localhost:4000/assets/img/icons/Flight-red.png')
			// .attr('width', 50)
			// .call(drag()
			// 	.on("drag", started)
			// 	.on("end", droped)
			// );

		// node
		// 	.filter((d) =>  d.type === 'pad')
			
	// }
}

// export const data = {
// 	nodes: [

// 		{ id: 1, name: 'bay 1', type: 'inbay'},
// 		{ id: 2, name: 'bay 2', type: 'inbay'},
// 		{ id: 3, name: 'bay 3', type: 'inbay'},
// 		{ id: 4, name: 'bay 4', type: 'inbay'},
// 		{ id: 5, name: 'bay 5', type: 'inbay'},
// 		{ id: 6, name: 'bay 6', type: 'inbay', merged: true},
// 		{ id: 7, name: 'bay 7', type: 'inbay'},
// 		{ id: 8, name: 'bay 8', type: 'inbay'},
// 		{ id: 9, name: 'bay 9', type: 'inbay'},
// 		{ id: 10, name: 'bay 10', type: 'inbay'},
// 		{ id: 11, name: 'bay 11', type: 'inbay'},
// 		{ id: 12, name: 'bay 12', type: 'inbay'},
// 		{ id: 13, name: 'bay 13', type: 'inbay'},
// 		{ id: 14, name: 'bay 14', type: 'inbay'},
// 		{ id: 15, name: 'bay 15', type: 'inbay'},



// 		{id: 1,  name: 'Pad 1', type: 'pad'},
// 		{id: 2,  name: 'Pad 2', type: 'pad'},
// 		{id: 3,  name: 'Pad 3', type: 'pad'},
// 		{id: 4,  name: 'Pad 4', type: 'pad'},


// 		{id: 5,  name: 'Pad 5', type: 'pad'},
// 		{id: 6,  name: 'Pad 6', type: 'pad'},
// 		{id: 7,  name: 'Pad 7', type: 'pad'},

// 		{id: 8,  name: 'Pad 8', type: 'pad'},
// 		{id: 9,  name: 'Pad 9', type: 'pad'},
// 		{id: 10,  name: 'Pad 10', type: 'pad'},

// 		{id: 11,  name: 'Pad 11', type: 'pad'},
// 		{id: 12,  name: 'Pad 12', type: 'pad'},
// 		{id: 13,  name: 'Pad 13', type: 'pad'},
// 		{id: 14,  name: 'Pad 14', type: 'pad'},
// 		{id: 15,  name: 'Pad 15', type: 'pad'},
// 		{id: 16,  name: 'Pad 16', type: 'pad'},




// 		{ id: 'exit', name: 'bay 2', type: 'outbay'},




// 	],
// 	links: [

// 		{ source: '1-inbay', target: '1-pad', value: 1 },
// 		{ source: '1-pad', target: 'exit-outbay', value: 1 },


// 		{ source: '2-inbay', target: '2-pad', value: 1 },
// 		{ source: '2-pad', target: 'exit-outbay', value: 1 },

// 		{ source: '3-inbay', target: '3-pad', value: 1 },
// 		{ source: '3-pad', target: 'exit-outbay', value: 1 },

// 		{ source: '4-inbay', target: '4-pad', value: 1 },
// 		{ source: '4-pad', target: 'exit-outbay', value: 1 },


// 		{ source: '5-inbay', target: '5-pad', value: 1 },
// 		{ source: '5-pad', target: 'exit-outbay', value: 1 },


// 		{ source: '7-inbay', target: '7-pad', value: 2 },
// 		{ source: '7-pad', target: 'exit-outbay', value: 2 },

// 		{ source: '8-inbay', target: '8-pad', value: 1 },
// 		{ source: '8-pad', target: 'exit-outbay', value: 1 },

// 		{ source: '9-inbay', target: '9-pad', value: 1 },
// 		{ source: '9-pad', target: 'exit-outbay', value: 1 },

// 		{ source: '10-inbay', target: '10-pad', value: 1 },
// 		{ source: '10-pad', target: 'exit-outbay', value: 1 },

// 		{ source: '11-inbay', target: '11-pad', value: 1 },
// 		{ source: '11-pad', target: 'exit-outbay', value: 1 },

// 		{ source: '12-inbay', target: '12-pad', value: 1 },
// 		{ source: '12-pad', target: 'exit-outbay', value: 1 },

// 		{ source: '13-inbay', target: '13-pad', value: 1 },
// 		{ source: '13-pad', target: 'exit-outbay', value: 1 },

// 		{ source: '14-inbay', target: '14-pad', value: 1 },
// 		{ source: '14-pad', target: 'exit-outbay', value: 1 },

// 		{ source: '15-inbay', target: '15-pad', value: 1 },
// 		{ source: '15-pad', target: 'exit-outbay', value: 1 }



// 	]
// }


// export const data = {
// 	"nodes": [
// 		{ id: 0,  "node": 0, "name": "node0" },
// 		{ id: 1,  "node": 1, "name": "node1" },
// 		{ id: 2, "node": 2, "name": "node2" },
// 		{ id: 3, "node": 3, "name": "node3" },
// 		{ id: 4, "node": 4, "name": "node4" }
// 	],
// 	"links": [
// 		{ "source": 0, "target": 2, "value": 2 },
// 		{ "source": 1, "target": 2, "value": 2 },
// 		{ "source": 1, "target": 3, "value": 2 },
// 		{ "source": 0, "target": 4, "value": 2 },
// 		{ "source": 2, "target": 3, "value": 2 },
// 		{ "source": 2, "target": 4, "value": 2 },
// 		{ "source": 3, "target": 4, "value": 4 }
// 	]
// }



// export const data = {
// 	nodes: [
// 		{ id: 0, name: 'bay 1', type: 'inbay'},
// 		{ id: 1, name: 'bay 1', type: 'inbay'},
// 		{ id: 2, name: 'bay 2', type: 'inbay'},
// 		{ id: 3, name: 'bay 2', type: 'inbay'},
// 		{ id: 4, name: 'bay 2', type: 'inbay'},
// 		{ id: 5, name: 'bay 2', type: 'inbay'},
// 		{ id: 6, name: 'bay 2', type: 'inbay'},
// 		{ id: 7, name: 'bay 2', type: 'inbay'},
// 		{ id: 8, name: 'bay 2', type: 'inbay'},
// 		{ id: 9, name: 'bay 2', type: 'inbay'},
// 		{ id: 10, name: 'bay 2', type: 'inbay'},
// 		{ id: 11, name: 'bay 2', type: 'inbay'},
// 		{ id: 12, name: 'bay 2', type: 'inbay'},
// 		{ id: 13, name: 'bay 2', type: 'inbay'},
// 		{ id: 14, name: 'bay 2', type: 'inbay'},

// 		{ id: 15, name: 'pad 1', type: 'pad'},
// 		{ id: 16, name: 'pad 1', type: 'pad'},
// 		{ id: 16, name: 'pad 1', type: 'pad'},
// 		{ id: 16, name: 'pad 1', type: 'pad'},
// 		{ id: 16, name: 'pad 1', type: 'pad'},
// 		{ id: 16, name: 'pad 1', type: 'pad'},
// 		{ id: 16, name: 'pad 1', type: 'pad'},
// 		{ id: 16, name: 'pad 1', type: 'pad'},
// 		{ id: 16, name: 'pad 1', type: 'pad'},
// 		{ id: 16, name: 'pad 1', type: 'pad'},


// 		{ id: 15, name: 'bay 2', type: 'outbay'}
// 	],
// 	links: [
// 		{ source: 0, target: 1, value: 2 }
// 		{ source: 0, target: 1, value: 2 }
// 	]
// }
