import { useState, useEffect } from "react";
import "../styles/product_import.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { uploadImage } from '../utils/UploadImageProvider';

function ProductImport() {

    const [brands, setBrands] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const productStatus = ["On Stock", "Out Of Stock", "Suspended"];

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:3000/category");
                const data = await response.json();
                if (data.status !== "success") {
                    console.error("Failed to fetch categories:", data.message);
                    return;
                }
                setCategoryList(data.data);
            }
            catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        }

        const fetchBrands = async () => {
            try {
                const response = await fetch("http://localhost:3000/brand");
                const data = await response.json();
                if (data.status !== "success") {
                    console.error("Failed to fetch brands:", data.message);
                    return;
                }
                setBrands(data.data);
            }
            catch (error) {
                console.error("Failed to fetch brands:", error);
            }
        }

        fetchCategories();
        fetchBrands();
    }, []);

    const [product, setProduct] = useState({
        productName: "",
        productPrice: "",
        productQuantity: "",
        productDetail: {
            productSize: "",
            productMaterial: "",
        },
        productBrand: "",
        productCategory: "",
        productStatus: "",
        productDescription: "",
        productMainImage: "",
        productRelatedImages: [],
    });

    const [mainImage, setMainImage] = useState(null);
    const [relatedImages, setRelatedImages] = useState([]);

    const handleRelatedImagesChange = (e) => {
        setRelatedImages(e.target.files);
    };

    const handleMainImageChange = (e) => {
        setMainImage(e.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const mainImageUrl = await uploadImage(mainImage);
            const relatedImagesUrls = [];
            for (const image of relatedImages) {
                const url = await uploadImage(image);
                relatedImagesUrls.push(url);
            }
            console.log(mainImageUrl, relatedImagesUrls);
            setProduct({ ...product, productMainImage: mainImageUrl, productRelatedImages: relatedImagesUrls });

        } catch (error) {
            alert(error.message);
        }

    };

    async function handleSubmit() {
        await handleUpload();
        const addData = async () => {
            try {
                const response = await fetch("http://localhost:3000/product", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(product),
                });

                const data = await response.json();
                if (data.status !== "success") {
                    console.error("Failed to add product:", data.message);
                    return;
                }
                console.log("Product added successfully:", data.data);
            }
            catch (error) {
                console.error("Failed to add product:", error);
            }
        }
        await addData();
        console.log(product);
    }

    return (
        <>
            <div className="productimport">
                <div className="productimport__header">
                    <h1>Product Import</h1>
                    <p>Import a new product</p>
                </div>

                <div className="productimport__form">
                    {/* Input Name */}
                    <div className="productimport__form__item">
                        <input
                            value={product.productName}
                            onChange={(e) => setProduct({ ...product, productName: e.target.value })}
                            type="text"
                            placeholder="Name" />
                    </div>

                    {/* Input Price */}
                    <div className="productimport__form__item">
                        <input
                            value={product.productPrice}
                            onChange={(e) => setProduct({ ...product, productPrice: e.target.value })}
                            type="text"
                            placeholder="Price" />
                    </div>

                    <div className="productimport__form__item">
                        <input
                            value={product.productQuantity}
                            onChange={(e) => setProduct({ ...product, productQuantity: e.target.value })}
                            type="text"
                            placeholder="Quantity" />
                    </div>

                    <div className="productimport__form__item">
                        <select
                            value={product.productStatus}
                            onChange={(e) => setProduct({ ...product, productStatus: e.target.value })}
                        >
                            <option value="" disabled>
                                Status
                            </option>
                            {productStatus.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>

                        {/* <input
                            value={product.productStatus}
                            type="text"
                            onChange={(e) => setProduct({ ...product, productCategory: e.target.value })}
                            placeholder="Origin" /> */}
                    </div>

                    <div className="productimport__form__item">
                        <input
                            value={product.productDetail.productSize}
                            type="text"
                            onChange={(e) => setProduct({ ...product, productDetail: { ...product.productDetail, productSize: e.target.value } })}
                            placeholder="Size" />
                    </div>

                    <div className="productimport__form__item">
                        <input
                            value={product.productDetail.productMaterial}
                            type="text"
                            onChange={(e) => setProduct({ ...product, productDetail: { ...product.productDetail, productMaterial: e.target.value } })}
                            placeholder="Material" />
                    </div>

                    <div className="productimport__form__item">
                        <select
                            value={product.productBrand}
                            onChange={(e) => setProduct({ ...product, productBrand: e.target.value })}
                        >
                            <option value="" disabled>
                                Select Brand
                            </option>
                            {brands.map((productBrand, index) => (
                                <option key={index} value={productBrand._id}>
                                    {productBrand.brandName}
                                </option>
                            ))}
                        </select>

                    </div>


                    <div className="productimport__form__item">
                        <select
                            value={product.productCategory}
                            onChange={(e) => setProduct({ ...product, productCategory: e.target.value })}
                        >
                            <option value="" disabled>
                                Select Category
                            </option>
                            {categoryList.map((productCategory, index) => (
                                <option key={index} value={productCategory._id}>
                                    {productCategory.categoryName}
                                </option>
                            ))}
                        </select>

                    </div>

                    <div className="productimport__form__item">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleMainImageChange}
                            id='mainimage__product__import'
                        />
                        <label htmlFor="mainimage__product__import">{mainImage === null ? "Upload Main Image" : "1 Main Image"}</label>
                        {/* {product.mainImage && <p>Selected Main Image: {product.mainImage.productName}</p>} */}
                    </div>

                    <div className="productimport__form__item">
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleRelatedImagesChange}
                            id='relatedimage__product__import'
                        />
                        <label htmlFor="relatedimage__product__import">{relatedImages.length === 0 ? "Upload Related Images" : (relatedImages.length + " Related Image" + relatedImages.length === 1 ? "" : "s")}</label>
                    </div>
                </div>

                <div className="productimport__form__footer">
                    <div className="productimport__form__button">
                        <button>Reset</button>
                        <button onClick={handleSubmit}>Import</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductImport;
