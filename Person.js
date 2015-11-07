function Person(x, y) {
    this.x = x;
    this.y = y;

    this.setImage = function(game, imgName) {
    	this.img = game.add.sprite(this.x, this.y, imgName);
    }
}
Person.prototype.type = "person";