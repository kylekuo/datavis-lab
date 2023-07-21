import { loaded } from '../@dependencies/js/LoadEvents.js';
await loaded();

// GRAPH

const graph = document.querySelector('#graph'),
			yearlyData = {};

fetch('./data-003.json')
	.then( function ( response ) { 
		return response.json() 
	})
	.then( function ( data ) {

		const scale = d3.scaleLinear()
			.domain([ 0, 1371220000 ])
			.range([ 0, 500 ]);

		for (const country of data) {
			for (const yearData of country.population) {
				if ( !yearlyData[ yearData['year'] ] ) yearlyData[ yearData['year'] ] = {}
				yearlyData[ yearData['year'] ][ country['name'] ] = yearData['count'];
			}
		}

		for (const [year, data] of Object.entries(yearlyData)) {

			const yearElement = d3.select(graph)
				.append('div')
				.classed('year', true);

			const yearLabel = yearElement
				.append('div')
				.classed('year-label', true)
				.text(year);

			const yearDataWrap = yearElement
				.append('div')
				.classed('year-data', true);

			for (const [country, count] of Object.entries(data)) {

				const countryData = yearDataWrap
					.append('div')
					.classed('country-data', true)
					.style('--count', count)
					.style('--scaled-count', scale( count ));

				const countryLabel = countryData
					.append('div')
					.classed('country-label', true)
					.text(country);

				const countryCount = countryData
					.append('div')
					.classed('country-count', true)
					.style('background', () => {
						switch (country) {
							case 'Brasil': return 'green';
							case 'Estados Unidos': return 'blue';
							case 'China': return 'red';
						}
					})
					.text(count);
			}

		}

	});