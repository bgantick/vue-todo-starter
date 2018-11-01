<template>
  <div id="app">
    <!-- TODO: Create a loading animation with IconLoader.vue -->
    <div class="container">
      <div class="header">
        <h1 :class="{ 'is-inner': !home }">
          <router-link :to="{ name: 'home' }">
            <IconCaret v-if="!home" />
            Your to do's
          </router-link>
        </h1>
        <!-- TODO: fade this button -->
        <FadeTransition>
          <button v-if="home" class="button button--primary" @click="addItem">New to do</button>
        </FadeTransition>
      </div>
      <!-- TODO: Add a router transition that handles toggling between the list view and detail view -->
      <router-view :todos.sync="todos" />
    </div>
  </div>
</template>

<script>
import FadeTransition from '@/components/FadeTransition.vue';
import IconCaret from '@/components/svgs/IconCaret';
import IconLoader from '@/components/svgs/IconLoader';

export default {
  name: 'App',
  components: { FadeTransition, IconCaret, IconLoader },
  // TODO: Hint: you'll need to watch `$route` to determine which transition to use
  computed: {
    loading () {
      return this.$store.getters.getLoading;
    },
    todos () {
      return this.$store.getters.getTodos;
    },
    home () {
      if (this.$route.name === 'home') {
        return true;
      }
    }
  },
  methods: {
    addItem: function () {
      const item = {
        id: this.$store.getters.getNextId,
        title: '',
        details: '',
        date: '',
        completed: false
      };
      this.$store.dispatch('addTodo', item);
      this.$router.push({ name: 'todo', params: { id: item.id } });
    }
  },
  created () {
    this.$store.dispatch('setLoading').then(() => {
      this.$store.dispatch('fetchTodos');
    });
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  background: #1F1F1F;
  color: #1F1F1F;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.container {
  position: relative;
  display: block;
  width: 320px;
  margin: 20px auto 50px;
}
.button {
  display: block;
  padding: 2px 10px 4px;
  text-transform: uppercase;
  border: 2px solid #F5C2E0;
  border-radius: 25px;
  cursor: pointer;
  text-align: center;
  transition: all 0.25s ease-out 0s;
  &--primary {
    background: #F5C2E0;
    color: #1F1F1F;
    &:hover, &:focus {
      outline: 0;
      background: #1F1F1F;
      color: #F5C2E0;
    }
  }
  &--secondary {
    background: #1F1F1F;
    color: #F5C2E0;
    &:hover, &:focus {
      outline: 0;
      background: #F5C2E0;
      color: #1F1F1F;
    }
  }
  &--text {
    margin: 0;
    padding: 0;
    text-transform: uppercase;
    border: 0;
    border-radius: 0;
    font-size: 12px;
    background: transparent;
    color: #646464;
    cursor: pointer;
    border-bottom: 1px solid transparent;
    &:hover, &:focus {
      outline: 0;
      border-color: #646464;
    }
  }
  &--large {
    width: 100%;
    padding: 10px;
    font-size: 18px;
    background: #1F1F1F;
    border-color: #1F1F1F;
    color: #FFF;
    &:hover, &:focus {
      outline: 0;
      background: #FFF;
      color: #1F1F1F;
    }
  }
}
.u-sr-only {
  position: absolute;
  left: -999rem;
}
</style>

<style scoped lang="scss">
  a {
    color: #FFF;
    text-decoration: none;
    &:hover, &:focus {
      svg {
        transform: translateX(-5px);
      }
    }
  }
  h1 {
    margin: 0 12px 20px;
    font-size: 50px;
    font-weight: 600;
    transition: all 0.25s ease-out 0s;
    &.is-inner {
      display: inline-block;
      font-size: 18px;
    }
  }
  .button--primary {
    margin-left: 12px;
    margin-bottom: 30px;
  }
</style>
