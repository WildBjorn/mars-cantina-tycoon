import Phaser from 'phaser';

// The Boot scene is responsible for any early configuration. In this simple
// implementation it immediately advances to the Preload scene.
export default class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload(): void {
    // Preload minimal assets for a loading bar or logo if needed
  }

  create(): void {
    this.scene.start('Preload');
  }
}
