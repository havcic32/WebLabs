const KEY_UP = 0;
const KEY_RIGHT = 1;
const KEY_DOWN = 2;
const KEY_LEFT = 3;

const FIELD_WIDTH = 10;
const FIELD_HEIGHT = 10;

const HERO_SPEED = 5.0;

const LEVEL = [
	{x: 100, y: 350},
	{x: 350, y: 100},
	{x: 500, y: 450}
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
	
	this.blocks = LEVEL;
	
	this.fires = new Array();
}

Model.prototype.init = function() {
	this.keys[KEY_UP] = false;
	this.keys[KEY_RIGHT] = false;
	this.keys[KEY_DOWN] = false;
	this.keys[KEY_LEFT] = false;
	
	this.hero.x = 120;
	this.hero.y = 150;
	
	
}

Model.prototype.update = function(dt) {
	// keys
	if (this.keys[KEY_UP])		{ this.hero.y -= HERO_SPEED;	this.hero.lastDir = KEY_UP;		this.checkForBlock(this.hero, KEY_UP); }
	if (this.keys[KEY_RIGHT])	{ this.hero.x += HERO_SPEED;	this.hero.lastDir = KEY_RIGHT;	this.checkForBlock(this.hero, KEY_RIGHT); }
	if (this.keys[KEY_DOWN])	{ this.hero.y += HERO_SPEED;	this.hero.lastDir = KEY_DOWN;	this.checkForBlock(this.hero, KEY_DOWN); }
	if (this.keys[KEY_LEFT])	{ this.hero.x -= HERO_SPEED;	this.hero.lastDir = KEY_LEFT;	this.checkForBlock(this.hero, KEY_LEFT); }
	
	// check area
	if (this.hero.x < 32) this.hero.x = 32;
	if (this.hero.y < 32) this.hero.y = 32;
	if (this.hero.x > FIELD_WIDTH * 64 - 32) this.hero.x = FIELD_WIDTH * 64 - 32;
	if (this.hero.y > FIELD_HEIGHT * 64 - 32) this.hero.y = FIELD_HEIGHT * 64 - 32;
	
	// mouse move
	var hx = this.hero.x;
	var hy = this.hero.y;
	
	var dx = this.mx - hx;
	var dy = this.my - hy;
	
	var angle = Math.atan2(dy, dx);
	
	this.hero.angle = angle * 180 / Math.PI;
	
	// fires
	var toSplice = new Array();
	
	for (var i = 0; i < this.fires.length; i++) {
		var f = this.fires[i];
		
		this.fires[i].x += f.vx;
		this.fires[i].y += f.vy;
		
		if (f.x + 3 > FIELD_WIDTH * 64 || f.x - 3 < 0 || f.y + 3 > FIELD_HEIGHT * 64 || f.y - 3 < 0)
			toSplice.push(f);
		else {
			for (var j = 0; j < this.blocks.length; j++) {
				var b = this.blocks[j];
				
				var bx = b.x;
				var by = b.y;
				
				var fx = f.x;
				var fy = f.y;
				
				if (fx + 3 > bx - 32 && fx - 3 < bx + 32 && fy + 3 > by - 32 && fy - 3 < by + 32) {
					toSplice.push(f);
					break;
				}
			}
		}
	}
	
	for (var i = 0; i < toSplice.length; i++)
		this.fires.splice(this.fires.indexOf(toSplice[i]), 1);
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
		vy: vy
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

var model = new Model();