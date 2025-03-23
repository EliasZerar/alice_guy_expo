import { Scene } from 'phaser';
import alice from '../../assets/alice.svg';
import background from '../../assets/background.svg';
import wall from '../../assets/wall.png';
import object1 from '../../assets/chronophone.png';
import object2 from '../../assets/cabbage.png';
import object3 from '../../assets/camera.png';
import object4 from '../../assets/key.png';
import object5 from '../../assets/parchment.png';
import exit from '../../assets/exit.png';
import ennemie from '../../assets/enemy.png';
import floor from '../../assets/floor.png';
import playerReverse from '../../assets/alicereverse.svg';
import VirtualJoystick from "phaser3-rex-plugins/plugins/virtualjoystick";

export class GameScene extends Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.grid = [];
        this.collectedObjects = 0;
        this.playerSpeed = 130;
        this.totalObjects = 5;
        this.doorMessageShown = false;
    }
    
    init() {
        this.collectedObjects = 0;
        localStorage.setItem('collectedObjects', JSON.stringify(this.collectedObjects));
        localStorage.removeItem('collectedItems');
    }

    preload() {
        this.load.image('player', alice);
        this.load.image('background', background);
        this.load.image('wall', wall);
        this.load.image('object1', object1);
        this.load.image('object2', object2);
        this.load.image('object3', object3);
        this.load.image('object4', object4);
        this.load.image('object5', object5);
        this.load.image('exit', exit);
        this.load.image('ennemie', ennemie);
        this.load.image('floor', floor);
        this.load.image('playerReverse', playerReverse);
    }

    create() {
        this.input.setDefaultCursor('none');
        const { width, height } = this.sys.game.config;
    
        this.cameras.main.setBounds(0, 0, width, height);
        this.cameras.main.centerOn(width / 2, height / 2);
    
        this.objects = this.physics.add.group();
        this.enemies = this.physics.add.group();
    
        this.scene.launch('HudScene');
        this.hudScene = this.scene.get('HudScene');
        
        this.events.once('scene-awake', () => {
            this.hudScene.reset();
        });
    
        this.scene.launch('InventoryScene');
        this.inventoryScene = this.scene.get('InventoryScene');
        this.inventoryScene.updateInventory(this.collectedObjects);
        this.startTime = this.time.now; 

        const cols = 20, rows = 20, cellSize = 40;
        this.cols = cols;
        this.rows = rows;
        this.cellSize = cellSize;
    
        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.Z,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.Q,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            upArrow: Phaser.Input.Keyboard.KeyCodes.UP,
            downArrow: Phaser.Input.Keyboard.KeyCodes.DOWN,
            leftArrow: Phaser.Input.Keyboard.KeyCodes.LEFT,
            rightArrow: Phaser.Input.Keyboard.KeyCodes.RIGHT
        });

        this.keys.fullscreen = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    
        this.lights.enable().setAmbientColor(0x000000);
    
        this.walls = this.physics.add.staticGroup();
        this.grid = this.generateMaze(cols, rows);
    
        for (let x = 0; x < cols; x++) {
            for (let y = 0; y < rows; y++) {
                if (this.grid[y][x] === 0) {
                    this.add.image(
                        x * cellSize + cellSize / 2,
                        y * cellSize + cellSize / 2,
                        'floor'
                    ).setDisplaySize(cellSize + 1, cellSize + 1).setPipeline('Light2D');
                } else if (this.grid[y][x] === 1) {
                    const wall = this.walls.create(
                        x * cellSize + cellSize / 2,
                        y * cellSize + cellSize / 2,
                        'wall'
                    ).setPipeline('Light2D');
    
                    wall.setDisplaySize(cellSize + 1, cellSize + 1).refreshBody();
                }
            }
            this.startTime = this.time.now; 
        }
    
        this.player = this.physics.add.sprite(cellSize, cellSize, 'player').setScale(0.077).setOrigin((-0.5)).setPipeline('Light2D');
        this.physics.add.collider(this.player, this.walls);
    
        const isMobile = this.game.device.os.android || this.game.device.os.iOS || this.game.device.os.windowsPhone;
        const isTablet = this.game.device.os.iPad || (this.game.device.os.android && !this.game.device.os.androidPhone);
    
        if (isMobile || isTablet) {
            this.joystick = new VirtualJoystick(this, {
                x: 440, 
                y: this.scale.height - 355, 
                radius: 50,
                base: this.add.circle(0, 0, 25).setStrokeStyle(2, 0xffffff).setFillStyle(0x000000, 0),
                thumb: this.add.circle(0, 0, 10, 0xffffff),
                dir: "8dir",
                forceMin: 8, 
            });    
    
            this.joystick.base.setDepth(1000); 
            this.joystick.thumb.setDepth(1001); 
        
            console.log('Joystick loaded:', this.joystick); 
        
            this.joystick.on("update", () => {
                let force = this.joystick.force;
                let angle = this.joystick.angle;
                this.physics.velocityFromAngle(angle, force * 2.2, this.player.body.velocity); 
            });
        }
    
        this.placeObjects(this.totalObjects).forEach((pos, index) => {
            const objectType = index + 1; 
            const object = this.objects.create(pos.x * cellSize + cellSize / 2, pos.y * cellSize + cellSize / 2, `object${objectType}`).setScale(0.1).setPipeline('Light2D');
            object.setData('type', `object${objectType}`); 
        });
    
        let exitPos = this.placeObjects(1)[0];
        this.exit = this.physics.add.sprite(exitPos.x * cellSize + cellSize / 2, exitPos.y * cellSize + cellSize / 2, 'exit').setScale(0.06).setPipeline('Light2D');
        this.exit.body.setSize(cellSize, cellSize); 
        this.exit.setAlpha(0); 
    
        this.spawnEnemies(7);
    
        this.playerLight = this.lights.addLight(this.player.x, this.player.y, 200).setColor(0xffffff).setIntensity(1);
    
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(2.24);
        this.cameras.main.setBounds(0, 0, cols * cellSize, rows * cellSize);
        this.cameras.main.centerOn(this.player.x, this.player.y); 
    
        this.physics.add.overlap(this.player, this.objects, this.collectObject, null, this);
        this.physics.add.collider(this.enemies, this.walls, this.handleEnemyWallCollision, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.playerHitEnemy, null, this);
        this.physics.add.overlap(this.player, this.exit, this.reachExit, null, this);
    
        this.game.canvas.classList.add('centered-canvas');
    
        if (this.scale.orientation !== Phaser.Scale.LANDSCAPE) {
            this.showOrientationWarning();
        }

        this.scale.on('resize', (gameSize) => {
            const { width, height } = gameSize;
            if (this.cameras && this.cameras.main) {
                this.cameras.main.setBounds(0, 0, width, height);
                this.cameras.main.centerOn(this.player?.x || width / 2, this.player?.y || height / 2);
            }            
            if (this.scale.orientation !== Phaser.Scale.LANDSCAPE) {
                this.showOrientationWarning();
            } else if (this.orientationWarning) {
                this.orientationWarning.destroy();
                this.orientationWarning = null;
            }
        });

        this.events.on('shutdown', () => {
            this.cleanupScene();
        });
    }

    cleanupScene() {
        // Détruire le joystick s'il existe
        if (this.joystick) {
            this.joystick.destroy();
            this.joystick = null;
        }
    
        // Nettoyer les objets s'ils existent
        if (this.objects && this.objects.clear && this.objects.size > 0) {
            this.objects.clear(true, true);
            this.objects = null;
        }
    
        // Nettoyer les ennemis s'ils existent
        if (this.enemies && this.enemies.clear && this.enemies.size > 0) {
            this.enemies.clear(true, true);
            this.enemies = null;
        }
    
        // Nettoyer les murs s'ils existent
        if (this.walls && this.walls.clear && this.walls.size > 0) {
            this.walls.clear(true, true);
            this.walls = null;
        }
    
        // Arrêter les scènes associées
        this.scene.stop('HudScene');
        this.scene.stop('InventoryScene');
    
        // Réinitialiser les variables
        this.collectedObjects = 0;
        this.doorMessageShown = false;
        this.startTime = null;
    
        // Supprimer la lumière du joueur si elle existe
        if (this.playerLight) {
            this.lights.removeLight(this.playerLight);
            this.playerLight = null;
        }
    
        // Détruire le joueur s'il existe
        if (this.player) {
            this.player.destroy();
            this.player = null;
        }
    
        // Réinitialiser la grille
        this.grid = [];
    }

    update() {
        if (this.joystick) {
            if (this.joystick.force === 0) {
                this.player.setVelocity(0);
            } else {
                let force = this.joystick.force;
                let angle = this.joystick.angle;
                this.physics.velocityFromAngle(angle, force * 1.5, this.player.body.velocity);
            }
        }
    
        if (!this.joystick) {
            this.player.setVelocity(0);
    
            if (this.keys.left.isDown || this.keys.leftArrow.isDown) {
                this.player.setVelocityX(-this.playerSpeed);
                this.player.setTexture('playerReverse');
            } else if (this.keys.right.isDown || this.keys.rightArrow.isDown) {
                this.player.setVelocityX(this.playerSpeed);
                this.player.setTexture('player');
            }
    
            if (this.keys.up.isDown || this.keys.upArrow.isDown) {
                this.player.setVelocityY(-this.playerSpeed);
            } else if (this.keys.down.isDown || this.keys.downArrow.isDown) {
                this.player.setVelocityY(this.playerSpeed);
            }
        }

        if (Phaser.Input.Keyboard.JustDown(this.keys.fullscreen)) {
            if (!this.scale.isFullscreen) {
                this.scale.startFullscreen();
            } else {
                this.scale.stopFullscreen();
            }
        }
    
        this.playerLight.x = this.player.x;
        this.playerLight.y = this.player.y;
    
        this.enemies.getChildren().forEach(enemy => this.moveEnemy(enemy));
    
        if (this.collectedObjects === this.totalObjects && !this.doorMessageShown) {
            this.doorMessageShown = true;
            this.exit.setAlpha(1);
            this.showDoorMessage();
        }
    
        if (this.scale.orientation !== Phaser.Scale.LANDSCAPE) {
            this.showOrientationWarning();
        } else if (this.orientationWarning) {
            this.orientationWarning.destroy();
            this.orientationWarning = null;
        }
    
        const elapsedTime = Math.floor((this.time.now - this.startTime) / 1000);
        this.hudScene.updateTime(elapsedTime);
    }

    spawnEnemies(count) {
        let validCells = [];
        for (let x = 1; x < this.cols - 1; x++) {
            for (let y = 1; y < this.rows - 1; y++) {
                if (this.grid[y][x] === 0) { 
                    let freeNeighbors = 0;
                    if (this.grid[y - 1][x] === 0) freeNeighbors++;
                    if (this.grid[y + 1][x] === 0) freeNeighbors++;
                    if (this.grid[y][x - 1] === 0) freeNeighbors++;
                    if (this.grid[y][x + 1] === 0) freeNeighbors++;
    
                    let hasObject = this.objects.getChildren().some(obj => obj.x === x * this.cellSize + this.cellSize / 2 && obj.y === y * this.cellSize + this.cellSize / 2);
    
                    let isNearStart = x === 1 && y === 1;
                    let isNearExit = this.exit && Math.abs(this.exit.x / this.cellSize - x) < 3 && Math.abs(this.exit.y / this.cellSize - y) < 3;
    
                    if (freeNeighbors >= 3 && !hasObject && !isNearStart && !isNearExit) {
                        validCells.push({ x, y });
                    }
                }
            }
        }
    
        for (let i = 0; i < count; i++) {
            if (validCells.length === 0) break;
            let pos = validCells.splice(Phaser.Math.Between(0, validCells.length - 1), 1)[0];
            if (pos) {
                let enemy = this.physics.add.sprite(
                    pos.x * this.cellSize + this.cellSize / 2,
                    pos.y * this.cellSize + this.cellSize / 2,
                    'ennemie'
                ).setScale(0.03).setPipeline('Light2D');
                enemy.setData('direction', 'right');
                this.enemies.add(enemy);
            }
        }
    }


    placeObjects(count) {
        let positions = [];
        const minDistance = 2; 
    
        while (positions.length < count) {
            let x = Phaser.Math.Between(0, this.cols - 1);
            let y = Phaser.Math.Between(0, this.rows - 1);
    
            if (this.grid[y][x] === 0) {
                let tooClose = positions.some(p => Math.abs(p.x - x) < minDistance && Math.abs(p.y - y) < minDistance);
    
                if (!tooClose) {
                    positions.push({ x, y });
                }
            }
        }
        return positions;
    }
    

    moveEnemy(enemy) {
        const speed = 100;
        const direction = enemy.getData('direction');

        if (direction === 'right') {
            enemy.setVelocityX(speed);
            if (enemy.x > (this.cols - 2) * this.cellSize) enemy.setData('direction', 'left');
        } else {
            enemy.setVelocityX(-speed);
            if (enemy.x < 2 * this.cellSize) enemy.setData('direction', 'right');
        }
    }

    handleEnemyWallCollision(enemy, wall) {
        const direction = enemy.getData('direction');
        if (direction === 'right') {
            enemy.setData('direction', 'left');
        } else {
            enemy.setData('direction', 'right');
        }
    }

    playerHitEnemy(player, enemy) {
        this.physics.pause();
        player.setTint(0xff0000);

        const elapsedTime = Math.floor((this.time.now - this.startTime) / 1000); 
        const unlockedObjects = this.collectedObjects;

        this.scene.stop('HudScene');
        this.scene.stop('InventoryScene');
        this.scene.start('GameOverScene', {
            elapsedTime: elapsedTime, 
            unlockedObjects: unlockedObjects
        });

        if (this.objects) this.objects.clear(true, true);
        if (this.enemies) this.enemies.clear(true, true);
    }

    generateMaze(cols, rows) {
        let maze = Array(rows).fill().map(() => Array(cols).fill(1));
        let stack = [{ x: 1, y: 1 }];
        maze[1][1] = 0;

        while (stack.length) {
            let { x, y } = stack.pop();
            Phaser.Utils.Array.Shuffle([{ x: 2, y: 0 }, { x: -2, y: 0 }, { x: 0, y: 2 }, { x: 0, y: -2 }]).forEach(({ x: dx, y: dy }) => {
                let nx = x + dx, ny = y + dy;
                if (nx > 0 && ny > 0 && nx < cols - 1 && ny < rows - 1 && maze[ny][nx] === 1) {
                    maze[ny][nx] = 0;
                    maze[y + dy / 2][x + dx / 2] = 0;
                    stack.push({ x: nx, y: ny });
                }
            });
        }
        return maze;
    }

    collectObject(player, object) {
        const objectType = object.getData('type'); 
        object.destroy();
        this.collectedObjects++;

        let collectedItems = JSON.parse(localStorage.getItem('collectedItems')) || [];
        collectedItems.push(objectType);
        localStorage.setItem('collectedItems', JSON.stringify(collectedItems));

        this.hudScene.updateObjectCount(this.collectedObjects, this.totalObjects);

        this.inventoryScene.updateInventory(collectedItems);

        if (this.collectedObjects === this.totalObjects && !this.doorMessageShown) {
            this.doorMessageShown = true;
            this.exit.setAlpha(1);
            this.showDoorMessage();
        }
    }

    spawnRandomDoor() {
        let pos = this.placeObjects(1)[0];
        this.door = this.physics.add.staticSprite(
            pos.x * this.cellSize + this.cellSize / 2,
            pos.y * this.cellSize + this.cellSize / 2,
            'exit'
        ).setScale(0.06).setPipeline('Light2D');

        this.door.setAlpha(1);

        this.physics.add.overlap(this.player, this.door, this.reachExit, null, this);
    }

    showDoorMessage() {
        const { width, height } = this.cameras.main;
        const message = this.add.text(width / 2, height / 2, 'Trouvez la porte de sortie !', {
            font: '40px satoshi-variable',
            fill: '#ea5b28'
        }).setOrigin(0.5).setScrollFactor(0);

        this.time.delayedCall(3000, () => {
            message.destroy(); 
        });
    }

    reachExit(player, exit) {
        if (this.collectedObjects === this.totalObjects) {
            this.physics.pause();
            player.setTint(0x00ff00);

            this.cameras.main.fade(2000, 0, 0, 0);

            const elapsedTime = this.time.now - this.startTime;
            const minutes = Math.floor(elapsedTime / 60000);
            const seconds = Math.floor((elapsedTime % 60000) / 1000);

            this.time.delayedCall(2000, () => {
                this.scene.stop('HudScene');
                this.scene.stop('InventoryScene'); 
                this.scene.stop('GameScene');

                if (this.objects) this.objects.clear(true, true);
                if (this.enemies) this.enemies.clear(true, true);

                this.scene.start('WinScene', {
                    elapsedTime: minutes * 60 + seconds,
                    unlockedObjects: this.collectedObjects
                });
            });
        }
    }

    winGame() {
        this.physics.pause();
        this.player.setTint(0x00ff00);
        this.cameras.main.fade(2000, 0, 0, 0);

        this.time.delayedCall(2000, () => {
            this.scene.stop('HudScene');
            this.scene.stop('InventoryScene'); 
            this.scene.stop('GameScene');
            this.scene.start('WinScene');
        });
    }

}
