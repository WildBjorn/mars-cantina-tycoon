import Phaser from 'phaser';
import Boot from './scenes/Boot';
import Preload from './scenes/Preload';
import Menu from './scenes/Menu';
import GameScene from './scenes/Game';
import HUD from './scenes/HUD';

// Game configuration. The game uses an orthographic top‑down view with a
// fixed grid of 40×30 tiles at 32px each. Physics are kept simple since
// movement is grid based.
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 40 * 32,
  height: 30 * 32,
  backgroundColor: '#000000',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [Boot, Preload, Menu, GameScene, HUD],
};

window.addEventListener('load', () => {
  // eslint-disable-next-line no-new
  new Phaser.Game(config);
});