var View = function() {
}

View.prototype.bindController = function(controller) {
	this.controller = controller;
}

View.prototype.redraw = function() {
	var ctx = this.ctx;
	
	ctx.clearRect(0, 0, 608, 608);
	
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
	var ctx = this.ctx;
	
	ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle * Math.PI / 180);
    ctx.drawImage(this.t[image], -w / 2, -h / 2);
    ctx.restore();
}

View.prototype.init = function() {
	var field = document.getElementById('field');
	
	this.canvas = document.createElement('canvas');
	this.canvas.id = 'canvas';
	this.canvas.setAttribute('width', '640px');
	this.canvas.setAttribute('height', '640px');
	
	this.ctx = this.canvas.getContext('2d');
	
	this.t = [];
	this.loadTextures();
	
	field.appendChild(this.canvas);
}

View.prototype.loadTextures = function() {
	this.t['block'] = new Image(64, 64);
	this.t['block'].src = 'assets/img/block.png';

	this.t['body'] = new Image(64, 64);
	this.t['body'].src = 'assets/img/body.png';
	
	this.t['fire'] = new Image(6, 6);
	this.t['fire'].src = 'assets/img/fire.png';
	
	this.t['foots'] = new Image(64, 64);
	this.t['foots'].src = 'assets/img/foots.png';
	
	this.t['grass'] = new Image(64, 64);
	this.t['grass'].src = 'assets/img/grass.png';
}

var view = new View();