import { Scene } from 'phaser';
import alice from '../../assets/alice.svg';

export class MenuScene extends Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        this.load.image('alice', alice);
    }

    create() {
        this.input.setDefaultCursor('default');
        const { width, height } = this.sys.game.config;

        this.cameras.main.setBackgroundColor('#000000');

        this.time.delayedCall(100, this.checkOrientation, [], this);
        this.scale.on('orientationchange', this.checkOrientation, this);

        const title = this.add.text(width / 2 + 30, 150, 'Labyrinthe 2D', {
            fontFamily: 'oddini-bold',
            fontSize: '40px',
            fill: '#ea5b28',
        }).setOrigin(0.5);

        const aliceImage = this.add.image(width / 2 - 165, 140, 'alice').setScale(0.28);
        aliceImage.setOrigin(0.5);

        this.playButton = this.createButton(width / 2, 350, 'Jouer', () => {
            this.scene.stop('MenuScene'); 
            this.scene.start('RulesScene');
        });

        this.quitButton = this.createButton(width / 2, 650, 'Quitter', () => this.quitGame());
      

        this.settingsButton = this.createButton(width / 2, 450, 'Commandes', () => this.scene.start('SettingsScene'));
        
        this.leaderboardButton = this.createButton(width / 2, 550, 'Classement', () => {
            this.scene.stop('MenuScene');
            this.scene.start('LeaderboardScene', { previousScene: 'MenuScene' });
        });

        const fullscreenButton = this.add.text(this.sys.game.config.width - 20, this.sys.game.config.height - 20, '⛶', {
            font: '30px Arial',
            fill: '#fff',
        })
            .setInteractive()
            .setOrigin(1, 1)
            .on('pointerdown', () => {
                if (!this.scale.isFullscreen) {
                    this.scale.startFullscreen();
                } else {
                    this.scale.stopFullscreen();
                }
            })
            .on('pointerover', () => {
                fullscreenButton.setStyle({ fill: '#ea5b28' });
                this.input.setDefaultCursor('pointer');
            })
            .on('pointerout', () => {
                fullscreenButton.setStyle({ fill: '#fff' });
                this.input.setDefaultCursor('default');
            });

        this.scale.on('fullscreenchange', () => {
            this.scale.refresh();
            this.scale.resize(this.sys.game.config.width, this.sys.game.config.height);
        });

        if (this.isMobile()) {
            this.settingsButton.setVisible(false);
            this.playButton.setY(350);
            this.quitButton.setY(450);
            this.fullscreenButton.setY(550);
            this.leaderboardButton.setY(650);
        }

        this.events.on('shutdown', () => {
            this.playButton.off('pointerdown');
            this.settingsButton.off('pointerdown');
            this.quitButton.off('pointerdown');
            this.leaderboardButton.off('pointerdown');
        });
    }
    
    createButton(x, y, text, callback) {
        const button = this.add.text(x, y, text, { font: '30px Arial', fill: '#fff' })
            .setInteractive()
            .setOrigin(0.5)
            .on('pointerdown', callback)
            .on('pointerover', () => {
                button.setStyle({ fill: '#ea5b28' });
                this.input.setDefaultCursor('pointer');
            })
            .on('pointerout', () => {
                button.setStyle({ fill: '#fff' });
                this.input.setDefaultCursor('default');
            });
        return button;
    }

    isMobile() {
        return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    checkOrientation() {
        if (this.scale.orientation === Phaser.Scale.PORTRAIT) {
            if (!this.popup) {
                this.popup = this.add.rectangle(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 500, 200, 0x000000, 0.8)
                    .setOrigin(0.5)
                    .setDepth(100);

                this.popupText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 30,
                    'Ce jeu a un meilleur rendu sur desktop,\nsi vous voulez quand même jouer\nveuillez tourner votre téléphone en mode paysage.',
                    { font: '20px Arial', fill: '#ffffff', align: 'center' }
                ).setOrigin(0.5).setDepth(101);

                this.closeButton = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 50, 'OK', { font: '25px Arial', fill: '#fff', backgroundColor: '#ea5b28', padding: { x: 10, y: 5 } })
                    .setOrigin(0.5)
                    .setInteractive()
                    .setDepth(102)
                    .on('pointerdown', () => {
                        this.popup.destroy();
                        this.popupText.destroy();
                        this.closeButton.destroy();
                        this.popup = null;
                        this.disableButtons(false);
                    });
                
                this.disableButtons(true);
            }
        } else {
            if (this.popup) {
                this.popup.destroy();
                this.popupText.destroy();
                this.closeButton.destroy();
                this.popup = null;
                this.disableButtons(false);
            }
        }
    }

    disableButtons(disable) {
        [this.playButton, this.settingsButton, this.quitButton, this.leaderboardButton].forEach(button => {
            button.setInteractive(!disable);
        });
    }

    quitGame() {
        window.location.href = '../exhibition';
    }
}