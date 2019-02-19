function zBuffer() {
	this.width;
	this.height;
	this.buffer;
	this.frameBuffer;
	
	this.setBuffer = function(width, height) {

		// Limpa e inicia os arrays
		this.buffer = new Array(height);
		this.frameBuffer = new Array(height);

		for (var i = 0; i < width; i++) {
			this.buffer[i] = new Array(width);
			this.frameBuffer[i] = new Array(width);
		}


		// inicia os buffer com a quantidade de pixel da tela e com o maior numero de inteiro positivo em todas as posições
		var infinity = [];
		var color = [];
		for (var i = 0; i < height; i++) {
			for (var j = 0; j < width; j++) {
				this.buffer[i][j] = Number.MAX_VALUE;
				this.frameBuffer[i][j] = {r: 255, g: 255, b: 255};
			}
		}

		this.width = width;
		this.height = height;
	}

	this.checkBuffer = function(P, _P) {

		if ((P.x >= 0 && P.x < this.width) && (P.y >= 0 && P.y < this.height)) { // checa se o ponto não está fora da tela
			if (_P.z < this.buffer[P.y][P.x]) { // verifica se o ponto é o mais proximo de todos para o mesmo ponto da tela
				this.buffer[P.y][P.x] = _P.z;
				return true;
			}
		}

		return false;

	};

}
