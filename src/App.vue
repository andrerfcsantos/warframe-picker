<template>
  <div id="app" class="container-fluid">
    <PickerPage />
  </div>
</template>

<script>
import PickerPage from "./pages/RouterMain";

export default {
  name: "App",
  components: {
    PickerPage,
  },
};
</script>

<style>
#app {
  font-family: "Open Sans", Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  background-color: #2c3e50;
}

html {
  background-color: #2c3e50;
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

@font-face {
  font-family: "Michroma";
  src: url("../public/assets/fonts/Michroma-Regular.ttf");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Open Sans";
  src: url("../public/assets/fonts/OpenSans-Regular.ttf");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "Open Sans";
  src: url("../public/assets/fonts/OpenSans-Bold.ttf");
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: "Droid Sans";
  src: url("../public/assets/fonts/DroidSans.ttf");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Droid Sans";
  src: url("../public/assets/fonts/DroidSans-Bold.ttf");
  font-weight: bold;
  font-style: normal;
}

.unselectable {
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
  user-select: none;
}

a {
  font-family: inherit;
}

/* unvisited link */
a:link {
  color: orange;
  text-decoration: underline;
}

/* mouse over link */
a:hover {
  color: orangered;
}

/* visited link */
a:visited {
  color: orange;
}
/* visited link */
a:visited:hover {
  color: orangered;
}

/* selected link */
a:active {
  color: orange;
}
</style>
