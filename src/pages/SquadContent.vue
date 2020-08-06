<template>
  <div class="main-container col-12 h-100 m-0 p-0 unselectable">
    <div class="row col-12 m-0 p-0">
      <div class="left-content col-lg-3">
        <h1 class="left-title">
          Squad
        </h1>

        <div>
          <input
            id="checkbox-allow-stacking"
            v-model="allowStacking"
            type="checkbox"
            name="checkbox-allow-stacking"
            :value="true"
          />
          <label
            id="allow-stacking-label"
            for="checkbox-allow-stacking"
            class="allow-stacking-label"
            >Allow Warframe Stacking</label
          >
        </div>

        <div class="squad">
          <ul class="role-list-squad">
            <li v-for="[i, h] of squad.entries()" :key="h.key + '-' + i">
              <img
                class="warframe-image-squad"
                :alt="h.name + ' icon'"
                :src="'assets/imgs/warframes/icons/' + h.key + '.png'"
              />
              <span class="warframe-name-squad">{{ h.name }}</span>
            </li>
          </ul>
        </div>

        <div
          type="button"
          class="random-warframe-button"
          @click="randomSquadHandler"
        >
          Get Random Squad
        </div>
      </div>

      <div class="right-content col-lg-9">
        <h1 class="right-title">
          Filter Warframes
        </h1>

        <p class="filter-description">
          Select the warframes you wish to include in your squad and click in
          the "Get Random Squad" button to get a random team which will include
          the selected warframes.
        </p>

        <p class="filter-description">
          Playing solo?
          <router-link to="/">Get a random warframe just for you</router-link>
        </p>

        <div class="filter-description selected-warframes-info">
          <p
            v-if="numberOfSelectedWarframes === 0"
            class="filter-description selected-warframes-text"
          >
            You have no warframes selected, so all warframes are being
            considered by default.
          </p>
          <p
            v-else-if="numberOfSelectedWarframes === 1"
            class="filter-description selected-warframes-text"
          >
            You have {{ numberOfSelectedWarframes }} warframe selected.
          </p>
          <p v-else class="filter-description selected-warframes-text">
            You have {{ numberOfSelectedWarframes }} warframes selected.
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
  randomSquad,
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
  name: "SquadPageContent",
  components: {
    WarframeCard,
  },
  data() {
    return {
      squad: {},
      allowStacking: true,
      selectedWarframe: {
        name: "",
        role: "",
        selected: false,
        key: "",
        is_prime: false,
      },
    };
  },
  computed: {
    simpleSquad: function () {
      return this.squad.map((h) => h.name);
    },
    selectedWarframes: function () {
      return getSelected().map((h) => h.name);
    },
    numberOfSelectedWarframes: function () {
      return this.selectedWarframes.length;
    },
  },
  created() {
    window.document.title = "Squad Generator | Random Warframe Picker";
    getSelectedLSWarframes();
    this.randomSquad(this.allowStacking);
  },
  methods: {
    randomSquadHandler: function () {
      this.randomSquad(this.allowStacking);
      sendEvent("Squad", "GetRandom", JSON.stringify(this.simpleSquad));
    },
    randomSquad: function (allowStacking) {
      this.squad = randomSquad(allowStacking);
    },
    randomWarframe: function () {
      this.selectedWarframe = randomWarframe();
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
  overflow-x: hidden;
  background-color: #2c3e50;
  color: white;
  display: flex;
  min-height: 90vh;
}

.left-content {
  display: flex;
  flex-direction: column;
  padding: 0 3% 0 3%;
}

.right-title {
  margin-bottom: 1%;
}

.left-title,
.right-title {
  margin-bottom: 0.5em;
  font-size: 2em;
  color: white;
  font-family: "Michroma", "Open Sans", sans-serif;
}

.left-content .chosen-warframe-image {
  max-width: 75%;
  margin-left: auto;
  margin-right: auto;
}

.chosen-warframe-name {
  margin: 1rem 1rem;
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

.role-list-squad {
  list-style: none;
}

.role-icon-squad {
  max-height: 2em;
}

.warframe-image-squad {
  max-height: 2em;
  margin-right: 0.5rem;
}
.warframe-name-squad {
  font-family: "Droid Sans", sans-serif;
  font-weight: bold;
  font-size: 1.5em;
  vertical-align: middle;
}

.squad {
  text-align: start;
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
.random-warframe-button:focus,
.random-warframe-button:active {
  font-size: 1.25em;
  font-weight: bold;
  color: white;
  background-color: orangered;
  border-color: orangered;
}

.random-warframe-button,
.random-warframe-button:hover,
.random-warframe-button:active,
.random-warframe-button:focus,
.random-warframe-button:enabled {
  border-radius: 0.25rem;
  padding: 0.25rem;
  font-size: 1.5rem;
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

.force222-label {
  margin: 0 0 0 1%;
}

.force222 {
  text-align: center;
  font-size: 1.25rem;
}

.allow-stacking-label {
  margin: 0 0 5% 1%;
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
