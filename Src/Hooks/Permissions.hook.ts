import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, AlertButton } from 'react-native';
import {
  Permission,
  Rationale,
  check,
  checkMultiple,
  openSettings,
  request,
  requestMultiple,
  checkNotifications,
  requestNotifications
} from 'react-native-permissions';
import { isNotNullOrEmpty, isNullOrUndefined } from '@utils';
import useDeepCompareCallback from './DeepCompareCallback.hook';
import useDeepCompareEffect from './DeepCompareEffect.hook';

type RationaleOptions = {
  customDialogView?: (buttonPositive: () => void, buttonNegative: () => void) => void;
} & Rationale;

type PermissionsOptions = {
  /** If it should ask the permissions when mounted, defaults to `false` */
  ask?: boolean;
  /** If it should fetch information about the permissions when mounted, defaults to `true` */
  get?: boolean;
  /** If it should fetch information about the permissions when mounted and trigger onGranted callback , defaults to `false` */
  getWithCallback?: boolean;
};

export type PermissionStatus = 'unavailable' | 'denied' | 'limited' | 'granted' | 'blocked';
const defaultOption: RationaleOptions = {
  title: '',
  message: '',
  buttonPositive: ''
};

/* @TODO: How to used useSinglePermissions hook
const [data, error, askPermission, getPermission] = useSinglePermissions(
    PERMISSIONS.IOS.PHOTO_LIBRARY,
    {
      title: 'Can we access your photo library?',
      message: 'We need access so you can upload photos',
      buttonPositive: 'Ok',
      buttonNegative: 'Cancel'

      OR

      customDialogView: (buttonPositive: () => void, buttonNegative: () => void) => {
        // Do anything here
      }
    },
    {
      title: 'Can we access your photo library?',
      message: 'We need access so you can upload photos',
      buttonPositive: 'Ok',
      buttonNegative: 'Cancel'

      OR

      customDialogView: (buttonPositive: () => void, buttonNegative: () => void) => {
        // Do anything here
      }
    },
    {
      title: 'Can we access your photo library?',
      message: 'We need access so you can upload photos',
      buttonPositive: 'Setting',
      buttonNegative: 'Cancel'

      OR

      customDialogView: (buttonPositive: () => void, buttonNegative: () => void) => {
        // Do anything here
      }
    }, {
      ask: false,
      get: true,
      getWithCallback: false
    }, () => {
      // Permission grant then what to do.
    }, () => {
      // dismiss the dialog
    }
  );
*/
export function useSinglePermissions(
  type: Permission,
  requestInitial: RationaleOptions = defaultOption,
  requestRationale: RationaleOptions = defaultOption,
  requestBlocked: RationaleOptions = defaultOption,
  options: PermissionsOptions = {},
  onGranted: () => void = () => {},
  customDialogComplete: () => void = () => {}
): [PermissionStatus | undefined, Error | undefined, () => void, () => Promise<PermissionStatus>] {
  const { ask = false, get = true, getWithCallback = false } = options;
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus | undefined>();
  const [error, setError] = useState<Error>();
  const [withCallback, setWithCallback] = useState<boolean>(false);

  const askDeniedOrBlockedPermissions = useDeepCompareCallback<
    (withState: boolean, isDenied: boolean, option: RationaleOptions) => () => Promise<PermissionStatus>
  >(
    (withState, isDenied, option) => () => {
      const { title, message, buttonPositive, buttonNegative, buttonNeutral, customDialogView } = option;
      setWithCallback(true);
      const onPressGet = (): Promise<PermissionStatus> => {
        return check(type)
          .then((status: PermissionStatus) => {
            if (withState) {
              setPermissionStatus(status);
              customDialogComplete();
            }
            return status;
          })
          .catch((error1: Error) => {
            if (withState) {
              setError(error1);
              customDialogComplete();
            }
            throw error1;
          });
      };
      const onPressAsk = (): Promise<PermissionStatus> => {
        if (isDenied) {
          return request(type)
            .then((status: PermissionStatus) => {
              if (withState) {
                setPermissionStatus(status);
                customDialogComplete();
              }
              return status;
            })
            .catch((error1: Error) => {
              if (withState) {
                setError(error1);
                customDialogComplete();
              }
              throw error1;
            });
        } else {
          return openSettings()
            .then(() => onPressGet())
            .catch((error1: Error) => {
              if (withState) {
                setError(error1);
                customDialogComplete();
              }
              throw error1;
            });
        }
      };

      return new Promise<PermissionStatus>((resolve) => {
        const onPressNegative = () => resolve(onPressGet());
        const onPressPositive = () => resolve(onPressAsk());

        if (!isNullOrUndefined(customDialogView)) {
          customDialogView?.(onPressPositive, onPressNegative);
        } else if (
          isNotNullOrEmpty(title) &&
          isNotNullOrEmpty(message) &&
          isNotNullOrEmpty(buttonPositive) &&
          (isNotNullOrEmpty(buttonNegative) || isNotNullOrEmpty(buttonNeutral))
        ) {
          const buttons: AlertButton[] = [];

          if (buttonNegative) {
            if (buttonNeutral) {
              buttons.push({ text: buttonNeutral, onPress: onPressNegative });
            }
            buttons.push({ text: buttonNegative, onPress: onPressNegative });
          }

          buttons.push({
            text: buttonPositive,
            onPress: onPressPositive
          });

          Alert.alert(title, message, buttons, { cancelable: false });
        } else {
          return onPressAsk();
        }
      });
    },
    [type]
  );

  const askPermissions = useDeepCompareCallback<() => Promise<PermissionStatus>>(() => {
    const { title, message, buttonPositive, buttonNegative, buttonNeutral, customDialogView } = requestInitial;
    setWithCallback(true);
    const onPressGet = (): Promise<PermissionStatus> => {
      return check(type)
        .then((status: PermissionStatus) => {
          setPermissionStatus(status);
          customDialogComplete();
          return status;
        })
        .catch((error1: Error) => {
          setError(error1);
          customDialogComplete();
          throw error1;
        });
    };
    const onPressAsk = (): Promise<PermissionStatus> => {
      return request(type)
        .then((status: PermissionStatus) => {
          if (status === 'denied') {
            return askDeniedOrBlockedPermissions(false, true, requestRationale)();
          } else if (status === 'blocked') {
            return askDeniedOrBlockedPermissions(false, false, requestBlocked)();
          }
          return status;
        })
        .then((status: PermissionStatus) => {
          setPermissionStatus(status);
          customDialogComplete();
          return status;
        })
        .catch((error1: Error) => {
          setError(error1);
          customDialogComplete();
          throw error1;
        });
    };

    return new Promise<PermissionStatus>((resolve) => {
      const onPressNegative = () => resolve(onPressGet());
      const onPressPositive = () => resolve(onPressAsk());
      if (!isNullOrUndefined(customDialogView)) {
        customDialogView?.(onPressPositive, onPressNegative);
      } else if (
        isNotNullOrEmpty(title) &&
        isNotNullOrEmpty(message) &&
        isNotNullOrEmpty(buttonPositive) &&
        (isNotNullOrEmpty(buttonNegative) || isNotNullOrEmpty(buttonNeutral))
      ) {
        const buttons: AlertButton[] = [];

        if (buttonNegative) {
          if (buttonNeutral) {
            buttons.push({ text: buttonNeutral, onPress: onPressNegative });
          }
          buttons.push({ text: buttonNegative, onPress: onPressNegative });
        }

        buttons.push({
          text: buttonPositive,
          onPress: onPressPositive
        });

        Alert.alert(title, message, buttons, { cancelable: false });
      } else {
        return onPressAsk();
      }
    });
  }, [requestBlocked, requestInitial, requestRationale, type]);

  const getPermissions = useDeepCompareCallback<() => Promise<PermissionStatus>>(() => {
    return check(type)
      .then((status: PermissionStatus) => {
        setPermissionStatus(status);
        return status;
      })
      .catch((error1: Error) => {
        setError(error1);
        throw error1;
      });
  }, [type]);

  useDeepCompareEffect(() => {
    if (ask) {
      askPermissions();
    }

    if (!ask && get) {
      getPermissions();
    }
  }, [ask, get]);

  useDeepCompareEffect(() => {
    if ((permissionStatus === 'granted' || permissionStatus === 'limited') && (withCallback || getWithCallback)) {
      onGranted();
    }
  }, [permissionStatus, withCallback, getWithCallback]);

  const callPermission = useDeepCompareCallback<() => void>(() => {
    if (permissionStatus === 'denied') {
      askDeniedOrBlockedPermissions(true, true, requestRationale)();
    } else if (permissionStatus === 'blocked') {
      askDeniedOrBlockedPermissions(true, false, requestBlocked)();
    } else if (permissionStatus === 'granted' || permissionStatus === 'limited') {
      onGranted();
    } else {
      check(type)
        .then((status: PermissionStatus) => {
          setPermissionStatus(status);
          if (status === 'granted' || status === 'limited') {
            onGranted();
          } else {
            askPermissions();
          }
        })
        .catch((error1: Error) => {
          setError(error1);
        });
    }
  }, [permissionStatus, requestRationale, requestBlocked, type]);

  return [permissionStatus, error, callPermission, getPermissions];
}

