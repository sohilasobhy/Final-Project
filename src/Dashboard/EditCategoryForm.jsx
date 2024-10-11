import { useRecoilState } from "recoil";
import CustomModal from "../Components/Modal/Modal";
import { $AllCategories, $EditCategoryCourse, $catId } from "../Store/Store";
import { useEffect, useState } from "react";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { EditCategoryScheme } from "../schemas/EditCategoryScheme";
import Swal from "sweetalert2";
import { FormattedMessage, useIntl } from "react-intl";

export default function EditCategoryForm() {
    const [openModal, setOpen] = useRecoilState($EditCategoryCourse);
    const [allCategories, setAllCategories] = useRecoilState($AllCategories)
    const [CatId] = useRecoilState($catId)
    let intl = useIntl()
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
            title: intl.formatMessage({ id: "areYouSure" }),
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: intl.formatMessage({ id: "confirm" }),
            cancelButtonText: intl.formatMessage({ id: "cancle" })
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .put(`http://localhost:3000/Categories/${Number(CatId)}`, values)
                    .then((res) => {
                        Swal.fire({
                            title: intl.formatMessage({ id: "courseDone" }),
                            confirmButtonText: intl.formatMessage({ id: "confirm" }),
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
                            title: intl.formatMessage({ id: "error" }),
                            text: intl.formatMessage({ id: "problem" }),
                            icon: "error"
                        });
                    });
            }
        });
    };
    return (
        <CustomModal show={openModal} onHide={() => setOpen(false)} title={<FormattedMessage id="editCat" />}>
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
                                    <h5 htmlFor="categoryName"><FormattedMessage id="catName" /></h5>
                                    <Field id="categoryName" name="categoryName" placeholder="category Name" />
                                    <span className="error">
                                        <ErrorMessage name="categoryName" />
                                    </span>
                                </div>
                                <div className="col-12 col-md-10 col-lg-8 d-flex flex-column gap-1">
                                    <h5 htmlFor="categoryImg"><FormattedMessage id="catImg" /> 1</h5>
                                    <Field id="categoryImg" name="categoryImg" placeholder="category image 1" />
                                    <span className="error">
                                        <ErrorMessage name="categoryImg" />
                                    </span>
                                </div>
                                <div className="col-12 col-md-10 col-lg-8 d-flex flex-column gap-1">
                                    <h5 htmlFor="categoryImg2"><FormattedMessage id="catImg" /> 2</h5>
                                    <Field id="categoryImg2" name="categoryImg2" placeholder="category image 2" />
                                    <span className="error">
                                        <ErrorMessage name="categoryImg2" />
                                    </span>
                                </div>
                                <button type="submit" className="btn btn-success"><FormattedMessage id="submit" /></button>
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
