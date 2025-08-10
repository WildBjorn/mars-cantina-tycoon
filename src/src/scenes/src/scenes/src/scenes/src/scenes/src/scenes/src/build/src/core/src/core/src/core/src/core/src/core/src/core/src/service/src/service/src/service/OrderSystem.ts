/**
 * OrderSystem pairs customers with recipes defined in `src/data/recipes.json`.
 * It can calculate payments based on drink quality and customer multipliers.
 * The implementation will come later; this skeleton ensures the module
 * exports a consistent interface.
 */
export default class OrderSystem {
  processOrder(_customerId: string, _recipeId: string, _quality: number): number {
    // TODO: compute payout based on recipe base price, quality and customer multipliers
    return 0;
  }
}
