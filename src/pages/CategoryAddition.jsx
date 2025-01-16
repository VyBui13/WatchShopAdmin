import React, { useState, useEffect } from 'react';
import '../styles/category_addition.css';
import { useLoading } from "../components/LoadingContext";
import { useNotification } from "../components/NotificationContext"
import { uploadImage } from '../utils/UploadImageProvider';
import { useNavigate } from 'react-router-dom';
import { useConfirmPrompt } from '../components/ConfirmPromptContext';

function Category() {
    const navigate = useNavigate();
    const { setConfirmPromptData, setIsConfirmPrompt } = useConfirmPrompt();
    const { setIsLoading } = useLoading();
    const { notify } = useNotification();
    const [categoryList, setCategoryList] = useState([]);
    const [image, setImage] = useState(null);

    const [category, setCategory] = useState({
        categoryName: '',
        categoryDescription: '',
        categorySub: '',
        categoryStatus: true,
    });

    useEffect(() => {
        const fetchCategories = async () => {
            const loadingRef = setTimeout(() => { setIsLoading(true) }, 500);
            try {
                const response = await fetch("https://watch-shop-nine-beryl.vercel.app/api/category");
                const data = await response.json();
                if (data.status !== "success") {
                    console.error("Failed to fetch categories:", data.message);
                    return;
                }
                setCategoryList(data.data);
            }
            catch (error) {
                console.error("Failed to fetch categories:", error);
            } finally {
                clearTimeout(loadingRef);
                setIsLoading(false);
            }
        }
        fetchCategories();

    }, []);

    async function handleSubmit() {
        try {
            if (category.categoryName === '') {
                notify({ type: "error", msg: "Category name is required" });
                return;
            }
            let imgUrl = "";
            if (image) {
                imgUrl = await uploadImage(image);
            }
            const fetchData = async () => {
                const loadingRef = setTimeout(() => { setIsLoading(true) }, 500);
                try {
                    const response = await fetch("https://watch-shop-nine-beryl.vercel.app/api/category", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ ...category, categoryImage: imgUrl }),
                    });
                    const data = await response.json();
                    if (data.status !== "success") {
                        console.error("Failed to add category:", data.message);
                        return;
                    }
                    notify({ type: data.status, msg: data.message });
                }
                catch (error) {
                    console.error("Failed to add category:", error);
                } finally {
                    clearTimeout(loadingRef);
                    setIsLoading(false);
                    navigate('/category');
                }
            }

            await fetchData();
        } catch (error) {
            console.log(error);
        }
    }

    function handleCancel() {
        navigate('/category');
    }

    return (
        <div className="form">
            <div className="form__header">
                <h1>Category</h1>
                <p>Manage category</p>
            </div>
            <div className="form__data">

                <div className="form__line">
                    <div className="form__group">
                        <label>Category name:</label>
                        <input
                            type="text"
                            value={category.categoryName}
                            onChange={(e) => setCategory({ ...category, categoryName: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="form__line">
                    <div className="form__group">
                        <label>Sub category:</label>
                        <select
                            value={category.categorySub}
                            onChange={(e) => setCategory({ ...category, categorySub: e.target.value })}
                        >
                            <option value="">None</option>
                            {categoryList.map((category) => (
                                <option key={category._id} value={category._id}>{category.categoryName}</option>
                            ))}
                        </select>
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
                        <label>Description:</label>
                        <textarea
                            value={category.categoryDescription}
                            onChange={(e) => setCategory({ ...category, categoryDescription: e.target.value })}
                        ></textarea>
                    </div>
                </div>

                <div className="form__button">
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={() => {
                        setConfirmPromptData({
                            message: `Add category`,
                            action: "Add",
                            onConfirm: handleSubmit,
                        });
                        setIsConfirmPrompt(true);
                    }}>Add</button>
                </div>
            </div>
        </div>
    );
}

export default Category;