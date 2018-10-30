import Vue from 'vue';
import Router from 'vue-router';
import TheList from '@/components/TheList';
import TheItem from '@/components/TheItem';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: TheList
    },
    {
      path: '/todo/:id',
      name: 'todo',
      component: TheItem,
      props: true
    }
  ]
});
