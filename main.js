var game = new Phaser.Game(1200, 800, Phaser.AUTO, 'game_div');

var keyUp, keyDown, keyLeft, keyRight, keyEnter;

var player;

var level, maxLevels;

var personArray;
var person1, person2, person3;

var foodArray;
var food1, food2, food3, food4;

var foodRequired, foodCollected, timer, gameStatus;

var labelFoodRequired, labelTimer;

var introScreenCounter;

var pokemonTextOne, pokemonTextTwo, pokemonTextThree, pokemonTextFour, pokemonTextFive, pokemonTextCounter, currentPokemonText;

var main_state = {

    /*
        load all required images into the program. One time use only.
    */
    preload: function () {

        game.load.image('person1', 'assets/person1.png');
        game.load.image('person2', 'assets/person2.png');
        game.load.image('person3', 'assets/person3.png');

        game.load.image('player', 'assets/Player.png');

        game.load.image('food1', 'assets/food1.png');
        game.load.image('food2', 'assets/food2.png');
        game.load.image('food3', 'assets/food3.png');
        game.load.image('food4', 'assets/food4.png');

        game.load.image('background', 'assets/background.png');
        game.load.image('background2', 'assets/background2.png');

    },


    /*
        Populate the map. Will make an external call as
         this will be called repeatedly as the levels increase.
    */
    create: function () {

        //SET UP KEYSTROKES for the entire game.
        keyUp = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        keyDown = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        keyLeft = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        keyRight = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        keyEnter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        //SET UP rest of map. Will change per level
        gameStatus = "intro";
        maxLevels = 5;

        //RESET THIS DURING CLEAN UP!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //UNCOMMENT PLZZZZZZZZZZ!!!
        introScreenCounter = 0;
        pokemonTextCounter = 0;
        initializeAllPokemonText();
        currentPokemonText = pokemonTextTwo;
        //game.add.sprite(0, 0, 'background');

    },

    update: function () {
        
            if (gameStatus == "intro") {


                if (keyEnter.isDown) {


                        level = 1;
                        clearMap();
                        populateMap();
                        gameStatus = "in_game";             
                    


                } else {
                    
                    //alternate the images!
                    introScreenCounter = introScreenCounter + 1;

                    if(introScreenCounter == 1) {
                        clearMap();
                        game.add.sprite(0,0,'background');
                    } else if (introScreenCounter == 45) {
                        clearMap();
                        game.add.sprite(0,0,'background2');
                    } else if (introScreenCounter == 90) {
                        clearMap();
                        game.add.sprite(0,0,'background');
                        introScreenCounter = 0;
                    }
                }
                


            }    
            else if(gameStatus == "in_game") {
                //move all people on map
                moveAllPeople();

                //check to see if player is on any food boxes
                checkAllFoods();

                //allow player to move
                playControl();

                //check to see if user has collected all adequate food
                checkHasWon();

                //update the timer
                updateTimer();

                //check to see if the user has lost
                checkHasLost();
            } else if (gameStatus == "win") {
                // go to end game page
                console.log("win");
            } else if (gameStatus === "lose") {
                console.log("lose");
            } else if (gameStatus == "next_level") {
                //already incremented level in checkHasWon
                if(pokemonTextCounter == 0) {
                    clearMap();
                }

                if(pokemonTextCounter < pokemonTextOne.length + 1) {
                    //LOLOLOL
                    labelFoodRequired = game.add.text(20, 10, currentPokemonText.substring(0,pokemonTextCounter), { font: "30px Arial", fill: "#ffffff" });         
                    pokemonTextCounter++;
                }

                if(keyEnter.isDown) {
                    clearMap();
                    populateMap();
                    gameStatus = "in_game";   
                    pokemonTextCounter = 0; 
                    nextPokemonText();                
                }


            } else if (gameStatus = "restart") {

            }
        }
}

