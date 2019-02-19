function loadFile(event) {
	
	var file = event.target.files[0];

	var reader = new FileReader();
	reader.onload = function() {
		document.querySelector('#content').value = reader.result;
	};
	reader.readAsText(file);

}


function normalize(vector) {

	var size = Math.sqrt(vector.x*vector.x + vector.y*vector.y + vector.z*vector.z);

	if (size == 0) {
		return {x: 0, y: 0, z: 0};
	}

	return {x: vector.x/size, y: vector.y/size, z: vector.z/size};

}

function dot(vector1, vector2) {

	return vector1.x*vector2.x + vector1.y*vector2.y + vector1.z*vector2.z;

}

function cross(vector1, vector2) {

	/*
	|	i 	j 	k	|	i 	j
	|	x1	y1	z1	|	x1	y1
	|	x2	y2	z2	|	x2	y2
	*/

	return {x: vector1.y*vector2.z - vector1.z*vector2.y, y: vector1.z*vector2.x - vector1.x*vector2.z, z: vector1.x*vector2.y - vector1.y*vector2.x};

}

function projection(vector1, vector2) {

	// <V, N>.N

	var scalar = dot(vector1, vector2);
	return {x: scalar*vector2.x, y: scalar*vector2.y, z: scalar*vector2.z};

/*    var size = dot(vector2, vector2);
    if (size == 0) {
        return {x: 0, y: 0, z: 0};
    }

    var scalar = dot(vector1, vector2);
    return {x: (scalar/size)*vector2.x, y: (scalar/size)*vector2.y, z: (scalar/size)*vector2.z};*/

}

var abs = Math.abs;

function array_fill(i, n, v) {
    var a = [];
    for (; i < n; i++) {
        a.push(v);
    }
    return a;
}

/**
 * Gaussian elimination
 * @param  array A matrix
 * @param  array x vector
 * @return array x solution vector
 */
function gauss(A, x) {

    var i, k, j;

    // Just make a single matrix
    for (i=0; i < A.length; i++) { 
        A[i].push(x[i]);
    }
    var n = A.length;

    for (i=0; i < n; i++) { 
        // Search for maximum in this column
        var maxEl = abs(A[i][i]),
            maxRow = i;
        for (k=i+1; k < n; k++) { 
            if (abs(A[k][i]) > maxEl) {
                maxEl = abs(A[k][i]);
                maxRow = k;
            }
        }


        // Swap maximum row with current row (column by column)
        for (k=i; k < n+1; k++) { 
            var tmp = A[maxRow][k];
            A[maxRow][k] = A[i][k];
            A[i][k] = tmp;
        }

        // Make all rows below this one 0 in current column
        for (k=i+1; k < n; k++) { 
            var c = -A[k][i]/A[i][i];
            for (j=i; j < n+1; j++) { 
                if (i===j) {
                    A[k][j] = 0;
                } else {
                    A[k][j] += c * A[i][j];
                }
            }
        }
    }

    // Solve equation Ax=b for an upper triangular matrix A
    x = array_fill(0, n, 0);
    for (i=n-1; i > -1; i--) { 
        x[i] = A[i][n]/A[i][i];
        for (k=i-1; k > -1; k--) { 
            A[k][n] -= A[k][i] * x[i];
        }
    }

    return x;
}

function insertionSort(array) {

	for (var i = 1; i < array.length; i++) {
		var vector = array[i];
		var j = i - 1;
		while((j >= 0) && (array[j].y > vector.y)) {
			array[j + 1] = array[j];
			j--;
		}
		array[j + 1] = vector;
	}

	return array;
}