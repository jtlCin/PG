function camera() {
	this.C; // coordenadas de mundo
	this.N;
	this.V;
	this.U;
	this.d;
	this.hx;
	this.hy;
	this.width;
	this.height;
	this.imported = false;

	this.read = function() {

		var fileContent = document.querySelector('#content').value.split('\n'); // ler o objeto do input

		var count = 0;
		for (var i = 0; i < fileContent.length; i++) {

			var line = fileContent[i].trim();

			if (line != '') {
				
				line = line.split(' ');

				if (count == 0) {
					this.C = {x: line[0], y: line[1], z: line[2]};
				} else if (count == 1) {
					this.N = {x: line[0], y: line[1], z: line[2]};
				} else if (count == 2) {
					this.V = {x: line[0], y: line[1], z: line[2]};
				} else if (count == 3) {
					this.d = line[0];
					this.hx = line[1];
					this.hy = line[2];
				}
			
				count++;
			}

		}

		this.N = normalize(this.N);

		// V = V - pronj N (V)
		var proj = projection(this.V, this.N);
		this.V = {x: this.V.x - proj.x, y: this.V.y - proj.y, z: this.V.z - proj.z};
		this.V = normalize(this.V);

		this.U = cross(this.N, this.V);

		/*alert(
			this.C.x +', '+ this.C.y +', '+ this.C.z +'\n'+ 
			this.N.x +', '+ this.N.y +', '+ this.N.z +'\n'+
			this.V.x +', '+ this.V.y +', '+ this.V.z +'\n'+
			this.U.x +', '+ this.U.y +', '+ this.U.z +'\n'+
			this.d +'\n'+
			this.hx +'\n'+
			this.hy +'\n'+
			this.width +'\n'+
			this.height
		);*/

		document.querySelector('#content').value = '';
		this.imported = true;
		object.imported = false;
		alert('Objeto carregado');
	};

	this.load = function(event) {

		loadFile(event); // carrega o objeto e salva em um imput

		var fullFileUpload = setInterval(function() {
			if (document.querySelector('#content').value != '') {
				camera.read();
				clearInterval(fullFileUpload);
			}
		}, 1);

	};

	this.viewPoint = function(P) {

		P = {x: P.x - this.C.x, y: P.y - this.C.y, z: P.z - this.C.z};

		return {x: dot(this.U, P), y: dot(this.V, P), z: dot(this.N, P)};

	};

	this.ParameterizePoint = function(viewpoint) {

		return {x: (viewpoint.x/viewpoint.z)*(this.d/this.hx), y: (viewpoint.y/viewpoint.z)*(this.d/this.hy)};

	};

	this.screenPoint = function(parameterizedPoint) {
		return {x: parseInt((parameterizedPoint.x + 1)*(this.width/2)), y: parseInt((1 - parameterizedPoint.y)*(this.height/2))};
	};

}