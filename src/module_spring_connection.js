/**
 * Custom Quintus Module for simulating a spring connection.
 * 
 * @class Quintus.SpringConnection
 */
Quintus.SpringConnection = function(Q) {
	Q.component("defaultSpringFixture", {});
	Q.component("springConnection", {
		defaults: {
			spring_stiffness: 10,
			connection_to: null,
		},
		added: function() {
			var e = this.entity;
			Q._defaults(e.p, this.defaults);
			e.p.connection_to = 
				e.p.connection_to || Q(".defaultSpringFixture").first();
			this.entity.on("step", this, "step");
		},
		step: function(dt) {
			var e = this.entity;
			var other = e.p.connection_to;
			
			if (!other) {return;};
			
			e.p.vy -= (e.p.y - other.p.y) * e.p.spring_stiffness * dt;
			e.p.vx -= (e.p.x - other.p.x) * e.p.spring_stiffness * dt;
			e.p.vy *= 0.99;
			e.p.vx *= 0.99;
		},
	});
 };
