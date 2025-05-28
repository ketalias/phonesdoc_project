<template>
  <div>
    <div class="catalog-view">
      <div class="filter"></div>
      <div class="items"></div>
    </div>
    <footer>
      <footer-comp />
    </footer>
  </div>
</template>
<script>
import FooterComp from "@/components/FooterComp.vue";

export default {
  name: "CatalogView",
  components: {
    FooterComp,
  },
  data() {
    return {};
  },

  mounted() {},
};
</script>
