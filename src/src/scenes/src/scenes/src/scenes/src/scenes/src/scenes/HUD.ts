import Phaser from 'phaser';

/**
 * Heads‑up display scene. Listens to events emitted by the Game scene and
 * displays current money and whether the game is in build or service mode.
 */
export default class HUD extends Phaser.Scene {
  private moneyText!: Phaser.GameObjects.Text;
  private modeText!: Phaser.GameObjects.Text;

  constructor() {
    super('HUD');
  }

  create(): void {
    const { width } = this.scale;
    // Initialise text fields. They will be updated when events are received.
    this.moneyText = this.add.text(10, 10, 'Money: 0', {
      fontFamily: 'sans-serif',
      fontSize: '16px',
      color: '#ffffff',
    });
    this.modeText = this.add.text(10, 30, 'Mode: build', {
      fontFamily: 'sans-serif',
      fontSize: '16px',
      color: '#ffffff',
    });

    // Access the Game scene and subscribe to its events
    const gameScene = this.scene.get('Game');
    if (gameScene) {
      gameScene.events.on('budget-changed', (money: number) => {
        this.moneyText.setText(`Money: ${money}`);
      });
      gameScene.events.on('mode-changed', (mode: string) => {
        this.modeText.setText(`Mode: ${mode}`);
      });
    }
  }
}
