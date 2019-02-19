function lighting() {
	this.Pl; // em coordenadas de mundo
	this.PlView;
	this.Ia;
	this.Ka;
	this.Kd;
	this.Ks;
	this.Od;
	this.Il;
	this.n;
	this.imported = false;

	this.read = function() {

		var fileContent = document.querySelector('#content').value.split('\n'); // ler o objeto do input

		var count = 0;
		for (var i = 0; i < fileContent.length; i++) {

			var line = fileContent[i].trim();

			if (line != '') {
				line = line.split(' ');

				if (count == 0) {
					this.Pl = {x: line[0], y: line[1], z: line[2]};
				} else if (count == 1) {
					this.Ka = line;
				} else if (count == 2) {
					this.Ia = {r: line[0], g: line[1], b: line[2]};
				} else if (count == 3) {
					this.Kd = line;
				} else if (count == 4) {
					this.Od = {r: line[0], g: line[1], b: line[2]};
				} else if (count == 5) {
					this.Ks = line;
				} else if (count == 6) {
					this.Il = {r: line[0], g: line[1], b: line[2]};
				} else if (count == 7) {
					this.n = line;
				}

				count++;
			}

		}

		/*alert(
			this.Pl.x +', '+ this.Pl.y +', '+ this.Pl.z +'\n'+
			this.Ka +'\n'+
			this.Ia.r +', '+ this.Ia.g +', '+ this.Ia.b +'\n'+
			this.Kd +'\n'+
			this.Od.r +', '+ this.Od.g +', '+ this.Od.b +'\n'+
			this.Ks +'\n'+
			this.Il.r +', '+ this.Il.g +', '+ this.Il.b +'\n'+
			this.n
		);*/
		
		document.querySelector('#content').value = '';
		this.imported = true;
		alert('Objeto carregado');
	};

	this.load = function(event) {

		loadFile(event); // carrega o objeto e salva em um imput

		var fullFileUpload = setInterval(function() {
			if (document.querySelector('#content').value != '') {
				lighting.read();
				clearInterval(fullFileUpload);
			}
		}, 1);

	};

	this.colorPointPhong = function(N, V, L) {

		var diffused = true;
		var specular = true;

		if (dot(N, V) < 0) {
			N = {x: 0 - N.x, y: 0 - N.y, z: 0 - N.z};
		}


		var scalarNL = dot(N, L);
		var scalarRV = 0;

		if (scalarNL < 0) {
			diffused = false;
			specular = false;
		} else {
			var R = {x: (2*N.x*scalarNL) - L.x, y: (2*N.y*scalarNL) - L.y, z: (2*N.z*scalarNL) - L.z}; // R = 2N<N,L> - L
			R = normalize(R);

			scalarRV = dot(R, V);
			
			if (scalarRV < 0) {
				specular = false;
			}
		}

		var Phong =
		{
			r: (this.Ia.r * this.Ka) + (diffused ? (this.Kd * this.Od.r * scalarNL * this.Il.r) : 0) + (specular ? (this.Ks * Math.pow(scalarRV, this.n) * this.Il.r) : 0),
			g: (this.Ia.g * this.Ka) + (diffused ? (this.Kd * this.Od.g * scalarNL * this.Il.g) : 0) + (specular ? (this.Ks * Math.pow(scalarRV, this.n) * this.Il.g) : 0),
			b: (this.Ia.b * this.Ka) + (diffused ? (this.Kd * this.Od.b * scalarNL * this.Il.b) : 0) + (specular ? (this.Ks * Math.pow(scalarRV, this.n) * this.Il.b) : 0)
		}


		Phong = 
		{
			r: (Phong.r > 255 ? 255 : parseInt(Phong.r)),
			g: (Phong.g > 255 ? 255 : parseInt(Phong.g)),
			b: (Phong.b > 255 ? 255 : parseInt(Phong.b))
		};

		// alert(parseInt(Phong.r) +', '+ parseInt(Phong.g) +', '+ parseInt(Phong.b));

		return Phong;

	};

}