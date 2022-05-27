import _ from 'lodash';
import { RegexConst } from '@constants';
import { isNullOrUndefined } from './Utility.util';

export function format(fmt: string, ...args: any[]): string {
  if (!fmt.match(RegexConst.stringFormat)) {
    throw new Error(`String invalid format string. ${fmt}`);
  }
  return fmt.replace(RegexConst.stringArg, (_m: string, str, index) => {
    if (str) {
      return str.replace(RegexConst.stringArgFormat, (m1: string) => m1[0]);
    }
    if (index >= args.length) {
      throw new Error(`String argument index is out of range in format ${index}`);
    }
    return args[index];
  });
}

export function isNotNullOrEmpty(text?: string | number | null): boolean {
  return !isNullOrUndefined(text) && text !== '' && !_.isEmpty(text);
}

export function getTwoInitialCharacters(text?: string): string {
  const array = (text ?? '').split(' ').filter((t) => isNotNullOrEmpty(t));
  if (array.length >= 2) {
    return `${array[0].charAt(0)}${array[1].charAt(0)}`.toUpperCase();
  }
  return `${array[0].charAt(0)}`.toUpperCase();
}

export function generateId(
  len: number = 10,
  chars: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_'
): string {
  let id = '';
  for (let i = 0; i < len; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}
