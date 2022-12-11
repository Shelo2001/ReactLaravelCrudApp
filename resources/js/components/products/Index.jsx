import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Index = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        await axios.get("/api/get_all_product").then(({ data }) => {
            setProducts(data.products);
        });
    };

    const editProduct = (id) => {
        navigate("/product/edit/" + id);
    };

    const navigate = useNavigate();

    const newProduct = () => {
        navigate("/product/new");
    };

    const deleteProduct = async (id) => {
        Swal.fire({
            title: "Are you sure you want to delete?",
            text: "You Won't be able to recover this",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .get("api/delete_product/" + id)
                    .then(() => {
                        Swal.fire(
                            "Deleted!",
                            "Product Successfully Deleted!",
                            "success"
                        );
                        getProducts();
                    })
                    .catch((error) => {});
            }
        });
    };

    return (
        <div className="container">
            <div className="products_list">
                <div className="titlebar">
                    <div className="titlebar_item">
                        <h1>Products</h1>
                    </div>
                    <div className="titlebar_item">
                        <button className="btn" onClick={() => newProduct()}>
                            Add Product
                        </button>
                    </div>
                </div>
                <div className="table">
                    <div className="list_header">
                        <p>Image</p>
                        <p>Product</p>
                        <p>Type</p>
                        <p>Inventory</p>
                        <p>Actions</p>
                    </div>
                    {products.length > 0 &&
                        products.map((item, key) => (
                            <div className="list_items" key={key}>
                                <img
                                    src={`/upload/${item.photo}`}
                                    height="40px"
                                />
                                <a>{item.name}</a>
                                <p>{item.type}</p>
                                <p>{item.quantity}</p>
                                <div>
                                    <button
                                        onClick={() => editProduct(item.id)}
                                        className="btn-icon success"
                                    >
                                        <i className="fas fa-pencil-alt"></i>
                                    </button>
                                    <button
                                        onClick={() => deleteProduct(item.id)}
                                        className="btn-icon danger"
                                    >
                                        <i className="far fa-trash-alt"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Index;
