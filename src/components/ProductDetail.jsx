import '../styles/product_detail.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { handleFileChange } from '../utils/ImageConverter';

function ProductDetail({ product, setProductSelected, products, setProducts }) {
    const [productInfo, setProductInfo] = useState(product);
    const [isEditName, setIsEditName] = useState(false);
    const [isEditPrice, setIsEditPrice] = useState(false);
    const [isEditMadeIn, setIsEditMadeIn] = useState(false);
    const [isEditBrand, setIsEditBrand] = useState(false);
    const [isEditStatus, setIsEditStatus] = useState(false);

    const availableBrands = ["Rolex", "Omega", "Tag Heuer", "Seiko", "Casio"];
    const availableMadeIn = ["Switzerland", "Japan", "USA"];
    const availableStatus = ["On Stock", "Out of Stock", "Suspended", "Discontinued"];

    function handleCancel() {
        setProductSelected(null);
    }

    function handleRemoveRelatedImage(index) {
        const newRelatedImage = productInfo.relatedImage.filter((image, i) => i !== index);
        setProductInfo({ ...productInfo, relatedImage: newRelatedImage });
    }

    async function handleChangeMainImage(e) {
        const file = e.target.files[0];
        const base64String = await handleFileChange(file);
        setProductInfo({ ...productInfo, image: base64String });
    }

    async function handleAddRelatedImage(e) {
        const files = Array.from(e.target.files);
        const relatedImages = [...productInfo.relatedImage];

        for (const file of files) {
            const base64String = await handleFileChange(file);
            relatedImages.push(base64String);
        }

        setProductInfo({ ...productInfo, relatedImage: relatedImages });
    }

    function handleAddNewOption(field, newValue) {
        if (field === 'brand' && !availableBrands.includes(newValue)) {
            availableBrands.push(newValue);
            setProductInfo({ ...productInfo, brand: newValue });
        }

        if (field === 'madeIn' && !availableMadeIn.includes(newValue)) {
            availableMadeIn.push(newValue);
            setProductInfo({ ...productInfo, madeIn: newValue });
        }
    }

    async function handleSave() {
        const newProducts = [...products];
        const index = newProducts.findIndex((p) => p.id === product.id);
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
                                <img src={productInfo.image} alt={product.name} />
                            </label>
                        </div>
                        <div className="productdetail__related__image">
                            {productInfo.relatedImage.slice(0, 3).map((image, index) => (
                                <button key={index} onClick={() => handleRemoveRelatedImage(index)}>
                                    <img key={index} src={image} alt={product.name} />
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
                                    value={productInfo.name}
                                    type="text"
                                    onChange={(e) => setProductInfo({ ...productInfo, name: e.target.value })}
                                    disabled={!isEditName} />
                                <button onClick={() => setIsEditName(!isEditName)}>
                                    <FontAwesomeIcon icon={faPen} />
                                </button>
                            </div>

                            <div className="productdetail__info__item">
                                <span>Price</span>
                                <input
                                    value={productInfo.price}
                                    type="text"
                                    onChange={(e) => setProductInfo({ ...productInfo, price: e.target.value })}
                                    disabled={!isEditPrice} />
                                <button onClick={() => setIsEditPrice(!isEditPrice)}>
                                    <FontAwesomeIcon icon={faPen} />
                                </button>
                            </div>

                            <div className="productdetail__info__item">
                                <span>From</span>
                                <select
                                    value={productInfo.madeIn}
                                    onChange={(e) => setProductInfo({ ...productInfo, madeIn: e.target.value })}
                                    disabled={!isEditMadeIn}>
                                    {availableMadeIn.map((country, index) => (
                                        <option key={index} value={country}>{country}</option>
                                    ))}
                                </select>
                                <button onClick={() => setIsEditMadeIn(!isEditMadeIn)}>
                                    <FontAwesomeIcon icon={faPen} />
                                </button>

                            </div>

                            <div className="productdetail__info__item">
                                <span>Brand</span>
                                <select
                                    value={productInfo.brand}
                                    onChange={(e) => setProductInfo({ ...productInfo, brand: e.target.value })}
                                    disabled={!isEditBrand}>
                                    {availableBrands.map((brand, index) => (
                                        <option key={index} value={brand}>{brand}</option>
                                    ))}
                                </select>
                                <button onClick={() => setIsEditBrand(!isEditBrand)}>
                                    <FontAwesomeIcon icon={faPen} />
                                </button>
                            </div>

                            <div className="productdetail__info__item">
                                <span>Status</span>
                                <select
                                    value={productInfo.status}
                                    onChange={(e) => setProductInfo({ ...productInfo, status: e.target.value })}
                                    disabled={!isEditStatus}>
                                    {availableStatus.map((status, index) => (
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