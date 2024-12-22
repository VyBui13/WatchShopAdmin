import React, { useState } from 'react';
import '../styles/category.css';

function Category() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [parentCategory, setParentCategory] = useState('');
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('parentCategory', parentCategory);
        formData.append('image', image);
        formData.append('status', status);

        // Gửi dữ liệu tới server
        fetch('/api/categories', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                alert('Danh mục đã được thêm thành công!');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="form">
            <div className="form__header">
                <h1>Category</h1>
                <p>Manage category</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form__line">
                    <div className="form__group">
                        <label>Category name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="form__line">
                    <div className="form__group">
                        <label>Sub category:</label>
                        <select
                            value={parentCategory}
                            onChange={(e) => setParentCategory(e.target.value)}
                        >
                            <option value="">None</option>
                            <option value="sport-watches">Sport Watches</option>
                            <option value="luxury-watches">Luxury Watches</option>
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
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                </div>

                <div className="form__button">
                    <button type="button" className="cancel-button">Cancel</button>
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
    );
}

export default Category;