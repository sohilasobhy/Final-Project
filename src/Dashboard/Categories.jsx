import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
    const [categories, setCategories] = useState()
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
    return (
        <div id="Categories" className="position-absolute top-0 col-12 col-md-7 col-lg-8 col-xl-9 p-3">
            <h2>All Categories</h2>
            <table className="col-12 table mt-3">
                <thead>
                    <tr>
                        <td className="text-center">
                            Category Id
                        </td>
                        <td>
                            Category Name
                        </td>
                        <td>
                            Show
                        </td>
                        <td className="text-center">
                            Delete
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories?.map((category) => {
                            return (
                                <tr>
                                    <td className="text-center">
                                        {category.categoryId}
                                    </td>
                                    <td>
                                        {category.categoryName}
                                    </td>
                                    <td>
                                        Show
                                    </td>
                                    <td className="text-center">
                                        -
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
