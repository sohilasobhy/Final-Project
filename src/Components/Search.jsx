import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Search.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { $Search } from "../Store/Store";

export default function Search() {
  const [search, setSearch] = useRecoilState($Search);
  if (search) {
    return (
      <div className="col-12 h-100 Search position-fixed animate__animated animate__fadeInDown">
        <div
          className="filter position-fixed h-100 col-12"
          onClick={() => {
            setSearch(false);
          }}></div>
        <div>
          <input
            type="search"
            className="col-8 p-3 border-0 rounded-2 position-absolute"
            placeholder="Search Here..."
          />
        </div>
        <div className="rounded-5 close d-flex justify-content-center align-items-center align-self-start position-absolute">
          <FontAwesomeIcon
            icon={faXmark}
            onClick={() => {
              setSearch(false);
            }}
          />
        </div>
      </div>
    );
  }
}
