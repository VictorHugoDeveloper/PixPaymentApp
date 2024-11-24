export const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

export const unformatCurrency = (value: string): number => {
  return Number(value.replace(/[^0-9,-]/g, '').replace(',', '.'));
}; 