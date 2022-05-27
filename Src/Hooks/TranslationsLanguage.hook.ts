import CodePush from 'react-native-code-push';
import * as RNLocalize from 'react-native-localize';
import { setTranslationsLanguageConfig } from '@configs';
import useLifecycle from './Lifecycle.hook';

export default function useTranslationsLanguage(): void {
  function onLocalizationChange(): void {
    setTranslationsLanguageConfig().then(() => {
      CodePush.allowRestart();
    });
  }

  useLifecycle(
    () => {
      RNLocalize.addEventListener('change', onLocalizationChange);
    },
    () => {
      RNLocalize.removeEventListener('change', onLocalizationChange);
    }
  );
}
