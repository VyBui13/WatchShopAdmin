import '../styles/category.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faTrash, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { useLoading } from "../components/LoadingContext";
import { useNotification } from "../components/NotificationContext"
import { useNavigate } from 'react-router-dom';
import NothingDisplay from '../components/NothingDisplay';
import { useConfirmPrompt } from '../components/ConfirmPromptContext';

function Category() {
    const navigate = useNavigate();
    const { setIsLoading } = useLoading();
    const { setConfirmPromptData, setIsConfirmPrompt } = useConfirmPrompt();
    const { notify } = useNotification();

    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    // const [productSelected, setProductSelected] = useState(null);

    function calculateItemsPerPage() {
        const screenHeight = window.innerHeight;
        if (screenHeight >= 900) return 13;
        if (screenHeight >= 800) return 11;
        if (screenHeight >= 700) return 9;
        if (screenHeight >= 600) return 7;
        return 4;
    }

    const [amountItem, setAmountItem] = useState(calculateItemsPerPage());

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch('http://localhost:5000/api/category');
                const data = await res.json();
                if (data.status !== 'success') {
                    console.log('Error fetching data');
                    return;
                }

                const res2 = await fetch('http://localhost:5000/api/product/category');
                const data2 = await res2.json();
                if (data2.status !== 'success') {
                    console.log('Error fetching data');
                    return;
                }

                const newArray = data.data.map(category => {
                    const productsEachCategory = data2.data.find(item => item._id === category._id);
                    if (!productsEachCategory) return { ...category, products: [] };
                    const newObject = { ...category, products: productsEachCategory.products };
                    return newObject;
                })


                setCategories(newArray);

            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
        const handleResize = () => {
            setAmountItem(calculateItemsPerPage());
            setPage(1);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    function increasePage() {
        if (page < Math.ceil(categories.length / amountItem)) {
            setPage(page + 1);
        }
    }

    function decreasePage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    async function handleHidden(category) {
        setIsLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/api/category/activation/${category._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await res.json();
            notify({ type: data.status, msg: data.message });
            if (data.status !== 'success') {
                console.log('Error deleting data');
                return;
            }
            setCategories(categories.map(item => item._id === category._id ? { ...item, categoryActive: item.categoryActive === "Visible" ? "Hidden" : "Visible" } : item));

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleRemove(category) {
        if (category.products.length > 0) {
            notify({ type: 'error', msg: 'Category must not contain any products when deleting' });
            return;
        }
        try {
            const fetchData = async () => {
                setIsLoading(true);
                try {
                    const res = await fetch(`http://localhost:5000/api/category/${category._id}`, {
                        method: 'DELETE',
                    });
                    const data = await res.json();
                    if (data.status !== 'success') {
                        console.log('Error deleting data');
                        return;
                    }
                    notify({ type: data.status, msg: data.message });
                    setCategories(categories.filter(item => item._id !== category._id));
                    setPage(1);
                }
                catch (error) {
                    console.log(error);
                }
                finally {
                    setIsLoading(false);
                }
            }

            fetchData();
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="board board--category">
                <div className="board__feature">
                    <div className="board__feature__add">
                        <button onClick={() => navigate('/category/addition')}>
                            <FontAwesomeIcon icon={faPlus} className='icon__add' />
                            Add
                        </button>
                    </div>
                    <div className="board__feature__search">
                        <input type="text" placeholder="Search..." />
                        <button>
                            <FontAwesomeIcon icon={faSearch} className='icon__search' />
                        </button>
                    </div>
                </div>

                <div className="board__table">
                    <div className="board__table__header">
                        <div className="board__table__attribute">
                            <span>X</span>
                        </div>

                        <div className="board__table__attribute">
                            <span>ID</span>
                        </div>

                        <div className="board__table__attribute">
                            <span>Name</span>
                        </div>

                        <div className="board__table__attribute">
                            <span>Description</span>
                        </div>

                        <div className="board__table__attribute">
                            <span>Size</span>
                        </div>

                        <div className="board__table__attribute">
                            <div className="board__table__status"></div>
                        </div>
                    </div>

                    <div className="board__table__data">
                        {categories.length === 0 && <NothingDisplay />}
                        {categories.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map((category, index) => (
                            <div
                                key={category._id}
                                className="board__table__row">
                                <div className="board__table__attribute">
                                    <button onClick={() => {
                                        setConfirmPromptData({
                                            message: `Delete category`,
                                            action: "Delete",
                                            onConfirm: () => handleRemove(category),
                                        });
                                        setIsConfirmPrompt(true);

                                    }}>X</button>
                                </div>
                                <div className="board__table__attribute">{category._id.slice(-4)}</div>
                                <div className="board__table__attribute">{category.categoryName}</div>
                                <div className="board__table__attribute">{category.categoryDescription}</div>
                                <div className="board__table__attribute">{category.products.length}</div>
                                <div className="board__table__attribute">
                                    <div
                                        // style={{ backgroundColor: product.productStatus === "On Stock" ? "green" : (product.productStatus === "Out of Stock" ? "red" : "yellow") }}
                                        style={{ backgroundColor: category.categoryActive === "Visible" ? "green" : "red" }}
                                        className="board__table__status" onClick={() => {
                                            setConfirmPromptData({
                                                message: category.categoryActive === "Visible" ? `Hidden category` : `Visible category`,
                                                action: "Change",
                                                onConfirm: () => handleHidden(category),
                                            });
                                            setIsConfirmPrompt(true);
                                        }}></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="board__table__footer">
                        <div className="board__table__selected">
                            <span>{categories.length} categories</span>
                            <button>
                                <FontAwesomeIcon icon={faTrash} className='icon__deleted' />
                            </button>
                        </div>

                        <div className="board__table__paging">
                            <div className="board__table__paging__page">
                                <span>{page}</span>|
                                <span>{Math.ceil(categories.length / amountItem)}</span>
                            </div>

                            <div className="board__table__paging__button">
                                <button onClick={decreasePage}>
                                    <FontAwesomeIcon icon={faArrowLeft} className='icon__paging' />
                                </button>
                                <button onClick={increasePage}>
                                    <FontAwesomeIcon icon={faArrowRight} className='icon__paging' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Category;
