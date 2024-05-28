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

        this.background = this.add.image(512, 384, 'background');
        this.spaceShip = this.physics.add.sprite(this.configWidth / 2, this.configHeight - 100, 'spaceshipLevel1').setScale(0.1);
        this.spaceShip.setImmovable(false);
        this.spaceShip.body.allowGravity = false;


        EventBus.emit('current-scene-ready', this);
    }

    changeScene() {

        // this.scene.start('GameOver');
    }
}
