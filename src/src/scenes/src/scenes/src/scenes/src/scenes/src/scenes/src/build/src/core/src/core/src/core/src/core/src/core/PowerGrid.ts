/**
 * PowerGrid keeps track of powered and unpowered cells in the map. In a full
 * implementation it would perform a flood fill from generators each frame.
 * For the vertical slice this class is a stub that always returns true.
 */
export default class PowerGrid {
  // Query whether a cell at (x, y) is powered. Stubbed to always return true.
  isPowered(_x: number, _y: number): boolean {
    return true;
  }
}
