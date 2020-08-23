<template>
  <div class="home">
    <section class="section">
      <div class="container">
        <div class="row">
          <div class="col s12 m6">
            <div class="preview">
              <div class="preview-top">
                <img
                  :src="selectedIcecream.flavor.image"
                  alt=""
                  width="200px"
                />
                <img
                  :src="topping.image"
                  alt=""
                  width="200px"
                  v-for="topping in selectedIcecream.toppings"
                  :key="topping._id"
                />
              </div>
              <div class="preview-bottom">
                <img :src="selectedIcecream.wafer.image" alt="" width="200px" />
              </div>
            </div>
          </div>
          <div class="col s12 m6">
            <h3 class="light">Let's pick an ice cream for you</h3>

            <h5 class="light">Select a flavor:</h5>

            <div>
              <div
                v-for="flavor in options.flavors"
                :key="flavor._id"
                class="btn"
                :class="
                  selectedIcecream.flavor._id == flavor._id
                    ? 'blue'
                    : 'bordered btn-flat'
                "
                @click="selectFlavor(flavor)"
              >
                {{ flavor.name }} - Rs {{ flavor.price }}
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
                  selectedIcecream.wafer._id == wafer._id
                    ? 'green'
                    : 'bordered btn-flat'
                "
                @click="selectWafer(wafer)"
              >
                {{ wafer.name }} - Rs {{ wafer.price }}
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
                  selectedIcecream.toppings.includes(topping)
                    ? 'orange'
                    : 'bordered btn-flat'
                "
                @click="toggleTopping(topping)"
              >
                {{ topping.name }} - Rs {{ topping.price }}
              </div>
            </div>

            <!-- -->
            <h5 class="light"></h5>
            <div>
              <div
                class="btn btn-large"
                @click="addToCart"
                :class="{
                  disabled:
                    !selectedIcecream.wafer._id || !selectedIcecream.flavor._id
                }"
              >
                Add to Cart - Rs {{ selectedIcecream.price }}
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
        _id: null,
        wafer: {
          _id: null,
          image: '/wafer_base.png'
        },
        flavor: {
          _id: null,
          image: '/flavor_base.png'
        },
        toppings: [],
        price: 0
      },

      options: {
        wafers: [
          {
            _id: 'id0',
            name: 'Plain',
            price: 15
          },
          {
            _id: 'id1',
            name: 'Waffle',
            price: 15
          }
        ],
        flavors: [
          {
            _id: 'id0',
            name: 'Vanilla',
            price: 15
          },
          {
            _id: 'id1',
            name: 'Chocolate',
            price: 15
          }
        ],
        toppings: [
          {
            _id: 'id0',
            name: 'Roasted Almonds',
            price: 15
          },
          {
            _id: 'id1',
            name: 'Tuti Fruti',
            price: 15
          },
          {
            _id: 'id2',
            name: 'Choco Chips',
            price: 15
          }
        ]
      }
    }
  },

  computed: {
    selectedPrice() {
      let sum =
        this.selectedIcecream.flavor.price + this.selectedIcecream.wafer.price
      for (let topping of this.selectedIcecream.toppings) sum += topping.price
      return sum || 0
    }
  },

  watch: {
    selectedPrice(value) {
      this.selectedIcecream.price = value
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
      this.selectedIcecream.flavor = flavor
    },

    selectWafer(wafer) {
      this.selectedIcecream.wafer = wafer
    },

    toggleTopping(topping) {
      let index = this.selectedIcecream.toppings.indexOf(topping)

      if (index != -1) {
        this.selectedIcecream.toppings.splice(index, 1)
      } else {
        if (this.selectedIcecream.toppings.length < 2)
          this.selectedIcecream.toppings.push(topping)
        else M.toast({ html: 'You can only select upto 2 toppings!' })
      }
    },

    addToCart() {
      if (!this.selectedIcecream.wafer || !this.selectedIcecream.flavor) {
        M.toast({ html: 'You must select a flavor and a wafer!' })
      } else {
        this.$store.dispatch('addToCart', { ...this.selectedIcecream })
        this.selectedIcecream = {
          _id: null,
          wafer: {
            _id: null,
            image: '/wafer_base.png'
          },
          flavor: {
            _id: null,
            image: '/flavor_base.png'
          },
          toppings: []
        }
        M.toast({ html: 'Added to cart!' })
      }
    },

    fetchOptions() {
      this.$axios.get('/icecreams/options').then(response => {
        if (response.data.success) {
          this.options = response.data.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.preview {
  margin-top: 50px;
  .preview-top {
    width: 200px;
    height: 200px;
    overflow: hidden;
    border-radius: 50%;
    position: absolute;
    img {
      position: absolute;
    }
  }
  .preview-bottom {
    width: 200px;
    position: absolute;
    margin-top: 130px;
  }
}
</style>
