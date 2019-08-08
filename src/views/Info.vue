<template>
  <v-layout
    text-center
    wrap
  >
    <v-flex v-if="loading">
      <Loader/>
    </v-flex>
    <v-flex v-else mb-4>
      <h1 class="display-2 font-weight-bold mt-12 mb-10">
        Starship {{ ship.name }}
      </h1>
      <v-simple-table class="info__table">
        <tbody>
          <tr v-for="(value, key, index) in ship" :key="index">
            <td class="text-left">{{ transformText(key) }}</td>
            <td class="text-left">{{ value }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Loader from '@/components/Loader.vue';

export default {
  name: 'info',
  components: { Loader },
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    loading: true,
    filmTitle: [],
    pilotsNames: [],
    renderShip: {},
  }),
  computed: {
    ...mapGetters({
      ship: 'CURRENT',
    }),
  },
  methods: {
    ...mapActions({
      getShip: 'GET_SHIP',
      getTempInfo: 'GET_INFO',
    }),
    transformText(text) {
      return text.split('_').join(' ').toUpperCase();
    },
    dataFilter(value) {
      const options = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      return new Intl.DateTimeFormat('ru-Ru', options).format(new Date(value));
    },
    async getInfo(url, target) {
      await this.getTempInfo(url);
      const info = this.$store.getters.INFO;
      const value = info.name || info.title || 'n/a';
      this[target] = [...this[target], value];
    },
    async getAllInfo(arr, target, index = 0) {
      await this.getInfo(arr[index], target);
      /* eslint-disable-next-line */
      if (arr[++index]) {
        await this.getAllInfo(arr, target, index);
      }
    },
  },
  async created() {
    await this.getShip(this.id);
    await this.getAllInfo(this.ship.pilots, 'pilotsNames');
    await this.getAllInfo(this.ship.films, 'filmTitle');

    this.renderShip = this.ship;
    this.renderShip.created = this.dataFilter(new Date(this.ship.created));
    this.renderShip.edited = this.dataFilter(new Date(this.ship.edited));
    this.renderShip.pilots = this.pilotsNames.join(', ');
    this.renderShip.films = this.filmTitle.join(', ');
    this.loading = false;
  },
};
</script>

<style lang="scss">
.info {
  &__table {
    width: 90%;
    min-width: 320px;
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>
