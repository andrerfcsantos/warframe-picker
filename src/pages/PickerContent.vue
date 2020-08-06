<template>
  <div class="main-container col-12 h-100 m-0 p-0 unselectable">
    <div class="row col-12 m-0 p-0">
      <div class="left-content col-lg-3">
        <h1 class="left-title">
          You should play
        </h1>

        <div>
          <input
            id="checkbox-show-portrait"
            v-model="showPortrait"
            type="checkbox"
            name="checkbox-show-portrait"
            :value="true"
          />
          <label
            id="show-portrait-label"
            for="checkbox-show-portrait"
            class="show-portrait-label"
            >Show Warframe portrait</label
          >
        </div>
        <div v-if="showPortrait" class="image-container">
          <img
            key="warframe-image"
            class="chosen-warframe-image img-fluid"
            :src="
              'assets/imgs/warframes/portraits/' + selectedFrame.key + '.png'
            "
          />
        </div>

        <transition name="warframe-name-transition" mode="out-in">
          <h2
            :key="`warframe-name-${selectedFrame.name}-${warframeCount}`"
            class="chosen-warframe-name"
          >
            {{ selectedFrame.name }}
          </h2>
        </transition>

        <div
          type="button"
          class="random-warframe-button"
          @click="randomWarframeHandler"
        >
          Get Random Warframe
        </div>
      </div>

      <div class="right-content col-lg-9">
        <h1 class="right-title">
          Filter Warframes
        </h1>

        <p class="filter-description">
          Select the warframes you wish to play and click in the "Get Random
          Warframe" button to get a random warframe from the selected ones.
        </p>

        <p class="filter-description">
          Playing in a squad?
          <router-link to="/squad"
            >Get random warframes for your squad</router-link
          >
        </p>

        <div class="filter-description selected-warframes-info">
          <p
            v-if="numberOfSelectedFrames === 0"
            class="filter-description selected-warframes-text"
          >
            You have no warframes selected, so all warframes are being
            considered by default.
          </p>
          <p
            v-else-if="numberOfSelectedFrames === 1"
            class="filter-description selected-warframes-text"
          >
            You have {{ numberOfSelectedFrames }} warframe selected.
          </p>
          <p v-else class="filter-description selected-warframes-text">
            You have {{ numberOfSelectedFrames }} warframes selected.
          </p>
        </div>

        <div class="filter-header">
          <h2 class="role-header">
            Warframes
          </h2>
          <button
            class="all-button select-all-button"
            @click="selectByRole('Warframe')"
          >
            Select All
          </button>
          <button
            class="all-button unselect-all-button"
            @click="unselectByRole('Warframe')"
          >
            Unselect All
          </button>
        </div>

        <WarframeCard
          v-for="h in getWarframesByRole('Warframe')"
          :key="h.key"
          :warframe="h"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  randomWarframe,
  getWarframesByRole,
  selectByRole,
  unselectByRole,
  saveSelectedWarframesToLS,
  getSelectedLSWarframes,
  getSelected,
} from "../services/warframes_service";
import WarframeCard from "@/components/WarframeCard";
import { sendEvent } from "../services/events";

export default {
  name: "PickerPageContent",
  components: {
    WarframeCard,
  },
  data() {
    return {
      selectedFrame: {
        name: "",
        role: "",
        selected: false,
        key: "",
      },
      warframeCount: 0,
      showPortrait: true,
    };
  },
  computed: {
    selectedFrames: function () {
      return getSelected().map((h) => h.name);
    },
    numberOfSelectedFrames: function () {
      return this.selectedFrames.length;
    },
  },
  watch: {
    showPortrait: function (newValue) {
      localStorage.setItem("showPortrait", newValue);
      sendEvent("Option", "ToggleShowPortrait", newValue);
    },
  },
  created() {
    window.document.title =
      "Random Warframe Picker | For squads and solo players";
    getSelectedLSWarframes();
    this.selectedFrame = randomWarframe();
    let showPortraitLS = localStorage.getItem("showPortrait");

    if (showPortraitLS !== null) {
      this.showPortrait = showPortraitLS === "true";
    } else {
      localStorage.setItem("showPortrait", this.showPortrait);
    }
  },
  methods: {
    randomWarframeHandler() {
      this.randomWarframe();
      sendEvent("Warframe", "GetRandom", this.selectedFrame.name);
    },
    randomWarframe: function () {
      this.selectedFrame = randomWarframe();
      this.warframeCount += 1;
    },
    getWarframesByRole(role) {
      return getWarframesByRole(role);
    },
    selectByRole(role) {
      selectByRole(role);
      saveSelectedWarframesToLS();
      sendEvent("Filter", "SelectRole", role);
    },
    unselectByRole(role) {
      unselectByRole(role);
      saveSelectedWarframesToLS();
      sendEvent("Filter", "UnselectRole", role);
    },
  },
};
</script>

