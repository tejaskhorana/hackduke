function Food(x, y) {
    this.x = x;
    this.y = y;

    this.setImage = function(game, imgName) {
    	this.img = game.add.sprite(this.x, this.y, imgName);
    }
}
Food.prototype.type = "food";