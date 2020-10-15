import { AfterViewInit, Component, ElementRef, HostBinding, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { select, tree, zoom, hierarchy, linkHorizontal, event } from 'd3';


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

	constructor(private el: ElementRef) { }

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		this.setinitialSVG();
		// this.createZoom();
		this.getData();
		this.renderTree();
		
	}

	// createZoom(): void {
	// 	this.zoomG = this.svg
	// 		.attr('width', this.width)
	// 		.attr('height', this.height)
	// 		.append('g');

	// 	const g = this.zoomG.append('g')
	// 		.attr('transform', `translate(${this.margin.left},${this.margin.top})`);

	// 	this.svg.call(zoom().on('zoom', () => {
	// 		this.zoomG.attr('transform', event.transform);
	// 	}));
	// }

	setinitialSVG(): void {
		this.height = this.el.nativeElement.clientHeight;
		this.width = this.el.nativeElement.clientHeight;
		console.log(this.height, this.width);
		this.svg = select('svg');
		this.svg
			.attr('width', this.width)
			.attr('height', this.height)
			.append('g');

		const innerWidth = this.width - this.margin.left - this.margin.right;
		const innerHeight = this.height - this.margin.top - this.margin.bottom;

		this.treeLayout = tree().size([innerWidth,   innerHeight]);
	}

	getData(): void {
		const flights = [];
		
		this.data = data;
		console.log(this.data);
	}

	renderTree(): void {
		const root = hierarchy(this.data);
		const links = this.treeLayout(root).links();
		const linkPathGenerator = linkHorizontal().x(d => d.y).y(d => d.x);
		this.svg.selectAll('path').data(links).enter().append('path').attr('d', linkPathGenerator);

		this.svg.selectAll('text')
		.data(root.descendants())
		.enter().append('text')
			.attr('x', d => d.y)
			.attr('y', d => d.x)
			.attr('text-anchor', d => d.children ? 'middle' : 'start')
			.text(d => d.data.data.id);


		console.log(this.svg.selectAll('text')
		.data(root.descendants())
		.enter())
		// .append('image')
		// .attr("xlink:href", function(d) { return 'https://user-images.githubusercontent.com/3151700/69676637-0fd6d680-1099-11ea-85ab-2a9e68229328.png'})
	}
}

export const data = {
	data: {
		id: 'Pads'
	},
	children: [
		{
			data: {
				id: 'wait 1',
			},
			children: [
				{
					data:  {
						id: 'wait 2'
					},
					children: [
						{
							data:  {
								id: 'wait 3'
							}
						}
					]
				}
			]
		}
	]
};