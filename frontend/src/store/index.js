import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: []
  },

  mutations: {
    addToCart(state, payload) {
      state.cart.push(payload)
    },

    removeFromCart(state, payload) {
      if (state.cart.indexOf(payload) != -1)
        state.cart.splice(state.cart.indexOf(payload), 1)
    },

    clearCart(state) {
      state.cart = []
    }
  },

  actions: {
    addToCart(context, payload) {
      context.commit('addToCart', payload)
    },

    removeFromCart(context, payload) {
      context.commit('removeFromCart', payload)
    },

    clearCart(context) {
      context.commit('clearCart')
    }
  },

  modules: {}
})
