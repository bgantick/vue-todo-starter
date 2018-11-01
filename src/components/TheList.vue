<template>
  <div class="inner">
    <div v-for="group in groups" :key="group.name">
      <h2>{{ group.name }}</h2>
      <transition-group name="list" class="list" tag="ul" mode="in-out">
        <li v-for="item in group.array" class="list__item" :key="item.id">
          <TodoItem :item.sync="item" @toggle-todo="toggleItem" @delete-todo="removeItem" />
        </li>
      </transition-group>
      <FadeTransition>
        <p v-if="group.array.length === 0">No items!</p>
      </FadeTransition>
      <FadeTransition>
        <button v-if="group.name === 'Done' && group.array.length > 0" class="button button--secondary" @click="removeCompleted">Clear Completed</button>
      </FadeTransition>
    </div>
  </div>
</template>

<script>
import FadeTransition from '@/components/FadeTransition.vue';
import TodoItem from '@/components/TodoItem';

export default {
  name: 'TheList',
  props: ['todos'],
  computed: {
    groups: function () {
      let groups = {
        activeItems: { name: 'Pending', array: [] },
        inactiveItems: { name: 'Done', array: [] }
      };
      let activeItems = this.todos.filter((item) => {
        return item.completed === false;
      });
      activeItems = activeItems.sort((a, b) => new Date(a.date) - new Date(b.date));
      groups.activeItems.array = activeItems;
      const inactiveItems = this.todos.filter((item) => {
        return item.completed === true;
      });
      groups.inactiveItems.array = inactiveItems;
      return groups;
    }
  },
  components: {
    TodoItem, FadeTransition
  },
  methods: {
    toggleItem: function (item) {
      this.$store.dispatch('toggleTodo', item);
    },
    removeItem: function (item) {
      this.$store.dispatch('removeTodo', item);
    },
    removeCompleted: function () {
      this.$store.dispatch('clearCompleted');
    }
  }
};
</script>

<style scoped>
  .list__item {
    display: block;
    transition: all 0.5s;
  }
  .list-enter {
    opacity: 0;
    transform: translateX(-30px);
  }
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  .list-leave-active {
    width: 100%;
    position: absolute;
  }

  h2 {
    margin: 0 12px 14px;
    padding-bottom: 8px;
    color: #FFF;
    font-size: 14px;
    border-bottom: 1px solid #FFF;
  }
  .list {
    margin: 0 0 30px;
    padding: 0;
    list-style: none;
  }
  .button--secondary {
    margin: 0 auto;
  }
  p {
    font-size: 18px;
    color: #9D9D9E;
    text-align: center;
  }
</style>
