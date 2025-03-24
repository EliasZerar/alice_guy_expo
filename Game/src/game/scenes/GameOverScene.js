import { Scene } from 'phaser';
import alice from '../../assets/alice.svg';

export class GameOverScene extends Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    preload() {
        this.load.image('alice', alice); 
    }

    init(data) {
        this.elapsedTime = Number(data.elapsedTime) || 0; 
        this.unlockedObjects = data.unlockedObjects || 0;
    }

    create() {
        this.input.setDefaultCursor('default');
        const { width, height } = this.sys.game.config;
        this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.8)');

        const gameOverText = this.add.text(width / 2, height / 5, 'Game Over', {
            font: '50px oddini-bold',
            fill: '#ea5b28',
        }).setOrigin(0.5);

        const aliceImage = this.add.image(width / 2 - 190, 150, 'alice').setScale(0.25); 
        aliceImage.setOrigin(0.5);

        const rulesText = 
            "Herbert Blaché vous a capturé avant que vous ne puissiez récupérer les objets d’Alice Guy.\n\n" +
            "Sans son héritage, tout s’effondre. Son studio disparaît et la Solax Company ferme définitivement ses portes...";

        this.add.text(width / 2, height / 1.9, rulesText, {
            fontSize: '20px',
            fill: '#FFFFFF',
            fontFamily: 'satoshi-variable',
            wordWrap: { width: 400, useAdvancedWrap: true },
            align: 'left'
        }).setOrigin(0.5);

        this.add.text(width / 2, height / 3, `Temps écoulé : ${Math.floor(this.elapsedTime / 60)}m ${this.elapsedTime % 60}s`, {
            fontSize: '30px',
            fill: '#FFFFFF',
            fontFamily: 'satoshi-variable',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        const buttonWidth = 150;
        const buttonHeight = 40;
        const borderRadius = 10;
        
        const closeButtonBg = this.add.graphics();
        closeButtonBg.fillStyle(0xffffff, 1);
        closeButtonBg.fillRoundedRect(width - 300 - buttonWidth / 2, height - 200 - buttonHeight / 2, buttonWidth, buttonHeight, borderRadius);

        let isHovering = false;
        
        const closeButtonText = this.add.text(width - 300, height - 200, 'Recommencer', {
            font: '18px satoshi-variable',
            fill: '#000000',
        }).setOrigin(0.5).setInteractive();
        
        closeButtonBg.setInteractive(new Phaser.Geom.Rectangle(width - 300 - buttonWidth / 2, height - 200 - buttonHeight / 2, buttonWidth, buttonHeight), Phaser.Geom.Rectangle.Contains);
        
        closeButtonBg.on('pointerdown', () => {
            this.scene.start('GameScene', { elapsedTime: 0 }); 
        });
        
        closeButtonText.on('pointerdown', () => {
            this.scene.start('GameScene', { elapsedTime: 0 }); 
        });
        
        this.input.keyboard.on('keydown-ENTER', () => {
            console.log('ENTER key pressed'); 
            this.scene.start('GameScene', { elapsedTime: 0 }); 
        });

        closeButtonText.on('pointerover', () => {
            if (!isHovering) {
                closeButtonBg.emit('pointerover');  
            }
            this.input.setDefaultCursor('pointer');
        });
        closeButtonText.on('pointerout', () => {
            if (isHovering) {
                closeButtonBg.emit('pointerout');
            }
            this.input.setDefaultCursor('default');
        });
        
        closeButtonBg.on('pointerover', () => {
            isHovering = true;
            closeButtonBg.clear();
            closeButtonBg.fillStyle(0xcdcdcd, 1); 
            closeButtonBg.fillRoundedRect(width - 300 - buttonWidth / 2, height - 200 - buttonHeight / 2, buttonWidth, buttonHeight, borderRadius);
            this.input.setDefaultCursor('pointer');
        });
        
        closeButtonBg.on('pointerout', () => {
            isHovering = false;
            closeButtonBg.clear();
            closeButtonBg.fillStyle(0xffffff, 1); 
            closeButtonBg.fillRoundedRect(width - 300 - buttonWidth / 2, height - 200 - buttonHeight / 2, buttonWidth, buttonHeight, borderRadius);
            this.input.setDefaultCursor('default');
        });
        
        this.input.keyboard.on('keydown-ESC', () => {
            console.log('ESC key pressed'); 
            this.scene.start('MenuScene');
        });

        const menuButtonWidth = 100;
        const menuButtonHeight = 40;
        const menuButtonX = width - 440; 
        const menuButtonY = height - 200;

        const menuButtonBg = this.add.graphics();
        menuButtonBg.fillStyle(0xffffff, 1);
        menuButtonBg.fillRoundedRect(menuButtonX - menuButtonWidth / 2, menuButtonY - menuButtonHeight / 2, menuButtonWidth, menuButtonHeight, borderRadius);

        const menuButtonText = this.add.text(menuButtonX, menuButtonY, 'Menu', {
            font: '18px satoshi-variable',
            fill: '#000000',
        }).setOrigin(0.5).setInteractive();

        menuButtonBg.setInteractive(new Phaser.Geom.Rectangle(menuButtonX - menuButtonWidth / 2, menuButtonY - menuButtonHeight / 2, menuButtonWidth, menuButtonHeight), Phaser.Geom.Rectangle.Contains);

        menuButtonBg.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });

        menuButtonText.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });

        menuButtonText.on('pointerover', () => {
            menuButtonBg.emit('pointerover');
            this.input.setDefaultCursor('pointer');
        });

        menuButtonText.on('pointerout', () => {
            menuButtonBg.emit('pointerout');
            this.input.setDefaultCursor('default');
        });

        menuButtonBg.on('pointerover', () => {
            menuButtonBg.clear();
            menuButtonBg.fillStyle(0xcdcdcd, 1);
            menuButtonBg.fillRoundedRect(menuButtonX - menuButtonWidth / 2, menuButtonY - menuButtonHeight / 2, menuButtonWidth, menuButtonHeight, borderRadius);
            this.input.setDefaultCursor('pointer');
        });

        menuButtonBg.on('pointerout', () => {
            menuButtonBg.clear();
            menuButtonBg.fillStyle(0xffffff, 1);
            menuButtonBg.fillRoundedRect(menuButtonX - menuButtonWidth / 2, menuButtonY - menuButtonHeight / 2, menuButtonWidth, menuButtonHeight, borderRadius);
            this.input.setDefaultCursor('default');
        });

        if (this.isMobile()) {
            this.input.setDefaultCursor('pointer');
        }

        closeButtonBg.setInteractive(); 
        closeButtonText.setInteractive(); 
        menuButtonBg.setInteractive(); 
        menuButtonText.setInteractive(); 
    }

    isMobile() {
        return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }
}
