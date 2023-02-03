<script
  lang="ts"
  setup
>
import {watch} from "vue";
import useDebouncedRef from "@/composables/useDebounceRef";
import {useStore} from "@/store";
import {EStorePackagesActionTypes} from "@/store/package/actions";

const query = useDebouncedRef("", 500);
const store = useStore();

watch(query, newQuery => {
  store.dispatch(EStorePackagesActionTypes.RequestPackages, {
    text: newQuery || ""
  });
});
</script>

<template>
  <v-text-field
    v-model="query"
    label="Search all of npm"
  ></v-text-field>
</template>

<style
  scoped
  lang="scss"
>

</style>
