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

export const $profile = atom({
  key: "$profile",
  default: false,
});

export const $UserInfo = atom({
  key: "$UserInfo",
  default: JSON.parse(localStorage.getItem(`user`)) || JSON.parse(sessionStorage.getItem(`user`)) || null,
});

export const $subPlans = atom({
  key: "$subPlans",
  default: {
    "duration": "Monthly",
    "price": "399.00",
    "charge": "Charged monthly"
  },
});




