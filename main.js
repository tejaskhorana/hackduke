var game = new Phaser.Game(1200, 800, Phaser.AUTO, 'game_div');

var keyUp, keyDown, keyLeft, keyRight;

var player, person1;

var main_state = {
    preload: function () {
        game.load.image('person', 'assets/Person.png');
        game.load.image('player', 'assets/Player.png');
        this.gameStatus = 'win';
    },

    create: function () {
        person1 = new Person(150, 150);
        person1.setImage(game, 'person');
        player = new Player(125, 250);
        player.setImage(game, 'player');

        this.score = 0;
        this.timer = 10.0;
        this.labelScore = game.add.text(20, 10, "Score: " + this.score.toString(), { font: "30px Arial", fill: "#ffffff" });         
        this.labelScore = game.add.text(20, 40, "Timer: " + this.timer.toString(), { font: "30px Arial", fill: "#ffffff" }); 

        keyUp = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        keyDown = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        keyLeft = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        keyRight = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        //key3 = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        //key3.onDown.add(addPineapple, this);

    },

    update: function () {
        if(this.timer > 0) {
            this.timer -= 1/60;
            this.game.world.remove(this.labelScore);
            this.labelScore = game.add.text(20, 40, "Timer: " + this.timer.toFixed(2), { font: "30px Arial", fill: "#ffffff" });         
        } else if (this.gameStatus == 'win') {
            this.gameStatus = 'lose';
            this.timer = 0;
            this.game.world.remove(this.labelScore);
            this.labelScore = game.add.text(20, 40, "Timer: " + this.timer.toFixed(2), { font: "30px Arial", fill: "#ffffff" });         

        } 

        if (keyUp.isDown) {
            player.moveUp();
        }
        if (keyDown.isDown) {
            player.moveDown();
        }

        if (keyLeft.isDown) {
            player.moveLeft();
        }
        if (keyRight.isDown) {
            player.moveRight();
        }
    }
}

game.state.add('main', main_state);
game.state.start('main');