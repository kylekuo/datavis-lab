const randomData = (xLength, yLength) => {

	let D1 = [];

	for (let x = 0; x < xLength; x++) {

		let D2 = [];

		for (let y = 0; y < yLength; y++) {

			let data = Math.floor( Math.random() * 10 );

			D2.push(data);

		}
		
		D1.push(D2);

	}

	return D1;

}

let streamInterval,
		streamIntervalTimeout = 1000;

export const createReadableStream = () => new ReadableStream({

	start (controller) {

		streamInterval = setInterval(() => {
			let string = randomData(10, 10);
			controller.enqueue(string);
		}, streamIntervalTimeout);

	},

	cancel () {
		clearInterval(streamInterval);
	}

});
