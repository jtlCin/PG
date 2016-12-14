#include <GLFW/glfw3.h>

#include <cstdlib>
#include <iostream>
#include <fstream>

#include <string>
#include <cmath>

#include "LoadModelObject.h"
#include "Camera.h"



#define PI 3.14159265



GLFWwindow* window;


static void key_callback(GLFWwindow* window, int key, int scancode, int action, int mods) {
	
	if (key == GLFW_KEY_ESCAPE && action == GLFW_PRESS)
		glfwSetWindowShouldClose(window, GL_TRUE);
}



void starGLFW() {
	if (!glfwInit()) exit(EXIT_FAILURE);
	
	window = glfwCreateWindow(1024, 768, "TEMA 13", NULL, NULL);
	if (!window) {
		glfwTerminate();
		exit(EXIT_FAILURE);
	}
	
	glfwMakeContextCurrent(window); // Inicia o contexto com o OpenGl
	
	glfwSetKeyCallback(window, key_callback); // captura a entrada do usuario
}



void glPerspective(float fovY, float aspect, float zNear, float zFar) {

	float fH = tan(fovY / 360 * PI) * zNear,
	fW = fH * aspect;

	glFrustum(-fW, fW, -fH, fH, zNear, zFar);

}
void startOpengl() {
	int width, height;
	glfwGetFramebufferSize(window, &width, &height); // pega o tamanho da janela
	
	// Inicia a projecao em 3D
	glViewport(0, 0, width, height);
	glMatrixMode (GL_PROJECTION);
	glLoadIdentity ();
	glPerspective(45, width/height, 0.1, 5000);
	glMatrixMode (GL_MODELVIEW);
	glLoadIdentity ();
	
	// Iluminação
	glEnable(GL_LIGHTING); // Ativa iluminação
	glEnable(GL_LIGHT0); // Liga a luz 0
	GLfloat luzDifusa[4] = {1, 1, 1, 1};
	glLightfv(GL_LIGHT0, GL_DIFFUSE, luzDifusa);
	GLfloat position[4] = {-10, 10, 10, 1};
	glLightfv(GL_LIGHT0, GL_POSITION, position);
	glEnable(GL_COLOR_MATERIAL);
	
}



int main(void) {
	
	
	
	
	Camera camera("in/camera.cfg");
	LoadModelObject loadModelObject("in/objeto.byu");
	
	
	
	starGLFW();
	startOpengl();
	
		camera.glLookAt();
	while (!glfwWindowShouldClose(window)) { // Loop que mantem a tela aberta e todas as atualizacoes devem ser feitas aqui
		
		glClear(GL_COLOR_BUFFER_BIT); // verificar, pois parece que temos que implementa-lo
		
		
		/*
		
			Aqui dentro vai ficar tudo que será renderizado
		
		*/
		
		loadModelObject.model();
		
		
		
		glfwSwapBuffers(window); // atualiza o z-bufer pricipal com o secundario
		glfwPollEvents(); // recebe os eventos do usuario
	}
	
	
	glfwDestroyWindow(window);
	glfwTerminate();
	exit(EXIT_SUCCESS);
}