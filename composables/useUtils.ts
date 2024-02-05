import { FormKitSchemaDefinition } from '@formkit/core'

export const useUtils = () => {
    const generateFormFromSchema = (schema: FormKitSchemaDefinition) => {
        const form =
            // @ts-ignore
            schema.reduce((obj, field) => {
                // @ts-ignore
                obj[field.name] = '';

                if (obj.hasOwnProperty('slots')) {
                    delete obj.slots;
                }

                if (field.value !== undefined && field.value !== null) {
                    obj[field.name] = field.value;
                }

                return obj;
            }, {})

        return form
    }

    const isObjectEmpty = (obj: object) => {
        return Object.keys(obj).length === 0;
    }

    const removeEmptyObjectValues = (obj: object) => {
        return Object.keys(obj)
            .filter((key) => obj[key] !== null)
            .reduce((acc, key) => {
                acc[key] = obj[key];
                return acc;
            }, {});
    }

    function formatCurrency(amount, currency) {
        const locale = navigator.language;
        const formatter = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency.toUpperCase(),
            minimumFractionDigits: 2,
        });

        return formatter.format(amount / 100);
    }

    const formatUnixTimestamp = (timestamp: number): string => {
        const locale = navigator.language;
        const date = new Date(timestamp * 1000);
        const formatter = new Intl.DateTimeFormat(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return formatter.format(date);
    }

    return { generateFormFromSchema, isObjectEmpty, removeEmptyObjectValues, formatCurrency, formatUnixTimestamp }
}
