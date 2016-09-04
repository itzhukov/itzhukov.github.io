import chunkBase from '../base/chunkBase';

export default class gameStateLevel extends Phaser.State {
	init() {
		this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = true;
		this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
	}

	preload() {
		this.cursors = this.game.input.keyboard.createCursorKeys();

		this.game.stage.backgroundColor = '#2d2d2d';
		this.game.physics.startSystem(Phaser.Physics.BOX2D);
		this.game.physics.box2d.restitution = 0.7;

		this.game.physics.box2d.gravity.y = 700;
		this.game.physics.box2d.setBoundsToWorld();
		this.game.physics.box2d.restitution = 0.6;
		this.game.load.spritesheet('bunny', './img/bunny/bunny.png', 60, 70, 7);

		this.game.load.image('mountains-back', './img/mountains-back.png');
		this.game.load.image('mountains-mid1', './img/mountains-mid1.png');
		this.game.load.image('mountains-mid2', './img/mountains-mid2.png');
		this.game.load.image('earth', './img/earth.png');
		this.game.load.audio('pop', './audio/pop.mp3');
		this.isFlying = false;
		this.startPlatform = 350;
	}

	create() {
		var rectangle = new Phaser.Physics.Box2D.Body(this.game, null, this.game.world.centerX, this.startPlatform, 0.5);
		rectangle.setRectangle(this.game.width, 50, 0, 0, 0);
		this.game.pop = this.game.add.audio('pop', 0.6);

		this.mountainsBack = this.game.add.tileSprite(
			0,
			this.game.height - this.game.cache.getImage('mountains-back').height + 70,
			this.game.width, 
			this.game.cache.getImage('mountains-back').height, 
			'mountains-back'
		);
		this.mountainsMid1 = this.game.add.tileSprite(
			0,
			this.game.height - this.game.cache.getImage('mountains-mid1').height + 70,
			this.game.width, 
			this.game.cache.getImage('mountains-mid1').height, 
			'mountains-mid1'
		);

		this.mountainsMid2 = this.game.add.tileSprite(
			0,
			this.game.height - this.game.cache.getImage('mountains-mid2').height + 70,
			this.game.width, 
			this.game.cache.getImage('mountains-mid2').height, 
			'mountains-mid2'
		);

		this.earth = this.game.add.tileSprite(
			0,
			this.startPlatform-50,
			this.game.cache.getImage('earth').width,
			this.game.cache.getImage('earth').height,
			'earth'
		);
		this.earth.scale.set(0.4);

		this.bunny = this.game.add.sprite(this.game.world.centerX, this.startPlatform-30, 'bunny');
		this.bunny.frame = 0;
		this.game.physics.box2d.enable(this.bunny);
		this.bunny.animations.add('blink', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
		this.bunny.animations.play('blink', 2, true);
		this.bunny.smoothed = true;
		this.bunny.anchor.set(0.42, 0.68);
		this.bunny.body.setCircle(22);

		this.game.input.onDown.add(this.jump, this);

		this.game.camera.follow(this.bunny, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
		this.game.camera.showBorder = true;
	}

	jump() {
		let bunnyY = parseInt(this.bunny.body.y);
		if ( bunnyY >= this.startPlatform-56 && bunnyY <= this.startPlatform-48 ){
			this.bunny.body.applyForce(0, -300);
			this.game.pop.play();
		}
	}

	update() {
		let bunnyY = parseInt(this.bunny.body.y);

		if (bunnyY != this.startPlatform-48 ) {
			this.isFlying = true;
		} else {
			this.isFlying = false;
		}
		if (this.isFlying){
			this.mountainsBack.tilePosition.x -= 0.3;
			this.mountainsMid1.tilePosition.x -= 0.7;
			this.mountainsMid2.tilePosition.x -= 1.9;
			this.earth.tilePosition.x -= 10;
		}
	}

	render() {
		// this.game.debug.box2dWorld();
		// this.game.debug.cameraInfo(this.game.camera, 32, 32);
	}
}