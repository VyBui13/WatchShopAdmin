import React, { useState, useEffect } from 'react';
import '../styles/manufacturer_addition.css';
import { useLoading } from "../components/LoadingContext";
import { useNotification } from "../components/NotificationContext"
import { uploadImage } from '../utils/UploadImageProvider';

function Category() {
    const { setIsLoading } = useLoading();
    const { notify } = useNotification();
    const [image, setImage] = useState(null);

    const [brand, setBrand] = useState({
        brandName: "",
        brandDescription: "",
        brandCountry: "",
        brandWebsite: "",
    });

    async function handleSubmit() {
        try {
            let imgUrl = "";
            if (image) {
                imgUrl = await uploadImage(image);
            }
            const fetchData = async () => {
                const loadingRef = setTimeout(() => { setIsLoading(true) }, 500);
                try {
                    const response = await fetch("http://localhost:3000/brand", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ ...brand, brandImage: imgUrl }),
                    });
                    const data = await response.json();
                    if (data.status !== "success") {
                        console.error("Failed to add brand:", data.message);
                        return;
                    }
                    notify({ type: data.status, msg: data.message });
                }
                catch (error) {
                    console.error("Failed to add brand:", error);
                } finally {
                    clearTimeout(loadingRef);
                    setIsLoading(false);
                }
            }

            await fetchData();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="form">
            <div className="form__header">
                <h1>Brand</h1>
                <p>Manage manufacturer</p>
            </div>
            <div className="form__data">

                <div className="form__line">
                    <div className="form__group">
                        <label>Name:</label>
                        <input
                            type="text"
                            value={brand.brandName}
                            onChange={(e) => setBrand({ ...brand, brandName: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="form__line">
                    <div className="form__group">
                        <label>Country:</label>
                        <input
                            type="text"
                            value={brand.brandCountry}
                            onChange={(e) => setBrand({ ...brand, brandCountry: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="form__line">
                    <div className="form__group">
                        <label>Image:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                </div>

                <div className="form__line">
                    <div className="form__group">
                        <label>Official website:</label>
                        <input
                            type="text"
                            value={brand.brandWebsite}
                            onChange={(e) => setBrand({ ...brand, brandWebsite: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="form__line">
                    <div className="form__group">
                        <label>Description:</label>
                        <textarea
                            value={brand.brandDescription}
                            onChange={(e) => setBrand({ ...brand, brandDescription: e.target.value })}
                        ></textarea>
                    </div>
                </div>

                <div className="form__button">
                    <button type="button" className="cancel-button">Cancel</button>
                    <button onClick={handleSubmit}>Add</button>
                </div>
            </div>
        </div>
    );
}

export default Category;