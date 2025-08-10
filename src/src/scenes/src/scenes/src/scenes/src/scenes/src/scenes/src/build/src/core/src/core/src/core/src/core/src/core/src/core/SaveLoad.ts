/**
 * SaveLoad is responsible for serialising and restoring game state to and
 * from localStorage. Only the minimal data required to reconstruct the
 * placement of items, money and progress should be stored. The current
 * implementation exposes stubbed methods that can be fleshed out later.
 */
export default class SaveLoad {
  static save(key: string, data: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Failed to save game', err);
    }
  }

  static load<T>(key: string): T | null {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('Failed to load saved data', err);
      return null;
    }
  }
}
