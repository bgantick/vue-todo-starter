<template>
  <div class="item" :class="{ 'is-editing': editing }">
    <form @submit.prevent="updateTodo">
      <label for="item-title">Task name</label>
      <textarea-autosize id="item-title" v-model="item.title" @focus.native="editing = true"></textarea-autosize>
      <label for="item-date">Due date</label>
      <datepicker id="item-date" v-model="item.date" :format="'M/dd/yy'" @opened="editing = true"></datepicker>
      <hr>
      <label for="item-details">Task details</label>
      <textarea-autosize id="item-details" v-model="item.details" @focus.native="editing = true"></textarea-autosize>
      <!-- TODO: button snapping in is jarring - transition the following button element -->
      <button v-if="editing" class="button button--large">Save Changes</button>
    </form>
    <div class="item__controls">
      <button v-if="!editing" class="button button--primary" @click="toggleItem(item)">{{ buttonText }}</button>
      <button class="button button--text" @click="removeItem(item)">Delete</button>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import Vue from 'vue';
import VueTextareaAutosize from 'vue-textarea-autosize';

Vue.use(VueTextareaAutosize);

export default {
  name: 'TheItem',
  components: {
    Datepicker
  },
  data () {
    return {
      editing: false
    };
  },
  computed: {
    item: function () {
      return this.$store.getters.getTodoById(this.$route.params.id);
    },
    buttonText: function () {
      return this.item.completed ? 'Mark as pending' : 'Mark as done';
    }
  },
  methods: {
    toggleItem: function (item) {
      this.$store.dispatch('toggleTodo', item);
    },
    removeItem: function (item) {
      this.$store.dispatch('removeTodo', item);
      this.$router.push({ name: 'home' });
    },
    updateTodo: function () {
      this.$store.dispatch('updateTodo', this.item);
      this.$router.push({ name: 'home' });
    }
  }
};
</script>

<style lang="scss">
  textarea, input {
    display: block;
    width: 100%;
    margin: 0 -12px 12px;
    padding: 12px;
    font-size: 18px;
    border: 0;
    border-bottom: 6px solid #FFF;
    background: transparent;
    transition: background 0.25s ease-out 0s;
    &:focus {
      background: #FFF;
    }
  }
</style>

<style scoped lang="scss">
  hr {
    margin: 30px 0;
    border: 0;
    border-top: 1px solid #1F1F1F;
  }
  .item {
    height: 100%;
    padding: 45px 25px 120px;
    background: #FFF;
    transition: background 0.25s ease-out 0s;
    &.is-editing {
      background: #F5C2E0;
    }
  }
  label {
    display: block;
    margin-bottom: 6px;
    font-size: 14px;
    font-weight: 600;
  }
  #item-title {
    font-size: 30px;
    font-weight: 500;
  }
  .button--large {
    margin: 30px 0;
  }
  .item__controls {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .is-editing & {
      justify-content: flex-end;
    }
  }
</style>
