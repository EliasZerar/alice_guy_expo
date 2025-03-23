import { Scene } from 'phaser';
import settings from '../../assets/settings.svg';

export class SettingsScene extends Scene {
    constructor() {
        super({ key: 'SettingsScene' });
    }

    preload() {
        this.load.image('settings', settings);
    }

    create() {
        this.input.setDefaultCursor('default');
        const { width, height } = this.sys.game.config;

        this.add.text(width / 2, 120, 'Commandes', { font: '40px oddini-bold', fill: '#ea5b28' })
            .setOrigin(0.5);

        this.add.image(width / 2, height / 2, 'settings')
            .setScale(0.8);

        const buttonWidth = 100;
        const buttonHeight = 40;
        const borderRadius = 10;

        const returnButtonBg = this.add.graphics();
        returnButtonBg.fillStyle(0xffffff, 1);
        returnButtonBg.fillRoundedRect(width / 2 - buttonWidth / 2, height - 70, buttonWidth, buttonHeight, borderRadius);

        let isHovering = false;

        const returnButtonText = this.add.text(width / 2, height - 50, 'Retour', { 
            font: '20px satoshi-variable', 
            fill: '#000000',
        }).setOrigin(0.5).setInteractive();

        returnButtonBg.setInteractive(new Phaser.Geom.Rectangle(width / 2 - buttonWidth / 2, height - 70, buttonWidth, buttonHeight), Phaser.Geom.Rectangle.Contains);

        returnButtonBg.on('pointerdown', () => this.scene.start('MenuScene'));
        returnButtonText.on('pointerdown', () => this.scene.start('MenuScene'));

        returnButtonBg.on('pointerover', () => {
            isHovering = true;
            returnButtonBg.clear();
            returnButtonBg.fillStyle(0xcdcdcd, 1); 
            returnButtonBg.fillRoundedRect(width / 2 - buttonWidth / 2, height - 70, buttonWidth, buttonHeight, borderRadius);
            this.input.setDefaultCursor('pointer');
        });
        returnButtonBg.on('pointerout', () => {
            isHovering = false;
            returnButtonBg.clear();
            returnButtonBg.fillStyle(0xffffff, 1); 
            returnButtonBg.fillRoundedRect(width / 2 - buttonWidth / 2, height - 70, buttonWidth, buttonHeight, borderRadius);
            this.input.setDefaultCursor('default');
        });
        returnButtonText.on('pointerover', () => {
            if (!isHovering) {
                returnButtonBg.emit('pointerover');
            }
            this.input.setDefaultCursor('pointer');
        });
        returnButtonText.on('pointerout', () => {
            if (isHovering) {
                returnButtonBg.emit('pointerout');
            }
            this.input.setDefaultCursor('default');
        });

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.start('MenuScene');
        });

        this.input.keyboard.on('keydown-ENTER', () => {
            this.scene.start('MenuScene');
        });
    }

    waitForKeyPress(action, textElement) {
        this.input.keyboard.once('keydown', (event) => {
            window.keyBindings[action] = event.key.toUpperCase();
            textElement.setText(`${action.toUpperCase()} : ${window.keyBindings[action]}`);
        });
    }
}
