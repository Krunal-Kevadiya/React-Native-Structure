import moment from 'moment';
import { isNotNullOrEmpty } from '@utils';

function pad(num: number, allowSlice: boolean = true): string {
  const numbers = num >= 10 ? `${num}` : `0${num}`;
  return allowSlice ? numbers.slice(-2) : numbers;
}

export function secondsTomsByTranscript(secs: number): string {
  let minutes = Math.floor(secs / 60);
  secs = Math.floor(secs % 60);
  minutes = Math.floor(minutes % 60);
  return pad(minutes) + ':' + pad(secs);
}

export function secondsToms(secs: number): string {
  let minutes = Math.floor(secs / 60);
  secs = Math.floor(secs % 60);
  minutes = Math.floor(minutes % 60);
  return pad(minutes) + ':' + pad(secs);
}

export function secondsTohms(secs: number): string {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs - minutes * 60);
  return minutes === 0 ? pad(seconds) : pad(minutes, false) + ':' + pad(seconds);
}

export function millisecondsToms(milliseconds: number): string {
  let secs = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(secs / 60);
  secs = Math.floor(secs % 60);
  minutes = Math.floor(minutes % 60);
  return pad(minutes) + ':' + pad(secs);
}

export function millisecondsToSeconds(milisecs: number): number {
  const secs = Math.floor(milisecs / 1000);
  return secs;
}

export function msToSeconds(ms: string): number {
  if (isNotNullOrEmpty(ms)) {
    const time = ms.split(':');
    return parseInt(time[0], 10) * 60 + parseInt(time[1], 10);
  } else {
    return 0;
  }
}

export function timeSince(date: string, inputFormat: string, isDateVisible: boolean = false): string {
  let newDate = moment(moment(date, inputFormat)?.toDate());
  moment.updateLocale('en', {
    relativeTime: {
      future: '%s ago',
      past: '%s ago',
      s: 'now',
      m: '1m',
      mm: '%dm',
      h: '1h',
      hh: '%dh',
      d: '1d',
      dd: '%dd',
      M: '1 mth',
      MM: '%d mths',
      y: '1y',
      yy: '%dy'
    }
  });
  let temp = moment(newDate).fromNow();
  let diff = moment().diff(moment(newDate), 'days', true);
  if (diff >= 1) {
    return isDateVisible ? moment(newDate).format('MMM DD h:mm A') : diff === 1 ? '1 day ago' : temp;
  } else if (diff >= 0.916 && diff <= 1) {
    let hours = moment().diff(moment(newDate), 'hours');
    return `${hours}h ago`;
  }
  if (temp.includes('now')) {
    temp = temp?.replace('now ago', '1s ago');
  }
  return temp;
}
