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
    });

    const handleAddBrand = () => {
        if (newBrand && !brands.includes(newBrand)) {
            setBrands([...brands, newBrand]);
            setProduct({ ...product, brand: newBrand });
            setNewBrand("");
        }
    };

    // Xử lý thêm madeIn mới
    const handleAddMadeIn = () => {
        if (newMadeIn && !madeInList.includes(newMadeIn)) {
            setMadeInList([...madeInList, newMadeIn]);
            setProduct({ ...product, madeIn: newMadeIn });
            setNewMadeIn("");
        }
    };

    const fetchUrl = "https://api.cloudinary.com/v1_1/di98tgjbr/image/upload";
    const [mainImage, setMainImage] = useState(null);
    const [relatedImages, setRelatedImages] = useState([]);

    const handleRelatedImagesChange = (e) => {
        setRelatedImages(e.target.files);
    };

    const handleMainImageChange = (e) => {
        setMainImage(e.target.files[0]);
    };

    const handleUpload = async () => {
        // if (!image) {
        //     alert("Please select an image first!");
        //     return;
        // }

        const uploadImage = async (image) => {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "firsttime");
            formData.append("cloud_name", "di98tgjbr");

            const response = await fetch(fetchUrl, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Failed to upload ${image.name}`);
            }

            const data = await response.json();
            return data.url; // Trả về URL của ảnh đã tải lên
        };

        try {
            const mainImageUrl = await uploadImage(mainImage);
            const relatedImagesUrls = [];
            for (const image of relatedImages) {
                const url = await uploadImage(image);
                relatedImagesUrls.push(url);
            }

            console.log("Main Image URL:", mainImageUrl);
            console.log("Related Images URLs:", relatedImagesUrls);

        } catch (error) {
            alert(error.message);
        }

    };

    function handleSubmit() {

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
                            value={product.madeIn}
                            type="text"
                            onChange={(e) => setProduct({ ...product, madeIn: e.target.value })}
                            placeholder="Origin" />
                    </div>

                    <div className="productimport__form__item">
                        <input
                            value={product.detail.size}
                            type="text"
                            onChange={(e) => setProduct({ ...product, detail: { ...product.detail, size: e.target.value } })}
                            placeholder="Size" />
                    </div>

                    <div className="productimport__form__item">
                        <input
                            value={product.detail.material}
                            type="text"
                            onChange={(e) => setProduct({ ...product, detail: { ...product.detail, material: e.target.value } })}
                            placeholder="Material" />
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
                                Select Category
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
                            id='mainimage__product__import'
                        />
                        <label htmlFor="mainimage__product__import">Upload Main Image</label>
                        {/* {product.mainImage && <p>Selected Main Image: {product.mainImage.name}</p>} */}
                    </div>

                    {/* Input Additional Images */}
                    <div className="productimport__form__item">
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleRelatedImagesChange}
                            id='relatedimage__product__import'
                        />
                        <label htmlFor="relatedimage__product__import">Upload Related Images</label>
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
                        <button onClick={handleUpload}>Import</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductImport;
