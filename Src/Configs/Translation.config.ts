import i18n from 'i18n-js';
import memoize from 'lodash.memoize';
import { I18nManager } from 'react-native';
import * as RNLocalize from 'react-native-localize';
import Translations from '@translations';

export const DEFAULT_LANGUAGE = 'en';

const translationGetters = {
  en: () => Translations.en,
  nl: () => Translations.nl
};

export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

export async function setTranslationsLanguageConfig(codeLang: string | undefined = undefined): Promise<string> {
  // fallback if no available language fits
  const fallback = { languageTag: DEFAULT_LANGUAGE, isRTL: false };
  const lang = codeLang ? { languageTag: codeLang, isRTL: false } : null;

  //Use RNLocalize to detect the user system language
  const { languageTag, isRTL } = lang
    ? lang
    : RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) || fallback;

  // clear translation cache
  translate.cache.clear?.();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  //@ts-ignore
  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
  return languageTag;
}
setTranslationsLanguageConfig();
