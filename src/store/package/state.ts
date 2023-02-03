import type {IPackageRootObject} from "@/interfaces/packge";

export interface IStorePackagesState {
  packages: IPackageRootObject[],
  limit: number;
  page: number;
  pageCount: number;
  query: string;
  loading: boolean;
}

export const state = {
  packages: [],
  limit: 10,
  page: 0,
  pageCount: 0,
  query: "",
  loading: false
};