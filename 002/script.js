import { loaded } from '../@dependencies/js/LoadEvents.js';
// import { createReadableStream } from './Stream.js';

await loaded;

// GRAPH

const graph = document.querySelector('#graph');

let nodes,
		transitionDuration = 500;

const enterData = selection => {
	return selection
		.append('div')
		.classed('node', true)
		.attr('stage', 'enter')
		.text(d => d)
		.style('opacity', 0)
		.transition(transitionDuration)
		.style('opacity', 1);
}

const updateData = selection => {
	return selection
		.attr('stage', 'update');
}

const exitData = selection => {
	return selection
		.attr('stage', 'exit')
		.transition(transitionDuration)
		.style('opacity', 0)
		.remove();
}

const interval = setInterval(() => {

	const chars = d3.shuffle("abcdefghijklmnopqrstuvwxyz".split(""))
		.slice(0, Math.floor(6 + Math.random() * 20))
		.sort();

	nodes = d3.select(graph)
		.selectAll('.node')
		.data(chars, d => d)
		.join(
			enter => enterData(enter),
			update => updateData(update),
			exit => exitData(exit)
		);

}, transitionDuration * 3);

const stop = document.querySelector('#stop-stream');

stop.onclick = evt => {
	clearInterval(interval);
}	


// STREAM

// const handleStreamData = data => {
// 	console.log(data);

// 	const xLength = data[0].length,
// 				yLength = data.length;

// 	graph.style.setProperty('--x', xLength);
// 	graph.style.setProperty('--y', yLength);

// 	const flat = data.flat();

// 	nodes = d3.select(graph)
// 		.selectAll('.node')
// 		.data(flat, (d, i) => `${i}-${d}`)
// 		.join(
// 			enter => enterData(enter),
// 			update => updateData(update),
// 			exit => exitData(exit)
// 		);

// }

// const stream = createReadableStream(),
// 			reader = stream.getReader();

// const handleStreamReader = stream => stream
// 	.then(readStream)
// 	.catch(err => console.log(err));

// const readStream = ({ done, value }) => {
// 	handleStreamData( value );
// 	if (!done) handleStreamReader( reader.read() );
// }

// handleStreamReader( reader.read() );

// const stop = document.querySelector('#stop-stream');

// stop.onclick = evt => {
// 	const reason = 'User has requested to stop stream';
// 	reader.releaseLock();
// 	stream.cancel(reason);
// }	

