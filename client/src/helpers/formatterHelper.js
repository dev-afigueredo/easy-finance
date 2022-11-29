const formatter = Intl.NumberFormat('pt-BR',
  {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }
);

function formatNumber(value) {
  return formatter.format(value);
}

export { formatNumber };