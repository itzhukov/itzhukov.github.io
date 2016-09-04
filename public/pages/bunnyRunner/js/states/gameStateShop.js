export default class gameStateShop extends Phaser.State {
	init() {
		this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = true;
		this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
	}

	preload() {
		this.game.load.image('buttonMenu', './img/buttons/buttonMenu.png');
	}

	create() {
		this.game.stage.backgroundColor = '#337799';

		this.game.add.button(
			this.game.world.centerX,
			this.game.world.centerY,
			'buttonMenu',
			this.actionStartMenu,
			this, 2, 1, 0)
		.anchor.set(0.5);
	}

	actionStartMenu() {
		this.state.start('gameStateMenu');
	}
}