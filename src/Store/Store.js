import { atom } from "recoil";

export const $Show = atom({
  key: "$Show",
  default: true,
});

export const $Search = atom({
  key: "$Search",
  default: false,
});

export const $menu = atom({
  key: "$menu",
  default: false,
});

export const $Video = atom({
  key: "$Video",
  default: false,
});

export const $commercialVid = atom({
  key: "$commercialVid",
  default: false,
});

export const $lessonData = atom({
  key: "$lessonData",
  default: false,
});

export const $SearchResult = atom({
  key: "$SearchResult",
  default: "",
});

