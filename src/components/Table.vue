<script
  lang="ts"
  setup
>
import {computed, reactive, ref, watch} from "vue";
import {useStore} from "@/store";
import type {IPackageRootObject} from "@/interfaces/packge";
import InformationModal from "@/components/InformationModal.vue";
import Loader from "@/components/Loader.vue";
import {EStorePackagesActionTypes} from "@/store/package/actions";

const store = useStore();
const packages = computed(() => store.getters.getPackages);
const pageCount = computed(() => store.getters.getPageCount);
const query = computed(() => store.getters.getQuery);
const loading = computed(() => store.getters.getLoading);

let dialog = ref(false);
let selectPackage = reactive<Partial<IPackageRootObject>>({});
const name = ref("");
let page = ref(1);

watch(page, newQuery => {
  store.dispatch(EStorePackagesActionTypes.RequestPackages, {
    text: String(query.value),
    page: newQuery - 1
  });
});
</script>

<template>
  <ul
    class="packageList"
    v-if="packages.length > 0 && !loading"
  >
    <li
      v-for="(item, index) in packages"
      :key="index"
      @click="dialog = true; selectPackage = item; name = item.package.name"
    >
      <h2>
        {{ item.package.name }} <span class="version">Version: {{ item.package.version }}</span>
      </h2>
      <div>
        Author: {{ item.package.author?.name || item.package.author?.username || item.package.author?.email || "" }}
      </div>
    </li>
  </ul>
  <Loader v-if="loading"/>
  <v-dialog
    v-model="dialog"
  >
    <InformationModal
      :name="name"
      :select-package="selectPackage"
    />
    <v-btn
      class="button"
      color="primary"
      block
      @click="dialog = false"
    >Close
    </v-btn>
  </v-dialog>
  <div
    class="text-center"
    v-if="packages.length > 0"
  >
    <v-pagination
      v-model="page"
      :length="pageCount"
      :disabled="loading"
    ></v-pagination>
  </div>
</template>

<style
  scoped
  lang="scss"
>
.button {
  margin-top: 12px;
}

.packageList {
  list-style: none;

  > li {
    border-bottom: 1px solid var(--vt-c-divider-dark-2);
    padding-bottom: 8px;
    transition: opacity 0.2s ease;

    h2 {
      font-size: 36px;
      font-weight: bold;
    }

    .version {
      font-size: 16px;
      background-color: var(--vt-c-divider-dark-1);
      padding: 4px 12px;
      color: var(--vt-c-text-dark-1);
      border-radius: 4px;
      margin-left: 8px;
    }

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      opacity: 0.6;
      cursor: pointer;
    }
  }
}
</style>
