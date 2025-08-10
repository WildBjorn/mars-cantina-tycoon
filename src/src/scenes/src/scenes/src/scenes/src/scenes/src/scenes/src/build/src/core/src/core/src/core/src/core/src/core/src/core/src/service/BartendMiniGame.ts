/**
 * Mini‑games such as pouring, shaking and garnishing drinks can be defined
 * here. At the moment this module exports a stub that always returns a
 * perfect score after a simulated delay.
 */
export default class BartendMiniGame {
  async play(): Promise<number> {
    // simulate mini‑game taking some time
    await new Promise(resolve => setTimeout(resolve, 500));
    // return quality score from 0 to 1; 1 means perfect
    return 1;
  }
}
