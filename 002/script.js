import { loaded } from '../@dependencies/js/LoadEvents.js';
await loaded;

// GRAPH

const svg = d3.select('#graph').append('svg');

let data = [ 1, 2, 3, 4, 5 ],
		circle = svg.selectAll('circle');

const updateCircles = (data) => {

	circle = circle
		.data(data, d => d)
		.join(
	
			enter => enter
				.append('circle')
				.attr('r', d => d * 10)
				.attr('cx', d => (d * 5) ** 2)
				.attr('cy', d => (d * 5) ** 2)
				.attr('fill', 'green'),
	
			update => update
				.attr('fill', 'pink'),
	
			exit => exit
				.attr('fill', 'red')
				.transition(500)
				.style('opacity', 0)
				.transition(10)
				.remove()
	
		);

}

updateCircles(data);

setTimeout(() => {
	data = [ 1, 2, 3, 4, 5, 6 ];
	updateCircles(data);
}, 1000);

setTimeout(() => {
	data = [ 1, 2, 3, 6 ];
	updateCircles(data);
}, 2000);
