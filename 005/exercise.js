// SCATTERPLOT

function scatterData (amount = 10) {
	
	const data = [],
				bounds = { 
					type: [ 'A', 'B', 'C' ], 
					x: 1000, 
					y: 1000, 
					z: 1000, 
					value: 50 
				};
	
	for (let i = 0; i < amount; i++) {

		const type = bounds.type[ Math.floor( Math.random() * bounds.type.length ) ],
					x = Math.floor( Math.random() * bounds.x ),
					y = Math.floor( Math.random() * bounds.y ),
					z = Math.floor( Math.random() * bounds.z ),
					value = Math.floor( Math.random() * bounds.value );

		data.push({ type, x, y, z, value });

	}

	return data;

}

console.log( scatterData(100) );