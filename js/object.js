function object() {
	this.points3D;
	this.points3DView;
	this.points2D;
	this.verticesTriangles;
	this.normalsTriangles;
	this.normalsVertices;
	this.centroide;
	this.imported = false;

	this.read = function() {

		// Limpa e inicia os arrays
		this.centroide = {x: 0, y: 0, z: 0};
		this.points3D = [];
		this.points3DView = [];
		this.points2D = [];
		this.verticesTriangles = [];
		this.normalsTriangles = [];
		this.normalsVertices = [];


		var fileContent = document.querySelector('#content').value.split('\n'); // ler o objeto do input

		var count = fileContent[0].split(' ')[0], numPoints = count;
		for (var i = 1; i < fileContent.length; i++) {

			var line = fileContent[i].trim();

			if (line != '') {
				line = line.split(' ');

				if (count) {

					this.points3D.push({x: line[0], y: line[1], z: line[2]});
					this.points2D.push({x: 0, y: 0});
					this.points3DView.push({x: 0, y: 0, z: 0});
					this.normalsVertices.push({x: 0, y: 0, z: 0}); // inicializa as normais de z com zero em todas as coordenadas

					count--;
				} else {

					this.verticesTriangles.push({a: line[0]-1, b: line[1]-1, c: line[2]-1}); // estou subtraindo 1 pq o array inicia em 0
					this.normalsTriangles.push({x: 0, y: 0, z: 0});
				}

			}

		}


		var maxX = Number.MIN_VALUE, minX = Number.MAX_VALUE, maxY = Number.MIN_VALUE, minY = Number.MAX_VALUE, maxZ = Number.MIN_VALUE, minZ = Number.MAX_VALUE;
		for (var i = 0; i < object.points3DView.length; i++) {
			
			object.points3DView[i] = camera.viewPoint(object.points3D[i]);

			maxX = maxX < object.points3DView[i].x ? object.points3DView[i].x : maxX;
			minX = minX > object.points3DView[i].x ? object.points3DView[i].x : minX;
			maxY = maxY < object.points3DView[i].y ? object.points3DView[i].y : maxY;
			minY = minY > object.points3DView[i].y ? object.points3DView[i].y : minY;
			maxZ = maxZ < object.points3DView[i].z ? object.points3DView[i].z : maxZ;
			minZ = minZ > object.points3DView[i].z ? object.points3DView[i].z : minZ;


			// this.centroide = {x: this.centroide.x + this.points3DView.x, y: this.centroide.y + this.points3DView.y, z: this.centroide.z + this.points3DView.z};
		}
		this.centroide = {x: ((maxX - minX)/2) + minX, y: ((maxY - minY)/2) + minY, z: ((maxZ - minZ)/2) + minZ};


		// this.centroide = {x: this.centroide.x / numPoints, y: this.centroide.y / numPoints, z: this.centroide.z / numPoints};

		object.calculateNormals();

		/*alert(
			this.points3D[0].x +', '+ this.points3D[0].y +', '+ this.points3D[0].z +'\n'+
			this.points3D[this.points3D.length-1].x +', '+ this.points3D[this.points3D.length-1].y +', '+ this.points3D[this.points3D.length-1].z +'\n'+
			this.verticesTriangles[0].a +', '+ this.verticesTriangles[0].b +', '+ this.verticesTriangles[0].c +'\n'+
			this.verticesTriangles[this.verticesTriangles.length-1].a +', '+ this.verticesTriangles[this.verticesTriangles.length-1].b +', '+ this.verticesTriangles[this.verticesTriangles.length-1].c
		);*/

		document.querySelector('#content').value = '';
		this.imported = true;
		// camera.imported = false;
		alert('Objeto carregado');
	};

	this.load = function(event) {

		loadFile(event); // carrega o objeto e salva em um imput

		var fullFileUpload = setInterval(function() {
			if (document.querySelector('#content').value != '') {
				object.read();
				clearInterval(fullFileUpload);
			}
		}, 1);

	};

	this.calculateNormals = function() {
		

		// Calculo das normais dos triangulos
		for (var i = 0; i < this.verticesTriangles.length; i++) {
			
			var normalTriangle = {
				v1: {
					x: this.points3DView[this.verticesTriangles[i].b].x - this.points3DView[this.verticesTriangles[i].a].x,
					y: this.points3DView[this.verticesTriangles[i].b].y - this.points3DView[this.verticesTriangles[i].a].y,
					z: this.points3DView[this.verticesTriangles[i].b].z - this.points3DView[this.verticesTriangles[i].a].z
				},
				v2: {
					x: this.points3DView[this.verticesTriangles[i].c].x - this.points3DView[this.verticesTriangles[i].a].x,
					y: this.points3DView[this.verticesTriangles[i].c].y - this.points3DView[this.verticesTriangles[i].a].y,
					z: this.points3DView[this.verticesTriangles[i].c].z - this.points3DView[this.verticesTriangles[i].a].z
				}
			};

			normalTriangle = cross(normalTriangle.v1, normalTriangle.v2);
			normalTriangle = normalize(normalTriangle);
			this.normalsTriangles[i] = normalTriangle;

		}


		// Somatório das normais de cada triângulo aos seus vértices
		for (var i = 0; i < this.verticesTriangles.length; i++) {

			this.normalsVertices[this.verticesTriangles[i].a] = {
				x: this.normalsVertices[this.verticesTriangles[i].a].x + this.normalsTriangles[i].x,
				y: this.normalsVertices[this.verticesTriangles[i].a].y + this.normalsTriangles[i].y,
				z: this.normalsVertices[this.verticesTriangles[i].a].z + this.normalsTriangles[i].z
			};

			this.normalsVertices[this.verticesTriangles[i].b] = {
				x: this.normalsVertices[this.verticesTriangles[i].b].x + this.normalsTriangles[i].x,
				y: this.normalsVertices[this.verticesTriangles[i].b].y + this.normalsTriangles[i].y,
				z: this.normalsVertices[this.verticesTriangles[i].b].z + this.normalsTriangles[i].z
			};

			this.normalsVertices[this.verticesTriangles[i].c] = {
				x: this.normalsVertices[this.verticesTriangles[i].c].x + this.normalsTriangles[i].x,
				y: this.normalsVertices[this.verticesTriangles[i].c].y + this.normalsTriangles[i].y,
				z: this.normalsVertices[this.verticesTriangles[i].c].z + this.normalsTriangles[i].z
			};

		}


		for (var i = 0; i < this.normalsVertices.length; i++) {
			this.normalsVertices[i] = normalize(this.normalsVertices[i]);
		}

		/*alert(
			this.points3D.length+'\n'+
			this.points3DView.length+'\n'+
			this.points2D.length+'\n'+
			this.normalsVertices.length+'\n-----------\n'+
			this.verticesTriangles.length+'\n'+
			this.normalsTriangles.length
		);*/

	};

}