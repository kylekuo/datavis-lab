import { loaded } from '../@dependencies/js/LoadEvents.js';
// import { createReadableStream } from './Stream.js';

await loaded;

// GRAPH

const graph = document.querySelector('#graph'),
			svg = d3.select(graph).append('svg');

// let data = [ 1, 2, 3, 4, 5 ],
// 		circle = svg.selectAll('circle');

// circle = circle
// 	.data(data, d => d)
// 	.join(
// 		enter => enter
// 			.append('circle')
// 			.attr('r', d => d * 10)
// 			.attr('cx', d => (d * 5) ** 2)
// 			.attr('cy', d => (d * 5) ** 2)
// 			.attr('fill', 'green')
// 	);

// setTimeout(() => {

// 	circle = circle
// 		.data(data, d => d)
// 		.join(
// 			enter => enter,
// 			update => update
// 				.attr('fill', 'blue')
// 		);

// }, 1000);

// setTimeout(() => {

// 	data = [ 1, 2, 3 ];

// 	circle
// 		.data(data, d => d)
// 		.join(
// 			enter => enter,
// 			update => update,
// 			exit => exit
// 				.attr('fill', 'red')
// 				.transition(500)
// 				.style('opacity', 0)
// 				.transition(10)
// 				.remove()
// 		);

// }, 2000);
