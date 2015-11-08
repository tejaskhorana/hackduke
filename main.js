var game = new Phaser.Game(800, 800, Phaser.AUTO, 'game_div');

var bmd;

var keyUp, keyDown, keyLeft, keyRight;

var player, person1;

var main_state = {
    preload: function () {
        game.load.image('person', 'assets/Person.png');
        game.load.image('player', 'assets/Player.png');
        game.load.image('walls', 'assets/level1Walls.bmp');
        game.load.image('background', 'assets/background.png');
        this.gameStatus = 'win';
    },

    create: function () {
        bmd = game.make.bitmapData(4000, 4000);
        bmd.draw(game.cache.getImage('walls'), 0, 0);
        bmd.update();

        game.add.tileSprite(0, 0, 4000, 4000, 'background');

        game.world.setBounds(0, 0, 4000, 4000);

        game.physics.startSystem(Phaser.Physics.P2JS);

        person1 = new Person(150, 150);
        person1.setImage(game, 'person');
        player = new Player(1600, 1600);
        player.setImage(game, 'player');

        game.physics.p2.enable(player.img);

        cursors = game.input.keyboard.createCursorKeys();

        game.camera.follow(player.img);

        this.score = 0;
        this.timer = 10.0;
        this.labelScore = game.add.text(20, 10, "Score: " + this.score.toString(), { font: "30px Arial", fill: "#ffffff" });         
        this.labelScore = game.add.text(20, 40, "Timer: " + this.timer.toString(), { font: "30px Arial", fill: "#ffffff" }); 
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
    }//,

    //render: function() {
        //game.debug.cameraInfo(game.camera, 32, 32);
        //game.debug.spriteCoords(player, 32, 500);
    //}
}

game.state.add('main', main_state);
game.state.start('main');