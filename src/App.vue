<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/?page=1" class="header__link">Galaxy</router-link>
      </v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container>
        <Loader v-if="loading"/>
        <router-view v-else />
      </v-container>
    </v-content>
    <footer class="footer">
      <a
        href="mailto:olkaveter@gmail.com?subject=You%20are%20hired!"
        class="footer__link"
      >create by Olga Veter</a>
    </footer>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import Loader from '@/components/Loader.vue';

export default {
  name: 'App',
  components: { Loader },
  data: () => ({
    loading: true,
  }),
  methods: {
    ...mapActions({
      getShips: 'GET_SHIPS',
    }),
  },
  async created() {
    await this.getShips();
    this.loading = false;
  },
};
</script>

<style lang="scss">
.header {
    &__link {
      text-decoration: none;
    }
  }
#app .ship__name {
  line-height: 1.5;
}
.footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 20px;
  text-align: left;
  flex: 0 0 auto;
  background-color: #fff;

  &__link {
    font-size: 18px;
    color: rgb(28, 143, 236);
    transition: color 0.3s ease;

    &:hover,
    &:focus,
    &:active {
      color: #000;
    }
  }
}
</style>
