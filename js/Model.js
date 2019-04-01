const KEY_UP = 0;
const KEY_RIGHT = 1;
const KEY_DOWN = 2;
const KEY_LEFT = 3;

const FIELD_WIDTH = 10;
const FIELD_HEIGHT = 10;

const HERO_SPEED = 5.0;

const LEVEL = [
	 [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
	 [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0],
	 [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
	 [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	 [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	 [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	 [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	 [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
	 [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	 [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
	 [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
	 [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
	 [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0],
	 [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
	 [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
	 [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0]
];

const ENEMIES = [
	{x: 370, y: 620},
	{x: 370, y: 820},
	{x: 570, y: 820},
	{x: 1070, y: 820},
	{x: 970, y: 220},
	{x: 870, y: 220},
	{x: 1070, y: 520},
	{x: 1070, y: 220}
];

const COINS = [
	{x: 150, y: 120},
	{x: 850, y: 320},
	{x: 1050, y: 120},
	{x: 1050, y: 620},
	{x: 170, y: 720},
];

var Model = function() {
	this.keys = [];
	
	this.hero = {
		x: 0,
		y: 0,
		lastDir: KEY_UP,
		angle: 0
	};
	
	this.mx = 0;
	this.my = 0;
	
	this.blocks = new Array();
	
	this.fires = new Array();
	this.enemies = new Array();
	this.coins = new Array();
	
	this.map = {
		x: 0,
		y: 0
	};
	
	this.secret = false;
	this.secretB = 0;
}

Model.prototype.init = function() {
	this.keys[KEY_UP] = false;
	this.keys[KEY_RIGHT] = false;
	this.keys[KEY_DOWN] = false;
	this.keys[KEY_LEFT] = false;
	
	this.hero.x = 640 / 2;
	this.hero.y = 640 / 2;
	
	for (var y = 0; y < LEVEL.length; y++) {
		var ul = LEVEL[y];
		for (var x = 0; x < ul.length; x++) {
			var el = LEVEL[y][x];
			if (el == 1) {
				this.blocks.push({
					x: x * 64,
					y: y * 64,
					secret: false
				});
			}
		}
	}
	
	this.secretB = parseInt(Math.random() * this.blocks.length);
	
	for (var i = 0; i < ENEMIES.length; i++) {
		var e = ENEMIES[i];
		
		var enemy = {
			x: e.x,
			y: e.y,
			a: Math.random * 360,
			h: 100
		};
		
		this.enemies.push(enemy);
	}
	
	this.coins = COINS;
}

Model.prototype.update = function(dt) {
	// keys
	var hox = this.hero.x;
	var hoy = this.hero.y;
	
	if (this.keys[KEY_UP])		{ this.hero.y -= HERO_SPEED;	this.hero.lastDir = KEY_UP;		this.checkForBlock(this.hero, KEY_UP); }
	if (this.keys[KEY_RIGHT])	{ this.hero.x += HERO_SPEED;	this.hero.lastDir = KEY_RIGHT;	this.checkForBlock(this.hero, KEY_RIGHT); }
	if (this.keys[KEY_DOWN])	{ this.hero.y += HERO_SPEED;	this.hero.lastDir = KEY_DOWN;	this.checkForBlock(this.hero, KEY_DOWN); }
	if (this.keys[KEY_LEFT])	{ this.hero.x -= HERO_SPEED;	this.hero.lastDir = KEY_LEFT;	this.checkForBlock(this.hero, KEY_LEFT); }
	
	this.map.x -= this.hero.x - hox;
	this.map.y -= this.hero.y - hoy;
	
	// mouse move
	var hx = this.hero.x;
	var hy = this.hero.y;
	
	var dx = this.mx - hx - this.map.x;
	var dy = this.my - hy - this.map.y;

	var angle = Math.atan2(dy, dx);
	
	this.hero.angle = angle * 180 / Math.PI;
	
	// fires
	var toSplice = new Array();
	
	for (var i = 0; i < this.fires.length; i++) {
		var f = this.fires[i];
		
		this.fires[i].x += f.vx;
		this.fires[i].y += f.vy;
		
		var ex = true;
		f.h -= dt;
		
		if (f.h <= 0) {
			toSplice.push(f);
			ex = false;
		}
		
		if (ex) {
			for (var j = 0; j < this.blocks.length; j++) {
				var b = this.blocks[j];
				
				var bx = b.x;
				var by = b.y;
				
				var fx = f.x;
				var fy = f.y;
				
				if (fx + 3 > bx - 32 && fx - 3 < bx + 32 && fy + 3 > by - 32 && fy - 3 < by + 32) {
					if (j == this.secretB) {
						this.blocks[j].secret = true;
						this.secret = true;
						this.checkWin();
					}
					
					toSplice.push(f);
					ex = false;
					break;
				}
			}
		}
		
		if (ex) {
			// enemies
			for (var j = 0; j < this.enemies.length; j++) {
				var e = this.enemies[j];
				
				var dx = e.x - f.x;
				var dy = e.y - f.y;
				
				var dist = Math.sqrt(dx*dx + dy*dy);
				
				if (dist < 32) {
					toSplice.push(f);
					ex = false;
					
					this.enemies[j].h -= 5;
					if (this.enemies[j].h <= 0) {
						this.enemies.splice(this.enemies.indexOf(e), 1);
						this.checkWin();	
					}
					
					break;
				}
			}
		}
	}
	
	for (var i = 0; i < toSplice.length; i++)
		this.fires.splice(this.fires.indexOf(toSplice[i]), 1);
	
	// enemies
	for (var i = 0; i < this.enemies.length; i++) {
		var e = this.enemies[i];
		
		var dx = hx - e.x;
		var dy = hy - e.y;
		
		var angle = Math.atan2(dy, dx);
		
		e.a = angle * 180 / Math.PI;
		
		// lose
		var dx = e.x - this.hero.x;
		var dy = e.y - this.hero.y;
		
		var dist = Math.sqrt(dx*dx + dy*dy);
		
		if (dist < 45) {
			alert("You lose");
			location.reload();
		}
		
		// move
		var vx = Math.cos(angle) * 1.0;
		var vy = Math.sin(angle) * 1.0;
		
		this.enemies[i].x += vx;
		this.enemies[i].y += vy;
		
		if (vy < 0) this.checkForBlock(this.enemies[i], KEY_UP);
		if (vx > 0) this.checkForBlock(this.enemies[i], KEY_RIGHT);
		if (vy > 0) this.checkForBlock(this.enemies[i], KEY_DOWN);
		if (vx < 0) this.checkForBlock(this.enemies[i], KEY_LEFT);
	}
	
	// coins
	for (var i = 0; i < this.coins.length; i++) {
		var c = this.coins[i];
		
		var dx = this.hero.x - c.x;
		var dy = this.hero.y - c.y;
		
		var dist = Math.sqrt(dx*dx + dy*dy);
		if (dist < 50) {
			this.coins.splice(this.coins.indexOf(c), 1);
			this.checkWin();
			break;
		}
	}
}

Model.prototype.checkForBlock = function(object, dir) {
	var hx = object.x;
	var hy = object.y;
	
	for (var i = 0; i < this.blocks.length; i++) {
		var b = this.blocks[i];
		
		var bx = b.x;
		var by = b.y;
		
		if (dir == KEY_UP) {
			if (hy - 32 < by + 32 && hx + 32 > bx - 32 && hx - 32 < bx + 32 && by < hy)
				object.y = by + 64;
		}
		else if (dir == KEY_DOWN) {
			if (hy + 32 > by - 32 && hx + 32 > bx - 32 && hx - 32 < bx + 32 && hy < by)
				object.y = by - 64;
		}
		else if (dir == KEY_LEFT) {
			if (hx - 32 < bx + 32 && hy + 32 > by - 32 && hy - 32 < by + 32 && bx < hx)
				object.x = bx + 66;
		}
		else if (dir == KEY_RIGHT) {
			if (hx + 32 > bx - 32 && hy + 32 > by - 32 && hy - 32 < by + 32 && hx < bx)
				object.x = bx - 66;
		}
	}
}

Model.prototype.checkWin = function() {
	if (this.enemies == 0 && this.coins.length == 0 && this.secret) {
		setTimeout(function() {
			alert("You win");
			location.reload();
		}, 1500);
	}
}

Model.prototype.keyDown = function(key) {
	this.keys[key] = true;
}

Model.prototype.keyUp = function(key) {
	this.keys[key] = false;
}

Model.prototype.moveMouse = function(x, y) {
	this.mx = x;
	this.my = y;
}

Model.prototype.mouseDown = function() {
	var h = this.hero;
	
	var rad = h.angle * Math.PI / 180;
	
	var vx = Math.cos(rad) * 8.0;
	var vy = Math.sin(rad) * 8.0;
	
	var fire = {
		x: h.x,
		y: h.y,
		vx: vx,
		vy: vy,
		h: 1
	}
	
	this.fires.push(fire);
}

Model.prototype.getHero = function(key) {
	return this.hero;
}

Model.prototype.getBlocks = function() {
	return this.blocks;
}

Model.prototype.getFires = function() {
	return this.fires;
}

Model.prototype.getEnemies = function() {
	return this.enemies;
}

Model.prototype.getMap = function() {
	return this.map;
}

Model.prototype.getCoins = function() {
	return this.coins;
}

Model.prototype.getSecret = function() {
	return this.secret;
}
Model.prototype.getSecretB = function() {
	return this.blocks[this.secretB];
}

var model = new Model();