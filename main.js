var game = new Phaser.Game(1200, 800, Phaser.AUTO, 'game_div');

var main_state = {
    preload: function () {
        game.load.image('person', 'assets/Person.png');
        game.load.image('player', 'assets/Player.png');
        this.gameStatus = 'win';
    },

    create: function () {
        this.person1 = new Person(150, 150);
        this.person1.setImage(game, 'person');
        this.player = new Person(125, 250);
        this.player.setImage(game, 'player');

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
    }
}

game.state.add('main', main_state);
game.state.start('main');