<template>
  <div class="about-main-container col-10">
    <h2 class="title">
      About this site
    </h2>

    <p class="paragraph-text">
      I made this site for those moments in Warframe where we just want to play
      with an warframe that you are not used to play. but you don't know which.
      This site can help you decide by selecting a random one! You can also use
      it to get a recommendation of new warframes to try. You can also set a
      challenge where you only play heroes given by the randomizer. Either way,
      this site was made for you, have fun! Feel free to use it how you want.
    </p>

    <h2 class="title disclaimer-header">
      Contact me
    </h2>

    <p class="paragraph-text">
      If you have feedback, suggestions, comments about the site or you just
      want to say something to me, reach out at randomgamecharacters [at] gmail
      [dot] com.
    </p>

    <h2 class="title disclaimer-header">
      Disclaimer
    </h2>

    <p class="paragraph-text">
      This is a fan-site for Warframe and it is not affiliated with Digital
      Extremes Ltd. All rights belong to their respective owners.
    </p>
  </div>
</template>

<script>
import { sendEvent } from "../services/events";

export default {
  name: "AboutContent",
  created() {
    window.document.title = "About | Random Warframe Picker";
    sendEvent("Page", "Visit", "About");
  },
};
</script>

<style scoped>
p,
.copyright-notice-header {
  text-align: start;
}

a {
  font-family: inherit;
}

/* unvisited link */
a:link {
  color: orange;
}

/* visited link */
a:visited {
  color: orange;
}

/* mouse over link */
a:hover {
  color: orange;
}

/* selected link */
a:active {
  color: orange;
}

.about-main-container {
  color: white;
  display: flex;
  flex-direction: column;
  height: 90vh;
}

@media (max-width: 1000px) {
  .about-main-container {
    max-width: 100%;
  }
}

.title {
  color: rgb(248, 158, 74);
  text-align: start;
  font-weight: bold;
  font-size: 1.75em;
}

.paragraph-text {
  font-size: 1.1em;
}

.copyright-notice {
  font-size: 0.9em;
}

.copyright-notice-header {
  font-size: 1em;
  font-weight: bold;
}

form {
  text-align: center;
}
</style>
