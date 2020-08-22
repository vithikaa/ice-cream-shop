<template>
  <div id="cartModal" ref="cartModal" class="modal">
    <div class="modal-content">
      <h4>Cart</h4>
      <p>Please review your cart and enter delivery details to checkout.</p>

      <ul class="collection">
        <li class="collection-item">
          
        </li>
      </ul>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">
        Agree
      </a>
    </div>
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
