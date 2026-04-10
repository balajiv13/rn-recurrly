import dayjs from 'dayjs';

// For backward compatibility, re-export the formatCurrency function from currencies.ts
export {
    convertCurrency,
    formatCurrency,
    getCurrenciesByRegion,
    getCurrency,
    getCurrencyCodes,
    getCurrencyName,
    getCurrencySymbol
} from './currencies';

export const formateSubscriptionDateTime = (value?: string): string => {
  if (!value) return '--';
  const parsedDate = dayjs(value);
  return parsedDate.isValid() ? parsedDate.format('DD/MM/YYYY') : '--';
};

export const formateStatusLabel = (value?: string): string => {
  if (!value) return 'UNKNOWN';
  return value.charAt(0).toLocaleUpperCase() + value.slice(1);
};
