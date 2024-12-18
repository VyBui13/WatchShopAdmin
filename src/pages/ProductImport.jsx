import { useState } from "react";
import "../styles/product_import.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'

function ProductImport() {
    const initialBrands = ["Rolex", "Omega", "Seiko", "Casio", "Tissot"];
    const initialMadeIn = ["Switzerland", "Japan", "USA"];

    const [brands, setBrands] = useState(initialBrands);
    const [madeInList, setMadeInList] = useState(initialMadeIn);
    const [newBrand, setNewBrand] = useState("");
    const [newMadeIn, setNewMadeIn] = useState("");

    const [isDetail, setIsDetail] = useState(false);

    const [product, setProduct] = useState({
        name: "",
        price: "",
        quantity: "",
        detail: {
            size: "",
            material: "",
        },
        brand: "",
        madeIn: "",
        mainImage: null,
        additionalImages: [],
    });

    const handleAddBrand = () => {
        if (newBrand && !brands.includes(newBrand)) {
            setBrands([...brands, newBrand]);
            setProduct({ ...product, brand: newBrand });
            setNewBrand(""); // Reset input
        }
    };

    // Xử lý thêm madeIn mới
    const handleAddMadeIn = () => {
        if (newMadeIn && !madeInList.includes(newMadeIn)) {
            setMadeInList([...madeInList, newMadeIn]);
            setProduct({ ...product, madeIn: newMadeIn });
            setNewMadeIn(""); // Reset input
        }
    };

    const handleMainImageChange = (e) => {
        const file = e.target.files[0]; // Lấy ảnh đầu tiên người dùng chọn
        setProduct({ ...product, mainImage: file });
    };

    const handleAdditionalImagesChange = (e) => {
        const files = Array.from(e.target.files); // Chuyển đổi FileList thành mảng
        setProduct({ ...product, additionalImages: files });
    };

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
                            value={product.name}
                            onChange={(e) => setProduct({ ...product, name: e.target.value })}
                            type="text"
                            placeholder="Name" />
                    </div>

                    {/* Input Price */}
                    <div className="productimport__form__item">
                        <input
                            value={product.price}
                            onChange={(e) => setProduct({ ...product, price: e.target.value })}
                            type="text"
                            placeholder="Price" />
                    </div>

                    <div className="productimport__form__item">
                        <input
                            value={product.quantity}
                            onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
                            type="text"
                            placeholder="Quantity" />
                    </div>

                    <div className="productimport__form__item">
                        <input
                            value={`${product.detail.size ? "Size: " + product.detail.size : ""}${product.detail.material ? " Material: " + product.detail.material : ""}`}
                            type="text"
                            placeholder="Detail Information" disabled />
                        <div className="productimport__form__item__icon">
                            <FontAwesomeIcon icon={faPencil} className="icon__item" onClick={() => setIsDetail(!isDetail)} />
                        </div>
                        {isDetail && <div className="detail__information__form">
                            <div className="detail__information__form__item">
                                <input
                                    value={product.detail.size}
                                    onChange={(e) => setProduct({ ...product, detail: { ...product.detail, size: e.target.value } })}
                                    type="text"
                                    placeholder="Size" />
                            </div>
                            <div className="detail__information__form__item">
                                <input
                                    value={product.detail.material}
                                    onChange={(e) => setProduct({ ...product, detail: { ...product.detail, material: e.target.value } })}
                                    type="text"
                                    placeholder="Material" />
                            </div>
                        </div>}
                    </div>

                    <div className="productimport__form__item">
                        <select
                            value={product.brand}
                            onChange={(e) => setProduct({ ...product, brand: e.target.value })}
                        >
                            <option value="" disabled>
                                Select Brand
                            </option>
                            {brands.map((brand, index) => (
                                <option key={index} value={brand}>
                                    {brand}
                                </option>
                            ))}
                            <option value="add-new">Add New Brand</option>
                        </select>

                        {/* Hiển thị input thêm brand mới nếu "Add New" được chọn */}
                        {product.brand === "add-new" && (
                            <div className="add-new-item">
                                <input
                                    type="text"
                                    placeholder="New Brand"
                                    value={newBrand}
                                    onChange={(e) => setNewBrand(e.target.value)}
                                />
                                <button onClick={handleAddBrand}>+</button>
                            </div>
                        )}
                    </div>

                    {/* Dropdown Made In */}
                    <div className="productimport__form__item">
                        <select
                            value={product.madeIn}
                            onChange={(e) => setProduct({ ...product, madeIn: e.target.value })}
                        >
                            <option value="" disabled>
                                Select Made In
                            </option>
                            {madeInList.map((madeIn, index) => (
                                <option key={index} value={madeIn}>
                                    {madeIn}
                                </option>
                            ))}
                            <option value="add-new">Add New Made In</option>
                        </select>

                        {/* Hiển thị input thêm madeIn mới nếu "Add New" được chọn */}
                        {product.madeIn === "add-new" && (
                            <div className="add-new-item">
                                <input
                                    type="text"
                                    placeholder="New Made In"
                                    value={newMadeIn}
                                    onChange={(e) => setNewMadeIn(e.target.value)}
                                />
                                <button onClick={handleAddMadeIn}>Add</button>
                            </div>
                        )}
                    </div>
                    <div className="productimport__form__item">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleMainImageChange}
                        />
                        {/* {product.mainImage && <p>Selected Main Image: {product.mainImage.name}</p>} */}
                    </div>

                    {/* Input Additional Images */}
                    <div className="productimport__form__item">
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleAdditionalImagesChange}
                        />
                        {/* {product.additionalImages.length > 0 && (
                            <div>
                                <p>Selected Additional Images:</p>
                                <ul>
                                    {product.additionalImages.map((image, index) => (
                                        <li key={index}>{image.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )} */}
                    </div>
                </div>

                <div className="productimport__form__footer">
                    <div className="productimport__form__button">
                        <button>Reset</button>
                        <button>Import</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductImport;
