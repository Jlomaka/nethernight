import {
  createStore,
  Store as VuexStore,
} from "vuex";
import type {
  CommitOptions,
  DispatchOptions,
} from "vuex";
import {packages} from "@/store/package";
import type {IStorePackagesState} from "@/store/package/state";
import type {TStorePackagesMutation} from "@/store/package/mutations";
import type {TStorePackagesAction} from "@/store/package/actions";
import type {TStorePackagesGetters} from "@/store/package/getters";

export const store = createStore({
  modules: {
    packages: packages,
  }
});

export function useStore () {
  return store as Store;
}

export type Store = Omit<
  VuexStore<IStorePackagesState>,
  "getters" | "commit" | "dispatch"
> & {
  commit<K extends keyof TStorePackagesMutation, P extends Parameters<TStorePackagesMutation[K]>[1]> (
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<TStorePackagesMutation[K]>;
} & {
  dispatch<K extends keyof TStorePackagesAction> (
    key: K,
    payload?: Parameters<TStorePackagesAction[K]>[1],
    options?: DispatchOptions
  ): ReturnType<TStorePackagesAction[K]>;
} & {
  getters: {
    [K in keyof TStorePackagesGetters]: ReturnType<TStorePackagesGetters[K]>
  };
}