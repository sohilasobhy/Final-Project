import { useEffect, useState } from "react";
import axios from "axios";
import SingleInstructor from "../../Components/SingleInstructorComponent/SingleInstructor";
import { FormattedMessage } from "react-intl";
export default function HomeInstractor() {
  const [array, setArray] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/HomeInstructors")
      .then((response) => {
        setArray(response.data);
        console.log(array);
        console.log(array?.Contact?.facebook)
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);
  return (
    <div
      className="col-12 d-flex flex-column align-items-center gap-5"
      id="HomeInstractor">
      <div className="d-flex flex-column align-items-center header gap-2">
        <p><FormattedMessage id="instructors" /></p>
        <h2><FormattedMessage id="courseInstructor" /></h2>
        <div className="col-6">
          <svg
            style={{
              fill: "none",
              stroke: "#00C8D5",
              strokeWidth: "5",
              enableBackground: "new 0 0 1 1",
            }}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Laag_1"
            x="0px"
            y="0px"
            viewBox="0 0 119 15"
            xmlSpace="preserve">
            <path className="st0" d="M1,13.5C21,4.2,72-3,118,6" />
          </svg>
        </div>
      </div>
      <div className="col-12 row g-3 px-5">
        {array?.splice(0, 4).map((item, index) => {
          return (
            <SingleInstructor instractour={item} key={item.id} />
          );
        })}
      </div>
    </div>
  );
}
