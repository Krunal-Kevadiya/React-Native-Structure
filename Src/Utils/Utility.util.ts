import _ from 'lodash';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

function cleanArray(o: any) {
  return _.isArray(o) ? _.compact(o) : o;
}

export function cleanUndefOrNull(o: Record<string, any>) {
  return _.transform(o, (r, v, k) => {
    var isObject: boolean = _.isObject(v);
    var val = isObject ? cleanArray(cleanUndefOrNull(v)) : v;
    var keep = isObject ? !_.isEmpty(val) : Boolean(val);

    if (keep) {
      // @ts-ignore
      r[k] = val;
    }
  });
}

export const isNullOrUndefined = (value: any) => value === null || value === undefined;

/**
 * Works like object.assign, but copies properties only present in source or target,
 * and also fills a property if value is undefined.
 */
export function assign<T extends Record<string, any>, K extends keyof T = keyof T>(
  target: Partial<T>,
  source: Partial<T>
): T {
  const result: Partial<T> = {};
  const totalKeys = Object.keys(target).concat(Object.keys(source)) as K[];
  for (const key of totalKeys) {
    if (isNullOrUndefined(result[key])) {
      result[key] = source[key] || target[key];
    }
  }
  return result as T;
}

const debouncedHapticFeedback = _.debounce(
  () => {
    const options = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: true
    };
    ReactNativeHapticFeedback.trigger('notificationSuccess', options);
  },
  1000,
  { leading: true, trailing: false }
);

export function triggerHapticFeedback(): void {
  debouncedHapticFeedback();
}
