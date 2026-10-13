// created for green api second trial

// server/utils.js
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(amount);
}

// Add other utility functions if needed
export function calculateSubtotal(items) {
  return items.reduce((sum, item) => {
    const price = item.discountPrice || item.price;
    return sum + (price * item.quantity);
  }, 0);
}

export function calculateGst(subtotal, percentage) {
  return (subtotal * parseFloat(percentage)) / 100;
}