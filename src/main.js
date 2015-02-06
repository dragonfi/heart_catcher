"use strict";

console.log("Starting game...");

var Q = Quintus({
		developement: true
	}).include(
		"Sprites, Scenes, Input, 2D, Touch, UI"
	).include("DragAndDrop, SpringConnection");

Q.debug = true;

window.onload = function() {
	Q.setup({
		maximize: true,
	}).touch(Q.SPRITE_ALL).dragAndDrop();
	Q.load(["heart1_004.png", "star3_004.png"], function() {
		Q.stageScene("hearts");
	});
};

Q.Sprite.extend("Heart", {
	init: function(p) {
		this._super(p, {
			asset: "heart1_004.png",
			x: Q.width / 3,
			y: Q.height / 3,
			points: Utils.mirrorx([
				[1, -10], [12, -18], [15, -18], [20, -15], [22, -8],
				[20, 0], [10, 12], [5, 15], [1, 18]
			])
		});
		this.add("2d");
		this.add("springConnection");
	},
});

Q.Sprite.extend("Star", {
	init: function(p) {
		this._super(p, {
			asset: "star3_004.png",
			x: Q.width / 2,
			y: Q.height / 2,
			points: Utils.mirrorx([
				[1, -28], [5, -23], [10, -13],
				[15, -13], [22, -12], [25, -11],
				[26, -8], [25, -4], [16, 5],
				[20, 15], [18, 21], [15, 23],
				[10, 23], [1, 18]
			])
		});
		this.add("dragAndDrop");
		this.add("defaultSpringFixture");
	},
});

Q.scene("hearts", function(stage) {
	stage.insert(new Q.Star);
	stage.insert(new Q.Heart);
	stage.insert(new Q.Heart({x: Q.width * 2 / 3, y: Q.height * 2 / 3}));
});


