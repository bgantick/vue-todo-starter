import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Fake asynchronous call to server
function delay (t) {
  return new Promise(function (resolve) {
    setTimeout(resolve, t);
  });
}

export default new Vuex.Store({
  state: {
    todos: [
      {
        id: 1,
        title: 'Buy googly eyes for Gritty Halloween costume',
        details: 'They must be very googly.\n\nThey must be orange and menacing - preferrably slightly unsettling\n\nProbably buy a few because you’re not very good with a hot glue gun.',
        date: '10/30/18',
        completed: false
      },
      {
        id: 2,
        title: 'Pay PECO bill',
        details: '',
        date: '11/20/18',
        completed: false
      },
      {
        id: 3,
        title: 'Buy orange fur for Gritty Halloween costume',
        details: '',
        date: '10/30/18',
        completed: true
      },
      {
        id: 4,
        title: 'Find a tofurkey recipe for Friendsgiving',
        details: '',
        date: '11/22/18',
        completed: false
      }
    ],
    nextId: 5
  },
  getters: {
    getTodos: state => state.todos,
    getTodoById: (state) => (id) => {
      return state.todos.find(todo => todo.id === id);
    },
    getNextId: state => state.nextId
  },
  mutations: {
    ADD_TO_LIST (state, todo) {
      state.todos.push(todo);
      state.nextId++;
    },
    TOGGLE_TODO (state, todo) {
      const item = state.todos.find((item) => item.id === todo.id);
      item.completed = !item.completed;
    },
    REMOVE_FROM_LIST (state, todo) {
      const index = state.todos.indexOf(todo);
      state.todos.splice(index, 1);
    },
    UPDATE_TODO (state, todo) {
      state.todos = [
        ...state.todos.filter(item => item.id !== todo.id),
        todo
      ];
    },
    CLEAR_COMPLETED (state) {
      const active = state.todos.filter(function (todo) {
        return !todo.completed;
      });
      state.todos = active;
    }
  },
  actions: {
    addTodo ({ commit }, todo) {
      return delay(200).then(() => {
        return commit('ADD_TO_LIST', todo);
      });
    },
    toggleTodo ({ commit }, id) {
      return delay(200).then(() => {
        return commit('TOGGLE_TODO', id);
      });
    },
    removeTodo ({ commit }, todo) {
      return delay(200).then(() => {
        return commit('REMOVE_FROM_LIST', todo);
      });
    },
    updateTodo ({ commit }, todo) {
      return delay(200).then(() => {
        return commit('UPDATE_TODO', todo);
      });
    },
    clearCompleted ({ commit }) {
      return delay(200).then(() => {
        return commit('CLEAR_COMPLETED');
      });
    }
  }
});