function nextPokemonText() {
    if(currentPokemonText === pokemonTextOne) {
        currentPokemonText = pokemonTextTwo;
    } else if (currentPokemonText === pokemonTextTwo) {
        currentPokemonText = pokemonTextThree;
    }else if (currentPokemonText === pokemonTextThree) {
        currentPokemonText = pokemonTextFour;
    }else if (currentPokemonText === pokemonTextFour) {
        currentPokemonText = pokemonTextFive;
    }else if (currentPokemonText === pokemonTextFive) {
        currentPokemonText = pokemonTextTwo;
    }
}

function initializeAllPokemonText() {
    pokemonTextOne = "Swiggity Swooty: Level One";
    pokemonTextTwo = "I'm comin: Level Two";
    pokemonTextThree = "For dat: Level Three";
    pokemonTextFour = "boootay: Level Four";
    pokemonTextFive = "!!!: Level Five";
}

function clearMap() {
    game.world.removeAll();
}

function checkHasWon() {
    if(foodCollected >= foodRequired) {
        if(level == 5) {
            gameStatus = "win";
        } else {
            gameStatus = "next_level";
            level = level + 1;
        }
    }
}

function moveAllPeople() {
    //handles movement of all Persons on map
    for(var i = 0; i < personArray.length ;i++) {
        if(personArray[i].x < personArray[i].lowerXBound || personArray[i].x > personArray[i].upperXBound) {
            personArray[i].xVelocity = personArray[i].xVelocity*-1;
        }
        if(personArray[i].y < personArray[i].lowerYBound || personArray[i].y > personArray[i].upperYBound) {
            personArray[i].yVelocity = personArray[i].yVelocity*-1;
        }
        personArray[i].x += 2*personArray[i].xVelocity;
        personArray[i].y += 2*personArray[i].yVelocity;
        this.game.world.remove(personArray[i].img);
        personArray[i].setImage(game, personArray[i].imgName.toString());
    }
}

function checkAllFoods() {
    //iterates through all foods and deletes removes all images and foods that intersect with player
    for(var i = 0; i < foodArray.length; i++) {
        if(collides(player, foodArray[i])) {
            this.game.world.remove(foodArray[i].img);
            foodArray.splice(i, 1);
            foodCollected = foodCollected + 5;
            this.game.world.remove(labelFoodRequired);
            labelFoodRequired = game.add.text(20, 10, "Food Collected: " + foodCollected + "/" + foodRequired, { font: "30px Arial", fill: "#ffffff" });         
            i = i - 1;
        }
    }
}

/*
    updates whether lost with timer
*/
function checkHasLost() {
    if(timer == 0 && gameStatus == 'in_game') {
        gameStatus = 'lose';
    }
}

/*
    Allows Timer to update in game
*/
function updateTimer() {
        if(timer > 0) {
            timer -= 1/60;
            this.game.world.remove(labelTimer);
            labelTimer = game.add.text(20, 40, "Timer: " + timer.toFixed(2), { font: "30px Arial", fill: "#ffffff" });         
        } else if (gameStatus == 'in_game') {
            timer = 0;
            this.game.world.remove(labelTimer);
            labelTimer = game.add.text(20, 40, "Timer: " + timer.toFixed(2), { font: "30px Arial", fill: "#ffffff" });         
        }
}

