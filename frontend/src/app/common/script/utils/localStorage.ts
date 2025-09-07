export function loadStateLocalStorage<R>(key: string): R | undefined{
    let res: R;
    try {
      const jsonState = localStorage.getItem(key);
      res = !jsonState ? undefined : JSON.parse(jsonState);

      return res;
    } catch (e) {
      console.error(`LocalStorage: Element with key ${key} not fined` + e);
      return undefined;
    }
}

export function saveStateLocalStorage<S>(key: string, state: S):void {
  const json = JSON.stringify(state);
  localStorage.setItem(key, json);
};