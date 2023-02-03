import type {IStorePackagesState} from "./state";
import type {TStorePackagesMutation} from "./mutations";
import type {ActionContext, ActionTree} from "vuex";
import {EStorePackagesMutationTypes} from "./mutations";
import {api} from "@/common/api";
import type {IPackageRootObject} from "@/interfaces/packge";

export enum EStorePackagesActionTypes {
  RequestPackages = "REQUEST_PACKAGES",

}

export type TActionAugments = Omit<ActionContext<IStorePackagesState, IStorePackagesState>, "commit"> & {
  commit<K extends keyof TStorePackagesMutation> (
    key: K,
    payload: Parameters<TStorePackagesMutation[K]>[1]
  ): ReturnType<TStorePackagesMutation[K]>;
}

export type TStorePackagesAction = {
  [EStorePackagesActionTypes.RequestPackages] (context: TActionAugments, payload: { text: string, page?: number }): void;
}

export const action: ActionTree<IStorePackagesState, IStorePackagesState> & TStorePackagesAction = {
  async [EStorePackagesActionTypes.RequestPackages] ({commit, state}, {text, page = 0}) {
    try {
      commit(EStorePackagesMutationTypes.UpdateLoading, true);

      let {data} = await api.searchPackage({text, size: state.limit, offset: state.limit * page});
      commit(EStorePackagesMutationTypes.UpdatePackages, {
        packages: data.objects as IPackageRootObject[],
        page,
        amount: data.total,
        query: text
      });
    } catch (err) {
      console.log(err);
    } finally {
      commit(EStorePackagesMutationTypes.UpdateLoading, false);
    }
  }
};