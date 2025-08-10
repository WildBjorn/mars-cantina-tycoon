import Phaser from 'phaser';
import Grid from '../core/Grid';

/**
 * The GameScene handles both build and service modes. In this simplified
 * implementation only build mode is functional: the player can place
 * rectangular furniture on a grid by clicking. A ghost preview shows
 * placement position and rotation. Rotations cycle through 0°, 90°, 180° and
 * 270° when pressing the R key. Press Esc to cancel a placement. The HUD
 * listens for budget updates.
 */
export default class GameScene extends Phaser.Scene {
  private grid!: Grid;
  private mode: 'build' | 'service' = 'build';
  private ghostGraphics!: Phaser.GameObjects.Graphics;
  private placementRotation = 0;
  private placedGroup!: Phaser.GameObjects.Container;
  private budget = 500; // starting money

  constructor() {
    super('Game');
  }

  create(): void {
    // Create the repeating floor background
    const floor = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'floor');
    floor.setOrigin(0, 0);

    // Setup grid helper
    this.grid = new Grid(40, 30, 32);

    // Group to hold placed items
    this.placedGroup = this.add.container(0, 0);

    // Graphics object used for the ghost preview
    this.ghostGraphics = this.add.graphics();
    this.ghostGraphics.fillStyle(0x00ff00, 0.3);

    // Input handlers
    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      this.updateGhost(pointer.worldX, pointer.worldY);
    });

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.placeItem(pointer.worldX, pointer.worldY);
    });

    this.input.keyboard?.on('keydown-R', () => {
      // Rotate the ghost preview
      this.placementRotation = (this.placementRotation + 90) % 360;
    });

    this.input.keyboard?.on('keydown-ESC', () => {
      // Cancel placement by clearing ghost graphics
      this.ghostGraphics.clear();
    });

    this.input.keyboard?.on('keydown-B', () => {
      // Toggle between build and service modes
      this.mode = this.mode === 'build' ? 'service' : 'build';
      this.events.emit('mode-changed', this.mode);
    });

    // Notify HUD of initial budget and mode
    this.events.emit('budget-changed', this.budget);
    this.events.emit('mode-changed', this.mode);

    // Launch the HUD scene in parallel if not already running
    if (!this.scene.isActive('HUD')) {
      this.scene.launch('HUD');
    }
  }

  /**
   * Update the ghost preview graphics. Snaps the preview to the grid and
   * colours it red if placement would overlap an existing item.
   */
  private updateGhost(worldX: number, worldY: number): void {
    const cell = this.grid.worldToCell(worldX, worldY);
    if (!cell) return;

    this.ghostGraphics.clear();

    const occupied = this.grid.isOccupied(cell.x, cell.y);
    const colour = occupied ? 0xff0000 : 0x00ff00;
    this.ghostGraphics.fillStyle(colour, 0.3);
    const { x, y } = this.grid.cellToWorld(cell.x, cell.y);
    this.ghostGraphics.save();
    this.ghostGraphics.translate(x + this.grid.tileSize / 2, y + this.grid.tileSize / 2);
    this.ghostGraphics.rotate(Phaser.Math.DegToRad(this.placementRotation));
    this.ghostGraphics.fillRect(
      -this.grid.tileSize / 2,
      -this.grid.tileSize / 2,
      this.grid.tileSize,
      this.grid.tileSize,
    );
    this.ghostGraphics.restore();
  }

  /**
   * Attempt to place an item at the specified world coordinates. If the
   * corresponding grid cell is free the item is placed and budget reduced.
   */
  private placeItem(worldX: number, worldY: number): void {
    if (this.mode !== 'build') return;
    const cell = this.grid.worldToCell(worldX, worldY);
    if (!cell) return;
    if (this.grid.isOccupied(cell.x, cell.y)) return;

    const cost = 50; // all items cost 50 for this demo
    if (this.budget < cost) return;

    // Mark occupied
    this.grid.setOccupied(cell.x, cell.y, true);
    this.budget -= cost;
    this.events.emit('budget-changed', this.budget);

    const { x, y } = this.grid.cellToWorld(cell.x, cell.y);
    const rect = this.add.rectangle(
      x + this.grid.tileSize / 2,
      y + this.grid.tileSize / 2,
      this.grid.tileSize,
      this.grid.tileSize,
      0x6666ff,
    );
    rect.setRotation(Phaser.Math.DegToRad(this.placementRotation));
    this.placedGroup.add(rect);
  }
}
