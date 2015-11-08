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
        this.img.body.moveUp(150);
    }

    this.moveDown = function(bmd) {
        // Make sure player can move
        if ((bmd.getPixel32(Math.floor(this.img.body.x), Math.floor(this.img.body.y + 3)) & 0xFF) < 255) {
            return;
        }
        for (var i = 1; i < this.img.width - 1; i++) {
            //if (!walls[Math.floor(this.img.body.x + i)][Math.floor(this.img.body.y + this.img.height)]) {
            //    console.log(i, this.img.body.x, this.img.body.y + this.img.height);
            //    return;
            //}
        }
        player.img.body.moveDown(150);
    }

    this.moveLeft = function(bmd) {
        // Make sure player can move
        if ((bmd.getPixel32(Math.floor(this.img.body.x - 3), Math.floor(this.img.body.y)) & 0xFF) < 255) {
            return;
        }
        for (var i = 1; i < this.img.height - 1; i++) {
            //if (!walls[Math.floor(this.img.body.x)][Math.floor(this.img.body.y + i)]) {
            //    console.log(this.img.body.x, this.img.body.y, i);
            //    return;
            //}
        }
        player.img.body.moveLeft(150);
    }

    this.moveRight = function(bmd) {
        // Make sure player can move
        if ((bmd.getPixel32(Math.floor(this.img.body.x + 3), Math.floor(this.img.body.y)) & 0xFF) < 255) {
            return;
        }
        for (var i = 1; i < this.img.height - 1; i++) {
            //if (!walls[Math.floor(this.img.body.x + this.img.width)][Math.floor(this.img.body.y + i)]) {
            //    console.log(this.img.body.x + this.img.width, this.img.body.y, i);
            //    return;
            //}
        }
        player.img.body.moveRight(150);
    }

    this.moveTo = function(x, y) {
    	this.x = x;
    	this.y = y;
    	this.img.x = x;
    	this.img.y = y;
    }
}
Player.prototype.type = "player";