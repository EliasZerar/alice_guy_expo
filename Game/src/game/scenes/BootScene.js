import { Scene } from 'phaser';
import 'phaser3-rex-plugins/plugins/webfontloader.js';
import '../../assets/fonts/public/fonts.css';

export class BootScene extends Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        this.load.rexWebFont({
            custom: {
                families: ['satoshi-variable', 'oddini-bold'],
                urls: ['src/assets/fonts/fonts.css'] 
            }
        });        
        
        this.load.once('filecomplete-webfont', (key, type, data) => {
            console.log("Polices chargées :", key);
            this.scene.start('MenuScene'); 
        });
    }
    

    create() {
        this.load.once('complete', () => {
            this.scene.start('MenuScene');
        });
        this.load.start();
    }
}