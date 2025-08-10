import Phaser from 'phaser';

// The Preload scene handles loading all static assets (images, audio, etc.).
// Once loading is complete the Menu scene is started.
export default class Preload extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload(): void {
    // Load tile images. All assets live under the /assets directory at the
    // project root. Additional furniture sprites can be added here when
    // downloaded or created.
    // Load from the Vite `public/` directory. Assets placed under `public` are
    // served at the root of the site. See README for details.
    this.load.image('floor', '/assets/floor.png');
    // Placeholder assets for walls and furniture could be loaded here.
  }

  create(): void {
    this.scene.start('Menu');
  }
}
