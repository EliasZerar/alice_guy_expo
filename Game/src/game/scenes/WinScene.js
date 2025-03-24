import { Scene } from 'phaser';
import alice from '../../assets/alice.svg';

export class WinScene extends Scene {
    constructor() {
        super({ key: 'WinScene' });
    }

    preload() {
        this.load.image('alice', alice); 
    }

    init(data) {
        this.elapsedTime = data.elapsedTime || 0;
        this.unlockedObjects = data.unlockedObjects || 0;
    }

    create() {
        this.input.setDefaultCursor('default');
        const { width, height } = this.sys.game.config;
        this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.8)');

        const winText = this.add.text(width / 2, height / 5, 'Vous avez gagné !', {
            font: '50px oddini-bold',
            fill: '#ea5b28',
        }).setOrigin(0.5);

        const aliceImage = this.add.image(width / 2 - 280, 150, 'alice').setScale(0.25); 
        aliceImage.setOrigin(0.5);

        const rulesText = 
            "Après avoir exploré le labyrinthe et récupéré les 5 objets d’Alice Guy, vous avez enfin atteint la porte. Grâce à votre courage et votre détermination, son histoire ne sombrera pas dans l’oubli.\n\n" +
            "Là où d’autres voulaient effacer son nom, vous avez rétabli la vérité. Alice Guy retrouvera enfin la reconnaissance qu’elle mérite.\n\n" +
            "Vous avez débloqué les 5 objets, découvrez-les dans la page d’accueil !";

        this.add.text(width / 2, height / 1.9, rulesText, {
            fontSize: '20px',
            fill: '#FFFFFF',
            fontFamily: 'satoshi-variable',
            wordWrap: { width: 500, useAdvancedWrap: true },
            align: 'left'
        }).setOrigin(0.5);

        const minutes = Math.floor(this.elapsedTime / 60);
        const seconds = Math.floor(this.elapsedTime % 60); 
        this.add.text(width / 2, height / 3, `Temps écoulé : ${minutes}m ${seconds}s`, {
            fontSize: '30px',
            fill: '#FFFFFF',
            fontFamily: 'satoshi-variable',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        const playerTime = {
            time: this.elapsedTime,
            date: new Date().toLocaleString()
        };

        let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
        leaderboard.push(playerTime);
        leaderboard.sort((a, b) => a.time - b.time); 
        leaderboard = leaderboard.slice(0, 3); 
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

        const buttonWidth = 200;
        const buttonHeight = 40;
        const borderRadius = 10;

        const leaderboardButtonBg = this.add.graphics();
        leaderboardButtonBg.fillStyle(0xffffff, 1);
        leaderboardButtonBg.fillRoundedRect(width - 300 - buttonWidth / 2, height - 150 - buttonHeight / 2, buttonWidth, buttonHeight, borderRadius);

        leaderboardButtonBg.setInteractive(new Phaser.Geom.Rectangle(width - 300 - buttonWidth / 2, height - 150 - buttonHeight / 2, buttonWidth, buttonHeight), Phaser.Geom.Rectangle.Contains);

        leaderboardButtonBg.on('pointerover', () => {
            leaderboardButtonBg.clear();
            leaderboardButtonBg.fillStyle(0xcdcdcd, 1); 
            leaderboardButtonBg.fillRoundedRect(width - 300 - buttonWidth / 2, height - 150 - buttonHeight / 2, buttonWidth, buttonHeight, borderRadius);
            this.input.setDefaultCursor('pointer');
        });

        leaderboardButtonBg.on('pointerout', () => {
            leaderboardButtonBg.clear();
            leaderboardButtonBg.fillStyle(0xffffff, 1); 
            leaderboardButtonBg.fillRoundedRect(width - 300 - buttonWidth / 2, height - 150 - buttonHeight / 2, buttonWidth, buttonHeight, borderRadius);
            this.input.setDefaultCursor('default');
        });

        const leaderboardButtonText = this.add.text(width - 300, height - 150, "Voir le classement", {
            font: '18px satoshi-variable',
            fill: '#000000',
        }).setOrigin(0.5).setInteractive();

        leaderboardButtonText.on('pointerover', () => {
            leaderboardButtonBg.emit('pointerover'); 
            this.input.setDefaultCursor('pointer');
        });

        leaderboardButtonText.on('pointerout', () => {
            leaderboardButtonBg.emit('pointerout'); 
            this.input.setDefaultCursor('default');
        });

        leaderboardButtonBg.on('pointerdown', () => {
            this.scene.start('LeaderboardScene', { previousScene: 'WinScene' });
        });

        leaderboardButtonText.on('pointerdown', () => {
            this.scene.start('LeaderboardScene', { previousScene: 'WinScene' });
        });

        const closeButtonBg = this.add.graphics();
        closeButtonBg.fillStyle(0xffffff, 1);
        closeButtonBg.fillRoundedRect(width - 520 - buttonWidth / 2, height - 150 - buttonHeight / 2, buttonWidth, buttonHeight, borderRadius);

        let isHovering = false;

        closeButtonBg.setInteractive(new Phaser.Geom.Rectangle(width - 520 - buttonWidth / 2, height - 150 - buttonHeight / 2, buttonWidth, buttonHeight), Phaser.Geom.Rectangle.Contains);

        closeButtonBg.on('pointerover', () => {
            isHovering = true;
            closeButtonBg.clear();
            closeButtonBg.fillStyle(0xcdcdcd, 1); 
            closeButtonBg.fillRoundedRect(width - 520 - buttonWidth / 2, height - 150 - buttonHeight / 2, buttonWidth, buttonHeight, borderRadius);
            this.input.setDefaultCursor('pointer');
        });

        closeButtonBg.on('pointerout', () => {
            isHovering = false;
            closeButtonBg.clear();
            closeButtonBg.fillStyle(0xffffff, 1); 
            closeButtonBg.fillRoundedRect(width - 520 - buttonWidth / 2, height - 150 - buttonHeight / 2, buttonWidth, buttonHeight, borderRadius);
            this.input.setDefaultCursor('default');
        });

        const closeButtonText = this.add.text(width - 520, height - 150, "Découvrir l'exposition", {
            font: '18px satoshi-variable',
            fill: '#000000',
        }).setOrigin(0.5).setInteractive();

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

        closeButtonBg.on('pointerdown', () => {
            window.location.href = '../exhibition/?gameWin=true';
        });

        closeButtonText.on('pointerdown', () => {
            window.location.href = '../exhibition/?gameWin=true';
        });

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.stop('WinScene'); 
            this.scene.start('MenuScene');
        });

        this.input.keyboard.on('keydown-ENTER', () => {
            this.scene.stop('WinScene'); 
            this.scene.start('MenuScene'); 
        });

        this.events.on('shutdown', () => {
            this.input.keyboard.off('keydown-ESC');
            this.input.keyboard.off('keydown-ENTER');
        });

        localStorage.setItem('gameFinished', 'true');
    }
}