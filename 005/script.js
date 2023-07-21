import { loaded } from '../@dependencies/js/LoadEvents.js';
await loaded();

// GRAPH

const pie = d3.pie().value( d => d.value ),
			radToDeg = rad => rad * ( 180 / Math.PI );

const graph_html = document.querySelector('#html'),
			graph_svg = document.querySelector('#svg'),
			graph_canvas = document.querySelector('#canvas');

const drawHTMLGraph = data => {

	const wrap = d3.select(graph_html);

	const div = wrap
		.append('div')
		.classed('donut', true);

	let nodes = div.selectAll('.node');

	nodes = nodes
		.data(data, d => d.data.id)
		.join(
	
			enter => enter
				.append('div')
				.classed('node', true)
				.attr('join', 'enter')
				.style('--bg', d => "hsl(" + Math.floor( Math.random() * 360 ) + ", 100%, 66%)")
				.style('--start', d => radToDeg( d.startAngle ))
				.style('--end', d => radToDeg( d.endAngle )),
	
			update => update
				.attr('join', 'update'),
	
			exit => exit
				.attr('join', 'exit')
				.remove()
	
		);	

}

const drawSVGGraph = data => {

	const wrap = d3.select(graph_svg),
				size = wrap.node().offsetHeight * 0.5;

	const svg = wrap
		.append('svg')
		.classed('donut', true)	
		.attr('width', size * 2)
		.attr('height', size * 2)
		.attr('viewbox', `0 0 ${size * 2} ${size * 2}`);

	let nodes = svg.selectAll('.node');

	nodes = nodes
		.data(data, d => d.data.id)
		.join(
	
			enter => enter
				.append('path')
				.classed('node', true)
				.attr('join', 'enter')
				.attr('d', d3.arc().innerRadius(0).outerRadius(size / 2))
				.style('transform', 'translate(50%, 50%)')
				.attr('fill', d => "hsl(" + Math.floor( Math.random() * 360 ) + ", 100%, 66%)"),
	
			update => update
				.attr('join', 'update'),
	
			exit => exit
				.attr('join', 'exit')
				.remove()
	
		);

}

const drawCanvasGraph = data => {

	const wrap = d3.select(graph_canvas),
				size = wrap.node().offsetHeight * 0.5,
				center = size / 2;

	const canvas = wrap
		.append('canvas')
		.classed('donut', true)
		.attr('width', size)
		.attr('height', size);

	const ctx = canvas.node().getContext('2d');

	for (const point of data) {

		ctx.beginPath();

		ctx.moveTo( center, center );

		ctx.arc(
			center,
			center,
			size / 2,
			point.startAngle,
			point.endAngle,
			false
		);

		ctx.lineTo( center, center );

		ctx.fillStyle = "hsl(" + Math.floor( Math.random() * 360 ) + ", 100%, 66%)";

		ctx.fill();

	}

}

fetch('./data-005.json')
	.then(resp => resp.json())
	.then(data => {

		const pieData = pie(data);
		
		drawHTMLGraph(pieData);
		drawSVGGraph(pieData);
		drawCanvasGraph(pieData);

	});