type getPermissionResultReturnType = {
  status: PermissionStatus;
  deniedList: Permission[];
  blockedList: Permission[];
};

function getPermissionResult(
  types: Permission[],
  optionTypes: Permission[],
  statuses: Record<Permission[number], PermissionStatus>
): getPermissionResultReturnType {
  const tempOptionTypes: Permission[] = optionTypes ?? [];
  const grantedList: Permission[] = types.filter(
    (type) =>
      statuses[type] === 'granted' || statuses[type] === 'limited' || tempOptionTypes.findIndex((p) => p === type) > -1
  );
  const deniedList: Permission[] = types.filter(
    (type) => statuses[type] === 'denied' && tempOptionTypes.findIndex((p) => p === type) <= -1
  );
  const blockedList: Permission[] = types.filter(
    (type) => statuses[type] === 'blocked' && tempOptionTypes.findIndex((p) => p === type) <= -1
  );
  let status: PermissionStatus = 'unavailable';
  if (grantedList.length === types.length) {
    status = 'granted';
  } else if (deniedList.length > 0) {
    status = 'denied';
  } else if (blockedList.length > 0) {
    status = 'blocked';
  } else {
    status = 'unavailable';
  }
  return { status, deniedList, blockedList };
}

/* @TODO: How to used useMultiplePermissions hook
const [data, error, askPermission, getPermission] = useMultiplePermissions(
    [PERMISSIONS.IOS.PHOTO_LIBRARY, PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE],
    {
      title: 'Can we access your photo library?',
      message: 'We need access so you can upload photos',
      buttonPositive: 'Ok',
      buttonNegative: 'Cancel'

      OR

      customDialogView: (buttonPositive: () => void, buttonNegative: () => void) => {
        // Do anything here
      }
    },
    {
      title: 'Can we access your photo library?',
      message: 'We need access so you can upload photos',
      buttonPositive: 'Ok',
      buttonNegative: 'Cancel'

      OR

      customDialogView: (buttonPositive: () => void, buttonNegative: () => void) => {
        // Do anything here
      }
    },
    {
      title: 'Can we access your photo library?',
      message: 'We need access so you can upload photos',
      buttonPositive: 'Ok',
      buttonNegative: 'Cancel'

      OR

      customDialogView: (buttonPositive: () => void, buttonNegative: () => void) => {
        // Do anything here
      }
    }, {
      ask: false,
      get: true,
      getWithCallback: false
    }, () => {
      // All permission grant then what to do.
    }, () => {
      // dismiss the dialog
    },
    [PERMISSIONS.IOS.CAMERA]
  );
*/
export function useMultiplePermissions(
  types: Permission[],
  requestInitial: RationaleOptions = defaultOption,
  requestRationale: RationaleOptions = defaultOption,
  requestBlocked: RationaleOptions = defaultOption,
  options: PermissionsOptions = {},
  onGranted: () => void = () => {},
  customDialogComplete: () => void = () => {},
  optionTypes: Permission[] = []
): [PermissionStatus | undefined, Error | undefined, () => void, () => Promise<void>] {
  const { ask = false, get = true, getWithCallback = false } = options;
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus | undefined>();
  const [error, setError] = useState<Error>();
  const [withCallback, setWithCallback] = useState<boolean>(false);

  const askDeniedOrBlockedPermissions = useDeepCompareCallback<
    (
      withState: boolean,
      isDenied: boolean,
      option: RationaleOptions,
      requestList?: Permission[]
    ) => () => Promise<PermissionStatus>
  >(
    (withState, isDenied, option, requestList) => () => {
      const { title, message, buttonPositive, buttonNegative, buttonNeutral, customDialogView } = option;
      setWithCallback(true);
      const onPressGet = (): Promise<PermissionStatus> => {
        return checkMultiple(requestList ?? types)
          .then((statuses: Record<Permission[number], PermissionStatus>) => {
            const { status } = getPermissionResult(requestList ?? types, optionTypes, statuses);
            if (withState) {
              setPermissionStatus(status);
              customDialogComplete();
            }
            return status;
          })
          .catch((error1: Error) => {
            if (withState) {
              setError(error1);
              customDialogComplete();
            }
            throw error1;
          });
      };
      const onPressAsk = (): Promise<PermissionStatus> => {
        if (isDenied) {
          return requestMultiple(requestList ?? types)
            .then((statuses: Record<Permission[number], PermissionStatus>) => {
              const { status } = getPermissionResult(requestList ?? types, optionTypes, statuses);
              return status;
            })
            .then((status: PermissionStatus) => {
              if (withState) {
                setPermissionStatus(status);
                customDialogComplete();
              }
              return status;
            })
            .catch((error1: Error) => {
              if (withState) {
                setError(error1);
                customDialogComplete();
              }
              throw error1;
            });
        } else {
          return openSettings()
            .then(() => onPressGet())
            .catch((error1: Error) => {
              if (withState) {
                setError(error1);
                customDialogComplete();
              }
              throw error1;
            });
        }
      };

      return new Promise<PermissionStatus>((resolve) => {
        const onPressNegative = () => resolve(onPressGet());
        const onPressPositive = () => resolve(onPressAsk());

        if (!isNullOrUndefined(customDialogView)) {
          customDialogView?.(onPressPositive, onPressNegative);
        } else if (
          isNotNullOrEmpty(title) &&
          isNotNullOrEmpty(message) &&
          isNotNullOrEmpty(buttonPositive) &&
          (isNotNullOrEmpty(buttonNegative) || isNotNullOrEmpty(buttonNeutral))
        ) {
          const buttons: AlertButton[] = [];

          if (buttonNegative) {
            if (buttonNeutral) {
              buttons.push({ text: buttonNeutral, onPress: onPressNegative });
            }
            buttons.push({ text: buttonNegative, onPress: onPressNegative });
          }

          buttons.push({
            text: buttonPositive,
            onPress: onPressPositive
          });

          Alert.alert(title, message, buttons, { cancelable: false });
        } else {
          return onPressAsk();
        }
      });
    },
    [optionTypes, types]
  );

  const askPermissions = useDeepCompareCallback<() => Promise<PermissionStatus>>(() => {
    const { title, message, buttonPositive, buttonNegative, buttonNeutral, customDialogView } = requestInitial;
    setWithCallback(true);
    const onPressGet = (): Promise<PermissionStatus> => {
      return checkMultiple(types)
        .then((statuses: Record<Permission[number], PermissionStatus>) => {
          const { status } = getPermissionResult(types, optionTypes, statuses);
          setPermissionStatus(status);
          customDialogComplete();
          return status;
        })
        .catch((error1: Error) => {
          setError(error1);
          customDialogComplete();
          throw error1;
        });
    };
    const onPressAsk = (): Promise<PermissionStatus> => {
      return requestMultiple(types)
        .then((statuses: Record<Permission[number], PermissionStatus>) => {
          const { status, deniedList, blockedList } = getPermissionResult(types, optionTypes, statuses);
          if (status === 'denied') {
            return askDeniedOrBlockedPermissions(false, true, requestRationale, deniedList)();
          } else if (status === 'blocked') {
            return askDeniedOrBlockedPermissions(false, false, requestBlocked, blockedList)();
          }
          return status;
        })
        .then((status: PermissionStatus) => {
          setPermissionStatus(status);
          customDialogComplete();
          return status;
        })
        .catch((error1: Error) => {
          setError(error1);
          customDialogComplete();
          throw error1;
        });
    };

    return new Promise<PermissionStatus>((resolve) => {
      const onPressNegative = () => resolve(onPressGet());
      const onPressPositive = () => resolve(onPressAsk());
      if (!isNullOrUndefined(customDialogView)) {
        customDialogView?.(onPressPositive, onPressNegative);
      } else if (
        isNotNullOrEmpty(title) &&
        isNotNullOrEmpty(message) &&
        isNotNullOrEmpty(buttonPositive) &&
        (isNotNullOrEmpty(buttonNegative) || isNotNullOrEmpty(buttonNeutral))
      ) {
        const buttons: AlertButton[] = [];

        if (buttonNegative) {
          if (buttonNeutral) {
            buttons.push({ text: buttonNeutral, onPress: onPressNegative });
          }
          buttons.push({ text: buttonNegative, onPress: onPressNegative });
        }

        buttons.push({
          text: buttonPositive,
          onPress: onPressPositive
        });

        Alert.alert(title, message, buttons, { cancelable: false });
      } else {
        return onPressAsk();
      }
    });
  }, [types, optionTypes]);

  const getPermissions = useDeepCompareCallback<() => Promise<void>>(() => {
    return checkMultiple(types)
      .then((statuses: Record<Permission[number], PermissionStatus>) => {
        const { status } = getPermissionResult(types, optionTypes, statuses);
        setPermissionStatus(status);
      })
      .catch(setError);
  }, [types, optionTypes]);

  useDeepCompareEffect(() => {
    if (ask) {
      askPermissions();
    }

    if (!ask && get) {
      getPermissions();
    }
  }, [ask, get]);

  useDeepCompareEffect(() => {
    if ((permissionStatus === 'granted' || permissionStatus === 'limited') && (withCallback || getWithCallback)) {
      onGranted();
    }
  }, [permissionStatus, withCallback, getWithCallback]);

  const callPermission = useDeepCompareCallback<() => void>(() => {
    if (permissionStatus === 'denied') {
      askDeniedOrBlockedPermissions(true, true, requestRationale)();
    } else if (permissionStatus === 'blocked') {
      askDeniedOrBlockedPermissions(true, false, requestBlocked)();
    } else if (permissionStatus === 'granted' || permissionStatus === 'limited') {
      onGranted();
    } else {
      checkMultiple(types)
        .then((statuses: Record<Permission[number], PermissionStatus>) => {
          const { status } = getPermissionResult(types, optionTypes, statuses);
          setPermissionStatus(status);
          if (status === 'granted' || status === 'limited') {
            onGranted();
          } else {
            askPermissions();
          }
        })
        .catch((error1: Error) => {
          setError(error1);
        });
    }
  }, [permissionStatus, requestRationale, requestBlocked, types]);

  return [permissionStatus, error, callPermission, getPermissions];
}

