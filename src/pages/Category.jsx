import '../styles/category.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faTrash, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { useLoading } from "../components/LoadingContext";
import { useNotification } from "../components/NotificationContext"
import { useNavigate } from 'react-router-dom';

function Category() {
    const navigate = useNavigate();
    const { setIsLoading } = useLoading();
    const { notify } = useNotification();

    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    // const [productSelected, setProductSelected] = useState(null);

    function calculateItemsPerPage() {
        const screenHeight = window.innerHeight;
        if (screenHeight >= 900) return 9;
        if (screenHeight >= 750) return 7;
        if (screenHeight >= 600) return 5;
        return 4;
    }

    const [amountItem, setAmountItem] = useState(calculateItemsPerPage());

    useEffect(() => {
        const fetchData = async () => {
            const loadingRef = setTimeout(() => { setIsLoading(true) }, 500);
            try {
                const res = await fetch('http://localhost:3000/category');
                const data = await res.json();
                if (data.status !== 'success') {
                    console.log('Error fetching data');
                    return;
                }

                const res2 = await fetch('http://localhost:3000/product/category');
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
                clearTimeout(loadingRef);
                setIsLoading(false);
            }
        }

        fetchData();
        const handleResize = () => {
            setAmountItem(calculateItemsPerPage());
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

    async function handleRemove(category) {
        if (category.products.length > 0) {
            notify({ type: 'error', msg: 'Category must not contain any products when deleting' });
            return;
        }
        try {
            const fetchData = async () => {
                const loadingRef = setTimeout(() => { setIsLoading(true) }, 500);
                try {
                    const res = await fetch(`http://localhost:3000/category/${category._id}`, {
                        method: 'DELETE',
                    });
                    const data = await res.json();
                    if (data.status !== 'success') {
                        console.log('Error deleting data');
                        return;
                    }
                    notify({ type: data.status, msg: data.message });
                    setCategories(categories.filter(category => category._id !== category._id));
                }
                catch (error) {
                    console.log(error);
                }
                finally {
                    clearTimeout(loadingRef);
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
            <div className="category">
                <div className="category__feature">
                    <div className="category__feature__add">
                        <button onClick={() => navigate('/category/addition')}>
                            <FontAwesomeIcon icon={faPlus} className='icon__add' />
                            Add
                        </button>
                    </div>
                    <div className="category__feature__search">
                        <input type="text" placeholder="Search..." />
                        <button>
                            <FontAwesomeIcon icon={faSearch} className='icon__search' />
                        </button>
                    </div>
                </div>

                <div className="category__table">
                    <div className="category__table__header">
                        <div className="category__table__attribute">
                            <span>X</span>
                        </div>

                        <div className="category__table__attribute">
                            <span>ID</span>
                        </div>

                        <div className="category__table__attribute">
                            <span>Name</span>
                        </div>

                        <div className="category__table__attribute">
                            <span>Description</span>
                        </div>

                        <div className="category__table__attribute">
                            <span>Size</span>
                        </div>

                        <div className="category__table__attribute">
                            <span>Status</span>
                        </div>

                    </div>

                    <div className="category__table__data">
                        {categories.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map((category, index) => (
                            <div
                                key={category._id}
                                className="category__table__row">
                                <div className="category__table__attribute">
                                    <button onClick={() => {
                                        handleRemove(category);
                                    }}>X</button>
                                </div>
                                <div className="category__table__attribute">{category._id.slice(-4)}</div>
                                <div className="category__table__attribute">{category.categoryName}</div>
                                <div className="category__table__attribute">{category.categoryDescription}</div>
                                <div className="category__table__attribute">{category.products.length}</div>
                                <div className="category__table__attribute">
                                    <div
                                        // style={{ backgroundColor: product.productStatus === "On Stock" ? "green" : (product.productStatus === "Out of Stock" ? "red" : "yellow") }}
                                        className="category__table__status"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="category__table__footer">
                        <div className="category__table__selected">
                            <span>1 selected</span>
                            <button>
                                <FontAwesomeIcon icon={faTrash} className='icon__deleted' />
                            </button>
                        </div>

                        <div className="category__table__paging">
                            <div className="category__table__paging__page">
                                <span>{page}</span>|
                                <span>{Math.ceil(categories.length / amountItem)}</span>
                            </div>

                            <div className="category__table__paging__button">
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
