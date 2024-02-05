import enAdminMessages from './lang/admin/en-EN.json';
import deAdminMessages from './lang/admin/de-DE.json';

const adminMessages = {
    en: enAdminMessages,
    de: deAdminMessages,
};

export default defineI18nConfig(async () => {
  const textSnippets = await $fetch('/api/text-snippets');

  let messages = {} as Record<string, Record<string, string>>;

  textSnippets.forEach(translation => {
    if (!messages[translation.lang]) {
      messages[translation.lang] = {};
    }
    messages[translation.lang][translation.key] = translation.value;
  });

  for (const lang in adminMessages) {
    if (!messages[lang]) {
      messages[lang] = {};
    }
    for (const key in adminMessages[lang]) {
      messages[lang][key] = adminMessages[lang][key];
    }
  }

  return {
    legacy: false,
    locales: ['de', 'en'],
    defaultLocale: 'de',
    fallbackLocale: 'de',
    detectBrowserLanguage: {
        redirectOn: 'all'
    },
    messages,
    strategy: 'no_prefix',
    vueI18n: {
        fallbackLocale: 'de',
    }
  };
});
