import { BootScene } from './scenes/BootScene';
import { HudScene } from './scenes/HudScene';
import { InventoryScene } from './scenes/InventoryScene';
import { MenuScene } from './scenes/MenuScene';
import { RulesScene } from './scenes/RulesScene';
import { GameScene } from './scenes/GameScene';
import { SettingsScene } from './scenes/SettingsScene';
import RexBBCodeTextPlugin from 'phaser3-rex-plugins/plugins/bbcodetext-plugin';
import Phaser, { Game } from 'phaser';
import { GameOverScene } from './scenes/GameOverScene';
import { WinScene } from './scenes/WinScene'
import RexWebFontLoaderPlugin from 'phaser3-rex-plugins/plugins/webfontloader-plugin';
import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin';
import { LeaderboardScene } from './scenes/LeaderboardScene';

const config = {
    type: Phaser.AUTO, 
    width: 1200,
    height: 800,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.FIT,
    },
   
    scene: [
        BootScene,
        MenuScene,
        RulesScene,  
        GameScene, 
        InventoryScene, 
        SettingsScene, 
        HudScene,
        GameOverScene,
        WinScene,
        LeaderboardScene
    ],
    plugins: {
        global: [
            {
                key: 'rexBBCodeTextPlugin',
                plugin: RexBBCodeTextPlugin,
                start: true
            },
            { 
                key: 'rexwebfontloaderplugin', 
                plugin: RexWebFontLoaderPlugin, 
                start: true 
            },
            {
            key: 'rexVirtualJoystick',
            plugin: VirtualJoystickPlugin,
            start: true
            }
        ]
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false, 
        }
    },
};

const StartGame = (parent) => {
    const game = new Phaser.Game({ ...config, parent });

    window.addEventListener('resize', () => {
        game.scale.refresh(); 
    });

    document.addEventListener('fullscreenchange', () => {
        game.scale.refresh();
    });

    // Handle AudioContext state
    const audioContext = game.sound.context;
    if (audioContext && audioContext.state === 'closed') {
        console.warn('AudioContext is closed. Creating a new AudioContext.');
        game.sound.context = new (window.AudioContext || window.webkitAudioContext)();
    }

    // Ensure parent exists before accessing its style
    if (parent) {
        parent.style.overflow = 'hidden';
    } else {
        console.warn('Parent element is null. Skipping style adjustments.');
    }

    return game;
};

export default StartGame;
