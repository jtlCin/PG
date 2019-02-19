var canvas = document.querySelector('canvas');
var ctx = canvas.getContext("2d");

var camera = new camera();
var object = new object();
var lighting = new lighting();
var zBuffer = new zBuffer();
var rasterization = new rasterization();
var rotation = new rotation();

var running = false;

function Drawn() {
	// Transformações de Modelagem, Iluminação, Transformações de Câmera, Recorte, Projeção, Rasterização e Visibilidade.
	/*
		1 - Carrega camera e calcula U
		2 - Calcula a posição de Luz em coordenadas de mundo para coordenadas de vista						podendo descartar o Pl original
		3 - Calcula a posição de cada ponto3D do objeto em coordenadas de mundo para coordenadas de vista	podendo já descartar os pontos em coordenadas de mundo
		4 - Calcula todas as normais do objeto
		5 - Converte todos pontos3D em pontos2D
		6 - Inicializar z-buffer com dimensoes [width][height] e +infinito em todas as posicoes
		7 - Calcular coordenadas baricêntricas (alfa, beta, gama) de P com relação aos vértices 2D
		8 - Multiplicar coordenadas baricentricas pelos vertices 3D originais obtendo P', que eh uma aproximacao pro ponto 3D:
		9 - Consulta no z-buffer se o ponto está dentro da tela e se ele é o mais próximo da tela
		10 - Calcular uma aproximação para a normal do ponto
		11 - calcula o vetor de vista e o de luz e normaliza N, L, V
		12 - calcula a cor do ponto
		12 - o pixel na tela
	*/

	if (camera.imported && object.imported && lighting.imported) {

		running = false;

		lighting.PlView = camera.viewPoint(lighting.Pl);

		/*for (var i = 0; i < object.points3DView.length; i++) {
			object.points3DView[i] = camera.viewPoint(object.points3D[i]);
		}*/

		// object.calculateNormals();

		for (var i = 0; i < object.points3D.length; i++) {
			object.points2D[i] = camera.screenPoint(camera.ParameterizePoint(object.points3DView[i]));
		}

		zBuffer.setBuffer(camera.width, camera.height);


		// Conversão por varredura
		// var drawnPoints = [];
		for (var i = 0; i < object.verticesTriangles.length; i++) {
			
			rasterization.drawTriangle(object.points2D[object.verticesTriangles[i].a], object.points2D[object.verticesTriangles[i].b], object.points2D[object.verticesTriangles[i].c]);

			for (var j = 0; j < rasterization.trianglePoints.length; j++) {

				var P = rasterization.trianglePoints[j];

				var baricentro = gauss(
					[
						[object.points2D[object.verticesTriangles[i].a].x, object.points2D[object.verticesTriangles[i].b].x, object.points2D[object.verticesTriangles[i].c].x],
						[object.points2D[object.verticesTriangles[i].a].y, object.points2D[object.verticesTriangles[i].b].y, object.points2D[object.verticesTriangles[i].c].y],
						[1, 1, 1]
					],
					[P.x, P.y, 1]
				);


				// alert(baricentro[0]+', '+baricentro[1]+', '+baricentro[2]);

				// P'
				var _P = {
					x: baricentro[0]*object.points3DView[object.verticesTriangles[i].a].x + baricentro[1]*object.points3DView[object.verticesTriangles[i].b].x + baricentro[2]*object.points3DView[object.verticesTriangles[i].c].x,
					y: baricentro[0]*object.points3DView[object.verticesTriangles[i].a].y + baricentro[1]*object.points3DView[object.verticesTriangles[i].b].y + baricentro[2]*object.points3DView[object.verticesTriangles[i].c].y,
					z: baricentro[0]*object.points3DView[object.verticesTriangles[i].a].z + baricentro[1]*object.points3DView[object.verticesTriangles[i].b].z + baricentro[2]*object.points3DView[object.verticesTriangles[i].c].z
				};


				if (zBuffer.checkBuffer(P, _P)) {

					// Variáveis para a iluminação
					var N = {
						x: baricentro[0]*object.normalsVertices[object.verticesTriangles[i].a].x + baricentro[1]*object.normalsVertices[object.verticesTriangles[i].b].x + baricentro[2]*object.normalsVertices[object.verticesTriangles[i].c].x,
						y: baricentro[0]*object.normalsVertices[object.verticesTriangles[i].a].y + baricentro[1]*object.normalsVertices[object.verticesTriangles[i].b].y + baricentro[2]*object.normalsVertices[object.verticesTriangles[i].c].y,
						z: baricentro[0]*object.normalsVertices[object.verticesTriangles[i].a].z + baricentro[1]*object.normalsVertices[object.verticesTriangles[i].b].z + baricentro[2]*object.normalsVertices[object.verticesTriangles[i].c].z
					};

					var V = {x: 0 - _P.x, y: 0 - _P.y, z: 0 - _P.z};

					var L = {x: lighting.PlView.x - _P.x, y: lighting.PlView.y - _P.y, z: lighting.PlView.z - _P.z};


					// normaliza V, N, R
					N = normalize(N);
					V = normalize(V);
					L = normalize(L);

					var color = lighting.colorPointPhong(N, V, L);

					// drawnPoints.push({x: P.x, y: P.y, r: color.r, g: color.g, b: color.b});
					zBuffer.frameBuffer[P.y][P.x] = {r: color.r, g: color.g, b: color.b};

				}
			}
		}

		// Printa os pontos na tela
		ctx.clearRect(0, 0, canvas.width, canvas.height); // limpa a tela
		for (var i = 0; i < zBuffer.height; i++) {
			for (var j = 0; j < zBuffer.width; j++) {
				if (zBuffer.buffer[i][j] != Number.MAX_VALUE) {
					ctx.beginPath();
					ctx.fillStyle = 'rgb('+zBuffer.frameBuffer[i][j].r+','+zBuffer.frameBuffer[i][j].g+','+zBuffer.frameBuffer[i][j].b+')';
					ctx.arc(j, i, 1, 0, 2 * Math.PI);
					// ctx.closePath();
					ctx.fill();
				}
			}
		}

		/*ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (var i = 0; i < drawnPoints.length; i++) {
			ctx.beginPath();
			ctx.fillStyle = 'rgb('+drawnPoints[i].r+','+drawnPoints[i].g+','+drawnPoints[i].b+')';
			ctx.arc(drawnPoints[i].x, drawnPoints[i].y, 1, 0, 2 * Math.PI);
			// ctx.closePath();
			ctx.fill();
		}*/

		running = true;

	}

}


