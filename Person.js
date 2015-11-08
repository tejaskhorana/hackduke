function Person(x, y, xBound, yBound, xVelocity, yVelocity) {
    this.x = x;
    this.y = y;
    this.lowerXBound = x - xBound;
    this.upperXBound = x + xBound;
    this.lowerYBound = y - yBound;
    this.upperYBound = y + yBound;
    this.xVelocity = xVelocity;
    this.yVelocity = yVelocity;

    this.setImage = function(game, imgName) {
    	this.img = game.add.sprite(this.x, this.y, imgName);
    	this.imgName = imgName;
    }

}
Person.prototype.type = "person";