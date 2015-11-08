var game = new Phaser.Game(1200, 800, Phaser.AUTO, 'game_div');

var keyUp, keyDown, keyLeft, keyRight;

var player, person1, food1;

var score, timer, gameStatus;

var labelScore, labelTimer;

var main_state = {
    preload: function () {
        game.load.image('person', 'assets/Person.png');
        game.load.image('player', 'assets/Player.png');
        game.load.image('food', 'assets/food.png');
        gameStatus = 'win';
    },

    create: function () {
        person1 = new Person(150, 150);
        person1.setImage(game, 'person');
        player = new Player(125, 250);
        player.setImage(game, 'player');
        food1 = new Food(155, 165);
        food1.setImage(game, 'food');

        score = 0;
        timer = 10.0;
        labelScore = game.add.text(20, 10, "Score: " + score.toString(), { font: "30px Arial", fill: "#ffffff" });         
        labelTimer = game.add.text(20, 40, "Timer: " + timer.toString(), { font: "30px Arial", fill: "#ffffff" }); 

        keyUp = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        keyDown = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        keyLeft = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        keyRight = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        //key3 = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        //key3.onDown.add(addPineapple, this);

    },

    update: function () {


        if(collides(player, food1)) {
            this.game.world.remove(food1.img);
            food1 = null;
            score = score + 5;
            this.game.world.remove(labelScore);
            labelScore = game.add.text(20, 10, "Score: " + score, { font: "30px Arial", fill: "#ffffff" });         

            //remove reference to food1 in the future
        }

        if(timer > 0) {
            timer -= 1/60;
            this.game.world.remove(labelTimer);
            labelTimer = game.add.text(20, 40, "Timer: " + timer.toFixed(2), { font: "30px Arial", fill: "#ffffff" });         
        } else if (gameStatus == 'win') {
            gameStatus = 'lose';
            timer = 0;
            this.game.world.remove(labelTimer);
            labelTimer = game.add.text(20, 40, "Timer: " + timer.toFixed(2), { font: "30px Arial", fill: "#ffffff" });         

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


function collides(a, b)
{
    if(a == null || b == null) {
        return false;
    }
    if (a.x < b.x + b.img.width &&
        a.x + a.img.width > b.x &&
        a.y < b.y + b.img.height &&
        a.y + a.img.height > b.y) return true;
}


game.state.add('main', main_state);
game.state.start('main');