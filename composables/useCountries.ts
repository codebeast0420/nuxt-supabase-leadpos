import * as countries from 'i18n-iso-countries'; // Importiere das Paket
import countriesDe from 'i18n-iso-countries/langs/de.json';
import countriesEn from 'i18n-iso-countries/langs/en.json';



export const useCountries = () => {
    const { locale } = useI18n()

    if (locale.value === 'en') {
        countries.registerLocale(countriesEn);
    } else if (locale.value === 'de') {
        countries.registerLocale(countriesDe);
    }

    const allCountries = countries.getNames(locale.value, { select: "official" })

    const DACHCountries = ['DE', 'AT', 'CH'].map(countryCode => ({
        key: countryCode,
        name: allCountries[countryCode]
    }));

    const nonDachCountries = Object.keys(allCountries)
        .filter(countryCode => !DACHCountries.some(dachCountry => dachCountry.key === countryCode))
        .map(countryCode => ({
            key: countryCode,
            name: allCountries[countryCode]
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

    const generateFormkitSchemaOptions = (countriesArray: { key: string; name: string }[]) => {
        return countriesArray.map((country) => ({
            $el: 'option',
            value: country.key,
            label: country.name,
        }));
    }

    return { allCountries, DACHCountries, nonDachCountries, generateFormkitSchemaOptions };
}
