import gameStateMenu from './states/gameStateMenu'
import gameStateShop from './states/gameStateShop'
import gameStateLevel from './states/gameStateLevel'

class Game extends Phaser.Game {
	constructor() {
		super(900, 506.25, Phaser.AUTO, null, null);

		this.state.add('gameStateLevel', gameStateLevel, false);
		this.state.add('gameStateMenu', gameStateMenu, false);
		this.state.add('gameStateShop', gameStateShop, false);

		this.state.start('gameStateMenu');
	}
}

new Game();
