<script
  lang="ts"
  setup
>
const year = new Date().getFullYear();
</script>

<template>
  <footer>
    <a
      href="https://github.com/Jlomaka"
      class="link"
    >Jlomaka</a> {{ year }} &#169;
  </footer>
</template>

<style
  scoped
  lang="scss"
>
footer {
  margin-top: 20px;
  text-align: center;
}

.link {
  display: inline-block;
  color: var(--vt-c-text-dark-1);
}
</style>
