#ifndef LOADMODELOBJECT_H
#define LOADMODELOBJECT_H

#include <vector>

struct coordinateV {
	float x, y, z;
};
struct coordinateS {
	int a, b, c;
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
				int numVertives = 0, numSentido = 0;
				
				while(getline(inObj, line)) {
					
					if (numSentido == 0) {
						sscanf(line.c_str(), "%i %i", &numVertives, &numSentido);
					} else if (line.length()) {
						if (numVertives-- > 0) {
							float x, y, z;
							sscanf(line.c_str(), " %f %f %f", &x, &y, &z);
							vertices.push_back({x, y, z});
						} else {
							int a, b, c;
							sscanf(line.c_str(), "%d %d %d", &a, &b, &c);
							sentido.push_back({a, b, c});
						}
					}

				}
				
				inObj.close();

			} else {
				throw "Erro no carregamento do objeto";
			}
				
		}

		~LoadModelObject() {
			
		}
		
	private:
		
		coordinateV calcNormal(coordinateV a, coordinateV b, coordinateV c) { // produto vetorial e vetores ortogononais
			coordinateV Vector1 = {b.x - a.x, b.y - a.y, b.z - a.z};
			coordinateV Vector2 = {c.x - a.x, c.y - a.y, c.z - a.z};
			
			return {Vector1.y*Vector2.z - Vector2.y*Vector1.z, Vector1.z*Vector2.x - Vector2.z*Vector1.x, Vector1.x*Vector2.y - Vector2.x*Vector1.y};
		}
		
	public:
		
		void model() {
			
			for (unsigned int i = 0; i < sentido.size(); i++) {
				
				// O desenho desses triangolo devem ser feito pelo algoritimo de rasterizacao
				
				coordinateV normal = calcNormal(vertices[sentido[i].a], vertices[sentido[i].b], vertices[sentido[i].c]);
				
				glBegin(GL_TRIANGLES);
					glNormal3f(normal.x, normal.y, normal.z);
					glVertex3f(vertices[sentido[i].a].x, vertices[sentido[i].a].y, vertices[sentido[i].a].z);
					glVertex3f(vertices[sentido[i].b].x, vertices[sentido[i].b].y, vertices[sentido[i].b].z);
					glVertex3f(vertices[sentido[i].c].x, vertices[sentido[i].c].y, vertices[sentido[i].c].z);
				glEnd();
				
			}

		}
	
};
	
#endif