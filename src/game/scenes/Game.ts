import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { phaserConfig } from '../main';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    spaceShip: any;
    point: Phaser.GameObjects.Text;
    configWidth: number;
    configHeight: number;
    defaultSpeed: number;
    cursor: any;

    constructor() {
        super('Game');
    }

    preload() {
        this.load.image('background', 'assets/game-bg.jpg');
        this.load.image('spaceshipLevel1', './assets/spaceships/level-1.png');



    }


    create() {
        this.camera = this.cameras.main;
        this.configWidth = Number(phaserConfig?.width) || 0;
        this.configHeight = Number(phaserConfig?.height) || 0;
        this.defaultSpeed = 300

        // background
        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.8);

        // space ship 
        this.spaceShip = this.physics.add.sprite(this.configWidth / 2, this.configHeight - 100, 'spaceshipLevel1').setScale(0.1);
        this.spaceShip.setImmovable(false);
        this.spaceShip.body.allowGravity = false;
        this.spaceShip.setCollideWorldBounds(true);

        this.cursor = this.input.keyboard?.createCursorKeys();


        EventBus.emit('current-scene-ready', this);
    }


    update(time: number, delta: number): void {
        const { left, right, up, down } = this.cursor;

        if (left.isDown) {
            this.spaceShip.setVelocityX(-this.defaultSpeed);
        } else if (right.isDown) {
            this.spaceShip.setVelocityX(this.defaultSpeed)
        } else if (up.isDown) {
            this.spaceShip.setVelocityY(-this.defaultSpeed)
        } else if (down.isDown) {
            this.spaceShip.setVelocityY(this.defaultSpeed)
        } else {
            this.spaceShip.setVelocityX(0)
            this.spaceShip.setVelocityY(0)
        }
    }


    changeScene() {

        // this.scene.start('GameOver');
    }


}
