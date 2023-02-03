import type {MutationTree} from "vuex";
import type {IStorePackagesState} from "./state";
import type {IPackageRootObject} from "@/interfaces/packge";

export enum EStorePackagesMutationTypes {
  UpdatePackages = "UPDATE_PACKAGES",
  UpdateLoading = "UPDATE_LOADING",
}

export type TStorePackagesMutation = {
  [EStorePackagesMutationTypes.UpdatePackages] (state: IStorePackagesState, value: {
    packages: IPackageRootObject[],
    page: number,
    amount: number,
    query: string
  }): void;
  [EStorePackagesMutationTypes.UpdateLoading] (state: IStorePackagesState, value: boolean): void;
}

export const mutations: MutationTree<IStorePackagesState> & TStorePackagesMutation = {
  [EStorePackagesMutationTypes.UpdatePackages] (state, {packages = [], page = 0, amount = 0, query = ""}) {
    state.packages = packages;
    state.page = page;
    state.pageCount = Math.ceil(amount / state.limit);
    state.query = query;
  },
  [EStorePackagesMutationTypes.UpdateLoading] (state, value) {
    state.loading = value;
  }
};