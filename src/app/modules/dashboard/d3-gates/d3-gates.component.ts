import { AfterViewInit, Component, ElementRef, HostBinding, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { sankey, align, sankeyLinkHorizontal } from 'd3-sankey';
import { drag } from 'd3-drag';
import { select, selectAll } from 'd3-selection';

import { link } from 'fs';
import { maxHeaderSize } from 'http';
import { range } from 'rxjs';
import { DeicingFloorComponent } from 'src/app/core/elements/deicing-floor/deicing-floor.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
	selector: 'app-d3-gates',
	templateUrl: './d3-gates.component.html',
	styleUrls: ['./d3-gates.component.scss']
})
export class D3GatesComponent implements OnInit {

	public preInboundFlights = [];
	public numberOfPad = 10;
	public mergedPad = [1];
	public nodesWithFlight = [1, 10];
	public outBayFlights = [];
	public svg;
	public data;
	public treeLayout;
	public height;
	public width;
	public padsLength = 15;
	public margin = { top: 10, right: 10, bottom: 10, left: 10 };
	public graph;
	public sankeyGraph: sankey;
	public path;
	public d3 = { select, selectAll };
	public linkThickness = 30;


constructor(
	private el: ElementRef,
	public dialog: MatDialog
) { }

ngOnInit(): void {
}

ngAfterViewInit(): void {
	this.setinitialSVG();
	this.generateSankeyData();
	this.renderGraph();

	const card = select('.inbound');

	card.call(drag()
		.on('drag', (e) => {
			card.style('top', 100 + e.y + 'px');
			card.style('left', 100 + e.x + 'px');
			card.style('position', 'absolute');
			card.style('z-index', 111111);
			console.log('drag');
			return;
		})
		.on('end', (e) => {
			this.dropToInBay(e, ['inbay']);
		})
	)

}


dropToInBay(ele, type) {
	const rects = this.svg.selectAll('.node-rect').data().filter(e => e = type.includes(e.type));
	rects.map(e => {
		const xmin = e.x0; const ymin = e.y0; const xmax = e.x0 + (this.sankeyGraph.nodeWidth() * 4); const ymax = e.y1;
		const eleX1 = ele.x; const eley1 = ele.y; const eleX2 = ele.x + 10; const eleY2 = ele.y + 10;
		console.log(xmin, ymin, xmax, ymax);
		console.log(eleX1, eley1, eleX2, eleY2);
		if (eleX1 >= xmin && eleX1 <= xmax && eleY2 >= ymin && eley1 <= ymax) {
			console.log('droped');
			this.flightsDropped(ele, e);
		} else {
			this.heightLightLink(ele.subject.id, true);
		}
	});

}

setinitialSVG(): void {
	this.height = this.el.nativeElement.clientHeight;
	this.width = this.el.nativeElement.clientWidth;
	this.svg = select('svg');
	this.svg
		.attr('width', this.width)
		.attr('height', this.height)
		.attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
}

generateSankeyData(): void {
	const remainingPads = this.numberOfPad - this.mergedPad.length;
	const generateNodes = (type) => {
		const inBay = [];
		const tmpArray = Array.apply(null, Array(remainingPads)).map((x, i) => i);
		let count = 0;
		const isMerged = (index) => this.mergedPad.includes(index);
		const flightOn = (index) => this.nodesWithFlight.includes(index);
		tmpArray.map((e, index) => {
			inBay.push({ id: count, name: `in-bay in-bay-${count}`, type: 'inbay', merged: isMerged(index), flightOn: flightOn(index) });
			count = count + 1;
			return e;
		});
		const pads = [];
		tmpArray.map((e, index) => {
			pads.push({ id: count, name: `pad pad-${count}`, type: 'pad', merged: isMerged(index), flightOn: flightOn(count) });
			count = count + 1;
		});
		const outbay = [{ id: count, name: 'out bay', type: 'outbay', flights: [1, 2, 3] }];
		return { nodes: [...inBay, ...pads] }
	};

	const inbays = generateNodes('inbay');
	let links =[];
	for(let i = 0; i <remainingPads; i ++ ) {
	const value = this.mergedPad.includes(i) ? 3 : 1;
	links = [...links,
	{ source: i, target: i + remainingPads, value },
	{ source: i + remainingPads, target: inbays.nodes.length - 1, value }
	]
}
this.data = Object.assign({}, { links }, inbays);
	}

detectDropedEle(ele, type = ['pad', 'outbay']) {
	const rects = this.svg.selectAll('.node-rect').data().filter(e => e = type.includes(e.type));

	this.svg.selectAll('.highlight').attr('class', 'link');
	this.heightLightLink(ele.subject.id, true);
	rects.map(e => {
		const xmin = e.x0; const ymin = e.y0; const xmax = e.x0 + (this.sankeyGraph.nodeWidth() * 4); const ymax = e.y1;
		const x1 = ele.x; const y1 = ele.y; const x2 = ele.x + 100; const y2 = ele.y + 100;
		if (x2 >= xmin && x1 <= xmax && y2 >= ymin && y1 <= ymax) {
			this.flightsDropped(ele, e);
		} else {
			this.heightLightLink(ele.subject.id, true);
		}
	});
}

flightsDropped(ele, e) {
	const removeIndex = this.nodesWithFlight.indexOf(ele.subject.id);
	console.log(removeIndex);
	if (removeIndex !== -1) {
		// dropped to out bay
		if (e.id === this.svg.selectAll('.node').data().length - 1) {
			this.outBayFlights.push(removeIndex);
			this.nodesWithFlight.splice(removeIndex, 1);
		} else {
			this.nodesWithFlight.splice(removeIndex, 1);
			this.nodesWithFlight = [...this.nodesWithFlight, e.id];
		}
		this.svg.selectAll('svg > *').remove();
		this.ngAfterViewInit();
	}
}

heightLightNode(nodeId, deSelect = false) : any {
	if (deSelect) {
		this.svg.selectAll('.node').filter(e => e.source && e.source.id === nodeId).attr('class', 'link');
	} else {
		this.svg.selectAll('.node').filter(e => e.source && e.source.id === nodeId).attr('class', 'highlight');
	}
}

heightLightLink(nodeId, deSelect = false): any {
	if (deSelect) {
		this.svg.selectAll('.link').filter(e => e.source.id === nodeId).attr('class', 'link');
	} else {
		this.svg.selectAll('.link').filter(e => e.source.id === nodeId).attr('class', 'highlight');
	}
}

renderGraph(): void {
	this.sankeyGraph = sankey()
		.nodeWidth(30)
		.nodePadding(10)
		.iterations(6)
		.size([this.width, this.height]);

	const path = this.sankeyGraph.links();


	const { nodes, links } = this.sankeyGraph(this.data);

	this.svg.append('g')
		.selectAll('.link')
		.data(links)
		.enter().append('path')
		.attr('class', 'link')
		.attr('d', sankeyLinkHorizontal())
		.attr('stroke-width', (d) => d.value * this.linkThickness);


	const node = this.svg.append('g')
		.selectAll('.node')
		.data(nodes)
		.enter().append('g')
		.attr('class', 'node');


	const bayWidth = (d) => {
		if (d.merged) {
			return this.sankeyGraph.nodeWidth() * 4;
		} else if (d.type === 'outbay') {
			return 100;
		} else {
			return this.sankeyGraph.nodeWidth() * 2;
		}
	}

		const droped = (ele) => {
		this.heightLightLink(ele.subject.id, true);
		this.detectDropedEle(ele);
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
		draggedEle.attr('y', ele.y);
		this.heightLightLink(ele.subject.id);
		this.heightLightNode(ele.target.id);
	};

	node
			.append('rect')
		.attr('x', (d) => d.type === 'outbay' ? d.x0 - 100 : d.x0)
		.on('click', (d) => this.openDeicingFloor())
		.attr('y', (d) => d.y0)
		.attr('height', (d) => d.y1 - d.y0)
		.attr('width', (d) => bayWidth(d))
		.attr('class', (d) => `${d.type} node-rect ${d.id} ${d.type}`)

		node
			.filter((d) => d.flightOn === true)
		.append('image')
		.attr('x', (d) => d.merged ? d.x0 : d.x0)
		.attr('y', (d) => d.merged ? d.y0 + 20 : d.y0)
		.attr('xlink:href', 'http://localhost:4200/assets/img/icons/Flight-red.png')
		.attr('width', (d) => d.merged ? 70 : 40)
		.attr('height', (d) => d.merged ? 70 : 40)
		.attr('class', (d) => `node-rect-img node-rect-img-${d.id}`)
		.on('click', (d) => this.openDeicingFloor())
		.call(drag()
			.on('drag', started)
			.on('end', droped)
		);


	node.append('text')
		.attr('x', (d) => d.x0 + bayWidth(d) + 10)
		.attr('y', (d) => d.y0 + ((d.y1 - d.y0) / 2))
		.attr('class', 'node-text')
		.text((d) => `${d.index} - ${d.type}`);

	this.svg
		.append('image')
		.attr('class', 'drag-flight')
		.attr('x', (d) => 1000)
		.attr('y', (d) => 1000)
		.attr('xlink:href', 'http://localhost:4200/assets/img/icons/Flight-red.png')
		.attr('width', 50)
		.attr('height', 50)
		.attr('opacity', 1);

	this.outBayFlights.map((e, index) => {
		node.filter((d) => d.type === 'outbay')
			.on('click', (d) => this.openDeicingFloor())
			.append('image')
			.attr('x', (d) => d.x0 - 80)
			.attr('y', (d) => (index * 120) + 80)
			.attr('xlink:href', 'http://localhost:4200/assets/img/icons/Flight-red.png')
	})
}

openDeicingFloor() {
	console.log('i');
	this.dialog.open(DeicingFloorComponent, { panelClass: 'deicing-floor' })
}

}
