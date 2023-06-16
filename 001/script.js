document.addEventListener('DOMContentLoaded', evt => {

	const graph = document.querySelector('#graph');

	fetch('./data-normal.json')
	.then( function ( resp ) { 
		return resp.json() 
	})
	.then( function ( data ) {

		const scaleColor = d3.scalePow()
			.exponent(.2)
			.domain([d3.min(data, d => d3.min(d)), d3.max(data, d => d3.max(d))])
			.range(["blue", "red"]);

		for (const row of data) {
			const rowElement = d3.select(graph)
				.append('div')
				.attr('class', 'row');

			for (const number of row) {
				const numberElement = rowElement
					.append('div')
					.attr('class', 'number')
					.style('background-color', scaleColor(number))
					.text(number);
			}
		}



	});

});