function rotation() {
	this.angle;

	this.trlation = function(P, Tx, Ty, Tz) {
		return {x: P.x + Tx, y: P.y + Ty, z: P.z + Tz};
	};

	this.RotationX = function() {

		for (var i = 0; i < object.points3DView.length; i++) {

			object.points3DView[i] = this.trlation(object.points3DView[i], 0 - object.centroide.x, 0 - object.centroide.y, 0 - object.centroide.z);

			object.points3DView[i] = {
				x: object.points3DView[i].x,
				y: object.points3DView[i].y * Math.cos(this.angle*Math.PI/180) + object.points3DView[i].z * Math.sin(this.angle*Math.PI/180),
				z: object.points3DView[i].y * -Math.sin(this.angle*Math.PI/180) + object.points3DView[i].z * Math.cos(this.angle*Math.PI/180)
			};

			object.points3DView[i] = this.trlation(object.points3DView[i], object.centroide.x, object.centroide.y, object.centroide.z);

		}

	};

	this.RotationXah = function() {

		for (var i = 0; i < object.points3DView.length; i++) {

			object.points3DView[i] = this.trlation(object.points3DView[i], 0 - object.centroide.x, 0 - object.centroide.y, 0 - object.centroide.z);

			object.points3DView[i] = {
				x: object.points3DView[i].x,
				y: object.points3DView[i].y * Math.cos(this.angle*Math.PI/180) + object.points3DView[i].z * -Math.sin(this.angle*Math.PI/180),
				z: object.points3DView[i].y * Math.sin(this.angle*Math.PI/180) + object.points3DView[i].z * Math.cos(this.angle*Math.PI/180)
			};

			object.points3DView[i] = this.trlation(object.points3DView[i], object.centroide.x, object.centroide.y, object.centroide.z);

		}
		
	};

	this.RotationY = function() {

		for (var i = 0; i < object.points3DView.length; i++) {

			object.points3DView[i] = this.trlation(object.points3DView[i], 0 - object.centroide.x, 0 - object.centroide.y, 0 - object.centroide.z);

			object.points3DView[i] = {
				x: object.points3DView[i].x * Math.cos(this.angle*Math.PI/180) + object.points3DView[i].z * Math.sin(this.angle*Math.PI/180),
				y: object.points3DView[i].y,
				z: object.points3DView[i].x * -Math.sin(this.angle*Math.PI/180) + object.points3DView[i].z * Math.cos(this.angle*Math.PI/180)
			};

			object.points3DView[i] = this.trlation(object.points3DView[i], object.centroide.x, object.centroide.y, object.centroide.z);

		}

	};

	this.RotationYah = function() {

		for (var i = 0; i < object.points3DView.length; i++) {

			object.points3DView[i] = this.trlation(object.points3DView[i], 0 - object.centroide.x, 0 - object.centroide.y, 0 - object.centroide.z);

			object.points3DView[i] = {
				x: object.points3DView[i].x * Math.cos(this.angle*Math.PI/180) + object.points3DView[i].z * -Math.sin(this.angle*Math.PI/180),
				y: object.points3DView[i].y,
				z: object.points3DView[i].x * Math.sin(this.angle*Math.PI/180) + object.points3DView[i].z * Math.cos(this.angle*Math.PI/180)
			};

			object.points3DView[i] = this.trlation(object.points3DView[i], object.centroide.x, object.centroide.y, object.centroide.z);

		}
		
	};

	this.RotationZ = function() {

		for (var i = 0; i < object.points3DView.length; i++) {

			object.points3DView[i] = this.trlation(object.points3DView[i], 0 - object.centroide.x, 0 - object.centroide.y, 0 - object.centroide.z);

			object.points3DView[i] = {
				x: object.points3DView[i].x * Math.cos(this.angle*Math.PI/180) + object.points3DView[i].y * Math.sin(this.angle*Math.PI/180),
				y: object.points3DView[i].x * -Math.sin(this.angle*Math.PI/180) + object.points3DView[i].y * Math.cos(this.angle*Math.PI/180),
				z: object.points3DView[i].z
			};

			object.points3DView[i] = this.trlation(object.points3DView[i], object.centroide.x, object.centroide.y, object.centroide.z);

		}

	};

	this.RotationZah = function() {

		for (var i = 0; i < object.points3DView.length; i++) {

			object.points3DView[i] = this.trlation(object.points3DView[i], 0 - object.centroide.x, 0 - object.centroide.y, 0 - object.centroide.z);

			object.points3DView[i] = {
				x: object.points3DView[i].x * Math.cos(this.angle*Math.PI/180) + object.points3DView[i].y * -Math.sin(this.angle*Math.PI/180),
				y: object.points3DView[i].x * Math.sin(this.angle*Math.PI/180) + object.points3DView[i].y * Math.cos(this.angle*Math.PI/180),
				z: object.points3DView[i].z
			};

			object.points3DView[i] = this.trlation(object.points3DView[i], object.centroide.x, object.centroide.y, object.centroide.z);

		}
		
	};

}