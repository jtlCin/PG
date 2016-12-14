#ifndef CAMERA_H
#define CAMERA_H

class Camera {
	
	private:
		float eye[3],// Especifica a posição do ponto de visão.
		center[3], // Especifica a posição do ponto de referência.
		up[3]; // Especifica a direcção do vector acima.

	public:
		
		Camera(const char filePath[]) {
			
			std::ifstream inObj(filePath);
			
			if (inObj.good()) {
				
				int i = 0;
				float x, y, z;
				
				std::string line;
				while(getline(inObj, line)) {
					
					sscanf(line.c_str(), " %f %f %f", &x, &y, &z);
					
					if (i++ == 0) {
						this->eye = {x, y, z};
					} else if (i++ == 1) {
						this->center = {x, y, z};
					} else if (i++ == 2) {
						this->up = {x, y, z};
					} else if (i++ == 3) {
						
					}

				}
				
			} else {
				throw "Erro no carregamento da camera";
			}

		}
		~Camera() {}
		
		float* getEye()		{ return this->eye; }
		float* getCenter()	{ return this->center; }
		float* getUp()		{ return this->up; }

		void setEye(float eye[3])		{ if (eye[0] != 0 || eye[1] != 0 || eye[2] != 0) { this->eye = {eye[0], eye[1], eye[2]}; } else { throw "O vetor Eye não pode ser um vetor nulo"; } }
		void setCenter(float center[3])	{ this->center = {center[0], center[1], center[2]}; }
		void setUp(float up[3])			{ this->up = {up[0], up[1], up[2]}; }

	private:
		
		void normalize(float v[3]) {
			float size = sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
			v[0] /= size;
			v[1] /= size;
			v[2] /= size;
		}
			
		void cross(float v1[3], float v2[3], float v3[3]) {
			v1[0] = v2[1]*v3[2] - v2[2]*v3[1];
			v1[1] = v2[2]*v3[0] - v2[0]*v3[2];
			v1[2] = v2[0]*v3[1] - v2[1]*v3[0];
		}

	public:
		
		void glLookAt() {
			
			float forward[3], side[3], up[3], m[4][4];

			forward = {this->center[0] - this->eye[0], this->center[1] - this->eye[1], this->center[2] - this->eye[2]};

			up = {this->up[0], this->up[1], this->up[2]};

			normalize(forward);
			
			cross(side, forward, up);
			normalize(side);
			
			cross(up, side, forward);
			
			m =
			{{side[0], up[0], -forward[0], 0},
			{side[1], up[1], -forward[1], 0},
			{side[2], up[2], -forward[2], 0},
			{0, 0, 0, 1}};
			
			glMultMatrixf(&m[0][0]);
			glTranslated(-this->eye[0], -this->eye[1], -this->eye[2]);
		
		}

};
	
#endif