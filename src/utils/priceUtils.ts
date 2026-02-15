export function calculateDiscountedPrice(price: number, discountPercentage: number): {
  discountedPrice: number;
} {
  if (price <= 0 || discountPercentage < 0 || discountPercentage > 100) {
    throw new Error("Invalid price or discount percentage value.");
  }

  const discountDecimal = discountPercentage / 100;
  const discountedPrice = price * (1 - discountDecimal);

  return { discountedPrice };
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}
