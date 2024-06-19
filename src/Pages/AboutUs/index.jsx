import { useRecoilState } from "recoil";
import { $Show } from "../../Store/Store";
import { useEffect } from "react";

export default function AboutUs() {
  const [, setHeader] = useRecoilState($Show);
  useEffect(() => {
    setHeader(false);
  }, []);
  return <div>About page</div>;
}
