/**
 * Grid helper class for a tile‑based map. Converts between world and
 * grid coordinates and tracks occupied cells.
 */
export default class Grid {
  public readonly width: number;
  public readonly height: number;
  public readonly tileSize: number;
  private occupancy: boolean[][];

  constructor(width: number, height: number, tileSize: number) {
    this.width = width;
    this.height = height;
    this.tileSize = tileSize;
    // Initialise a 2D array of booleans to track occupied cells
    this.occupancy = Array.from({ length: height }, () => new Array(width).fill(false));
  }

  /**
   * Convert world coordinates to grid cell coordinates. Returns undefined if
   * outside bounds.
   */
  worldToCell(worldX: number, worldY: number): { x: number; y: number } | undefined {
    const x = Math.floor(worldX / this.tileSize);
    const y = Math.floor(worldY / this.tileSize);
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
      return undefined;
    }
    return { x, y };
  }

  /**
   * Convert grid cell coordinates back to world pixel coordinates of the
   * top‑left corner.
   */
  cellToWorld(x: number, y: number): { x: number; y: number } {
    return { x: x * this.tileSize, y: y * this.tileSize };
  }

  /**
   * Query whether a cell is occupied.
   */
  isOccupied(x: number, y: number): boolean {
    return this.occupancy[y][x];
  }

  /**
   * Mark a cell as occupied or free.
   */
  setOccupied(x: number, y: number, value: boolean): void {
    this.occupancy[y][x] = value;
  }
}