(function(doc) {

// instancia o tamanho da tela
	camera.width = canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	camera.height = canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;


// Importa os arquivos
	doc.querySelector('input[name="object"]').onchange = function(event) {

		object.load(event);

		var fullFileUpload = setInterval(function() {
			if (object.imported) {
				Drawn();
				clearInterval(fullFileUpload);
			}
		}, 1);
	};

	doc.querySelector('input[name="lighting"]').onchange = function(event) {

		lighting.load(event);

		var fullFileUpload = setInterval(function() {
			if (lighting.imported) {
				Drawn();
				clearInterval(fullFileUpload);
			}
		}, 1);
	};

	doc.querySelector('input[name="camera"]').onchange = function(event) {

		camera.load(event);

		var fullFileUpload = setInterval(function() {
			if (camera.imported) {
				Drawn();
				clearInterval(fullFileUpload);
			}
		}, 1);
	};


// Rotaciona o objeto
	doc.querySelector('input[name="RotationX"]').onclick = function() {

		if (camera.imported && object.imported && lighting.imported && running) {
			if (doc.querySelector('input[name="angle"]').value != '') {
				rotation.angle = doc.querySelector('input[name="angle"]').value;
				rotation.RotationX();
				Drawn();
			} else {
				alert('Insira o ângulo');
			}
		} else {
			alert('Primeiro importe os objetos da cena');
		}

	};

	doc.querySelector('input[name="RotationXah"]').onclick = function() {

		if (camera.imported && object.imported && lighting.imported && running) {
			if (doc.querySelector('input[name="angle"]').value != '') {
				rotation.angle = doc.querySelector('input[name="angle"]').value;
				rotation.RotationXah();
				Drawn();
			} else {
				alert('Insira o ângulo');
			}
		} else {
			alert('Primeiro importe os objetos da cena');
		}

	};

	doc.querySelector('input[name="RotationY"]').onclick = function() {

		if (camera.imported && object.imported && lighting.imported && running) {
			if (doc.querySelector('input[name="angle"]').value != '') {
				rotation.angle = doc.querySelector('input[name="angle"]').value;
				rotation.RotationY();
				Drawn();
			} else {
				alert('Insira o ângulo');
			}
		} else {
			alert('Primeiro importe os objetos da cena');
		}

	};

	doc.querySelector('input[name="RotationYah"]').onclick = function() {

		if (camera.imported && object.imported && lighting.imported && running) {
			if (doc.querySelector('input[name="angle"]').value != '') {
				rotation.angle = doc.querySelector('input[name="angle"]').value;
				rotation.RotationYah();
				Drawn();
			} else {
				alert('Insira o ângulo');
			}
		} else {
			alert('Primeiro importe os objetos da cena');
		}

	};

	doc.querySelector('input[name="RotationZ"]').onclick = function() {

		if (camera.imported && object.imported && lighting.imported && running) {
			if (doc.querySelector('input[name="angle"]').value != '') {
				rotation.angle = doc.querySelector('input[name="angle"]').value;
				rotation.RotationZ();
				Drawn();
			} else {
				alert('Insira o ângulo');
			}
		} else {
			alert('Primeiro importe os objetos da cena');
		}

	};

	doc.querySelector('input[name="RotationZah"]').onclick = function() {

		if (camera.imported && object.imported && lighting.imported && running) {
			if (doc.querySelector('input[name="angle"]').value != '') {
				rotation.angle = doc.querySelector('input[name="angle"]').value;
				rotation.RotationZah();
				Drawn();
			} else {
				alert('Insira o ângulo');
			}
		} else {
			alert('Primeiro importe os objetos da cena');
		}

	};


// caso o tamanho da tela mude
	window.onresize = function() {
		
		camera.width = canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		camera.height = canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		
		Drawn();
		
	};


})(document);