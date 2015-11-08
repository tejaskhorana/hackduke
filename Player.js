function Player(x, y) {
    this.x = x;
    this.y = y;

    this.setImage = function(game, imgName) {
    	this.img = game.add.sprite(this.x, this.y, imgName);
    }

    this.moveUp = function(bmd) {
        // Make sure player can move
        if ((bmd.getPixel32(Math.floor(this.img.body.x), Math.floor(this.img.body.y - 3)) & 0xFF) < 255) {
            return;
        }
        this.img.body.moveUp(250);
    }

    this.moveDown = function(bmd) {
        // Make sure player can move
        if ((bmd.getPixel32(Math.floor(this.img.body.x), Math.floor(this.img.body.y + 3)) & 0xFF) < 255) {
            return;
        }
        player.img.body.moveDown(250);
    }

    this.moveLeft = function(bmd) {
        // Make sure player can move
        if ((bmd.getPixel32(Math.floor(this.img.body.x - 3), Math.floor(this.img.body.y)) & 0xFF) < 255) {
            return;
        }
        player.img.body.moveLeft(250);
    }

    this.moveRight = function(bmd) {
        // Make sure player can move
        if ((bmd.getPixel32(Math.floor(this.img.body.x + 3), Math.floor(this.img.body.y)) & 0xFF) < 255) {
            return;
        }
        player.img.body.moveRight(250);
    }

    this.moveTo = function(x, y) {
    	this.x = x;
    	this.y = y;
    	this.img.x = x;
    	this.img.y = y;
    }
}
Player.prototype.type = "player";