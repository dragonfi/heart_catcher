"use strict";

console.log("Starting game...");

var Q = Quintus({
		developement: true
	}).include("Sprites, Scenes, Input, 2D, Touch, UI");

Q.debug = true;
Q.debugDraw = true;

window.onload = function() {
	Q.setup({
		maximize: true,
		
	}).touch(Q.SPRITE_ALL);
	Q.load(["heart1_004.png", "star3_004.png"], function() {
		Q.stageScene("hearts");
	});
	Utils.add_mouse_over_indicator();
};

Q.Sprite.extend("Heart", {
	init: function(p) {
		this._super(p, {
			asset: "heart1_004.png",
			x: Q.width / 3,
			y: Q.height / 3,
			speed: 100,
			jumpSpeed: -100,
			points: Utils.mirrorx([
				[1, -10], [12, -18], [15, -18], [20, -15], [22, -8],
				[20, 0], [10, 12], [5, 15], [1, 18]
			])
		});
		this.add("2d");
	},
	step: function(dt) {
		var spring = 8;
		var fixture = Q("Star").first();
		this.p.vy -= (this.p.y - fixture.p.y) * spring * dt;
		this.p.vx -= (this.p.x - fixture.p.x) * spring * dt;
		this.p.vy *= 0.99;
		this.p.vx *= 0.99;
	},
});

Q.Sprite.extend("Star", {
	init: function(p) {
		this._super(p, {
			asset: "star3_004.png",
			x: Q.width / 2,
			y: Q.width / 2,
			points: Utils.mirrorx([
				[1, -28], [5, -23], [10, -13],
				[15, -13], [22, -12], [25, -11],
				[26, -8], [25, -4], [16, 5],
				[20, 15], [18, 21], [15, 23],
				[10, 23], [1, 18]
			])
		});
		this.on("drag");
		this.on("touchEnd");
	},
	drag: function(touch) {
		this.p.dragging = true;
		this.p.x = touch.origX + touch.dx;
		this.p.y = touch.origY + touch.dy;
	},
	touchEnd: function(touch) {
		this.p.dragging = false;
	},
	step: function(dt) {
		if (this.p.over) {
			this.p.opacity = 0.5;
		} else {
			this.p.opacity = 1.0;
		};
	},
});

Q.scene("hearts", function(stage) {
	stage.insert(new Q.Heart);
	stage.insert(new Q.Heart({x: Q.width * 2 / 3, y: Q.height * 2 / 3}));
	stage.insert(new Q.Star);
});

var Utils = {
	mirrorx: function(seq) {
		var mirrored = seq.map(function(e){return [-e[0], e[1]]});
		return seq.concat(mirrored.reverse());
	},
	add_mouse_over_indicator: function() {
		Q.el.addEventListener('mousemove',function(e) {
			var x = e.offsetX || e.layerX;
			var y = e.offsetY || e.layerY;
	
			var stage = Q.stage();
	
			var stageX = Q.canvasToStageX(x, stage);
			var stageY = Q.canvasToStageY(y, stage);
	
			var obj = stage.locate(stageX, stageY);
	
			if (Q._objInFocus) {Q._objInFocus.p.over = false};
			if (obj) {
				Q._objInFocus = obj;
				obj.p.over = true;
			};
		});
	},
};
