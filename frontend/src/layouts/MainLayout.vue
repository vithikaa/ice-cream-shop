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

            <li>
              <a @click="() => {}">
                <i class="material-icons left">shopping_cart</i>
                Cart
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
  </div>
</template>

<script>
export default {
  name: 'LayoutMain'
}
</script>
