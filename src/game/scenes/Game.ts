import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { sizes } from '../main';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    spaceShip: any;
    point: Phaser.GameObjects.Text;
    configWidth: number;
    configHeight: number;
    defaultSpeed: number;
    cursor: any;
    bullet: any;
    bulletGrp: any;

    constructor() {
        super('Game');
    }

    preload() {
        this.load.image('background', 'assets/game-bg.jpg');

        // spaceships
        this.load.image('spaceshipLevel1', './assets/spaceships/level-1.png');
        this.load.image('spaceshipLevel2', './assets/spaceships/level-2.png');
        this.load.image('spaceshipLevel3', './assets/spaceships/level-3.png');

        // Bullets
        this.load.image('bullet', './assets/bullet.png');
        this.load.image('bullet2', './assets/bullet-2.png');


        // Enemies
        this.load.image('enemy1', './assets/enemies/enemy-1.png');
        this.load.image('enemy2', './assets/enemies/enemy-2.png');
        this.load.image('enemy3', './assets/enemies/enemy-3.png');
        this.load.image('enemy4', './assets/enemies/enemy-4.png');
        this.load.image('enemy5', './assets/enemies/enemy-5.png');

        // Bosses
        this.load.image('boos1', './assets/bosses/boss-1.png');
        this.load.image('boos2', './assets/bosses/boss-2.png');
        this.load.image('boos3', './assets/bosses/boss-3.png');
        this.load.image('boos4', './assets/bosses/boss-4.png');
        this.load.image('boos5', './assets/bosses/boss-5.png');



    }


    create() {
        this.camera = this.cameras.main;
        this.configWidth = Number(sizes?.width) || 0;
        this.configHeight = Number(sizes?.height) || 0;
        this.defaultSpeed = 300

        // background
        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.8);

        // space ship 
        this.spaceShip = this.physics.add.sprite(this.configWidth / 2, this.configHeight - 100, 'spaceshipLevel1').setScale(0.1);
        this.spaceShip.setImmovable(false);
        this.spaceShip.body.allowGravity = false;
        this.spaceShip.setCollideWorldBounds(true);

        // Bullet
        // this.bullet = this.physics.add.sprite(this.spaceShip.x, this.spaceShip.y - 30, "bullet").setScale(0.02)

        // this.bullet = this.physics.add.image(0, 0, "bullet").setOrigin(0, 0);
        // this.bullet.rotation = 90;
        // this.bullet.setMaxVelocity(0, this.defaultSpeed);

        this.bulletGrp = this.physics.add.group()


        this.cursor = this.input.keyboard?.createCursorKeys();


        EventBus.emit('current-scene-ready', this);
    }


    update(time: number, delta: number): void {
        const { left, right, up, down } = this.cursor;


        this.bullet = this.physics.add.sprite(this.spaceShip.x, this.spaceShip.y - 30, "bullet").setScale(0.02)


        this.bulletGrp.add(this.bullet)
        this.bulletGrp.children.each(function (item: any) {
            // item.x = item.x
            item.y = item.y - 20
        })

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

    getRandomX() {

    }

    changeScene() {

        // this.scene.start('GameOver');
    }


}
