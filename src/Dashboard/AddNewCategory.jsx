import { ErrorMessage, Field, Form, Formik } from "formik";
import CustomModal from "../Components/Modal/Modal";
import { useRecoilState } from "recoil";
import { $AddNewCat, $AllCategories } from "../Store/Store";
import Swal from "sweetalert2";
import axios from "axios";
import { AddCategoryScheme } from "../schemas/AddCategoryScheme";
import { FormattedMessage, useIntl } from "react-intl";

export default function AddNewCategory() {
    const [AddCategory, setAddCategory] = useRecoilState($AddNewCat)
    const [allCtegories, setAllCtegories] = useRecoilState($AllCategories)
    let intl = useIntl()
    const url = "http://localhost:3000/Categories"
    const handleSubmit = (values) => {
        if (values.categoryImg) {
            values.categoryImg = `src/assets/images/${values.categoryImg}`
        }
        if (values.categoryImg2) {
            values.categoryImg2 = `src/assets/images/${values.categoryImg2}`
        }
        Swal.fire({
            title: intl.formatMessage({ id: 'courseAdding' }),
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: intl.formatMessage({ id: 'yesAdd' }),
            cancelButtonText: intl.formatMessage({ id: 'cancle' }),
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(url, values)
                    .then((res) => {
                        Swal.fire({
                            title: intl.formatMessage({ id: 'confirm' }),
                            text: intl.formatMessage({ id: 'courseDone' }),
                            confirmButtonText: intl.formatMessage({ id: "confirm" }),
                            icon: "success"
                        });
                        setAllCtegories([...allCtegories, res.data])
                        setAddCategory(false)
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: intl.formatMessage({ id: 'error' }),
                            text: intl.formatMessage({ id: 'proplem' }),
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
        <CustomModal title={<FormattedMessage id="addCat" />} show={AddCategory} onHide={() => setAddCategory(false)}>
            <div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={AddCategoryScheme}
                >
                    {({ setFieldValue }) => (
                        <div className="FormContainer">
                            <Form className="p-3 d-flex flex-column gap-3">
                                <div className="d-flex flex-column gap-1">
                                    <h5><FormattedMessage id="catName" /></h5>
                                    <Field type="text" name="categoryName" />
                                    <span className="error">
                                        <ErrorMessage name="categoryName" />
                                    </span>
                                </div>
                                <div className="d-flex flex-column gap-1">
                                    <h5><FormattedMessage id="catImg" /> 1</h5>
                                    <input type="file" name="categoryImg" className="mt-2" onChange={(e) => setFieldValue("categoryImg", e.target.files[0].name)} />
                                    <span className="error">
                                        <ErrorMessage name="categoryImg" />
                                    </span>
                                </div>
                                <div className="d-flex flex-column gap-1">
                                    <h5><FormattedMessage id="catImg" /> 2</h5>
                                    <input type="file" name="categoryImg2" className="mt-2" onChange={(e) => setFieldValue("categoryImg2", e.target.files[0].name)} />
                                    <span className="error">
                                        <ErrorMessage name="categoryImg2" />
                                    </span>
                                </div>
                                <button className="btn btn-success" type="submit"><FormattedMessage id="add" /></button>
                            </Form>
                        </div>
                    )
                    }
                </Formik >
            </div >
        </CustomModal >
    )
}
