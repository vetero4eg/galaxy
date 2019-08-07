import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
      props: route => ({
        query: {
          search: route.query.search,
          page: route.query.page,
        },
      }),
    },
    {
      path: '/:id',
      name: 'info',
      component: () => import('./views/Info.vue'),
      props: true,
    },
  ],
});
