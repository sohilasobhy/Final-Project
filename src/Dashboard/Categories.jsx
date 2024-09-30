import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { $AddNewCat, $AllCategories, $EditCategoryCourse, $catId } from "../Store/Store";
import Swal from "sweetalert2";

export default function Categories() {
    const [categories, setCategories] = useRecoilState($AllCategories)
    const [modal, setModal] = useRecoilState($EditCategoryCourse)
    const [, setCatId] = useRecoilState($catId)
    const [, setAddCategory] = useRecoilState($AddNewCat)
    useEffect(() => {
        axios
            .get("http://localhost:3000/Categories")
            .then((response) => {
                setCategories(response.data);
                console.log(categories);
            })
            .catch((error) => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);
    const handleDelete = (catId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/Categories/${catId}`)
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your category has been deleted.",
                            icon: "success"
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error!",
                            text: "There was a problem deleting the category.",
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
                <h2>All Categories</h2>
                <button className="btn btn-outline-primary" onClick={() => setAddCategory(true)}>Add new category</button>
            </div>
            <table className="col-12 table mt-3">
                <thead>
                    <tr>
                        <td className="text-center">
                            Category Id
                        </td>
                        <td>
                            Category Name
                        </td>
                        <td className="text-center">
                            Edit
                        </td>
                        <td className="text-center">
                            Delete
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        console.log(categories)}
                    {
                        categories?.map((category) => {
                            return (
                                <tr key={category.id}>
                                    <td className="text-center">
                                        {category.id}
                                    </td>
                                    <td>
                                        <Link to={`/one-category/${category.id}`}>
                                            {category.categoryName}
                                        </Link>
                                    </td>
                                    <td className="text-center">
                                        <button className="btn btn-primary" onClick={() => {
                                            setModal(true)
                                            setCatId(category.id)
                                        }}>
                                            Edit
                                        </button>
                                    </td>
                                    <td className="text-center">
                                        <button className="btn btn-danger" onClick={() => handleDelete(category.id)}>
                                            Delete
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
