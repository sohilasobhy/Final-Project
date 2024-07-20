import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function Categories() {
  const colors = ["#effaf8", "#fef2f4", "#eefbf5", "#fffaef", "#f7f3ff", "#fff0f8", "#f3f4fe", "#fff7ef", "#f1fbff"];
  const classes = ["business-management", "Design", "development", "health", "data", "marketing", "finance", "computer", "video"];
  let navigate = useNavigate()
  const [isloading, setIsloading] = useState(false)
  const [categories, setCategories] = useState([])
  useEffect(() => {
    setIsloading(true)
    axios
      .get(`http://localhost:3000/Categories`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      }).finally(() => {
        setIsloading(false);
      });
  }, []);
  console.log(categories)
  let content;
  if (isloading) {
    content = <div className="d-flex align-items-center justify-content-center min-vh-100"><Spinner style={{ width: '5rem', height: '5rem' }} size="lg" animation="border" variant="primary" /></div>
  } else if (!categories) {
    content = <h2 className="p-5">No Category Data</h2>
  }
  else {
    content = <div id="Categories" className="overflow-hidden">
      <div className="col-12 d-flex flex-column pt-md-5 justify-content-center align-items-center gap-4 topPart">
        <h2>Top Categories</h2>
        <div className="col-1">
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
        <p className="p-4 text-center">
          Explore a world of knowledge with courses across all disciplines and
          interests
        </p>
      </div>
      <div className="container">
        <div className="row courses p-5 g-5 justify-content-center flex-wrap">
          {
            categories?.map((category, index) => {
              return (
                <div className="col-12 col-md-6 col-lg-4" key={category.categoryId} >
                  <div className={`d-flex justify-content-start gap-2 align-items-center cat  col-12 h-100 py-3 ps-2 ${classes[index % classes.length]}`} onClick={() => { navigate(`/one-category/${category.categoryId}`) }}>
                    <img src={category.categoryImg} alt="category image" className="img1" />
                    <img src={category.categoryImg2} alt="category image" className="img2" />
                    <p>{category.categoryName}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  }
  return (
    <div>
      {content}
    </div>
  );
}
