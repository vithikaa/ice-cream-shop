<template>
  <div class="home">
    <section class="section">
      <div class="container">
        <div class="row">
          <div class="col s12 m6"></div>
          <div class="col s12 m6">
            <h3 class="light">Let's pick an ice cream for you</h3>

            <h5 class="light">Select a flavor:</h5>

            <div>
              <div
                v-for="flavor in options.flavors"
                :key="flavor._id"
                class="btn"
                :class="
                  selectedIcecream.flavor == flavor._id
                    ? 'blue'
                    : 'bordered btn-flat'
                "
                @click="selectFlavor(flavor)"
              >
                {{ flavor.name }}
              </div>
            </div>

            <!-- -->

            <h5 class="light">Select a wafer:</h5>

            <div>
              <div
                v-for="wafer in options.wafers"
                :key="wafer._id"
                class="btn"
                :class="
                  selectedIcecream.wafer == wafer._id
                    ? 'green'
                    : 'bordered btn-flat'
                "
                @click="selectWafer(wafer)"
              >
                {{ wafer.name }}
              </div>
            </div>

            <!-- -->

            <h5 class="light">Select toppings:</h5>

            <div>
              <div
                v-for="topping in options.toppings"
                :key="topping._id"
                class="btn"
                :class="
                  selectedIcecream.toppings.includes(topping._id)
                    ? 'orange'
                    : 'bordered btn-flat'
                "
                @click="toggleTopping(topping)"
              >
                {{ topping.name }}
              </div>
            </div>

            <!-- -->
            <h5 class="light"></h5>
            <div>
              <div
                class="btn btn-large"
                @click="addToCart"
                :class="{
                  disabled: !selectedIcecream.wafer || !selectedIcecream.flavor
                }"
              >
                Add to Cart
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import M from 'materialize-css'

export default {
  name: 'PageHome',

  data() {
    return {
      selectedIcecream: {
        wafer: null,
        flavor: null,
        toppings: []
      },

      options: {
        wafers: [
          {
            _id: 'id0',
            name: 'Plain'
          },
          {
            _id: 1,
            name: 'Waffle'
          }
        ],
        flavors: [
          {
            _id: 'id0',
            name: 'Vanilla'
          },
          {
            _id: 'id1',
            name: 'Chocolate'
          }
        ],
        toppings: [
          {
            _id: 'id0',
            name: 'Roasted Almonds'
          },
          {
            _id: 'id1',
            name: 'Tuti Fruti'
          },
          {
            _id: 'id2',
            name: 'Choco Chips'
          }
        ]
      }
    }
  },

  created() {
    this.fetchOptions()
  },
  
  mounted() {
    M.AutoInit()
  },

  methods: {
    selectFlavor(flavor) {
      this.selectedIcecream.flavor = flavor._id
    },

    selectWafer(wafer) {
      this.selectedIcecream.wafer = wafer._id
    },

    toggleTopping(topping) {
      let index = this.selectedIcecream.toppings.indexOf(topping._id)

      if (index != -1) {
        this.selectedIcecream.toppings.splice(index, 1)
      } else {
        if (this.selectedIcecream.toppings.length < 2)
          this.selectedIcecream.toppings.push(topping._id)
        else M.toast({ html: 'You can only select upto 2 toppings!' })
      }
    },

    addToCart() {
      if (!this.selectedIcecream.wafer || !this.selectedIcecream.flavor) {
        M.toast({ html: 'You must select a flavor and a wafer!' })
      }
    },

    fetchOptions() {}
  }
}
</script>
