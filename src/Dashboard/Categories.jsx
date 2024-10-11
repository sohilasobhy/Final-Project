import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { $AddNewCat, $AllCategories, $EditCategoryCourse, $catId } from "../Store/Store";
import Swal from "sweetalert2";
import { FormattedMessage, useIntl } from "react-intl";

export default function Categories() {
    const [categories, setCategories] = useRecoilState($AllCategories)
    const [modal, setModal] = useRecoilState($EditCategoryCourse)
    const [, setCatId] = useRecoilState($catId)
    const [, setAddCategory] = useRecoilState($AddNewCat)
    let intl = useIntl()
    useEffect(() => {
        axios
            .get("http://localhost:3000/Categories")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);
    const handleDelete = (catId) => {
        Swal.fire({
            title: intl.formatMessage({ id: "areYouSure" }),
            text: intl.formatMessage({ id: "revert" }),
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: intl.formatMessage({ id: "confirm" }),
            cancelButtonText: intl.formatMessage({ id: "cancle" }),
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/Categories/${catId}`)
                    .then(() => {
                        Swal.fire({
                            title: intl.formatMessage({ id: "deleted" }),
                            confirmButtonText: intl.formatMessage({ id: "confirm" }),
                            icon: "success"
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: intl.formatMessage({ id: "error" }),
                            text: intl.formatMessage({ id: "problem" }),
                            icon: "error"
                        });
                    });
                const updatedArray = categories.filter(item => item.id !== catId);
                setCategories(updatedArray)
            }
        });
    };
    return (
        <div id="Categories" className="position-absolute top-0 col-11 col-md-7 col-lg-8 col-xl-9 p-3">
            <div className="d-flex justify-content-between">
                <h2><FormattedMessage id="categories" /></h2>
                <button className="btn btn-outline-primary" onClick={() => setAddCategory(true)}><FormattedMessage id="addcat" /></button>
            </div>
            <table className="col-12 table mt-3">
                <thead>
                    <tr>
                        <td className="ps-4">
                            <FormattedMessage id="catName" />
                        </td>
                        <td className="text-center">
                            <FormattedMessage id="edit" />
                        </td>
                        <td className="text-center">
                            <FormattedMessage id="delete" />
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories?.map((category) => {
                            return (
                                <tr key={category.id}>

                                    <td className="ps-4">
                                        <Link to={`/one-category/${category.id}`}>
                                            {category.categoryName}
                                        </Link>
                                    </td>
                                    <td className="text-center">
                                        <button className="btn btn-primary" onClick={() => {
                                            setModal(true)
                                            setCatId(category.id)
                                        }}>
                                            <FormattedMessage id="edit" />
                                        </button>
                                    </td>
                                    <td className="text-center">
                                        <button className="btn btn-danger" onClick={() => handleDelete(category.id)}>
                                            <FormattedMessage id="delete" />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}
