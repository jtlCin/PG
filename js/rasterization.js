function rasterization() {
	this.trianglePoints;

	this.scanLine = function(X1, X2, Y) {

		if (X1 > X2) {
			var temp = X2;
			X2 = X1;
			X1 = temp;
		}

		for (var X = X1; X <= X2; X++) {
			this.trianglePoints.push({x: X, y: Y});
		}
	};

	this.fillBottomFlatTriangle = function(v1, v2, v3) {
		var invslope1 = (v2.x - v1.x) / (v2.y - v1.y);
		var invslope2 = (v3.x - v1.x) / (v3.y - v1.y);

		var curx1 = v1.x;
		var curx2 = v1.x;

		for (var scanlineY = v1.y; scanlineY <= v2.y; scanlineY++) {
			this.scanLine(parseInt(curx1), parseInt(curx2), scanlineY);
			curx1 += invslope1;
			curx2 += invslope2;
		}
	};

	this.fillTopFlatTriangle = function(v1, v2, v3) {
		var invslope1 = (v3.x - v1.x) / (v3.y - v1.y);
		var invslope2 = (v3.x - v2.x) / (v3.y - v2.y);

		var curx1 = v3.x;
		var curx2 = v3.x;

		for (var scanlineY = v3.y; scanlineY > v1.y; scanlineY--) {
			this.scanLine(parseInt(curx1), parseInt(curx2), scanlineY);
			curx1 -= invslope1;
			curx2 -= invslope2;
		}
	};

	this.drawTriangle = function(v1, v2, v3) {
		/* at first sort the three vertices by y-coordinate ascending so v1 is the topmost vertice */

		this.trianglePoints = [];

		// sort v1.y <= v2.y <= v3.y
		var v = insertionSort([v1, v2, v3]);

		if (v[1].y == v[2].y) { /* check for trivial case of bottom-flat triangle */
			this.fillBottomFlatTriangle(v[0], v[1], v[2]);
		} else if (v[0].y == v[1].y) { /* check for trivial case of top-flat triangle */
			this.fillTopFlatTriangle(v[0], v[1], v[2]);
		} else { /* general case - split the triangle in a topflat and bottom-flat one */
			var v4 = {x: parseInt(v[0].x + (parseFloat(v[1].y - v[0].y) / parseFloat(v[2].y - v[0].y)) * (v[2].x - v[0].x)), y: v[1].y};
			this.fillBottomFlatTriangle(v[0], v[1], v4);
			this.fillTopFlatTriangle(v[1], v4, v[2]);
		}

	};

}