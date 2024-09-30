import { useRecoilState } from "recoil";
import CustomModal from "../Components/Modal/Modal";
import { $AllCategories, $EditCategoryCourse, $catId } from "../Store/Store";
import { useEffect, useState } from "react";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { EditCategoryScheme } from "../schemas/EditCategoryScheme";
import Swal from "sweetalert2";

export default function EditCategoryForm() {
    const [openModal, setOpen] = useRecoilState($EditCategoryCourse);
    const [allCategories, setAllCategories] = useRecoilState($AllCategories)
    const [CatId] = useRecoilState($catId)
    const Category = allCategories.find((e) => {
        return (
            e.id === CatId
        )
    })
    useEffect(() => {
        axios
            .get(`http://localhost:3000/Categories`)
            .then((res) => {
                setAllCategories(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [CatId]);
    const initialValues = {
        categoryName: Category?.categoryName,
        categoryImg: Category?.categoryImg,
        categoryImg2: Category?.categoryImg2
    };
    const handleSubmit = (values) => {
        Swal.fire({
            title: "Are you sure you want to apply this edits?",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, apply it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .put(`http://localhost:3000/Categories/${Number(CatId)}`, values)
                    .then((res) => {
                        Swal.fire({
                            title: "Added!",
                            text: "Edits have been saved",
                            icon: "success"
                        });
                        console.log(res.data)
                        setOpen(false)
                        const editedCategories = [...allCategories]
                        editedCategories.splice(
                            editedCategories.findIndex((e) => e.id == res.data.id),
                            1,
                            {
                                id: res.data.id,
                                categoryName: res.data.categoryName,
                                categoryImg: res.data.categoryImg,
                                categoryImg2: res.data.categoryImg2
                            }
                        )
                        setAllCategories(editedCategories)
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error!",
                            text: "There was a problem saving these edits.",
                            icon: "error"
                        });
                    });
            }
        });
    };
    return (
        <CustomModal show={openModal} onHide={() => setOpen(false)} title="Edit categoy form">
            {Category ? (
                <Formik
                    initialValues={initialValues}
                    validationSchema={EditCategoryScheme}
                    onSubmit={(values) => handleSubmit(values)}
                    enableReinitialize
                >
                    {({ values, errors, touched }) => (
                        <div className="FormContainer">
                            <Form className="d-flex flex-column gap-3 editForm">

                                <div className="col-12 col-md-10 col-lg-8 d-flex flex-column gap-1">
                                    <h5 htmlFor="categoryName">category Name</h5>
                                    <Field id="categoryName" name="categoryName" placeholder="category Name" />
                                    <span className="error">
                                        <ErrorMessage name="categoryName" />
                                    </span>
                                </div>
                                <div className="col-12 col-md-10 col-lg-8 d-flex flex-column gap-1">
                                    <h5 htmlFor="categoryImg">category image 1</h5>
                                    <Field id="categoryImg" name="categoryImg" placeholder="category image 1" />
                                    <span className="error">
                                        <ErrorMessage name="categoryImg" />
                                    </span>
                                </div>
                                <div className="col-12 col-md-10 col-lg-8 d-flex flex-column gap-1">
                                    <h5 htmlFor="categoryImg2">category image 2</h5>
                                    <Field id="categoryImg2" name="categoryImg2" placeholder="category image 2" />
                                    <span className="error">
                                        <ErrorMessage name="categoryImg2" />
                                    </span>
                                </div>
                                <button type="submit" className="btn btn-success">Submit</button>
                            </Form>
                        </div>
                    )}
                </Formik>
            ) : (
                ""
            )}
        </CustomModal>
    )
}
