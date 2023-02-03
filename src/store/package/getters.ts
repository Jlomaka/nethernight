import type {GetterTree} from "vuex";
import type {IPackageRootObject} from "@/interfaces/packge";
import type {IStorePackagesState} from "@/store/package/state";

export type TStorePackagesGetters = {
  getPackages (state: IStorePackagesState): IPackageRootObject[];
  getLimit (state: IStorePackagesState): number;
  getPage (state: IStorePackagesState): number;
  getPageCount (state: IStorePackagesState): number;
  getQuery (state: IStorePackagesState): string;
  getLoading (state: IStorePackagesState): boolean;
}

export const getters: GetterTree<IStorePackagesState, IStorePackagesState> & TStorePackagesGetters = {
  getPackages (state) {
    return state.packages;
  },
  getLimit (state) {
    return state.limit;
  },
  getPage (state) {
    return state.page;
  },
  getPageCount (state) {
    return state.pageCount;
  },
  getQuery (state) {
    return state.query;
  },
  getLoading (state) {
    return state.loading;
  }
};