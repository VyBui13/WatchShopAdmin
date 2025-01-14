import { useState, useEffect } from "react";
import "../styles/product_import.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { uploadImage } from '../utils/UploadImageProvider';
import { useLoading } from '../components/LoadingContext';
import { useNotification } from "../components/NotificationContext";
import { useConfirmPrompt } from "../components/ConfirmPromptContext";

function ProductImport() {
    const { setIsLoading } = useLoading();
    const { setIsConfirmPrompt, setConfirmPromptData } = useConfirmPrompt();
    const { notify } = useNotification();

    const [brands, setBrands] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const productStatus = ["On Stock", "Out Of Stock", "Suspended"];

    useEffect(() => {
        const fetchData = async () => {
            const loadingRef = setTimeout(() => setIsLoading(true), 500);
            try {
                const response = await fetch("http://localhost:5000/api/category");
                const data = await response.json();
                if (data.status !== "success") {
                    console.error("Failed to fetch categories:", data.message);
                    return;
                }
                setCategoryList(data.data);

                const response2 = await fetch("http://localhost:5000/api/brand");
                const data2 = await response2.json();
                if (data2.status !== "success") {
                    console.error("Failed to fetch brands:", data2.message);
                    return;
                }
                setBrands(data2.data);
            }
            catch (error) {
                console.error("Failed to fetch categories:", error);
            } finally {
                clearTimeout(loadingRef);
                setIsLoading(false);
            }
        }

        fetchData();

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

    // const handleUpload = async () => {
    //     try {
    //         const mainImageUrl = await uploadImage(mainImage);
    //         const relatedImagesUrls = [];
    //         for (const image of relatedImages) {
    //             const url = await uploadImage(image);
    //             relatedImagesUrls.push(url);
    //         }
    //         console.log(mainImageUrl, relatedImagesUrls);
    //         setProduct({ ...product, productMainImage: mainImageUrl, productRelatedImages: relatedImagesUrls });

    //     } catch (error) {
    //         alert(error.message);
    //     }

    // };

    async function handleSubmit() {
        if (product.productName === "") {
            notify({ type: "error", msg: "Product name is required" });
            return;
        }

        if (product.productPrice === "") {
            notify({ type: "error", msg: "Product price is required" });
            return;
        }

        if (product.productQuantity === "") {
            notify({ type: "error", msg: "Product quantity is required" });
            return;
        }

        if (product.productStatus === "") {
            notify({ type: "error", msg: "Product status is required" });
            return;
        }

        if (product.productDetail.productSize === "") {
            notify({ type: "error", msg: "Product size is required" });
            return;
        }

        if (product.productDetail.productMaterial === "") {
            notify({ type: "error", msg: "Product material is required" });
            return;
        }

        if (product.productBrand === "") {
            notify({ type: "error", msg: "Product brand is required" });
            return;
        }

        if (product.productCategory === "") {
            notify({ type: "error", msg: "Product category is required" });
            return;
        }

        if (mainImage === null) {
            notify({ type: "error", msg: "Main image is required" });
            return;
        }

        const loadingRef = setTimeout(() => setIsLoading(true), 500);
        try {
            const mainImageUrl = await uploadImage(mainImage);
            const relatedImagesUrls = [];
            for (const image of relatedImages) {
                const url = await uploadImage(image);
                relatedImagesUrls.push(url);
            }

            const response = await fetch("http://localhost:5000/api/product", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...product, productMainImage: mainImageUrl, productRelatedImages: relatedImagesUrls }),
            });

            const data = await response.json();
            if (data.status !== "success") {
                console.error("Failed to add product:", data.message);
                return;
            }

            notify({ type: data.status, msg: data.message });

        } catch (error) {
            console.error("Failed to add product:", error);
        } finally {
            setIsLoading(false);
            clearTimeout(loadingRef);
        }
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
                            onChange={(e) => {
                                if (!Number.isInteger(Number(e.target.value)) || Number(e.target.value) < 0) {
                                    setProduct({ ...product, productPrice: '' });
                                    notify({ type: 'error', msg: 'Do not enter invalid character' });
                                    return;
                                }

                                setProduct({ ...product, productPrice: e.target.value })
                            }

                            }
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
                        <label htmlFor="relatedimage__product__import">{relatedImages.length === 0 ? "Upload Related Images" : relatedImages.length + " Related Images"}</label>
                    </div>
                </div>

                <div className="productimport__form__footer">
                    <div className="productimport__form__button">
                        <button>Reset</button>
                        <button onClick={() => {
                            setConfirmPromptData({
                                message: `Add product`,
                                action: 'Add',
                                onConfirm: handleSubmit
                            });
                            setIsConfirmPrompt(true);
                        }}>Import</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductImport;
