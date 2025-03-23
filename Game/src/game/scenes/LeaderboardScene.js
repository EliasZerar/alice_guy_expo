import { Scene } from 'phaser';

export class LeaderboardScene extends Scene {
    constructor() {
        super({ key: 'LeaderboardScene' });
    }

    create(data) {
        const { width, height } = this.sys.game.config;
        this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.8)');

        const previousScene = data.previousScene || 'MenuScene';

        const panel = this.add.graphics();
        panel.fillStyle(0x222222, 0.8);
        panel.fillRoundedRect(width / 4, height / 7, width / 2, height / 1.5, 20);
        panel.lineStyle(4, 0xea5b28);
        panel.strokeRoundedRect(width / 4, height / 7, width / 2, height / 1.5, 20);

        const titleText = this.add.text(width / 2, height / 5, 'Classement', {
            font: '50px oddini-bold',
            fill: '#ea5b28',
        }).setOrigin(0.5);

        const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

        const panelTop = height / 7;
        const panelHeight = height / 1.5;
        const contentHeight = leaderboard.slice(0, 3).length * 40; 
        let yOffset = panelTop + (panelHeight - contentHeight) / 2; 

        leaderboard
            .sort((a, b) => a.time - b.time)
            .slice(0, 3)
            .forEach((entry, index) => {
                const minutes = Math.floor(entry.time / 60);
                const seconds = Math.floor(entry.time % 60);
                const entryText = this.add.text(width / 2, yOffset, `${index + 1}. ${minutes}m ${seconds}s - ${entry.date}`, {
                    fontSize: '27px',
                    fill: '#FFFFFF',
                    fontFamily: 'satoshi-variable',
                }).setOrigin(0.5);
                yOffset += 40; 
            });

        const backButtonWidth = 150;
        const backButtonHeight = 40;
        const borderRadius = 10;

        const backButtonBg = this.add.graphics();
        backButtonBg.fillStyle(0xffffff, 1);
        backButtonBg.fillRoundedRect(width / 2 - backButtonWidth / 2, height - 100 - backButtonHeight / 2, backButtonWidth, backButtonHeight, borderRadius);

        let isHovering = false;

        const backButtonText = this.add.text(width / 2, height - 100, 'Retour', {
            font: '18px satoshi-variable',
            fill: '#000000',
        }).setOrigin(0.5).setInteractive();

        backButtonBg.setInteractive(new Phaser.Geom.Rectangle(width / 2 - backButtonWidth / 2, height - 100 - backButtonHeight / 2, backButtonWidth, backButtonHeight), Phaser.Geom.Rectangle.Contains);

        backButtonBg.on('pointerdown', () => {
            this.scene.stop('LeaderboardScene');
            this.scene.start(previousScene);
        });

        backButtonText.on('pointerdown', () => {
            this.scene.stop('LeaderboardScene');
            this.scene.start(previousScene);
        });

        backButtonText.on('pointerover', () => {
            if (!isHovering) {
                backButtonBg.emit('pointerover');
            }
            this.input.setDefaultCursor('pointer');
        });

        backButtonText.on('pointerout', () => {
            if (isHovering) {
                backButtonBg.emit('pointerout');
            }
            this.input.setDefaultCursor('default');
        });

        backButtonBg.on('pointerover', () => {
            isHovering = true;
            backButtonBg.clear();
            backButtonBg.fillStyle(0xcdcdcd, 1);
            backButtonBg.fillRoundedRect(width / 2 - backButtonWidth / 2, height - 100 - backButtonHeight / 2, backButtonWidth, backButtonHeight, borderRadius);
            this.input.setDefaultCursor('pointer');
        });

        backButtonBg.on('pointerout', () => {
            isHovering = false;
            backButtonBg.clear();
            backButtonBg.fillStyle(0xffffff, 1);
            backButtonBg.fillRoundedRect(width / 2 - backButtonWidth / 2, height - 100 - backButtonHeight / 2, backButtonWidth, backButtonHeight, borderRadius);
            this.input.setDefaultCursor('default');
        });
    }
}