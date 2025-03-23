import { Scene } from 'phaser';
import background from '../../assets/background.svg';
import object1 from '../../assets/chronophone.png';
import object2 from '../../assets/cabbage.png';
import object3 from '../../assets/camera.png';
import object4 from '../../assets/key.png';
import object5 from '../../assets/parchment.png';

export class InventoryScene extends Scene {
    constructor() {
        super({ key: 'InventoryScene' });
        this.collectedItems = []; 
    }

    preload() {
        this.load.image('background', background);
        this.load.image('object1',  object1); 
        this.load.image('object2', object2);
        this.load.image('object3', object3);
        this.load.image('object4', object4);
        this.load.image('object5', object5);
    }

    create() {
        const { width, height } = this.sys.game.config;
        const background = this.add.image(width - 65.5, height / 2 - 0, 'background'); 
        background.setDisplaySize(130, height);

        const savedObjects = localStorage.getItem('collectedItems');
        this.collectedItems = savedObjects ? JSON.parse(savedObjects) : [];

        this.updateInventory(this.collectedItems);
    }

    updateInventory(collectedItems) {
        if (!Array.isArray(collectedItems)) {
            collectedItems = [];
        }

        this.collectedItems.forEach(item => {
            if (item && item.destroy) {
                item.destroy();
            }
        });
        this.collectedItems = [];

        let startX = 1135; 
        let startY = 90; 
        let itemSize = 10; 
        let itemsPerRow = 1;
        let ySpacing = 145; 

        collectedItems.forEach((objectType, i) => {
            let itemImage = this.add.image(
                startX + (i % itemsPerRow) * itemSize,
                startY + Math.floor(i / itemsPerRow) * (itemSize + ySpacing),
                objectType
            ).setScale(0.3);
            this.collectedItems.push(itemImage);
        });


    }
}