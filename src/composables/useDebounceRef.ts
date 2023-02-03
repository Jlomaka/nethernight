import {customRef, ref} from "vue";

const debounce = (fn: Function, delay = 0) => {
  let timeout = 0;
  return (...args: any) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const useDebouncedRef = (initialValue: any, delay: number) => {
  const state = ref(initialValue);
  return customRef((track, trigger) => ({
    get () {
      track();
      return state.value;
    },
    set: debounce((value: any) => {
      state.value = value;
      trigger();
    }, delay),
  }));
};

export default useDebouncedRef;