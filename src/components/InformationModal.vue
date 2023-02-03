<script
  lang="ts"
  setup
>
import type {IExtraInformation, IPackageRootObject} from "@/interfaces/packge";
import {onMounted, ref} from "vue";
import {api} from "@/common/api";
import Loader from "@/components/Loader.vue";

interface IProps {
  name: string;
  selectPackage: Partial<IPackageRootObject>;
}

let loading = ref(false);
const props = defineProps<IProps>();
const extraInformation = ref<Partial<IExtraInformation>>({});

onMounted(async () => {
  try {
    loading.value = true;

    let res = await api.moreInformationAboutPackage({name: props.name});
    extraInformation.value = res.data;
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <v-card>
    <v-card-text class="cardText">
      <h2>
        {{ selectPackage?.package?.name }}
      </h2>
      <div>
        {{ selectPackage.package?.author?.name || selectPackage.package?.author?.username || selectPackage.package?.author?.email || "" }}
        <span class="version">Version: {{ selectPackage.package?.version }}</span>
      </div>
      <p>
        {{ selectPackage.package?.description }}
      </p>

      <div class="list">
        <h4>Keywords:</h4>
        <ul>
          <li
            v-for="(keyword, index) in selectPackage.package?.keywords"
            :key="index"
          >
            {{ keyword }}
          </li>
        </ul>
      </div>

      <Loader v-if="loading"/>
      <div
        class="list"
        v-if="!loading"
      >
        <h4>Tags:</h4>
        <ul>
          <li
            v-for="(tags, index) in extraInformation.tags"
            :key="index"
          >
            {{ index }}:{{ tags }}
          </li>
        </ul>
      </div>

      <div
        class="list"
        v-if="!loading"
      >
        <h4>Versions:</h4>
        <ul>
          <li
            v-for="(version, index) in extraInformation.versions"
            :key="index"
          >
            {{ version }}
          </li>
        </ul>
      </div>

    </v-card-text>
  </v-card>
</template>

<style
  scoped
  lang="scss"
>
.list {
  list-style: none;
  margin-top: 12px;

  h4 {
    font-size: 24px;
    font-weight: bold;
  }

  li {
    display: inline-block;
    margin-right: 4px;
    border: 1px solid var(--vt-c-divider-dark-1);
    padding: 4px;
    border-radius: 4px;
  }
}

.cardText {
  color: var(--color-text);
  background-color: var(--color-background);
}
</style>