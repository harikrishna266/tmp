import { AfterViewInit, Component, ElementRef, HostBinding, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { select, zoom, hierarchy, linkHorizontal, event } from 'd3';
import {sankey} from 'd3-sankey';


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
	public  margin = { top: 0, right: 50, bottom: 0, left: 75};
	public graph;

	constructor(private el: ElementRef) { }

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		this.setinitialSVG();
		// this.createZoom();
		this.getData();
		this.renderGraph();
	}

	setinitialSVG(): void {
		this.height = this.el.nativeElement.clientHeight;
		this.width = this.el.nativeElement.clientHeight;
		
		console.log(this.height, this.width);
		this.svg = select('svg');
		this.svg
			.attr('width', this.width)
			.attr('height', this.height)
			.append('g')
			.attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

		const sankeyObj = sankey()
		.nodeWidth(36)
		.nodePadding(290)
		.size([this.width, this.height]);
	}

	getData(): void {
		this.graph = data;
	}

	renderGraph(): void {
		sankey()
		.nodeWidth(36)
		.nodePadding(290)
		.size([this.width, this.height]);


		this.svg.append('g')
		.selectAll('.link')
		.data(this.graph.links)
		.enter()
		.append("path")
		.attr("class", "link")
		.attr("d", sankey.link() )
		.style("stroke-width", function(d) { return Math.max(1, d.dy); })
		.sort(function(a, b) { return b.dy - a.dy; });
	}
}

export const data = {
	nodes: [
		{
			node: 0,
			name: 'node0'
		},
		{
			node: 1,
			name: 'node1'
		},
		{
			node: 2,
			name: 'node2'
		},
		{
			node: 3,
			name: 'node3'
		},
		{
			node: 4,
			name: 'node4'
		}
	],
	links: [
		{
			source: 0,
			target: 2,
			value: 2
		},
		{
			source: 1,
			target: 2,
			value: 2
		},
		{
			source: 1,
			target: 3,
			value: 2
		},
		{
			source: 0,
			target: 4,
			value: 2
		},
		{
			source: 2,
			target: 3,
			value: 2
		},
		{
			source: 2,
			target: 4,
			value: 2
		},
		{
			source: 3,
			target: 4,
			value: 4
		}
	]
}