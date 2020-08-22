<template>
  <div class="main-layout">
    <header>
      <nav class="white" role="navigation">
        <div class="nav-wrapper container">
          <a id="logo-container" href="#" class="brand-logo">
            <!-- Vithika's  -->Ice Cream
          </a>
          <ul class="right hide-on-med-and-down">
            <li>
              <router-link to="/home">Home</router-link>
            </li>
            <li>
              <router-link to="/about">About</router-link>
            </li>

            <li :class="{ green: cartCount }">
              <a @click="openCart" :class="{ 'white-text': cartCount }">
                <i class="material-icons left">shopping_cart</i>
                Cart
                <span
                  v-if="cartCount"
                  class="new badge red white-text"
                  data-badge-caption=""
                >
                  {{ cartCount }}
                </span>
              </a>
            </li>
          </ul>

          <ul id="nav-mobile" class="sidenav">
            <li>
              <router-link to="/home">Home</router-link>
            </li>
            <li>
              <router-link to="/about">About</router-link>
            </li>

            <li>
              <a @click="() => {}">
                <i class="material-icons left">shopping_cart</i>
                Cart
              </a>
            </li>
          </ul>

          <a href="#" data-target="nav-mobile" class="sidenav-trigger">
            <i class="material-icons">menu</i>
          </a>
        </div>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
    <Cart v-model="showCart" />
  </div>
</template>

<script>
import Cart from '@/components/Cart'

export default {
  name: 'LayoutMain',

  components: {
    Cart
  },

  data() {
    return {
      showCart: false
    }
  },

  computed: {
    cartCount() {
      return this.$store.state.cart.length
    }
  },

  methods: {
    openCart() {
      this.showCart = true
    }
  }
}
</script>
