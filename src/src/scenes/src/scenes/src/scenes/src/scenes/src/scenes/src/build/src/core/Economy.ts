/**
 * Simple economy manager that tracks the player's money and exposes methods
 * for spending and earning. Emits events via a provided callback.
 */
export default class Economy {
  private money: number;
  private onChange: (money: number) => void;

  constructor(startingMoney: number, onChange: (money: number) => void) {
    this.money = startingMoney;
    this.onChange = onChange;
  }

  get current(): number {
    return this.money;
  }

  /**
   * Attempt to spend an amount of money. Returns true on success.
   */
  spend(amount: number): boolean {
    if (this.money < amount) return false;
    this.money -= amount;
    this.onChange(this.money);
    return true;
  }

  /**
   * Earn an amount of money.
   */
  earn(amount: number): void {
    this.money += amount;
    this.onChange(this.money);
  }
}
