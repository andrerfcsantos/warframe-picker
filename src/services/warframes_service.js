import store from "../store";

export function randomWarframe() {
  let selected = store.getters["warframes/getSelected"];

  if (selected.length === 0) {
    selected = store.getters["warframes/getWarframes"];
  }

  return randomFromList(selected);
}

/*
function popNRandomFromArray(warframeList, n) {
  let res = [];
  let warframeListCopy = [...warframeList];

  while (n > 0 && warframeListCopy.length > 0) {
    res.push(popRandomFromArray(warframeListCopy));
    n--;
  }

  return res;
}



function removeWarframeFromObjList(l, key) {
  let idx = l.findIndex((frame) => frame.key == key);
  l.splice(idx, 1);
}
 */

function randomFromList(l) {
  let size = l.length;
  let idx = Math.floor(Math.random() * size);
  return l[idx];
}

function popRandomFromArray(warframeList) {
  let nFrames = warframeList.length;
  let idx = Math.floor(Math.random() * nFrames);
  let hero = warframeList.splice(idx, 1);
  return hero[0];
}
function shuffle(warframeList) {
  let listCopy = [...warframeList];
  let newList = [];

  while (listCopy.length != 0) {
    newList.push(popRandomFromArray(listCopy));
  }

  return newList;
}

export function randomSquad(allowDuplicates = true) {
  let squad = [];

  if (allowDuplicates) {
    squad = [
      randomWarframe(),
      randomWarframe(),
      randomWarframe(),
      randomWarframe(),
    ];
  } else {
    let chosenFrames = new Set();
    let selected = [...store.getters["warframes/getSelected"]];
    let i = 0;
    for (i = 0; selected.length != 0 && i < 4; i++) {
      let frame = popRandomFromArray(selected);
      chosenFrames.add(frame.key);
      squad.push(frame);
    }
    if (i != 4) {
      let all_warframes = [...store.getters["warframes/getWarframes"]];
      let remaining_frames = all_warframes.filter(
        (frame) => !chosenFrames.has(frame.key)
      );
      let remaining = 4 - squad.length;
      for (let i = 0; i < remaining; i++) {
        squad.push(popRandomFromArray(remaining_frames));
      }
      squad = shuffle(squad);
    }
  }

  return squad;
}

export function getSelectedLSWarframes() {
  let selected_warframes = localStorage.getItem("selectedWarframes");
  if (selected_warframes) {
    selected_warframes = JSON.parse(selected_warframes);
  }
  if (Array.isArray(selected_warframes)) {
    selected_warframes.forEach((frame) => {
      store.dispatch("warframes/setWarframeSelectedStatus", {
        frame_key: frame.key,
        selected: frame.selected,
      });
    });
  }
}

export function saveSelectedWarframesToLS() {
  const selected = store.getters["warframes/getSelected"];
  localStorage.setItem("selectedWarframes", JSON.stringify(selected));
}

export function getSelected() {
  return store.getters["warframes/getSelected"];
}

export function getSelectedByRole(role) {
  return store.getters["warframes/getSelectedByRole"](role);
}

export function getWarframesByRole(role) {
  return store.getters["warframes/getByRole"](role);
}

export function toggleWarframe(frame_key) {
  store.dispatch("warframes/toggleWarframe", frame_key);
}

export function selectByRole(role) {
  store.dispatch(`warframes/selectByRole`, role);
}

export function unselectByRole(role) {
  store.dispatch(`warframes/unselectByRole`, role);
}
