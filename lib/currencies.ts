interface Currency {
    code: string;
    name: string;
    symbol: string;
    locale: string;
    region: string;
}

export const CURRENCIES: Currency[] = [
    // Americas
    { code: 'USD', name: 'US Dollar', symbol: '$', locale: 'en-US', region: 'Americas' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', locale: 'en-CA', region: 'Americas' },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$', locale: 'es-MX', region: 'Americas' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', locale: 'pt-BR', region: 'Americas' },
    { code: 'ARS', name: 'Argentine Peso', symbol: '$', locale: 'es-AR', region: 'Americas' },
    { code: 'CLP', name: 'Chilean Peso', symbol: '$', locale: 'es-CL', region: 'Americas' },
    { code: 'COP', name: 'Colombian Peso', symbol: '$', locale: 'es-CO', region: 'Americas' },
    { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/', locale: 'es-PE', region: 'Americas' },
    { code: 'VES', name: 'Venezuelan Bolívar', symbol: 'Bs.', locale: 'es-VE', region: 'Americas' },
    { code: 'JMD', name: 'Jamaican Dollar', symbol: 'J$', locale: 'en-JM', region: 'Americas' },
    { code: 'TTD', name: 'Trinidad and Tobago Dollar', symbol: 'TT$', locale: 'en-TT', region: 'Americas' },

    // Europe
    { code: 'EUR', name: 'Euro', symbol: '€', locale: 'de-DE', region: 'Europe' },
    { code: 'GBP', name: 'British Pound', symbol: '£', locale: 'en-GB', region: 'Europe' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', locale: 'de-CH', region: 'Europe' },
    { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', locale: 'sv-SE', region: 'Europe' },
    { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', locale: 'nb-NO', region: 'Europe' },
    { code: 'DKK', name: 'Danish Krone', symbol: 'kr.', locale: 'da-DK', region: 'Europe' },
    { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', locale: 'pl-PL', region: 'Europe' },
    { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', locale: 'cs-CZ', region: 'Europe' },
    { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', locale: 'hu-HU', region: 'Europe' },
    { code: 'RON', name: 'Romanian Leu', symbol: 'lei', locale: 'ro-RO', region: 'Europe' },
    { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв', locale: 'bg-BG', region: 'Europe' },
    { code: 'HRK', name: 'Croatian Kuna', symbol: 'kn', locale: 'hr-HR', region: 'Europe' },
    { code: 'RUB', name: 'Russian Ruble', symbol: '₽', locale: 'ru-RU', region: 'Europe' },
    { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴', locale: 'uk-UA', region: 'Europe' },
    { code: 'BYN', name: 'Belarusian Ruble', symbol: 'Br', locale: 'be-BY', region: 'Europe' },

    // Asia-Pacific
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', locale: 'ja-JP', region: 'Asia-Pacific' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', locale: 'zh-CN', region: 'Asia-Pacific' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', locale: 'en-IN', region: 'Asia-Pacific' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', locale: 'en-AU', region: 'Asia-Pacific' },
    { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', locale: 'en-NZ', region: 'Asia-Pacific' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', locale: 'en-SG', region: 'Asia-Pacific' },
    { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', locale: 'ms-MY', region: 'Asia-Pacific' },
    { code: 'PHP', name: 'Philippine Peso', symbol: '₱', locale: 'en-PH', region: 'Asia-Pacific' },
    { code: 'THB', name: 'Thai Baht', symbol: '฿', locale: 'th-TH', region: 'Asia-Pacific' },
    { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', locale: 'id-ID', region: 'Asia-Pacific' },
    { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', locale: 'vi-VN', region: 'Asia-Pacific' },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩', locale: 'ko-KR', region: 'Asia-Pacific' },
    { code: 'TWD', name: 'Taiwan Dollar', symbol: 'NT$', locale: 'zh-TW', region: 'Asia-Pacific' },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', locale: 'zh-HK', region: 'Asia-Pacific' },
    { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', locale: 'ur-PK', region: 'Asia-Pacific' },
    { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', locale: 'bn-BD', region: 'Asia-Pacific' },
    { code: 'LKR', name: 'Sri Lankan Rupee', symbol: 'Rs', locale: 'si-LK', region: 'Asia-Pacific' },

    // Middle East & Central Asia
    { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', locale: 'ar-SA', region: 'Middle East & Central Asia' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', locale: 'ar-AE', region: 'Middle East & Central Asia' },
    { code: 'QAR', name: 'Qatari Riyal', symbol: '﷼', locale: 'ar-QA', region: 'Middle East & Central Asia' },
    { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك', locale: 'ar-KW', region: 'Middle East & Central Asia' },
    { code: 'BHD', name: 'Bahraini Dinar', symbol: '.د.ب', locale: 'ar-BH', region: 'Middle East & Central Asia' },
    { code: 'OMR', name: 'Omani Rial', symbol: 'ر.ع.', locale: 'ar-OM', region: 'Middle East & Central Asia' },
    { code: 'JOD', name: 'Jordanian Dinar', symbol: 'د.ا', locale: 'ar-JO', region: 'Middle East & Central Asia' },
    { code: 'ILS', name: 'Israeli New Shekel', symbol: '₪', locale: 'he-IL', region: 'Middle East & Central Asia' },
    { code: 'TRY', name: 'Turkish Lira', symbol: '₺', locale: 'tr-TR', region: 'Middle East & Central Asia' },
    { code: 'KZT', name: 'Kazakhstani Tenge', symbol: '₸', locale: 'kk-KZ', region: 'Middle East & Central Asia' },
    { code: 'UZS', name: 'Uzbekistani So\'m', symbol: 'so\'m', locale: 'uz-UZ', region: 'Middle East & Central Asia' },
    { code: 'TJS', name: 'Tajikistani Somoni', symbol: 'ЅМ', locale: 'tg-TJ', region: 'Middle East & Central Asia' },
    { code: 'KGS', name: 'Kyrgyzstani Som', symbol: 'с', locale: 'ky-KG', region: 'Middle East & Central Asia' },

    // Africa
    { code: 'ZAR', name: 'South African Rand', symbol: 'R', locale: 'en-ZA', region: 'Africa' },
    { code: 'EGP', name: 'Egyptian Pound', symbol: '£', locale: 'ar-EG', region: 'Africa' },
    { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', locale: 'en-NG', region: 'Africa' },
    { code: 'GHS', name: 'Ghanaian Cedi', symbol: 'GH₵', locale: 'en-GH', region: 'Africa' },
    { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', locale: 'en-KE', region: 'Africa' },
    { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh', locale: 'sw-TZ', region: 'Africa' },
    { code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh', locale: 'en-UG', region: 'Africa' },
    { code: 'ETB', name: 'Ethiopian Birr', symbol: 'Br', locale: 'am-ET', region: 'Africa' },
    { code: 'MAD', name: 'Moroccan Dirham', symbol: 'د.م.', locale: 'ar-MA', region: 'Africa' },
    { code: 'TND', name: 'Tunisian Dinar', symbol: 'د.ت', locale: 'ar-TN', region: 'Africa' },
    { code: 'DZD', name: 'Algerian Dinar', symbol: 'د.ج', locale: 'ar-DZ', region: 'Africa' },
];

// Create a lookup map for easy access
export const CURRENCY_MAP: Record<string, Currency> = CURRENCIES.reduce(
    (acc, currency) => {
        acc[currency.code] = currency;
        return acc;
    },
    {} as Record<string, Currency>
);

// Get currency by code
export const getCurrency = (code: string): Currency | undefined => {
    return CURRENCY_MAP[code.toUpperCase()];
};

// Get all currency codes
export const getCurrencyCodes = (): string[] => {
    return CURRENCIES.map(c => c.code);
};

// Get currencies by region
export const getCurrenciesByRegion = (region: string): Currency[] => {
    const normalizedRegion = region.trim().toLowerCase();
    return CURRENCIES.filter(c => c.region.toLowerCase() === normalizedRegion);
};

// Format currency amount with proper locale and formatting
export const formatCurrency = (
    amount: number,
    currencyCode: string = 'INR',
    options?: {
        minimumFractionDigits?: number;
        maximumFractionDigits?: number;
        useSymbol?: boolean;
    }
): string => {
    try {
        const currency = getCurrency(currencyCode);

        if (!currency) {
            console.log(`Currency code ${currencyCode} not found`);
            return `${currencyCode} ${amount.toFixed(2)}`;
        }

        if (isNaN(amount)) {
            console.error('Invalid amount provided for formatting:', amount);
            return `${currency.symbol} ${amount}`;
        }

        const {
            minimumFractionDigits = 2,
            maximumFractionDigits = 2,
            useSymbol = true,
        } = options || {};

        const formatter = new Intl.NumberFormat(currency.locale, {
            style: 'currency',
            currency: currencyCode,
            minimumFractionDigits,
            maximumFractionDigits,
        });

        return formatter.format(amount);
    } catch (error) {
        console.error('Error formatting currency:', error);
        return `${currencyCode} ${amount.toFixed(2)}`;
    }
};

// Convert amount from one currency to another (requires exchange rates)
export interface ExchangeRates {
    [key: string]: number;
}

export const convertCurrency = (
    amount: number,
    fromCurrency: string,
    toCurrency: string,
    rates: ExchangeRates
): number | null => {
    try {
        const fromRate = rates[fromCurrency.toUpperCase()];
        const toRate = rates[toCurrency.toUpperCase()];

        if (!fromRate || !toRate) {
            console.error('Exchange rates not available for conversion');
            return null;
        }

        return (amount / fromRate) * toRate;
    } catch (error) {
        console.error('Error converting currency:', error);
        return null;
    }
};

// Get currency symbols
export const getCurrencySymbol = (currencyCode: string): string => {
    const currency = getCurrency(currencyCode);
    return currency?.symbol || currencyCode;
};

// Get currency name
export const getCurrencyName = (currencyCode: string): string => {
    const currency = getCurrency(currencyCode);
    return currency?.name || currencyCode;
};
