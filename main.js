var game = new Phaser.Game(1200, 800, Phaser.AUTO, 'game_div');

var main_state = {
    preload: function () {
        game.load.image('person', 'assets/Person.png');
        game.load.image('player', 'assets/Player.png');
    },

    create: function () {
        this.person1 = new Person(150, 150);
        this.person1.setImage(game, 'person');
        this.player = new Person(125, 250);
        this.player.setImage(game, 'player');
    },

    update: function () {
    }
}

game.state.add('main', main_state);
game.state.start('main');