<template>
  <v-layout
    text-center
    wrap
  >
    <v-flex v-if="isAlive">
      <h1 class="display-2 font-weight-bold mt-12 mb-10">
        Starships List
      </h1>
      <v-sheet class="pa-4 mb-6 primary lighten">
        <v-text-field
          v-model="search"
          label="Search Ships"
          dark
          solo-inverted
          hide-details
          clearable
          clear-icon="mdi-close-circle-outline"
        ></v-text-field>
      </v-sheet>
      <ShipsList
        :names="filter"
        :search="search"
      />
    </v-flex>
    <v-flex v-else>
      <h1 class="display-2 font-weight-bold mt-12 mb-10">
        Galaxy server hide information about starships
      </h1>
    </v-flex>
  </v-layout>
</template>

<script>
import ShipsList from '@/components/ShipsList.vue';

export default {
  components: {
    ShipsList,
  },
  data: () => ({
    search: '',
  }),
  computed: {
    isAlive() {
      return !!this.$store.getters.SHIPS.length;
    },
    names() {
      return this.ships.map(el => el.name);
    },
    filter() {
      if (this.search) {
        return this.names.filter(el => el.includes(this.search));
      }
      return this.names;
    },
    ships() {
      return this.$store.getters.SHIPS;
    },
  },
  beforeMount() {
    if (this.$route.query.search) {
      this.search = this.$route.query.search;
      this.$router.push({ name: 'home', query: { ...this.$route.query, search: this.search } });
    }
    this.search = '';
    this.$router.push({ name: 'home', query: { ...this.$route.query } });
  },
  watch: {
    search() {
      if (!this.search) {
        this.search = '';
      }
      this.$router.push({ name: 'home', query: { page: '1', search: this.search } });
    },
  },
};
</script>
