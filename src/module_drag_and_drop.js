/**
 * Custom Quintus Module that marks the currenty mouse-overed sprite.
 *
 * Initialize after Q.setup() with Q.dragAndDrop().
 * 
 * @class Quintus.DragAndDrop
 */
Quintus.DragAndDrop = function(Q) {
	Q.dragAndDrop = function() {
		Q._objInFocus = null;

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
	
	Q.component("dragAndDrop", {
		added: function() {
			this.entity.on("drag", this, "drag");
			this.entity.on("touchEnd", this, "touchEnd");
			this.entity.on("step", this, "step");
		},
		drag: function(touch) {
			this.entity.p.dragging = true;
			this.entity.p.x = touch.origX + touch.dx;
			this.entity.p.y = touch.origY + touch.dy;
		},
		touchEnd: function(touch) {
			this.entity.p.dragging = false;
		},
		step: function(dt) {
			if (this.entity.p.over) {
				this.entity.p.opacity = 0.5;
			} else {
				this.entity.p.opacity = 1.0;
			};
		},
	});
};
