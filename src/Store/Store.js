import axios from "axios";
import { useEffect } from "react";
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
    "price": "399.00 EGP",
    "charge": "Charged monthly"
  },
});
export const $checkoutPay = atom({
  key: "$checkoutPay",
  default: {},
});
export const $CourseForm = atom({
  key: "$CourseForm",
  default: false,
});
export const $ReviewForm = atom({
  key: "$ReviewForm",
  default: false,
});
export const $AddCourseHome = atom({
  key: "$AddCourseHome",
  default: false,
});
export const $AddInstructorHome = atom({
  key: "$AddInstructorHome",
  default: false,
});
export const $AddNewCat = atom({
  key: "$AddNewCat",
  default: false,
});
export const $AddInstructor = atom({
  key: "$AddInstructor",
  default: false,
});
export const $whishlistItems = atom({
  key: "$whishlistItems",
  default: [],
});
export const $HomeCourses = atom({
  key: "$HomeCourses",
  default: [],
});
export const $HomeInstructors = atom({
  key: "$HomeInstructors",
  default: [],
});
export const $HomeReviews = atom({
  key: "$HomeReviews",
  default: [],
});
export const $AllCourses = atom({
  key: "$AllCourses",
  default: []
});
export const $AllInstructors = atom({
  key: "$AllInstructors",
  default: [],
});
export const $AllCategories = atom({
  key: "$AllCategories",
  default: [],
});






