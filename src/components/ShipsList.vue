<template>
  <v-flex class="mt-4 mb-4">
    <v-list light v-for="ship in showedShips" :key="ship.name">
      <v-list-item :to="getPath(ship.url)" link class="ship">
        <v-list-item-content>
          <v-list-item-title class="ship__name">{{ ship.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <Pagination :perPage="perPage" :count="count" class="mt-8 mb-8" ref="pagination"/>
  </v-flex>

</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    Pagination,
  },
  props: {
    names: {
      type: Array,
      required: true,
    },
    search: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    perPage: 8,
    count: 0,
  }),
  computed: {
    page() {
      return this.$route.query.page;
    },
    ships() {
      return this.$store.getters.SHIPS;
    },
    searchedShips() {
      return this.ships.filter(el => this.names.includes(el.name));
    },
    showedShips() {
      if (this.searchedShips.length > this.perPage) {
        const start = (this.page - 1) * this.perPage;
        const end = start + this.perPage;
        return this.searchedShips.slice(start, end);
      }
      return this.searchedShips;
    },
  },
  methods: {
    getPath(url) {
      const paths = url.split('/');
      return `/${paths[5]}/`;
    },
  },
  watch: {
    searchedShips() {
      this.count = this.searchedShips.length;
    },
  },
  beforeMount() {
    this.count = this.searchedShips.length;
  },
};
</script>
