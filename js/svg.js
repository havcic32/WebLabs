var ns = 'http://www.w3.org/2000/svg';

var View = function() {
}

View.prototype.bindController = function(controller) {
	this.controller = controller;
}

View.prototype.redraw = function() {
	var svg = document.getElementById('svg');
	
	while (svg.firstChild)
		svg.removeChild(svg.firstChild);
	
	// grasses
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
	var svg = document.getElementById('svg');
	
	var i = document.createElementNS(ns, 'image');
	
	var cx = (x - w / 2);
	var cy = (y - h / 2);
	
	i.setAttributeNS(null, 'x', '' + cx);
	i.setAttributeNS(null, 'y', '' + cy);
	i.setAttributeNS(null, 'width', '' + w);
	i.setAttributeNS(null, 'height', '' + h);
	i.setAttributeNS(null, 'href', 'assets/img/' + image + '.png');
	i.setAttributeNS(null, 'transform', 'rotate(' + angle + ')');
	i.setAttributeNS(null, 'transform-origin', '' + x + ' ' + y);
	
	svg.appendChild(i);	
}

View.prototype.init = function() {
	var field = document.getElementById('field');
	
	var svg = document.createElementNS(ns, 'svg');
	
	svg.id = 'svg';
	svg.setAttribute('width', '640px');
	svg.setAttribute('height', '640px');
	
	field.appendChild(svg);
}

var view = new View();