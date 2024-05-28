import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { MainMenu } from './scenes/MainMenu';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';

export const sizes = {
    width: 1024,
    height: 768,
};

export const defaultSpeed = 300;


export const phaserConfig: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: sizes.width,
    height: sizes.height,
    parent: 'game-container',
    backgroundColor: '#028af8',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 1024 / 2, y: 0 },
            debug: false
        }
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainGame,
        GameOver
    ]
};

const StartGame = (parent: string) => {

    return new Game({ ...phaserConfig, parent });

}

export default StartGame;
