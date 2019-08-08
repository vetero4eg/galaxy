<template>
  <v-layout
    text-center
    wrap
  >
    <v-flex v-if="ships">
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
        :ships="ships"
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
import { mapGetters } from 'vuex';
import ShipsList from '@/components/ShipsList.vue';

export default {
  components: {
    ShipsList,
  },
  data: () => ({
    search: undefined,
  }),
  computed: {
    ...mapGetters({
      ships: 'SHIPS',
    }),
  },
  beforeMount() {
    this.search = this.$route.query.search ? this.$route.query.search : undefined;
    this.$router.replace({ name: 'home', query: { ...this.$route.query, search: this.search } });
  },
  watch: {
    search() {
      if (!this.search) {
        this.search = undefined;
      }
      this.$router.push({ name: 'home', query: { page: 1, search: this.search } });
    },
  },
};
</script>
