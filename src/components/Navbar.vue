<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-brand to="/">
        <img
          class="warframe-logo img-fluid"
          src="../../public/assets/imgs/navbar/warframe-logo.png"
        />
        <span class="title-text">Random Warframe Picker</span>
      </b-navbar-brand>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/about">About</b-nav-item>
        <b-nav-item href="https://github.com/andrerfcsantos/warframe-picker/"
          >Github</b-nav-item
        >
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
a,
a:active,
a:focus,
a:hover,
a:visited,
a:visited:hover {
  text-decoration: none !important;
  color: white;
}

b-navbar {
  min-height: 5vh;
}

#nav-collapse-brand {
  font-family: "Michroma", "Open Sans", sans-serif;
  font-size: 1.2rem;
  text-decoration: none;
  vertical-align: bottom;
}

img {
  max-height: 1em;
}

.warframe-logo {
  padding-right: 0.5em;
}
</style>
