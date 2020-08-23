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
          <a
            href="#!"
            class="secondary-content red-text"
            @click="removeFromCart(icecream)"
          >
            <i class="material-icons">close</i>
          </a>
        </li>
        <li class="collection-header">
          <h5 class="right-align">Total: Rs {{ cartTotal }}</h5>
        </li>
      </ul>

      <div class="row">
        <div class="input-field col s12 m7">
          <input type="text" id="customer_name" v-model="customer.name" />
          <label for="customer_name">Name</label>
        </div>

        <div class="input-field col s12 m7">
          <input type="text" id="customer_phone" v-model="customer.phone" />
          <label for="customer_phone">Phone</label>
        </div>

        <div class="input-field col s12">
          <input
            type="text"
            id="customer_address_street"
            v-model="customer.address.street"
          />
          <label for="customer_address_street">Delivery Address - Street</label>
        </div>

        <div class="input-field col s12 m6">
          <input
            type="text"
            id="customer_address_locality"
            v-model="customer.address.locality"
          />
          <label for="customer_address_locality">Locality</label>
        </div>

        <div class="input-field col s12 m6">
          <input
            type="text"
            id="customer_address_city"
            v-model="customer.address.city"
          />
          <label for="customer_address_city">City</label>
        </div>

        <div class="input-field col s12 m6">
          <input
            type="text"
            id="customer_address_pincode"
            v-model="customer.address.pincode"
          />
          <label for="customer_address_pincode">Pincode</label>
        </div>
      </div>

      <div
        class="waves-effect waves-green btn green"
        :class="{
          disabled: !cartTotal
        }"
        @click="checkout"
      >
        Checkout
      </div>
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
      modalInstance: null,
      customer: {
        name: null,
        phone: null,
        address: {
          street: null,
          locality: null,
          city: null,
          pincode: null
        }
      }
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
  },

  methods: {
    checkout() {
      let icecreams = this.cart.map(icecream => ({
        flavor: icecream.flavor._id,
        wafer: icecream.wafer._id,
        toppings: icecream.toppings.map(t => t._id)
      }))

      let order = { icecreams, customer: this.customer }

      this.$axios
        .post('/orders', order)
        .then(response => {
          if (response.data.success) {
            M.toast({ html: 'Order placed!' })
            this.$store.dispatch('clearCart')
            this.modalInstance.close()
          } else {
            M.toast({ html: 'Error occured.' })
          }
        })
        .catch(err => {
          console.error(err)
          M.toast({ html: 'Error occured.' })
        })
    },

    removeFromCart(icecream) {
      this.$store.dispatch('removeFromCart', icecream)
    }
  }
}
</script>
