import { ErrorMessage, Field, Form, Formik } from "formik";
import CustomModal from "../Components/Modal/Modal";
import { useRecoilState } from "recoil";
import { $AddNewCat, $AllCategories } from "../Store/Store";
import Swal from "sweetalert2";
import axios from "axios";
import { AddCategoryScheme } from "../schemas/AddCategoryScheme";

export default function AddNewCategory() {
    const [AddCategory, setAddCategory] = useRecoilState($AddNewCat)
    const [allCtegories, setAllCtegories] = useRecoilState($AllCategories)
    const url = "http://localhost:3000/Categories"
    const handleSubmit = (values) => {
        console.log(values)
        let image = values.categoryImg.split("\\")[2]
        values.categoryImg = `src/assets/images/${image}`
        let image2 = values.categoryImg2.split("\\")[2]
        values.categoryImg2 = `src/assets/images/${image2}`
        console.log(values)
        Swal.fire({
            title: "Are you sure you want to add this category?",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, add it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(url, values)
                    .then(() => {
                        Swal.fire({
                            title: "Added!",
                            text: "Your category has been added.",
                            icon: "success"
                        });
                        setAllCtegories([...allCtegories, values])
                        setAddCategory(false)
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error!",
                            text: "There was a problem adding the category.",
                            icon: "error"
                        });
                    });
                setAddCategory(false)
            }
        });
    }
    const initialValues = {
        categoryName: "",
        categoryImg: "",
        categoryImg2: ""
    }

    return (
        <CustomModal title="Add New Category" show={AddCategory} onHide={() => setAddCategory(false)}>
            <div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={AddCategoryScheme}
                >
                    {({ values, errors }) => (
                        <div className="FormContainer">
                            <Form className="p-3 d-flex flex-column gap-3">
                                <div className="d-flex flex-column gap-1">
                                    <h5>Category Name</h5>
                                    <Field type="text" name="categoryName" placeholder="Enter Category Name" />
                                    <span className="error">
                                        <ErrorMessage name="categoryName" />
                                    </span>
                                </div>
                                {console.log(errors)}
                                <div className="d-flex flex-column gap-1">
                                    <h5>Category Image 1</h5>
                                    <Field name="categoryImg" type="file" className="mt-2" accept="image/*" />
                                    <span className="error">
                                        <ErrorMessage name="categoryImg" />
                                    </span>
                                </div>
                                <div className="d-flex flex-column gap-1">
                                    <h5>Category Image 2</h5>
                                    <Field name="categoryImg2" type="file" className="mt-2" accept="image/*" />
                                    <span className="error">
                                        <ErrorMessage name="categoryImg2" />
                                    </span>
                                </div>
                                <button className="btn btn-success" type="submit">Add</button>
                            </Form>
                        </div>
                    )
                    }
                </Formik >
            </div >
        </CustomModal >
    )
}
