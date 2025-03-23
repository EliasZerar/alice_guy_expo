import { Scene } from 'phaser';

export class HudScene extends Scene {
    constructor() {
        super({ key: 'HudScene' });
        this.objectCountText = null; 
        this.timeText = null; 
    }

    create() {
        const { width } = this.sys.game.config;

        this.objectCountText = this.add.text(20, 20, 'Objets: 0/5', {
            font: '30px Arial',
            fill: '#ffffff'
        }).setScrollFactor(0);

        this.timeText = this.add.text(width - 200, 20, '0:00', {
            font: '30px Arial',
            fill: '#ffffff'
        }).setScrollFactor(0);
    }

    updateObjectCount(count, total) {
        if (this.objectCountText) {
            this.objectCountText.setText(`Objets: ${count}/${total}`);
        }
    }

    updateTime(elapsedTime) {
        if (this.timeText) {
            const minutes = Math.floor(elapsedTime / 60);
            const seconds = elapsedTime % 60;
            const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
            this.timeText.setText(`${minutes}:${formattedSeconds}`);
        }
    }

    reset() {
        if (this.objectCountText) {
            this.objectCountText.setText('Objets: 0/5');
        }
        if (this.timeText) {
            this.timeText.setText('0:00');
        }
    }
}