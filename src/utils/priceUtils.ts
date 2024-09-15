/**
 * Calculates the discounted price based on the original price and discount percentage.
 * 
 * @param price - The original price of the product.
 * @param discountPercentage - The discount percentage (e.g., 10 for 10%).
 * @returns An object containing the discounted price.
 */
export function calculateDiscountedPrice(price: number, discountPercentage: number): {
  discountedPrice: number;
} {
  if (price <= 0 || discountPercentage < 0 || discountPercentage > 100) {
    throw new Error("Invalid price or discount percentage value.");
  }

  // Convert discount percentage to a decimal for calculation
  const discountDecimal = discountPercentage / 100;
  // Calculate the discounted price
  const discountedPrice = price * (1 - discountDecimal);

  return { discountedPrice };
}
