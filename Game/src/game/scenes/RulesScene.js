import { Scene } from 'phaser';
import alice from '../../assets/alice.svg';
 
export class RulesScene extends Scene {
    constructor() {
        super({ 
            key: 'RulesScene', 
        });
    }
   
    preload() {
        this.load.image('aliceguy', alice);
    }
    
    create() {
        this.scale.refresh();
        const { width, height } = this.sys.game.config; 
        this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.8)');

        this.add.text(width / 2, height / 4, 'Règles du Jeu', {
            fontFamily: 'oddini-bold', 
            fontSize: '40px',
            fill: '#ea5b28',
        }).setOrigin(0.5);

        const aliceGuyImage = this.add.image(width / 2 - 180, height / 4.2, 'aliceguy').setScale(0.25);
        aliceGuyImage.setOrigin(0.5);

        const rulesText = 
            "Vous contrôlez un personnage que vous pouvez déplacer à l’aide des touches [color=#ea5b28]Z, Q, S, D[/color] ou [color=#ea5b28]des flèches.[/color]" + 
            " Votre objectif est de trouver et de [color=#ea5b28]ramasser 5 objets[/color] cachés dans le labyrinthe.\n\n" + 
            "Faites [color=#ea5b28]attention aux ennemis[/color] que vous croiserez sur votre chemin : [color=#ea5b28]vous devez absolument les éviter.[/color]" +
            "Une fois que vous aurez collecté tous les objets, une porte apparaîtra. Rejoignez-la pour remporter la partie.";

        const rulesTextObject = this.add.rexBBCodeText(width / 2 - 250, height / 2, rulesText, { 
            fontSize: '20px',
            fontFamily: 'satoshi-variable', 
            wrap: { mode: 'word', width: 500 },
            color: '#ffffff',
            
        }).setOrigin(0, 0.5);

        const buttonWidth = 90;
        const buttonHeight = 40;
        const borderRadius = 10;
        
        const closeButtonBg = this.add.graphics();
        closeButtonBg.fillStyle(0xffffff, 1);
        closeButtonBg.fillRoundedRect(width - 300 - buttonWidth / 2, height - 200 - buttonHeight / 2, buttonWidth, buttonHeight, borderRadius);

        let isHovering = false;

        closeButtonBg.setInteractive(new Phaser.Geom.Rectangle(width - 300 - buttonWidth / 2, height - 200 - buttonHeight / 2, buttonWidth, buttonHeight), Phaser.Geom.Rectangle.Contains);

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
        
        const closeButtonText = this.add.text(width - 300, height - 200, 'Fermer', {
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
            this.scene.start('GameScene'); 
        });
        closeButtonText.on('pointerdown', () => {
            this.scene.start('GameScene'); 
        });
        
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.start('GameScene'); 
        });

        this.input.keyboard.on('keydown-ENTER', () => {
            this.scene.start('GameScene'); 
        });
        
    }
}