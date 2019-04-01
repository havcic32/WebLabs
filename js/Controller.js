var Controller = function (View, Model) {
    this.view = View;
    this.model = Model;
};

Controller.prototype.init = function() {
    this.model.init();
	this.view.init();
	
	document.onkeydown = this.handleKeyDown.bind(this);
	document.onkeyup = this.handleKeyUp.bind(this);
	document.onmousemove = this.handleMouseMove.bind(this);
	document.onmousedown = this.handleMouseDown.bind(this);
	
	this.loop();
};

Controller.prototype.loop = function() {
	var then = 0;
	
	function render(now) {
		now *= 0.001;
		const dt = now - then;
		then = now;
		
		this.update(dt);
		this.view.redraw();
		
		requestAnimationFrame(render.bind(this));
	}
	
	requestAnimationFrame(render.bind(this));
}

Controller.prototype.update = function(dt) {
	this.model.update(dt);
}

Controller.prototype.handleKeyDown = function(event) {
	var key = -1;
	
	if (event.code == 'KeyW')
		key = KEY_UP;
	else if (event.code == 'KeyD')
		key = KEY_RIGHT;
	else if (event.code == 'KeyS')
		key = KEY_DOWN;
	else if (event.code == 'KeyA')
		key = KEY_LEFT;
	
	if (key != -1)
		this.model.keyDown(key);
}

Controller.prototype.handleKeyUp = function(event) {
	var key = -1;
	
	if (event.code == 'KeyW')
		key = KEY_UP;
	else if (event.code == 'KeyD')
		key = KEY_RIGHT;
	else if (event.code == 'KeyS')
		key = KEY_DOWN;
	else if (event.code == 'KeyA')
		key = KEY_LEFT;
	
	if (key != -1)
		this.model.keyUp(key);
}

Controller.prototype.getHero = function(key) {
	return this.model.getHero();
}

Controller.prototype.handleMouseMove = function(event) {
	event = event || window.event;
	
	var x = event.pageX - 58;
	var y = event.pageY - 58;
	
	this.model.moveMouse(x, y);
}

Controller.prototype.handleMouseDown = function(event) {
	this.model.mouseDown();
}

Controller.prototype.getBlocks = function() {
	return this.model.getBlocks();
}

Controller.prototype.getFires = function() {
	return this.model.getFires();
}

var controller = new Controller(view, model);

view.bindController(controller);

controller.init();