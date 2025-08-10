import EasyStar from 'easystarjs';

/**
 * Wrapper around EasyStar.js to perform A* pathfinding on the game's grid.
 * The current implementation creates an instance of EasyStar but does not
 * register a grid. See the docs for usage: https://github.com/prettymuchbryce/easystarjs
 */
export default class Pathfinding {
  private easystar: EasyStar.js;

  constructor() {
    this.easystar = new EasyStar.js();
    // Example: set acceptable tiles later via setAcceptableTiles([...]) and
    // prepare grid via setGrid(grid: number[][]).
  }

  // Find a path between two points. Returns a promise that resolves with the
  // resulting path or null if no path is found.
  findPath(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
  ): Promise<{ x: number; y: number }[] | null> {
    return new Promise(resolve => {
      this.easystar.findPath(startX, startY, endX, endY, path => {
        resolve(path || null);
      });
      this.easystar.calculate();
    });
  }
}
