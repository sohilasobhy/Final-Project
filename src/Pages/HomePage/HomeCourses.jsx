import axios from "axios";

export default function HomeCourses() {
  let courseName = "";
  axios
    .get("http://localhost:3000/Courses")
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("There was an error fetching the data!", error);
    });
  return <div className="col-12" id="HomeCourses"></div>;
}