/*
    Allows keystrokes to manipulate character in game
*/
function playControl() {
        //player control
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

/*
    initial populating of map before every level
*/
function populateMap() {

    if(level == 1) {
        foodRequired = 20;
        foodCollected = 0;
        labelFoodRequired = game.add.text(20, 10, "Food Collected: " + foodCollected + "/" + foodRequired, { font: "30px Arial", fill: "#ffffff" });         

        timer = 10.0;
        labelTimer = game.add.text(20, 40, "Timer: " + timer.toString(), { font: "30px Arial", fill: "#ffffff" }); 

        //initialize ALL persons in designated spots and assign to an array
        person1 = new Person(450, 450, 100, 40, (Math.random()-.5)*4, (Math.random()-.5)*5);
        person1.setImage(game, 'person1');
        person2 = new Person(350, 250, 70, 70, (Math.random()-.5)*5, (Math.random()-.5)*8);
        person2.setImage(game, 'person2');
        person3 = new Person(550, 350, 100, 100, (Math.random()-.5)*8, (Math.random()-.5)*5);
        person3.setImage(game, 'person3');

        personArray = [person1, person2, person3];

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
    } else if (level == 2) {
        foodRequired = 20;
        foodCollected = 0;
        labelFoodRequired = game.add.text(20, 10, "Food Collected: " + foodCollected + "/" + foodRequired, { font: "30px Arial", fill: "#ffffff" });         

        timer = 10.0;
        labelTimer = game.add.text(20, 40, "Timer: " + timer.toString(), { font: "30px Arial", fill: "#ffffff" }); 

        //initialize ALL persons in designated spots and assign to an array
        person1 = new Person(450, 450, 100, 40, (Math.random()-.5)*4, (Math.random()-.5)*5);
        person1.setImage(game, 'person1');
        person2 = new Person(350, 250, 70, 70, (Math.random()-.5)*5, (Math.random()-.5)*8);
        person2.setImage(game, 'person2');
        person3 = new Person(550, 350, 100, 100, (Math.random()-.5)*8, (Math.random()-.5)*5);
        person3.setImage(game, 'person3');

        personArray = [person1, person2, person3];

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
    } else if (level == 3) {
        foodRequired = 20;
        foodCollected = 0;
        labelFoodRequired = game.add.text(20, 10, "Food Collected: " + foodCollected + "/" + foodRequired, { font: "30px Arial", fill: "#ffffff" });         

        timer = 10.0;
        labelTimer = game.add.text(20, 40, "Timer: " + timer.toString(), { font: "30px Arial", fill: "#ffffff" }); 

        //initialize ALL persons in designated spots and assign to an array
        person1 = new Person(450, 450, 100, 40, (Math.random()-.5)*4, (Math.random()-.5)*5);
        person1.setImage(game, 'person1');
        person2 = new Person(350, 250, 70, 70, (Math.random()-.5)*5, (Math.random()-.5)*8);
        person2.setImage(game, 'person2');
        person3 = new Person(550, 350, 100, 100, (Math.random()-.5)*8, (Math.random()-.5)*5);
        person3.setImage(game, 'person3');

        personArray = [person1, person2, person3];

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
    } else if (level == 4) {
        foodRequired = 20;
        foodCollected = 0;
        labelFoodRequired = game.add.text(20, 10, "Food Collected: " + foodCollected + "/" + foodRequired, { font: "30px Arial", fill: "#ffffff" });         

        timer = 10.0;
        labelTimer = game.add.text(20, 40, "Timer: " + timer.toString(), { font: "30px Arial", fill: "#ffffff" }); 

        //initialize ALL persons in designated spots and assign to an array
        person1 = new Person(450, 450, 100, 40, (Math.random()-.5)*4, (Math.random()-.5)*5);
        person1.setImage(game, 'person1');
        person2 = new Person(350, 250, 70, 70, (Math.random()-.5)*5, (Math.random()-.5)*8);
        person2.setImage(game, 'person2');
        person3 = new Person(550, 350, 100, 100, (Math.random()-.5)*8, (Math.random()-.5)*5);
        person3.setImage(game, 'person3');

        personArray = [person1, person2, person3];

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
    } else if (level == 5) {
         foodRequired = 20;
        foodCollected = 0;
        labelFoodRequired = game.add.text(20, 10, "Food Collected: " + foodCollected + "/" + foodRequired, { font: "30px Arial", fill: "#ffffff" });         

        timer = 10.0;
        labelTimer = game.add.text(20, 40, "Timer: " + timer.toString(), { font: "30px Arial", fill: "#ffffff" }); 

        //initialize ALL persons in designated spots and assign to an array
        person1 = new Person(450, 450, 100, 40, (Math.random()-.5)*4, (Math.random()-.5)*5);
        person1.setImage(game, 'person1');
        person2 = new Person(350, 250, 70, 70, (Math.random()-.5)*5, (Math.random()-.5)*8);
        person2.setImage(game, 'person2');
        person3 = new Person(550, 350, 100, 100, (Math.random()-.5)*8, (Math.random()-.5)*5);
        person3.setImage(game, 'person3');

        personArray = [person1, person2, person3];

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
    }
}

game.state.add('main', main_state);
game.state.start('main');