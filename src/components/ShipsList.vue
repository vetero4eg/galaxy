<template>
  <v-flex v-if="!!showedShips.length" class="mt-4 mb-4">
    <v-list light v-for="ship in showedShips" :key="ship.name">
      <v-list-item :to="getPath(ship.url)" link class="ship">
        <v-list-item-content>
          <v-list-item-title class="ship__name">{{ ship.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <Pagination :perPage="perPage" :count="count" class="mt-8 mb-8"/>
  </v-flex>
  <v-flex v-else>
    <h2 class="display-1 mt-12 mb-10">
      Info not found
    </h2>
  </v-flex>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    Pagination,
  },
  props: {
    ships: {
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
  }),
  computed: {
    page() {
      return parseInt(this.$route.query.page, 10) || 1;
    },
    names() {
      return this.ships.map(el => el.name);
    },
    filteredNames() {
      if (this.search) {
        return this.names.filter(el => el.includes(this.search));
      }
      return this.names;
    },
    searchedShips() {
      return this.ships.filter(el => this.filteredNames.includes(el.name));
    },
    showedShips() {
      if (this.searchedShips.length > this.perPage) {
        const start = (this.page - 1) * this.perPage;
        const end = start + this.perPage;
        return this.searchedShips.slice(start, end);
      }
      return this.searchedShips;
    },
    count() {
      return this.searchedShips.length;
    },
  },
  methods: {
    getPath(url) {
      const paths = url.split('/');
      return `/${paths[5]}/`;
    },
  },
};
</script>
