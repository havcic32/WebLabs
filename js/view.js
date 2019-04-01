var icnt = 0;

function initShaderProgram(gl, vsSource, fsSource) {
	const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
	const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
	
	const shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);
	
	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
		return null;
	}
	
	return shaderProgram;
}

function loadShader(gl, type, source) {
	const shader = gl.createShader(type);
	
	gl.shaderSource(shader, source);
	
	gl.compileShader(shader);
	
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
		return null;
	}
	
	return shader;
}

function initBuffers(gl) {
	// Позиции
	const positions = [
		-0.5,	-0.5,	-1.5,
		-0.5,	-0.5,	0.5,
		1.5,	-0.5,	0.5,
		1.5,	-0.5,	-0.5,
		0.5,	-0.5,	-0.5,
		0.5,	-0.5,	-1.5,
		-0.5,	0.5,	-1.5,
		-0.5,	0.5,	0.5,
		1.5,	0.5,	0.5,
		1.5,	0.5,	-0.5,
		0.5,	0.5,	-0.5,
		0.5,	0.5,	-1.5
	];
	
	const positionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
	
	// Цвета
	var colors = [
		0.5, 0.5, 0.25, 1.0,	// 0
		0.5, 0.5, 0.25, 1.0,	// 1
		0.5, 0.5, 0.25, 1.0,	// 2
		0.5, 0.5, 0.25, 1.0,	// 3
		0.5, 0.5, 0.25, 1.0,	// 4
		0.5, 0.5, 0.25, 1.0,	// 5
		1.0, 1.0, 0.75, 1.0,	// 6
		1.0, 1.0, 0.75, 1.0,	// 7
		1.0, 1.0, 0.75, 1.0,	// 8
		1.0, 1.0, 0.75, 1.0,	// 9
		1.0, 1.0, 0.75, 1.0,	// 10
		1.0, 1.0, 0.75, 1.0		// 11
	];
	
	const colorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
	
	// Индексы
	const indices = [
		0,6,5,
		6,11,5,
		5,11,4,
		11,10,4,
		4,10,3,
		10,9,3,
		3,9,2,
		9,8,2,
		2,8,1,
		8,7,1,
		1,7,6,
		6,0,1,
		6,7,11,
		11,7,10,
		10,7,8,
		10,8,9,
		0,5,1,
		5,4,1,
		1,4,3,
		1,3,2
	];
	
	icnt = indices.length;
	
	const indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	
	return {
		position: positionBuffer,
		color: colorBuffer,
		indices: indexBuffer
	};
}

var cubeRotation = 0.0;

function drawScene(gl, programInfo, buffers, dt) {
	gl.clearColor(1.0, 1.0, 1.0, 1.0);
	gl.clearDepth(1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);
	
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	const fieldOfView = 45 * Math.PI / 180;
	const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
	const zNear = 0.1;
	const zFar = 100.0;
	const projectionMatrix = mat4.create();
	
	mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
	
	const modelViewMatrix = mat4.create();
	
	mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -6.0]);
	
	cubeRotation += dt;
	mat4.rotate(modelViewMatrix, modelViewMatrix, cubeRotation * 0.7, [1, 1, 1]);
	
	{
		const numComponents = 3;
		const type = gl.FLOAT;
		const normalize = false;
		const stride = 0;
		const offset = 0;
		
		gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
		gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, numComponents, type, normalize, stride, offset);	
		gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
	}
	
	{
		const numComponents = 4;
		const type = gl.FLOAT;
		const normalize = false;
		const stride = 0;
		const offset = 0;
		
		gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
		gl.vertexAttribPointer(programInfo.attribLocations.vertexColor, numComponents, type, normalize, stride, offset);
		gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
	}

	gl.useProgram(programInfo.program);
	gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix);
	gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix);
	
	{
		const offset = 0;
		const vertexCount = icnt;
		const type = gl.UNSIGNED_SHORT;
		gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
	}
}


function main() {
	const canvas = document.querySelector('#glCanvas');
	const gl = canvas.getContext('webgl');
	
	if (!gl) {
		alert("Don't support!");
		return;
	}
	
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	 const vsSource = `
	 attribute vec4 aVertexPosition;
	 attribute vec4 aVertexColor;
	 
	 uniform mat4 uModelViewMatrix;
	 uniform mat4 uProjectionMatrix;
	 
	 varying lowp vec4 vColor;
	 
	 void main() {
		gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
		vColor = aVertexColor;
	 }
	 `;
	 
	 const fsSource = `
	 varying lowp vec4 vColor;
	 
	 void main() {
		gl_FragColor = vColor;
	 }`;
	 
	const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
	
	const programInfo = {
		program: shaderProgram,
		attribLocations: {
			vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
			vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor')
		},
		uniformLocations: {
			projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
			modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
		},
	};
	
	const buffers = initBuffers(gl);
	
	var then = 0;
	
	function render(now) {
		now *= 0.001;
		const dt = now - then;
		then = now;
		drawScene(gl, programInfo, buffers, dt);
		requestAnimationFrame(render);
	}
	
	requestAnimationFrame(render);
}

window.onload = main;