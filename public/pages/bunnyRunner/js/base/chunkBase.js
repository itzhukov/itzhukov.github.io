let chunks = [
	{ // 0
		enter: [],
		exits: [1],
		skin: 'chunk__0'
	},
	{ // 1
		enter: [3],
		exits: [1],
		skin: 'chunk__1'
	},
	{ // 2
		enter: [3],
		exits: [0, 2],
		skin: 'chunk__2'
	},
	{ // 3
		enter: [3],
		exits: [0, 1, 2],
		skin: 'chunk__3'
	},
	{ // 4
		enter: [0],
		exits: [2],
		skin: 'chunk__4'
	},
	{ // 5
		enter: [2],
		exits: [0],
		skin: 'chunk__5'
	},
	{ // 6
		enter: [0],
		exits: [1, 2],
		skin: 'chunk__6'
	},
	{ // 7
		enter: [2],
		exits: [0, 1],
		skin: 'chunk__7'
	},
	{ // 8
		enter: [3],
		exits: [1, 2],
		skin: 'chunk__8'
	},
	{ // 9
		enter: [3],
		exits: [0, 1],
		skin: 'chunk__9'
	},
	{ // 10
		enter: [2],
		exits: [1],
		skin: 'chunk__10'
	},
	{ // 11
		enter: [0],
		exits: [1],
		skin: 'chunk__11'
	},
	{ // 12
		enter: [3],
		exits: [2],
		skin: 'chunk__12'
	},
	{ // 13
		enter: [3],
		exits: [0],
		skin: 'chunk__13'
	},
];

let chunksRel = [
	[], // 0
	[], // 1
	[], // 2
];

chunks.map( (chunk, x) => {
	let enter = chunk.enter;

	if (enter.length){
		if ( !!~enter.indexOf(2) ){
			chunksRel[0].push(x);
		}

		if ( !!~enter.indexOf(3) ){
			chunksRel[1].push(x);
		}

		if ( !!~enter.indexOf(0) ){
			chunksRel[2].push(x);
		}
	}
});

// console.log('Вход: 0', ' Выходы: ', chunksRel[0]);
// console.log('Вход: 1', ' Выходы: ', chunksRel[1]);
// console.log('Вход: 2', ' Выходы: ', chunksRel[2]);

export default {
	chunks,
	chunksRel
};