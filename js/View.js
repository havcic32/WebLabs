var View = function() {
}

View.prototype.bindController = function(controller) {
	this.controller = controller;
}

View.prototype.redraw = function() {
	var ctx = this.ctx;
	
	ctx.clearRect(0, 0, 640, 640);
	
	var map = this.controller.getMap();
	
	// grass
	for (var x = -1; x < FIELD_WIDTH + 1; x++)
		for (var y = -1; y < FIELD_HEIGHT + 1; y++)
			this.drawElement('grass', (32 + x * 64) - (parseInt(map.x / 64) * 64), (32 + y * 64) - (parseInt(map.y / 64) * 64), 64, 64);
	
	// blocks
	var blocks = this.controller.getBlocks();
	
	for (var i = 0; i < blocks.length; i++) {
		var b = blocks[i];
		this.drawElement('block', b.x, b.y, 64, 64);
		
		if (b.secret) {
			var map = this.controller.getMap();
			
			ctx.fillStyle = 'green';
			ctx.fillRect(map.x + b.x - 32, map.y + b.y - 32, 64, 64);
		}
	}
	
	// coins
	var coins = this.controller.getCoins();
	
	for (var i = 0; i < coins.length; i++) {
		var c = coins[i];
		this.drawElement('coin', c.x, c.y, 64, 64);
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
	
	// enemies
	var enemies = this.controller.getEnemies();
	
	for (var i = 0; i < enemies.length; i++) {
		var e = enemies[i];
		this.drawElement('enemy', e.x, e.y, 64, 64, e.a);
		
		var map = this.controller.getMap();
		
		ctx.fillStyle = 'black';
		ctx.fillRect(map.x + e.x - 51, map.y + e.y - 51, 102, 12);
		
		ctx.fillStyle = 'aqua';
		ctx.fillRect(map.x + e.x - 50, map.y + e.y - 50, e.h, 10);
	}
	
	var secret = this.controller.getSecret();
	var secretB = this.controller.getSecretB();
	
	// shadows
	ctx.fillStyle = 'black';
	
	var so = 2;
	
	ctx.fillText("Enemies: " + enemies.length, 5 + so, 25 + so);
	ctx.fillText("Coins: " + coins.length, 5 + so, 50 + so);
	ctx.fillText("Secret: " + (secret ? "yes" : "no"), 5 + so, 75 + so);
	ctx.fillText("(x - " + secretB.x + ", y - " + secretB.y + ")", 5 + so, 100 + so);
	
	// texts
	ctx.fillStyle = 'yellow';
	
	ctx.fillText("Enemies: " + enemies.length, 5, 25);
	ctx.fillText("Coins: " + coins.length, 5, 50);
	
	ctx.fillStyle = 'red';
	ctx.fillText("Secret: " + (secret ? "yes" : "no"), 5, 75);
	
	ctx.fillStyle = 'green';
	ctx.fillText("(x - " + secretB.x + ", y - " + secretB.y + ")", 5, 100);
}

View.prototype.drawElement = function(image, x, y, w, h, angle = 0) {
	var ctx = this.ctx;
	var map = this.controller.getMap();
	
	ctx.save();
    ctx.translate(map.x + x, map.y + y);
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
	
	this.ctx.font = "25px Arial";
	
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
	
	this.t['enemy'] = new Image(64, 64);
	this.t['enemy'].src = 'assets/img/enemy.png';
	
	this.t['coin'] = new Image(64, 64);
	this.t['coin'].src = 'assets/img/coin.png';
}

var view = new View();