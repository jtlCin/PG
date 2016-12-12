# PG
2� Projeto de processamento gr�fico [TEMA 13: Rota��o em 3 eixos (4 alunos)].

Descri��o do projeto:
Parte Geral: Implementar o m�todo de visualiza��o de objetos triangulados, atrav�s do algoritmo de convers�o por varredura, com m�todos de interpola��o de Phong, com a visibilidade garantida pelo algoritmo do �z-buffer�.
Parte Espec�fica: rotacionar o objeto em torno de 3 diferentes eixos. 

Descri��o: O usu�rio, atrav�s de arquivos-texto ou interface gr�fica, entra com dados do objeto (triangulado, com lista dos v�rtices e da conectividade, que determina os tri�ngulos, de um arquivo-texto), atributos do objeto (ka, kd e ks, pontos flutuantes entre 0 e 1, n, ponto flutuante positivo e Od, tripla de pontos flutuantes entre 0 e 1,), atributos da cena (Ia, IL, triplas de ponto flutuante entre 0 e 255, PL, tripla de ponto flutuante) e os atributos da c�mera virtual (C, N e V, triplas de pontos flutuantes, d, hx, e hy, pontos flutuantes positivos). O seu sistema deve preparar a c�mera, ortogonalizando V  e gerando U, e depois os normalizando, fazer a mudan�a de coordenadas para o sistema de vista de todos os v�rtices do objeto e da posi��o da fonte de luz PL, gerar as normais dos tri�ngulos e gerar as normais dos v�rtices (como recomendado em sala de aula). Para cada tri�ngulo, calculam-se as proje��es dos seus v�rtices e inicia-se assim a sua convers�o por varredura. Para cada pixel (x, yscan), calculam-se suas coordenadas baric�ntricas com rela��o aos v�rtices projetados, e multiplicam-se essas coordenadas pelos correspondentes v�rtices do tri�ngulo 3D original para se obter uma aproxima��o para o ponto 3D original correspondente ao pixel atual. Ap�s uma consulta ao z-buffer, se for o caso, calcula-se uma aproxima��o para a normal do ponto utilizando-se mesmas coordenadas baric�ntricas multiplicadas pelas normais dos respectivos v�rtices originais. Calculam-se tamb�m os demais vetores (L, V e R) e os substitui na equa��o do modelo de ilumina��o de Phong produzindo a cor do pixel atual. Na interface o sistema dever� ter tr�s bot�es para se executar uma rota��o em torno de cada um dos tr�s eixos: eixo OZ da c�mera, eixo paralelo a OX, passando pelo centroide do objeto, e eixo paralelo a OY, passando pelo centroide do objeto. Dever� haver um campo para se indicar o desejado �ngulo de rota��o. Ap�s o usu�rio apertar um dos bot�es, o sistema dever� executar a correspondente rota��o afim em coordenadas de vista de todos os pontos do objeto e fazer a sua visualiza��o de novo, como descrita acima.


A ideia desse projeto � n�o ser reprovado nessa cadeira ;-P
Se tirarmos 5 nele, ent�o s� precisariamos assisnar nossos nomes na ata da prova e irmos para casa dormir felizes. :D

Para o desenvouvimento desse projeto iremos usar o falcom C++ como uma IDE de suporte, pois ele j� vem com o necess�rio instalado:
	https://sourceforge.net/projects/falconcpp/

Aconselho a instalarem o Git para desktop para auxiliar a sua integra��o e sicroniza��o com o reposit�rio:
	https://desktop.github.com/

Iremos utilizar principalmente as bibliotecas:
	GLFW: Serve para criar o ambiente para o OpenGL.
		http://www.glfw.org/docs/latest/quick.html
		https://www.youtube.com/watch?v=2L_icdhlYGU&list=PLKMRBwuMXxOoFlCWZfu9hheZ7ZSC2IEr3

	OpenGL: Serve para printar o ponto.
		https://drive.google.com/file/d/0Bw0tUCMUoMKWMm9zd3RtMGlkbkk/view


Ajuda do monitor com os passos b�sicos de todos os projetos:
	https://lookaside.fbsbx.com/file/P2_parte_geral.txt?token=AWwCUrBbKWU5AhKwChkT0j9BRGIgadCgCboGIifA0RPE47NehnpTmJrdXhPM3pOGaSx5IAAxmC2oEo4hQxmz3K9h8a6j5e6fc7u_wNm6HcXCBHpiU4eTh1kvknZ89HMIS0MGsh9bUu6hoRGDX1C8xvFZ

Arquivos testes de entradas para os projetos:
	https://drive.google.com/drive/folders/0BzvHmB9OzLYMbTlkNXJrZ3hxMXc


O que teremos que fazer: https://drive.google.com/drive/folders/0Bw3ECeoqnXDARkt4ejROUEdYZWc?usp=sharing
1�) Carrega o objeto
2�) Carregar dados da sena [Fonte de Luz, Posi��o de luz, atributos do objeto (Ka, Kd, Ks, Od, n)]
3�) Carregar dados da C�mera (C, N e V), (d, hx, hy)
4�) Normaliza os dois U = N x V
5�) Mudar as cordenadas de todos os pontos, incluindo a posi��o da fonte
6�) Calcula as normas nos tri�ngulos
7�) Inicializa as normais dos pontos com (0, 0, 0). Soma as normais dos tri�ngulos �s normais dos seus v�rtices
8�) Normaliza as normais. :D
9�) Varredura:
	- Inicializa o z-buffer
	- Para cada triangulo (P1, P2, P3)