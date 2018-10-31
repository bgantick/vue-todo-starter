<template>
  <article class="item">
    <!-- TODO: Animate button state -->
    <button class="item__toggle" :class="{ 'is-complete': item.completed }" @click="toggleTodo(item)">
      <span class="u-sr-only">Toggle</span>
    </button>
    <div class="item__content">
      <router-link v-if="item.title" :to="{ name: 'todo', params: { id: item.id } }">{{ item.title }}</router-link>
      <div class="item__meta">
        <p v-if="item.date"><span>Due</span> {{ formattedDate }}</p>
        <button class="button button--text" @click="deleteTodo(item)">Delete</button>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'TodoItem',
  props: ['item'],
  computed: {
    formattedDate: function () {
      const date = new Date(this.item.date);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    }
  },
  methods: {
    toggleTodo (todo) {
      this.$emit('toggle-todo', todo);
    },
    deleteTodo (todo) {
      this.$emit('delete-todo', todo);
    }
  }
};
</script>

<style scoped lang="scss">
  .item {
    position: relative;
    margin-bottom: 12px;
    padding: 20px;
    background: #FFF;
  }
  .item__toggle {
    position: absolute;
    top: 23px;
    left: 25px;
    width: 25px;
    height: 25px;
    border: 2px solid #000;
    border-radius: 25px;
    cursor: pointer;
    &.is-complete {
      background: #000;
    }
  }
  .item__content {
    margin-left: 60px;
  }
  .item__meta {
    display: flex;
    justify-content: space-between;
  }
  a {
    display: block;
    margin-bottom: 12px;
    font-size: 18px;
    color: #000;
    text-decoration: none;
  }
  p {
    display: inline-block;
    margin: 0;
    font-size: 14px;
    color: #646464;
  }
  span {
    font-weight: 600;
    color: #000;
  }
</style>