export function useNotificationPermissions(
  requestBlocked: Rationale,
  options: PermissionsOptions = {},
  onGranted: () => void = () => {}
): [PermissionStatus | undefined, Error | undefined, () => Promise<void>, () => Promise<void>] {
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus | undefined>();
  const [error, setError] = useState<Error>();
  const { ask = false, get = true } = options;

  const askBlockedPermissionsWithState = useCallback<() => Promise<PermissionStatus>>(() => {
    const { title, message, buttonPositive, buttonNegative, buttonNeutral } = requestBlocked;

    return new Promise<PermissionStatus>((resolve) => {
      const buttons: AlertButton[] = [];

      if (buttonNegative) {
        const onPress = () =>
          resolve(
            checkNotifications().then(({ status }) => {
              setPermissionStatus(status);
              return status;
            })
          );
        if (buttonNeutral) {
          buttons.push({ text: buttonNeutral, onPress });
        }
        buttons.push({ text: buttonNegative, onPress });
      }

      buttons.push({
        text: buttonPositive,
        onPress: () =>
          resolve(
            openSettings().then(() =>
              checkNotifications().then(({ status }) => {
                setPermissionStatus(status);
                return status;
              })
            )
          )
      });

      Alert.alert(title, message, buttons, { cancelable: false });
    });
  }, [requestBlocked]);

  const askBlockedPermissions = useCallback<() => Promise<void>>(() => {
    const { title, message, buttonPositive, buttonNegative, buttonNeutral } = requestBlocked;

    return new Promise<void>((resolve) => {
      const buttons: AlertButton[] = [];

      if (buttonNegative) {
        const onPress = () => resolve();
        if (buttonNeutral) {
          buttons.push({ text: buttonNeutral, onPress });
        }
        buttons.push({ text: buttonNegative, onPress });
      }

      buttons.push({
        text: buttonPositive,
        onPress: () => resolve(openSettings())
      });

      Alert.alert(title, message, buttons, { cancelable: false });
    });
  }, [requestBlocked]);

  const askPermissions = useCallback<() => Promise<void>>(() => {
    return requestNotifications(['alert', 'badge', 'sound'])
      .then(({ status }) => {
        if (status === 'blocked') {
          return askBlockedPermissionsWithState();
        }
        return status;
      })
      .then(setPermissionStatus)
      .catch(setError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPermissions = useCallback<() => Promise<void>>(() => {
    return checkNotifications()
      .then(({ status }) => setPermissionStatus(status))
      .catch(setError);
  }, []);

  useDeepCompareEffect(() => {
    if (ask) {
      askPermissions();
    }

    if (!ask && get) {
      getPermissions();
    }
  }, [ask, askPermissions, get, getPermissions]);

  useEffect(() => {
    if (permissionStatus === 'granted' || permissionStatus === 'limited') {
      onGranted();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissionStatus]);

  const callPermission = useMemo(
    () => (permissionStatus === 'blocked' ? askBlockedPermissions : askPermissions),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [permissionStatus]
  );
  return [permissionStatus, error, callPermission, getPermissions];
}
