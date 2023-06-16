console.log('script.js');

document.addEventListener('DOMContentLoaded', evt => {

	d3.select('h1')
		.style('color', 'darkorange')
		.append('span')
		.text(' - Introdução a D3');

	return;

	const graph = d3.select('#graph'),
				svg = graph.append('svg');

	console.log({graph, svg});

	return;

	fetch('./data-easy.json')
	.then( function ( resp ) { 
		return resp.json() 
	})
	.then( function ( data ) {

		console.log(data);
		
		svg
			.selectAll('rect')
			.data( data )
			.enter()
			.append('rect')
			.attr('x', 0)
			.attr('y', (d, i) => i * 10)
			.attr('width', d => d)
			.attr('height', 10);

	});


});