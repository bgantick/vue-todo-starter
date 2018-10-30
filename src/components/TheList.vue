<template>
  <div class="inner">
    <button class="button button--primary" @click="addItem">New to do</button>
    <!-- Active Items -->
    <h2>Pending</h2>
    <ul v-if="activeItems.length > 0" class="list">
      <li v-for="item in activeItems" class="list__item" :key="item.id">
        <TodoItem :item.sync="item" @toggle-todo="toggleItem" @delete-todo="removeItem" />
      </li>
    </ul>
    <p v-else>No items!</p>
    <!-- Inactive Items -->
    <h2>Done</h2>
    <div v-if="inactiveItems.length > 0">
      <ul class="list">
        <li v-for="item in inactiveItems" class="list__item" :key="item.id">
          <TodoItem :item.sync="item" @toggle-todo="toggleItem" @delete-todo="removeItem" />
        </li>
      </ul>
      <button class="button button--secondary" @click="removeCompleted">Clear Completed</button>
    </div>
    <p v-else>No items!</p>
  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem';

export default {
  name: 'TheList',
  props: ['todos'],
  computed: {
    activeItems: function () {
      const items = this.todos.filter((item) => {
        return item.completed === false;
      });
      return items.sort((a, b) => new Date(a.date) - new Date(b.date));
    },
    inactiveItems: function () {
      return this.todos.filter((item) => {
        return item.completed === true;
      });
    }
  },
  components: {
    TodoItem
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
    },
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
  .button {
    display: block;
  }
  .button--primary {
    margin-left: 12px;
    margin-bottom: 30px;
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
