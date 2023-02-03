import {state} from "./state";
import {action} from "./actions";
import {mutations} from "./mutations";
import {getters} from "./getters";

export const packages = {
  state: state,
  actions: action,
  mutations: mutations,
  getters: getters
};