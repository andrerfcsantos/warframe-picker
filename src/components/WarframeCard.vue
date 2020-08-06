<template>
  <div
    class="warframe-card"
    :class="{ selected: warframeSelectedState }"
    @click="toggleWarframeAction"
  >
    <img
      class="warframe-image"
      :alt="warframe.name + ' icon'"
      :src="`${publicPath}assets/imgs/warframes/icons/` + warframe.key + '.png'"
    />
    <div
      class="warframe-name"
      :class="{
        selected: warframeSelectedState,
        prime: warframe.has_prime,
      }"
    >
      {{ warframe.name }}
    </div>
  </div>
</template>

<script>
import {
  toggleWarframe,
  saveSelectedWarframesToLS,
} from "../services/warframes_service";
import { sendEvent } from "../services/events";

export default {
  name: "WarframeCard",
  props: {
    warframe: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
  computed: {
    warframeSelectedState() {
      return this.$store.state.warframes.warframes[this.warframe.key].selected;
    },
  },
  methods: {
    toggleWarframeAction: function () {
      toggleWarframe(this.warframe.key);
      saveSelectedWarframesToLS();
      let event = this.warframeSelectedState
        ? "SelectWarframe"
        : "UnselectWarframe";
      sendEvent("Filter", event, this.warframe.name);
    },
  },
};
</script>

<style scoped>
.warframe-card {
  display: inline-flex;
  margin: 0.25em;
  width: 13em;
  background-color: #0192c7;
  align-items: center;
  cursor: pointer;
}

.warframe-card.selected {
  background-color: green;
}

.warframe-card:hover {
  box-shadow: 0px 0px 0.5em #21c0fa;
}

.warframe-card:active {
  transform: translate(1px, 1px);
}

/*  ------- */

.warframe-image {
  height: 3em;
  vertical-align: bottom;
  background-color: #343a40;
}

/*  ------- */

.warframe-name {
  font-family: "Droid Sans", sans-serif;
  font-weight: bold;
  min-height: 100%;
  padding: 0 0.2em;
  font-size: 1.7em;
  white-space: nowrap;
  outline: none;
}

/*  ------- */

@media (max-width: 1375px) {
  .warframe-card {
    width: 13em;
  }
  .warframe-name {
    font-size: 1.5em;
  }
  .warframe-image {
    height: 2.75em;
  }
}

@media (max-width: 1090px) {
  .warframe-card {
    width: 12em;
  }
  .warframe-name {
    font-size: 1.5em;
  }
  .warframe-image {
    height: 2.75em;
  }
}

@media (max-width: 710px) {
  .warframe-image {
    height: 2.75em;
  }
}

@media (max-width: 420px) {
  .warframe-card {
    width: 100%;
  }
}

@media (max-width: 320px) {
  .warframe-card {
    width: 100%;
  }
  .warframe-name {
    font-size: 1.5em;
  }
}
</style>
