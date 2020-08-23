<template>
  <div id="cartModal" ref="cartModal" class="modal">
    <div class="modal-content">
      <h4>Cart</h4>
      <p>Please review your cart and enter delivery details to checkout.</p>

      <ul class="collection with-header">
        <li
          v-for="(icecream, idx) in cart"
          :key="idx"
          class="collection-item avatar"
        >
          <img :src="icecream.flavor.image" alt="" class="circle" />
          <span class="title">
            {{ icecream.flavor.name }} on {{ icecream.wafer.name }} wafer</span
          >
          <p v-if="icecream.toppings.length">
            <span v-for="topping in icecream.toppings" :key="topping._id">
              {{ topping.name }} <br
            /></span>
          </p>
          <p class="right-align">Rs {{ icecream.price }}</p>
          <a href="#!" class="secondary-content red-text" @click="() => {}">
            <i class="material-icons">close</i>
          </a>
        </li>
        <li class="collection-header">
          <h5 class="right-align">Total: Rs {{ cartTotal }}</h5>
        </li>
      </ul>

      <a href="#!" class="modal-close waves-effect waves-green btn green">
        Checkout
      </a>
    </div>
    <!-- <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat green">
        Checkout
      </a>
    </div> -->
  </div>
</template>

<script>
import M from 'materialize-css'

export default {
  name: 'Cart',

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      modalInstance: null
    }
  },

  computed: {
    cart() {
      return this.$store.state.cart
    },
    
    cartTotal() {
      return this.cart.reduce((s, a) => s + a.price, 0)
    }
  },

  mounted() {
    let vm = this
    this.modalInstance = M.Modal.init(this.$refs.cartModal, {
      onCloseEnd: function() {
        vm.$emit('input', false)
      }
    })
  },

  watch: {
    value(state) {
      if (state) this.modalInstance.open()
      else this.modalInstance.close()
    }
  }
}
</script>
