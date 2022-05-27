import type { RootStateType } from '@stores-redux';

export function getStorage(): RootStateType {
  return require('../Redux/Store').default.store.getState();
}
