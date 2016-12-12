#ifndef LOADMODELOBJECT_H
#define LOADMODELOBJECT_H

#include <fstream>
#include <vector>

struct coordinateV {
	float x, y, z;
};
struct coordinateS {
	int x, y, z;
};

class LoadModelObject {
	
	private:
		std::vector<coordinateV> vertices;
		std::vector<coordinateS> sentido;
	
	public:
		
		LoadModelObject(const char filePath[]) {

			std::ifstream inObj(filePath);

			if (inObj.good()) {
				
				std::string line;
				int numVertives, numSentido;
				
				while(getline(inObj, line)) {
					
					if (numVertives == 0) {
						sscanf(line.c_str(), "%i %i", &numVertives, &numSentido);
					} else {
						if (numVertives--) {
							float x, y, z;
							sscanf(line.c_str(), " %f %f %f", &x, &y, &z);
							vertices.push_back({x, y, z});
						} else if (numSentido--){
							int x, y, z;
							sscanf(line.c_str(), " %i %i %i", &x, &y, &z);
							sentido.push_back({x, y, z});
						}
					}

				}
				
				inObj.close();

			} else {
				throw "Erro no carregamento do arquivo";
			}
		}

		~LoadModelObject() {
			
		}
		
		void model() {
			
			for (unsigned int i = 0; i < sentido.size(); i++) {
				
				// O desenho desses triangolo devem ser feito pelo algoritimo de rasterizacao
				
				glBegin(GL_TRIANGLES);
					glVertex3f(vertices[sentido[i].x].x, vertices[sentido[i].x].y, vertices[sentido[i].x].z);
					glVertex3f(vertices[sentido[i].y].x, vertices[sentido[i].y].y, vertices[sentido[i].y].z);
					glVertex3f(vertices[sentido[i].z].x, vertices[sentido[i].z].y, vertices[sentido[i].z].z);
				glEnd();
				
			}

		}
	
};
	
#endif