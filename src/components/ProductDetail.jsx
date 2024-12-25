import '../styles/product_detail.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { uploadImage } from '../utils/UploadImageProvider';

function ProductDetail({ product, setProductSelected, products, setProducts }) {
    const [productInfo, setProductInfo] = useState(product);
    const [isEditName, setIsEditName] = useState(false);
    const [isEditPrice, setIsEditPrice] = useState(false);
    const [isEditCategory, setIsEditCategory] = useState(false);
    const [isEditBrand, setIsEditBrand] = useState(false);
    const [isEditStatus, setIsEditStatus] = useState(false);

    const [brandList, setBrandList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const productStatus = ["On Stock", "Out Of Stock", "Suspended"];


    const [mainImageReview, setMainImageReview] = useState(product.productMainImage);
    const [relatedImagesReview, setRelatedImagesReview] = useState(product.productRelatedImages);
    const [addRelatedImages, setAddRelatedImages] = useState([]);
    const [addMainImage, setAddMainImage] = useState('');

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
                    console.error("Failed to fetch brandList:", data.message);
                    return;
                }
                setBrandList(data.data);
            }
            catch (error) {
                console.error("Failed to fetch brandList:", error);
            }
        }

        fetchCategories();
        fetchBrands();
    }, []);

    function handleCancel() {
        setProductSelected(null);
    }

    function handleRemoveRelatedImage(index) {
        const newRelatedImage = productInfo.productRelatedImages.filter((image, i) => i !== index);
        const newRelatedImageReview = relatedImagesReview.filter((image, i) => i !== index);
        setRelatedImagesReview(newRelatedImageReview);
        setProductInfo({ ...productInfo, productRelatedImages: newRelatedImage });
    }

    async function handleChangeMainImage(e) {
        const file = e.target.files[0];
        setMainImageReview(URL.createObjectURL(file));
        setAddMainImage(file);
    }

    async function handleAddRelatedImage(e) {
        const files = Array.from(e.target.files);
        const relatedImages = [...addRelatedImages];
        const relatedImagesUrl = [...relatedImagesReview];
        for (const file of files) {
            const imageUrl = URL.createObjectURL(file);
            relatedImagesUrl.push(imageUrl);
            relatedImages.push(file);
        }

        setRelatedImagesReview(relatedImagesUrl);
        setAddRelatedImages(relatedImages);
    }

    async function handleSave() {
        const updateProduct = async () => {
            let mainImageUrlUpload = '';
            let relatedImageUrlUpload = [];
            if (addMainImage !== '') {
                try {
                    const imageUrl = await uploadImage(addMainImage);
                    mainImageUrlUpload = imageUrl;
                }
                catch (error) {
                    console.error("Failed to upload main image:", error);
                }
            }
            if (addRelatedImages.length > 0) {
                const relatedImages = await Promise.all(addRelatedImages.map(async (image) => {
                    try {
                        const imageUrl = await uploadImage(image);
                        return imageUrl;
                    }
                    catch (error) {
                        console.error("Failed to upload related image:", error);
                    }
                }));
                relatedImageUrlUpload = relatedImages;
            }
            try {
                const response = await fetch(`http://localhost:3000/product/${productInfo._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...productInfo,
                        productMainImage: mainImageUrlUpload !== '' ? mainImageUrlUpload : productInfo.productMainImage,
                        productRelatedImages: relatedImageUrlUpload.length > 0 ? [...productInfo.productRelatedImages, ...relatedImageUrlUpload] : productInfo.productRelatedImages
                    }),
                });

                const data = await response.json();
                if (data.status !== "success") {
                    console.error("Failed to update product:", data.message);
                    return;
                }
                console.log("Product updated successfully");
            }
            catch (error) {
                console.error("Failed to update product:", error);
            }
        }

        await updateProduct();

        const newProducts = [...products];
        const index = newProducts.findIndex((p) => p._id === productInfo._id);
        newProducts[index] = productInfo;
        setProducts(newProducts);
        setProductSelected(null);
    }

    return (
        <>
            <div className="productdetail-wrapper">
                <div className="productdetail">
                    <div className="productdetail__left">
                        <div className="productdetail__main__image">
                            <input
                                onChange={handleChangeMainImage}
                                type="file"
                                id='product_main_image'
                                accept="image/*"
                            />
                            <label htmlFor="product_main_image">
                                <img src={mainImageReview} alt={product.productName} />
                            </label>
                        </div>
                        <div className="productdetail__related__image">
                            {relatedImagesReview.slice(0, 3).map((image, index) => (
                                <button key={index} onClick={() => handleRemoveRelatedImage(index)}>
                                    <img key={index} src={image} alt={product.productName} />
                                </button>
                            ))}
                        </div>

                        <div className="productdetail__add__image">
                            <input
                                onChange={handleAddRelatedImage}
                                type="file"
                                multiple
                                id='product_related_image'
                                accept="image/*"
                            />
                            <label htmlFor="product_related_image">
                                <FontAwesomeIcon icon={faPen} />
                            </label>
                        </div>
                    </div>

                    <div className="productdetail__right">
                        <div className="productdetail__header">
                            <span>Product Infomation</span>
                        </div>
                        <div className="productdetail__info">
                            <div className="productdetail__info__item">
                                <span>Name</span>
                                <input
                                    value={productInfo.productName}
                                    type="text"
                                    onChange={(e) => setProductInfo({ ...productInfo, productName: e.target.value })}
                                    disabled={!isEditName} />
                                <button onClick={() => setIsEditName(!isEditName)}>
                                    <FontAwesomeIcon icon={faPen} />
                                </button>
                            </div>

                            <div className="productdetail__info__item">
                                <span>Price</span>
                                <input
                                    value={productInfo.productPrice}
                                    type="text"
                                    onChange={(e) => setProductInfo({ ...productInfo, productPrice: e.target.value })}
                                    disabled={!isEditPrice} />
                                <button onClick={() => setIsEditPrice(!isEditPrice)}>
                                    <FontAwesomeIcon icon={faPen} />
                                </button>
                            </div>

                            <div className="productdetail__info__item">
                                <span>Category</span>
                                <select
                                    value={productInfo.productCategory}
                                    onChange={(e) => setProductInfo({ ...productInfo, productCategory: e.target.value })}
                                    disabled={!isEditCategory}>
                                    {categoryList.map((category, index) => (
                                        <option key={index} value={category._id}>{category.categoryName}</option>
                                    ))}
                                </select>
                                <button onClick={() => setIsEditCategory(!isEditCategory)}>
                                    <FontAwesomeIcon icon={faPen} />
                                </button>

                            </div>

                            <div className="productdetail__info__item">
                                <span>Brand</span>
                                <select
                                    value={productInfo.productBrand}
                                    onChange={(e) => setProductInfo({ ...productInfo, productBrand: e.target.value })}
                                    disabled={!isEditBrand}>

                                    {brandList.map((brand, index) => (
                                        <option key={index} value={brand._id}>{brand.brandName}</option>
                                    ))}
                                </select>
                                <button onClick={() => setIsEditBrand(!isEditBrand)}>
                                    <FontAwesomeIcon icon={faPen} />
                                </button>
                            </div>

                            <div className="productdetail__info__item">
                                <span>Status</span>
                                <select
                                    value={productInfo.productStatus}
                                    onChange={(e) => setProductInfo({ ...productInfo, productStatus: e.target.value })}
                                    disabled={!isEditStatus}>
                                    {productStatus.map((status, index) => (
                                        <option key={index} value={status}>{status}</option>
                                    ))}
                                </select>
                                <button onClick={() => setIsEditStatus(!isEditStatus)}>
                                    <FontAwesomeIcon icon={faPen} />
                                </button>
                            </div>
                        </div>
                        <div className="productdetail__footer">
                            <div className="productdetail__button">
                                <button onClick={handleCancel}>Cancel</button>
                                <button onClick={handleSave}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetail;