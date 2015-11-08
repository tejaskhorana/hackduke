var game = new Phaser.Game(1200, 800, Phaser.AUTO, 'game_div');

var keyUp, keyDown, keyLeft, keyRight;

var player;

var personArray;
var person1, person2, person3, person4;

var foodArray;
var food1, food2, food3, food4;

var score, timer, gameStatus;

var labelScore, labelTimer;

var main_state = {
    preload: function () {

        game.load.image('person1', 'assets/person1.png');
        game.load.image('person2', 'assets/person2.png');
        game.load.image('person3', 'assets/person3.png');
        game.load.image('person4', 'assets/person4.png');



        game.load.image('player', 'assets/Player.png');

        game.load.image('food1', 'assets/food1.png');
        game.load.image('food2', 'assets/food2.png');
        game.load.image('food3', 'assets/food3.png');
        game.load.image('food4', 'assets/food4.png');

        gameStatus = 'win';
    },

    create: function () {

        //initialize ALL persons in designated spots and assign to an array
        person1 = new Person(150, 150, 60, 60, (Math.random()-.5)*20, (Math.random()-.5)*20);
        person1.setImage(game, 'person1');
        person2 = new Person(350, 250, 70, 70, (Math.random()-.5)*50, (Math.random()-.5)*50);
        person2.setImage(game, 'person2');
        person3 = new Person(550, 350, 100, 100, (Math.random()-.5)*50, (Math.random()-.5)*100);
        person3.setImage(game, 'person3');
        person4 = new Person(330, 420, 80, 80, (Math.random()-.5)*50, (Math.random()-.5)*90);
        person4.setImage(game, 'person4');
        personArray = [person1, person2, person3, person4];


        player = new Player(125, 250);
        player.setImage(game, 'player');


        //initialize ALL food in designated spots and assign to an array
        food1 = new Food(155, 165);
        food1.setImage(game, 'food1');
        food2 = new Food(255, 165);
        food2.setImage(game, 'food2');
        food3 = new Food(355, 165);
        food3.setImage(game, 'food3');
        food4 = new Food(355, 65);
        food4.setImage(game, 'food4');
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

        //handles movement of all Persons on map
        for(var i = 0; i < personArray.length ;i++) {
            if(personArray[i].x < personArray[i].lowerXBound || personArray[i].x > personArray[i].upperXBound) {
                personArray[i].xVelocity = personArray[i].xVelocity*-1;
            }
            if(personArray[i].y < personArray[i].lowerYBound || personArray[i].y > personArray[i].upperYBound) {
                personArray[i].yVelocity = personArray[i].yVelocity*-1;
            }
            console.log(personArray[i].xVelocity);
            personArray[i].x += 2*personArray[i].xVelocity;
            personArray[i].y += 2*personArray[i].yVelocity;
            this.game.world.remove(personArray[i].img);
            personArray[i].setImage(game, personArray[i].imgName.toString());
        }

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

        //dealing with timer        
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