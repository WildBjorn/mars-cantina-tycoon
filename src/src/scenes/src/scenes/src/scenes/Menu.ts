import Phaser from 'phaser';

// A simple main menu scene. Displays a start button to enter the game.
export default class Menu extends Phaser.Scene {
  constructor() {
    super('Menu');
  }

  create(): void {
    const { width, height } = this.scale;
    const title = this.add.text(width / 2, height / 2 - 50, 'Mars Cantina Tycoon', {
      fontFamily: 'sans-serif',
      fontSize: '32px',
      color: '#ffffff',
    });
    title.setOrigin(0.5);

    const start = this.add.text(width / 2, height / 2 + 20, 'Start', {
      fontFamily: 'sans-serif',
      fontSize: '24px',
      color: '#ffff00',
    });
    start.setOrigin(0.5);
    start.setInteractive({ useHandCursor: true });
    start.on('pointerdown', () => {
      this.scene.start('Game');
    });
  }
}
