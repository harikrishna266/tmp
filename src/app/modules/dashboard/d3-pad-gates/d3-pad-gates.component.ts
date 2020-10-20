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


	public numberOfPad = 15;
	public mergedPad = [2, 6];
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
		this.svg = select('svg');
		this.svg
			.attr('width', this.width )
			.attr('height', this.height)
			.attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
	}

	getData(): void {
		const generateNodes = (type) => {
			const inBay = [];
			const remainingPads = this.numberOfPad - this.mergedPad.length;
			const tmpArray = new Array(remainingPads);
			tmpArray.map((e, index) => {
				inBay.push({ id: index, name: `${type} ${index}`, type });
			});
			// return inBay;
			const links = [];
			tmpArray.map((e, index) => {
				{ source: index, target: i + 15, value},
			});
		};

		const inbays = generateNodes('inbay');
		const pads = generateNodes('pads');
		const outbay = generateNodes('outbay');
		const links = [];

		
		for (let i = 0; i < 14; i++) {
			let value = 1;
			let merged = false;
			if (i === 7) {
				continue;
			}
			if (i === 8) {
				value = 2;
				merged = true;
			}
			links.push(
				{ source: i, target: i + 15, value},
				{ source: i + 15, target: 30, value},
			)
		}
		this.data = data;
		// console.log(JSON.stringify(this.data));
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


		const bayWidth = (d) => {
			// if(!d.sourceLinks[0] ) {
			// 	return;
			// }
			if(d.merged ) {
				return this.sankeyGraph.nodeWidth() *  4;
			} else if (d.type === 'outbay') {
				return 100;
			} else {
				return this.sankeyGraph.nodeWidth() *  2;
			}
		}

		node
			.append('rect')
			.attr('x', (d) =>  d.type === 'outbay' ? d.x0 - 100 : d.x0)
			.attr('y', (d) => d.y0)
			.attr('height', (d) => d.y1 - d.y0)
			.attr('width',(d) =>  bayWidth(d))
			.attr('class', (d) => `${d.type} node-rect ${d.id} ${d.type}`);

		const droped = (ele) => {
			const selected = select(`.node-rect-img-${ele.subject.id}`);
			selected.attr('opacity', 1);

			const draggedEle = this.svg.select(`.drag-flight`);
			draggedEle.attr('opacity', 0);
			draggedEle.attr('x', 1300);
			draggedEle.attr('y', 1300);

		};

		const started = (ele) => {
			const selected = this.svg.select(`.node-rect-img-${ele.subject.id}`);
			selected.attr('opacity', 0);
			const draggedEle = this.svg.select(`.drag-flight`);
			draggedEle.attr('opacity', 1);
			draggedEle.attr('x', ele.x);
			draggedEle.attr('y', ele.y - 70);
		};

		node
			.filter((d) =>  d.type === 'inbay' )
			.append('image')
			.attr('x', (d) => d.x0)
			.attr('y', (d) => d.y0)
			.attr('xlink:href', 'http://localhost:4200/assets/img/icons/Flight-red.png')
			.attr('width', 50)
			.attr('height', 50)
			.attr('class', (d) => `node-rect-img node-rect-img-${d.id}`)
			.call(drag()
				.on('drag', started)
				.on('end', droped)
			);

		this.svg
			.append('image')
			.attr('class', 'drag-flight')
			.attr('x', (d) => 1000)
			.attr('y', (d) => 1000)
			.attr('xlink:href', 'http://localhost:4200/assets/img/icons/Flight-red.png')
			.attr('width', 100)
			.attr('height', 100)
			.attr('opacity', 1);

	}
}
