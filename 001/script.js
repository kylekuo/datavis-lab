document.addEventListener('DOMContentLoaded', evt => {

	const graph = d3.select('#graph');

	fetch('./data-easy.json')
	.then( function ( resp ) { 
		return resp.json() 
	})
	.then( function ( data ) {

		console.log(data);
		
		graph
			.selectAll('div')
			.data( data )
			.enter()
			.append('div')
			.style('width', d => `${d}px`);

	});

});