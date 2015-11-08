var game = new Phaser.Game(1200, 800, Phaser.AUTO, 'game_div');

var bmd;

var keyEnter;

var player;

var level, maxLevels;

var personArray;
var person1, person2, person3, person4;

var foodArray;
var food1, food2, food3, food4, food5, food6, food7, food8;

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
        game.load.image('food5', 'assets/food5.png');

        game.load.image('background', 'assets/background.png');
        game.load.image('background2', 'assets/background2.png');


        game.load.image('transitionBackground', 'assets/transitionBackground.png');

        game.load.image('deathBackground', 'assets/deathBackground.png');
        game.load.image('liveBackground', 'assets/liveBackground.png');
        game.load.image('walls1', 'assets/level1Walls.bmp');
        game.load.image('walls2', 'assets/level2Walls.bmp');
        game.load.image('walls3', 'assets/level3Walls.bmp');
        game.load.image('walls4', 'assets/level4Walls.bmp');
        game.load.image('walls5', 'assets/level5Walls.bmp');
        game.load.image('level1bg', 'assets/level1bg.png');
        game.load.image('level2bg', 'assets/level2bg.png');
        game.load.image('level3bg', 'assets/level3bg.png');
        game.load.image('level4bg', 'assets/level4bg.png');
        game.load.image('level5bg', 'assets/level5bg.png');
    },


    /*
        Populate the map. Will make an external call as
         this will be called repeatedly as the levels increase.
    */
    create: function () {
        game.world.setBounds(0, 0, 4000, 4000);
        game.physics.startSystem(Phaser.Physics.P2JS);

        // Set up keyEnter
        keyEnter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        cursors = game.input.keyboard.createCursorKeys();

        //SET UP rest of map. Will change per level
        gameStatus = "intro";
        maxLevels = 4;

        //RESET THIS DURING CLEAN UP!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //UNCOMMENT PLZZZZZZZZZZ!!!
        introScreenCounter = 0;
        pokemonTextCounter = 0;
        initializeAllPokemonText();
        currentPokemonText = pokemonTextOne;
        //game.add.sprite(0, 0, 'background');
    },

    update: function () {
        
            if (gameStatus == "intro") {


                if (keyEnter.isDown) {

                        level = 1;
                        gameStatus = "next_level";             
                

                } else {
                    
                    //alternate the images!
                    introScreenCounter = introScreenCounter + 1;

                    if(introScreenCounter == 1) {
                        clearMap();
                        var bg = game.add.sprite(0,0,'background');
                        bg.fixedToCamera = true;
                    } else if (introScreenCounter == 45) {
                        clearMap();
                        var bg = game.add.sprite(0,0,'background2');
                        bg.fixedToCamera = true;
                    } else if (introScreenCounter == 90) {
                        clearMap();
                        var bg = game.add.sprite(0,0,'background');
                        bg.fixedToCamera = true;
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
                //NEW CHANGE
                clearMap();
                var bg = game.add.sprite(0,0,'liveBackground');
                bg.fixedToCamera = true;
                if(keyEnter.isDown) {
                    resetGame();                    
                }
            } else if (gameStatus === "lose") {
                //NEW CHANGE
                clearMap();
                var bg = game.add.sprite(0,0,'deathBackground');
                bg.fixedToCamera = true;
                if(keyEnter.isDown) {
                    resetGame();                    
                }
            } else if (gameStatus == "next_level") {
                //already incremented level in checkHasWon
                if(pokemonTextCounter == 0) {
                    clearMap();
                    var bg = game.add.sprite(0,0,'transitionBackground');
                    bg.fixedToCamera = true;
                }

                if(pokemonTextCounter < currentPokemonText.length + 1) {
                    //NEW CHANGE
                    labelFoodRequired = game.add.text(175, 140, currentPokemonText.substring(0,pokemonTextCounter), { font: "24px Telugu", fill: "#000000" });         
                    labelFoodRequired.fixedToCamera = true;
                    
                    pokemonTextCounter++;
                }

                if(keyEnter.isDown && !(pokemonTextCounter < currentPokemonText.length + 1)) {
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
//NEW CHANGE
function resetGame() {
        introScreenCounter = 0;
        pokemonTextCounter = 0;
        currentPokemonText = pokemonTextOne;
        gameStatus = "intro";
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
    pokemonTextOne = "Welcome to the top level of the Tower! In this\n world, Dante is a rich businessman and founder\n of a massive software company called\n Macrosoft. He has several key executives\n working underneath him and therefore only has\n to work a few hours a day. He has\n plenty of money and time, free to enjoy the luxu-\nries of the Tower. His house is nice and spacious,\n the epitome of modern decadence.\n Today, Dante has to eat three meals, put in a\n few hours of work at the Macrosoft building next\n door, and just enjoy the town before he has to\n head back home to catch some sleep.\n Good luck!.... HIT ENTER";
    pokemonTextTwo = "Welcome to the second level of the Tower! In\n this world, Dante is a branch manager of\n Moontrust, the only bank in the Tower. he has\n a couple of employees working for him, but he\n still has to work one shift a day. he is fairly well\n off, and he and his wife enjoy their life in the\n Tower. his house is pretty nice, though they\n have to share the other half with another resi-\n dent. \n Today, Dante just has to eat three meals, \nput in some hours of work at the bank, and \nmaybe have a short walk around town before \nhe heads back home to go to bed. Good luck!\n.... HIT ENTER";
    pokemonTextThree = "Welcome to the third level of the Tower. In\n this world, Dante is a clerk at the grocery\n store, Jingles. He works two shifts and is\n under a fair amount of stress every day.\n He can barely support his family of\n three and he barely has time to eat,\n let alone enjoy himself.\n His family share the house with three other\n families, and it is often dank and cramped.\n Today, Dante has to eat three meals, put in\n several hours of work at the store, and make\n sure he gets everything done in time before\n he needs to sleep. Good luck.... HIT ENTER";
    pokemonTextFour = "Welcome to the bottom level of the Tower. In this\n world, Dante is a poor waiter at Outfront, a\n restaurant in the corner of town. he alone has to\n support his family of four, and therefore he works\n the entire day at the restaurant. he does not even\n have enough money to afford to eat there; he has to\n get his food at the store after work before it closes.\n Dante is often stressed and tired, but there is nothing\n he can do about it. his family shares their meager\n quarters with six other families in their building.\n Today, Dante just has to eat three meals, work at\n the restaurant for most of the day, go to the store\n before it closes, and make it back home to get\n enough sleep for the next day.\n Good luck! .... HIT ENTER!";
}

function clearMap() {
    game.world.removeAll();
}

function checkHasWon() {
    if(foodCollected >= foodRequired) {
        if(level == 4) {
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
            foodCollected = foodCollected + 7;
            this.game.world.remove(labelFoodRequired);
            labelFoodRequired = game.add.text(20, 10, "Food Collected: " + foodCollected + "/" + foodRequired, { font: "30px Arial", fill: "#ffffff" });         
            labelFoodRequired.fixedToCamera = true;
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
    labelTimer.fixedToCamera = true;
}

/*
    Allows keystrokes to manipulate character in game
*/
function playControl() {

    player.img.body.setZeroVelocity();

    if (cursors.up.isDown) {
        player.moveUp(bmd);
    }
    else if (cursors.down.isDown) {
        player.moveDown(bmd);
    }

    if (cursors.left.isDown) {
        player.moveLeft(bmd);
    }
    else if (cursors.right.isDown) {
        player.moveRight(bmd);
    }
}


function collides(a, b)
{
    if(a == null || b == null) {
        return false;
    }
    if (a.img.x < b.img.x + b.img.width &&
        a.img.x + a.img.width > b.img.x &&
        a.img.y < b.img.y + b.img.height &&
        a.img.y + a.img.height > b.img.y) return true;
}

/*
    initial populating of map before every level
*/
function populateMap() {

        bmd = game.make.bitmapData(4000, 4000);
        bmd.draw(game.cache.getImage('walls1'), 0, 0);
        bmd.update();

        game.add.tileSprite(0, 0, 4000, 4000, 'level1bg');

        //initialize ALL persons in designated spots and assign to an array
        person1 = new Person(1655, 2700, 0,300, 0, 2);
        person1.setImage(game, 'person1');
        person2 = new Person(2600, 1350, 250, 250, 1, 1);
        person2.setImage(game, 'person2');
        person3 = new Person(1200, 1600, 300, 0, 2, 0);
        person3.setImage(game, 'person3');
        person4 = new Person(1570, 900, 0, 400, 0, 3);
        person4.setImage(game, 'person1');        
        person5 = new Person(3450, 1630, 300, 0, 2, 0);
        person5.setImage(game, 'person2');

        personArray = [person1, person2, person3, person4, person5];

        player = new Player(900, 3800);
        player.setImage(game, 'player');
        game.physics.p2.enable(player.img);
        game.camera.follow(player.img);

    if(level == 1) {
        
        foodRequired = 20;
        foodCollected = 0;
        labelFoodRequired = game.add.text(20, 10, "Food Collected: " + foodCollected + "/" + foodRequired, { font: "30px Arial", fill: "#ffffff" });         
        labelFoodRequired.fixedToCamera = true;

        timer = 50.0;
        labelTimer = game.add.text(20, 40, "Timer: " + timer.toString(), { font: "30px Arial", fill: "#ffffff" }); 

        //initialize ALL food in designated spots and assign to an array
        food1 = new Food(2923, 340);
        food1.setImage(game, 'food1');
        food2 = new Food(2750, 330);
        food2.setImage(game, 'food2');
        food3 = new Food(1190, 827);
        food3.setImage(game, 'food3');
        food4 = new Food(1737, 370);
        food4.setImage(game, 'food4');
        food5 = new Food(300, 2648);
        food5.setImage(game, 'food5');
        food6 = new Food(100, 2584);
        food6.setImage(game, 'food1');
        food7 = new Food(1487, 2689);
        food7.setImage(game, 'food2');
        food8 = new Food(322, 3702);
        food8.setImage(game, 'food3');
        food9 = new Food(250, 3812);
        food9.setImage(game, 'food4');
        food10 = new Food(400, 3480);
        food10.setImage(game, 'food5');
        foodArray = [food1, food2, food3, food4, food5, food6, food7, food8, food9, food10];          

    } else if (level == 2) {

        foodRequired = 25;
        foodCollected = 0;
        labelFoodRequired = game.add.text(20, 10, "Food Collected: " + foodCollected + "/" + foodRequired, { font: "30px Arial", fill: "#ffffff" });         
        labelFoodRequired.fixedToCamera = true;

        timer = 45.0;
        labelTimer = game.add.text(20, 40, "Timer: " + timer.toString(), { font: "30px Arial", fill: "#ffffff" }); 


        food1 = new Food(2923, 340);
        food1.setImage(game, 'food1');
        food2 = new Food(2750, 330);
        food2.setImage(game, 'food2');
        food3 = new Food(1190, 827);
        food3.setImage(game, 'food3');
        food4 = new Food(1737, 370);
        food4.setImage(game, 'food4');
        food5 = new Food(300, 2648);
        food5.setImage(game, 'food5');
        food6 = new Food(100, 2584);
        food6.setImage(game, 'food1');
        food7 = new Food(1487, 2689);
        food7.setImage(game, 'food2');
        foodArray = [food1, food2, food3, food4, food5, food6, food7];          
    } else if (level == 3) {

        foodRequired = 40;
        foodCollected = 0;
        labelFoodRequired = game.add.text(20, 10, "Food Collected: " + foodCollected + "/" + foodRequired, { font: "30px Arial", fill: "#ffffff" });         
        labelFoodRequired.fixedToCamera = true;

        timer = 35.0;
        labelTimer = game.add.text(20, 40, "Timer: " + timer.toString(), { font: "30px Arial", fill: "#ffffff" }); 

        food1 = new Food(2923, 340);
        food1.setImage(game, 'food1');
        food2 = new Food(2750, 330);
        food2.setImage(game, 'food2');
        food3 = new Food(1190, 827);
        food3.setImage(game, 'food3');
        food4 = new Food(1737, 370);
        food4.setImage(game, 'food4');
        food5 = new Food(300, 2648);
        food5.setImage(game, 'food5');
        food6 = new Food(100, 2584);
        food6.setImage(game, 'food1');
        food7 = new Food(1487, 2689);
        food7.setImage(game, 'food2');
        foodArray = [food1, food2, food3, food4, food5, food6, food7];          

    } else if (level == 4) {

        food1 = new Food(2923, 340);
        food1.setImage(game, 'food1');
        food2 = new Food(2750, 330);
        food2.setImage(game, 'food2');
        food3 = new Food(1190, 827);
        food3.setImage(game, 'food3');
        food4 = new Food(1737, 370);
        food4.setImage(game, 'food4');
        food5 = new Food(300, 2648);
        food5.setImage(game, 'food5');
        food6 = new Food(100, 2584);
        food6.setImage(game, 'food1');
        food7 = new Food(1487, 2689);
        food7.setImage(game, 'food2');

        foodArray = [food1, food2, food3, food4, food5, food6, food7];          

        foodRequired = 35;
        foodCollected = 0;
        labelFoodRequired = game.add.text(20, 10, "Food Collected: " + foodCollected + "/" + foodRequired, { font: "30px Arial", fill: "#ffffff" });         
        labelFoodRequired.fixedToCamera = true;

        timer = 20.0;
        labelTimer = game.add.text(20, 40, "Timer: " + timer.toString(), { font: "30px Arial", fill: "#ffffff" }); 

    } 

}

game.state.add('main', main_state);
game.state.start('main');