export default class gameStateMenu extends Phaser.State {
	init() {
		this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = true;
		this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
	}

	preload() {
		this.game.load.image('buttonStartGame', './img/buttons/buttonStartGame.png');
		this.game.load.image('map_forest', './img/map_forest.jpg');
	}

	create() {
		this.game.stage.backgroundColor = '#337799';
		this.game.add.tileSprite(0, 0, 1000, 1000, 'map_forest').scale.set(0.5);

		this.game.add.button(
			this.game.world.centerX,
			50,
			'buttonStartGame',
			this.actionStartGame,
			this, 2, 1, 0)
		.anchor.set(0.5);
	this.state.start('gameStateLevel');
	}

	actionStartGame() {
		this.state.start('gameStateLevel');
	}
}