var View = function() {
}

View.prototype.bindController = function(controller) {
	this.controller = controller;
}

View.prototype.redraw = function() {
	var field = document.getElementById('field');
	
	while (field.firstChild)
		field.removeChild(field.firstChild);
	
	// grass
	for (var x = 0; x < FIELD_WIDTH; x++)
		for (var y = 0; y < FIELD_HEIGHT; y++)
			this.drawElement('grass', 32 + x * 64, 32 + y * 64, 64, 64);
	
	// blocks
	var blocks = this.controller.getBlocks();
	
	for (var i = 0; i < blocks.length; i++) {
		var b = blocks[i];
		this.drawElement('block', b.x, b.y, 64, 64);
	}
	
	// fires
	var fires = this.controller.getFires();
	
	for (var i = 0; i < fires.length; i++) {
		var f = fires[i];
		this.drawElement('fire', f.x, f.y, 6, 6);
	}
	
	// hero
	var hero = this.controller.getHero();
	
	var angle = 0;
	
	if (hero.lastDir == KEY_RIGHT)
		angle = 90;
	else if (hero.lastDir == KEY_DOWN)
		angle = 180;
	else if (hero.lastDir == KEY_LEFT)
		angle = 270;
	
	this.drawElement('foots', hero.x, hero.y, 64, 64, angle);
	this.drawElement('body', hero.x, hero.y, 64, 64, hero.angle);
}

View.prototype.drawElement = function(image, x, y, w, h, angle = 0) {
	var field = document.getElementById('field');
	
	var i = document.createElement('div');
	
	i.className = 'image ' + image;
	i.style.left =  (x - w / 2) + 'px';
	i.style.top =  (y - h / 2) + 'px';
	i.style.transform = ' rotate(' + angle + 'deg)';
	
	field.appendChild(i);
}

View.prototype.init = function() {
}

var view = new View();