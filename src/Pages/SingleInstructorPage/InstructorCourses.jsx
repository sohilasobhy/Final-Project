import SingleCourseComponent from "../../Components/SingleCourseComponent";

export default function InstructorCourses({ instructor, courses }) {
    let instractorCourses = courses?.filter((course) => {
        return instructor?.coursesID.includes(Number(course.id));
    });
    console.log(instractorCourses)
    return (
        <div id="InstructorCourses" className="mt-5">
            <div className="row g-4 justify-content-center">
                {instractorCourses?.map((course, idx) => {
                    return (
                        <div className="col-sm-9 col-md-6 col-lg-5 col-xl-4 col-xxl-3 position-relative">
                            <SingleCourseComponent course={course} color={"#f5f9fa"} />
                        </div >
                    )
                })}
            </div>
        </div>
    )
}
