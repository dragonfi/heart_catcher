var Utils = {
	mirrorx: function(seq) {
		var mirrored = seq.map(function(e){return [-e[0], e[1]]});
		return seq.concat(mirrored.reverse());
	},

};
