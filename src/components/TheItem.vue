<template>
  <div class="inner">
    <div class="item" :class="{ 'is-editing': editing }">
      <form @submit.prevent="updateTodo">
        <label for="item-title">Task name</label>
        <textarea-autosize id="item-title" v-model="item.title" :class="{ 'is-errored': error }" @focus.native="editing = true"></textarea-autosize>
        <label for="item-date">Due date</label>
        <datepicker id="item-date" v-model="item.date" :format="'M/dd/yy'" @opened="editing = true"></datepicker>
        <hr>
        <label for="item-details">Task details</label>
        <textarea-autosize id="item-details" v-model="item.details" @focus.native="editing = true"></textarea-autosize>
        <FadeTransition>
          <button v-if="editing" class="button button--large" :class="{ 'is-errored': error }">Save Changes</button>
        </FadeTransition>
        <FadeTransition>
          <p v-if="error"><IconAlert /><span>Task name is required.</span></p>
        </FadeTransition>
      </form>
      <div class="item__controls">
        <FadeTransition>
          <button v-if="!editing" class="button button--primary" @click="toggleItem(item)">{{ buttonText }}</button>
        </FadeTransition>
        <button class="button button--text" @click="removeItem(item)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import Vue from 'vue';
import VueTextareaAutosize from 'vue-textarea-autosize';
import IconAlert from '@/components/svgs/IconAlert';
import FadeTransition from '@/components/FadeTransition.vue';

Vue.use(VueTextareaAutosize);

export default {
  name: 'TheItem',
  components: {
    Datepicker,
    IconAlert,
    FadeTransition
  },
  data () {
    return {
      editing: false,
      error: false
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
      if (this.item.title.length < 3) {
        this.error = true;
        document.getElementById('item-title').focus();
      } else {
        this.$store.dispatch('updateTodo', this.item);
        this.$router.push({ name: 'home' });
      }
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
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-20px);
    }
    75% {
      transform: translateX(20px);
    }
    100% {
      transform: translateX(0);
    }
  }

  hr {
    margin: 30px 0;
    border: 0;
    border-top: 1px solid #1F1F1F;
  }
  .item {
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
    &.is-errored {
      border: 2px solid red;
      &:focus {
        outline: 0;
        border: 2px solid red;
      }
    }
  }
  .button--large {
    margin: 30px 0 15px;
    &.is-errored {
      animation: shake 0.3s;
    }
  }
  p {
    margin: 0;
    font-size: 11px;
    text-align: center;
    span, svg {
      display: inline-block;
      vertical-align: middle;
    }
    span {
      margin-left: 6px;
    }
  }
  .item__controls {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 15px;
    .is-editing & {
      justify-content: flex-end;
    }
  }
</style>
