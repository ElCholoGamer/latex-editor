import { writable, type StartStopNotifier } from 'svelte/store';

export const persistent = <T>(
  storageKey: string,
  value?: T,
  start?: StartStopNotifier<T>
) => {
  const store = writable(value, (set, get) => {
    const storedValue = localStorage.getItem(storageKey);
    if (storedValue !== null) {
      set(JSON.parse(storedValue));
    }
    start?.(set, get);
  });

  store.subscribe((newValue) => {
    localStorage.setItem(storageKey, JSON.stringify(newValue));
  });

  return store;
};
