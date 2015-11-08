var game = new Phaser.Game(1200, 800, Phaser.AUTO, 'game_div');

var keyUp, keyDown, keyLeft, keyRight;

var player, person1;

var foodArray;
var food1, food2, food3, food4;

var score, timer, gameStatus;

var labelScore, labelTimer;

var main_state = {
    preload: function () {
        game.load.image('person', 'assets/Person.png');
        game.load.image('player', 'assets/Player.png');

        game.load.image('food', 'assets/food1.png');
        game.load.image('food', 'assets/food2.png');
        game.load.image('food', 'assets/food3.png');
        game.load.image('food', 'assets/food4.png');

        gameStatus = 'win';
    },

    create: function () {
        person1 = new Person(150, 150);
        person1.setImage(game, 'person');
        player = new Player(125, 250);
        player.setImage(game, 'player');


        //initialize ALL food in designated spots and assign to an array
        food1 = new Food(155, 165);
        food1.setImage(game, 'food');
        food2 = new Food(255, 165);
        food2.setImage(game, 'food');
        food3 = new Food(355, 165);
        food3.setImage(game, 'food');
        food4 = new Food(355, 65);
        food4.setImage(game, 'food');
        foodArray = [food1, food2, food3, food4]; 

        score = 0;
        timer = 10.0;
        labelScore = game.add.text(20, 10, "Score: " + score.toString(), { font: "30px Arial", fill: "#ffffff" });         
        labelTimer = game.add.text(20, 40, "Timer: " + timer.toString(), { font: "30px Arial", fill: "#ffffff" }); 

        keyUp = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        keyDown = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        keyLeft = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        keyRight = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);


    },

    update: function () {

        //iterates through all foods and deletes removes all images and foods that intersect with player
        for(var i = 0; i < foodArray.length; i++) {
            if(collides(player, foodArray[i])) {
                this.game.world.remove(foodArray[i].img);
                foodArray.splice(i, 1);
                score = score + 5;
                this.game.world.remove(labelScore);
                labelScore = game.add.text(20, 10, "Score: " + score, { font: "30px Arial", fill: "#ffffff" });         
                i = i - 1;
            }
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