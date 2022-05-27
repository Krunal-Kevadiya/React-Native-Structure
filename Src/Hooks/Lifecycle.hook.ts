import type { DependencyList } from '@hooks-util';
import useDidMount from './DidMount.hook';
import useWillUnmount from './WillUnmount.hook';

/**
 * Returns an object wrapping lifecycle hooks such as `useDidMount` or `useWillUnmount`.
 * It is intended as a shortcut to those hooks.
 */
export default function useLifecycle(
  mount: () => void,
  unmount: () => void,
  deps: DependencyList = []
): [(nextCallback: () => void) => void, (nextCallback: () => void) => void] {
  const onDidMount = useDidMount(mount, deps);
  const onWillUnmount = useWillUnmount(unmount, deps);

  return [onDidMount, onWillUnmount];
}