<style scoped>
.main-container {
  margin: 0;
  overflow-x: hidden;
  background-color: #2c3e50;
  color: white;
  display: flex;
  min-height: 90vh;
}

.left-content {
  flex-direction: column;
  padding: 0 3% 0 3%;
}

.left-title,
.right-title {
  margin-bottom: 0.5em;
  font-size: 2em;
  color: white;
  font-family: "Michroma", "Open Sans", sans-serif;
}

.image-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 20em;
}

.chosen-warframe-image {
  max-height: 100%;
}

.left-content .chosen-warframe-image {
  max-width: 50%;
  margin-left: auto;
  margin-right: auto;
  vertical-align: bottom;
}

.chosen-warframe-name {
  margin: 1rem 1rem;
  font-family: "Droid Sans", sans-serif;
  font-weight: bold;
}

.right-content {
  display: block;
  text-align: start;
}

.selected-warframes-info {
  font-size: 1.5rem;
  color: orange;
  margin: 1rem 0 0 0;
  font-weight: bold;
}

.selected-warframes-text {
  margin: 0;
  color: #23c423;
}

.filter-description {
  display: block;
  font-size: 1rem;
  user-select: text;
  margin: 0;
}

/** Filter header */
.role-icon {
  max-height: 2em;
}
.role-header {
  font-size: 1.75em;
  font-family: "Michroma", "Open Sans", sans-serif;
  margin: 0.5em 0.5em 0.5em 0;
}
.filter-header {
  display: flex;
  flex-direction: row;
  align-items: center;
}

/** Select / Unselect all buttons */
.all-button {
  color: white;
  border: none;
  font-size: 1.25rem;
  background-color: #0192c7;
  outline: none;
  padding: 0 0.3em;
  margin: 0 0.1em;
  height: min-content;
  transform: skewX(-10deg);
}

.all-button:active {
  transform: skewX(-10deg) translate(1px, 1px);
}

.select-all-button {
  background-color: rgb(51, 150, 31);
}

.unselect-all-button {
  background-color: rgb(231, 117, 9);
}

.all-button:hover {
  cursor: pointer;
}

.random-warframe-button,
.random-warframe-button:hover,
.random-warframe-button:active,
.random-warframe-button:focus,
.random-warframe-button:enabled {
  border-radius: 0.25rem;
  padding: 0.25rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  background-color: orangered;
  border-color: orangered;
  -webkit-appearance: none;
}

.warframe-name-transition-enter-active {
  transition: all 0.1s ease-out;
}

.warframe-name-transition-leave-active {
  transition: all 0.1s ease-in;
}

.warframe-name-transition-enter,
.warframe-name-transition-leave-to {
  transform: scaleY(0) translateZ(0);
  opacity: 0;
}

.warframe-name-transition-enter-to {
  transform: scaleY(1) translateZ(0);
  opacity: 1;
}

.show-portrait-label {
  margin: 0 0 0 1%;
}

/** Large breakpoint or smaller */
@media (max-width: 991.98px) {
  .right-content {
    text-align: center;
  }

  .right-title {
    margin-top: 5%;
  }

  .filter-header {
    display: block;
    margin-bottom: 1em;
  }
}
</style>
