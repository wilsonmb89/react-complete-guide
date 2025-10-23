const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

export const formatCurrencyNumber = (value) => {
  if (Number.isNaN(value)) {
    return value + '';
  }

  return currencyFormatter.format(value);
};
