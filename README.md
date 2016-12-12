# PG
2º Projeto de processamento gráfico [TEMA 13: Rotação em 3 eixos (4 alunos)].

Descrição do projeto:

Parte Geral: Implementar o método de visualização de objetos triangulados, através do algoritmo de conversão por varredura, com métodos de interpolação de Phong, com a visibilidade garantida pelo algoritmo do “z-buffer”.
Parte Específica: rotacionar o objeto em torno de 3 diferentes eixos. 

Descrição: O usuário, através de arquivos-texto ou interface gráfica, entra com dados do objeto (triangulado, com lista dos vértices e da conectividade, que determina os triângulos, de um arquivo-texto), atributos do objeto (ka, kd e ks, pontos flutuantes entre 0 e 1, n, ponto flutuante positivo e Od, tripla de pontos flutuantes entre 0 e 1,), atributos da cena (Ia, IL, triplas de ponto flutuante entre 0 e 255, PL, tripla de ponto flutuante) e os atributos da câmera virtual (C, N e V, triplas de pontos flutuantes, d, hx, e hy, pontos flutuantes positivos). O seu sistema deve preparar a câmera, ortogonalizando V  e gerando U, e depois os normalizando, fazer a mudança de coordenadas para o sistema de vista de todos os vértices do objeto e da posição da fonte de luz PL, gerar as normais dos triângulos e gerar as normais dos vértices (como recomendado em sala de aula). Para cada triângulo, calculam-se as projeções dos seus vértices e inicia-se assim a sua conversão por varredura. Para cada pixel (x, yscan), calculam-se suas coordenadas baricêntricas com relação aos vértices projetados, e multiplicam-se essas coordenadas pelos correspondentes vértices do triângulo 3D original para se obter uma aproximação para o ponto 3D original correspondente ao pixel atual. Após uma consulta ao z-buffer, se for o caso, calcula-se uma aproximação para a normal do ponto utilizando-se mesmas coordenadas baricêntricas multiplicadas pelas normais dos respectivos vértices originais. Calculam-se também os demais vetores (L, V e R) e os substitui na equação do modelo de iluminação de Phong produzindo a cor do pixel atual. Na interface o sistema deverá ter três botões para se executar uma rotação em torno de cada um dos três eixos: eixo OZ da câmera, eixo paralelo a OX, passando pelo centroide do objeto, e eixo paralelo a OY, passando pelo centroide do objeto. Deverá haver um campo para se indicar o desejado ângulo de rotação. Após o usuário apertar um dos botões, o sistema deverá executar a correspondente rotação afim em coordenadas de vista de todos os pontos do objeto e fazer a sua visualização de novo, como descrita acima.




A ideia desse projeto é não ser reprovado nessa cadeira ;-P

Se tirarmos 5 nele, então só precisariamos assisnar nossos nomes na ata da prova e irmos para casa dormir felizes. :D




Para o desenvouvimento desse projeto iremos usar o falcom C++ como uma IDE de suporte, pois ele já vem com o necessário instalado:

	https://sourceforge.net/projects/falconcpp/

Aconselho a instalarem o Git para desktop para auxiliar a sua integração e sicronização com o repositório:

	https://desktop.github.com/

Iremos utilizar principalmente as bibliotecas:

	GLFW: Serve para criar o ambiente para o OpenGL.
	
		http://www.glfw.org/docs/latest/quick.html
		https://www.youtube.com/watch?v=L2aiuDDFNIk
		https://www.youtube.com/watch?v=2L_icdhlYGU&list=PLKMRBwuMXxOoFlCWZfu9hheZ7ZSC2IEr3
		

	OpenGL: Serve para printar o ponto.
	
		https://drive.google.com/file/d/0Bw0tUCMUoMKWMm9zd3RtMGlkbkk/view
		


Ajuda do monitor com os passos básicos de todos os projetos:

	https://lookaside.fbsbx.com/file/P2_parte_geral.txt?token=AWwCUrBbKWU5AhKwChkT0j9BRGIgadCgCboGIifA0RPE47NehnpTmJrdXhPM3pOGaSx5IAAxmC2oEo4hQxmz3K9h8a6j5e6fc7u_wNm6HcXCBHpiU4eTh1kvknZ89HMIS0MGsh9bUu6hoRGDX1C8xvFZ
	http://www.cin.ufpe.br/~marcelow/Marcelow/programacao_cg_files/review-pipeline.pdf
	http://www.cin.ufpe.br/~marcelow/Marcelow/programacao_cg_files/conceitosiluminacao.pdf

Arquivos testes de entradas para os projetos:

	https://drive.google.com/drive/folders/0BzvHmB9OzLYMbTlkNXJrZ3hxMXc
	


O que teremos que fazer: https://drive.google.com/drive/folders/0Bw3ECeoqnXDARkt4ejROUEdYZWc?usp=sharing

1º) Carrega o objeto

2º) Carregar dados da sena [Fonte de Luz, Posição de luz, atributos do objeto (Ka, Kd, Ks, Od, n)]

3º) Carregar dados da Câmera (C, N e V), (d, hx, hy)

4º) Normaliza os dois U = N x V

5º) Mudar as cordenadas de todos os pontos, incluindo a posição da fonte

6º) Calcula as normas nos triângulos

7º) Inicializa as normais dos pontos com (0, 0, 0). Soma as normais dos triângulos às normais dos seus vértices

8º) Normaliza as normais. :D

9º) Varredura:

	- Inicializa o z-buffer
	
	- Para cada triangulo (P1, P2, P3)
	
