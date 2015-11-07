function Player(x, y) {
    this.x = x;
    this.y = y;

    this.setImage = function(game, imgName) {
    	this.img = game.add.sprite(this.x, this.y, imgName);
    }

    this.moveUp = function() {
    	this.y -= 1;
    	this.img.y -= 1	;
    }

    this.moveDown = function() {
    	this.y += 1;
    	this.img.y += 1	;
    }

    this.moveLeft = function() {
    	this.x -= 1;
    	this.img.x -= 1	;
    }

    this.moveRight = function() {
    	this.x += 1;
    	this.img.x += 1	;
    }

    this.moveTo = function(x, y) {
    	this.x = x;
    	this.y = y;
    	this.img.x = x;
    	this.img.y = y;
    }
}
Player.prototype.type = "player";