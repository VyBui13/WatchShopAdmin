import '../styles/product.css';
import '../styles/board.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faCartShopping, faSquareCheck, faSearch, faFilter, faSort } from '@fortawesome/free-solid-svg-icons'
import ProductDetail from '../components/ProductDetail';
import { useLoading } from '../components/LoadingContext';
import NothingDisplay from '../components/NothingDisplay';

function Product() {
    const { setIsLoading } = useLoading();
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [productSelected, setProductSelected] = useState(null);
    const [theChosenBrand, setTheChosenBrand] = useState("");
    const [theChosenCategory, setTheChosenCategory] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    function calculateItemsPerPage() {
        const screenHeight = window.innerHeight;
        if (screenHeight >= 900) return 10;
        if (screenHeight >= 750) return 8;
        if (screenHeight >= 600) return 6;
        return 4;
    }

    const [amountItem, setAmountItem] = useState(calculateItemsPerPage());

    useEffect(() => {
        const fetchData = async () => {
            const loadingRef = setTimeout(() => { setIsLoading(true); }, 500);
            try {
                const res = await fetch('https://watch-shop-nine-beryl.vercel.app/api/product');
                const data = await res.json();
                console.log(data);
                if (data.status !== 'success') {
                    console.log('Error fetching data');
                    return;
                }
                setProducts(data.data);

                const resBrand = await fetch('https://watch-shop-nine-beryl.vercel.app/api/brand');
                const dataBrand = await resBrand.json();
                if (dataBrand.status !== 'success') {
                    console.log('Error fetching data');
                    return;
                }
                setBrands(dataBrand.data);

                const resCategory = await fetch('https://watch-shop-nine-beryl.vercel.app/api/category');
                const dataCategory = await resCategory.json();
                if (dataCategory.status !== 'success') {
                    console.log('Error fetching data');
                    return;
                }
                setCategories(dataCategory.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
                clearTimeout(loadingRef);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
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
        if (page < Math.ceil(products.length / amountItem)) {
            setPage(page + 1);
        }
    }

    function decreasePage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    async function handleFilter() {
        setIsLoading(true);
        try {
            const query = {
                brands: theChosenBrand,
                categories: theChosenCategory,
                sortBy: sortBy === "creation-time" ? "productUpdatedDateTime" : sortBy === "price" ? "productPrice" : sortBy === "total-purchase" ? "productTotalPurchase" : "",
                sortType: "asc",
                keySearch: search
            };

            const res = await fetch(`https://watch-shop-nine-beryl.vercel.app/api/product/filter?brands=${query.brands}&categories=${query.categories}&sortBy=${query.sortBy}&sortType=${query.sortType}&keySearch=${query.keySearch}`);
            const data = await res.json();
            if (data.status !== 'success') {
                console.log('Error fetching data');
                return;
            }
            setProducts(data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleFilter();
    }, [theChosenBrand, theChosenCategory, sortBy]);

    return (
        <>
            {productSelected && <ProductDetail product={productSelected} setProductSelected={setProductSelected} products={products} setProducts={setProducts} />}
            <div className="board board--product">
                <div className="board__feature">
                    <div className="board__feature__sortfilter">
                        <div className="board__feature__item">
                            <div className="board__feature__item__icon">
                                <FontAwesomeIcon icon={faSort} className='icon__check' />
                            </div>
                            <select
                                value={sortBy}
                                onChange={(e) => {
                                    setSortBy(e.target.value);
                                }}
                            >
                                <option value="" disabled>Sort</option>
                                <option value="creation-time">Creation Time</option>
                                <option value="price">Price</option>
                                <option value="">None</option>
                            </select>
                        </div>
                        <div className="board__feature__item">
                            <div className="board__feature__item__icon">
                                <FontAwesomeIcon icon={faFilter} className='icon__check' />
                            </div>
                            <select
                                value={theChosenCategory}
                                onChange={(e) => {
                                    setTheChosenCategory(e.target.value);
                                }}
                            >
                                <option value="" disabled>Category</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>{category.categoryName}</option>
                                ))}
                                <option value="">None</option>
                            </select>
                        </div>

                        <div className="board__feature__item">
                            <div className="board__feature__item__icon">
                                <FontAwesomeIcon icon={faFilter} className='icon__check' />
                            </div>
                            <select
                                value={theChosenBrand}
                                onChange={(e) => {
                                    setTheChosenBrand(e.target.value);
                                }}
                            >
                                <option value="" disabled>Brand</option>
                                {brands.map((brand) => (
                                    <option key={brand._id} value={brand._id}>{brand.brandName}</option>
                                ))}
                                <option value="">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="board__feature__search">
                        <input
                            value={search}
                            onChange={(e) => { setSearch(e.target.value) }}
                            type="text"
                            placeholder="Search..." />
                        <button onClick={handleFilter}>
                            <FontAwesomeIcon icon={faSearch} className='icon__search' />
                        </button>
                    </div>
                </div>

                <div className="board__table">
                    <div className="board__table__header">
                        <div className="board__table__attribute">
                            <button>
                                <FontAwesomeIcon icon={faSquareCheck} className='icon__check' />
                            </button>
                        </div>

                        <div className="board__table__attribute">
                            <span>ID</span>
                        </div>
                        <div className="board__table__attribute">
                            <span>Image</span>
                        </div>

                        <div className="board__table__attribute">
                            <span>Name</span>
                        </div>

                        <div className="board__table__attribute">
                            <span>Brand</span>
                        </div>

                        <div className="board__table__attribute">
                            <span>Category</span>
                        </div>

                        <div className="board__table__attribute">
                            <span>Price</span>
                        </div>

                        <div className="board__table__attribute">
                            <span>Num</span>
                        </div>

                        <div className="board__table__attribute">
                            <div className="board__table__status"></div>
                        </div>
                    </div>

                    <div className="board__table__data">
                        {products.length === 0 && <NothingDisplay />}
                        {products.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map((product, index) => (
                            <button
                                onClick={() => {
                                    setProductSelected(product)
                                }}
                                key={product._id}
                                className="board__table__row">
                                <div className="board__table__attribute">
                                    {(page - 1) * amountItem + index + 1}
                                </div>
                                <div className="board__table__attribute">{product._id.slice(-4)}</div>
                                <div className="board__table__attribute">
                                    <img
                                        src={product.productMainImage}
                                        alt={product.productName}
                                        style={{ width: "50px", height: "50px" }}
                                    />
                                </div>
                                <div className="board__table__attribute">{product.productName}</div>
                                <div className="board__table__attribute">{brands.find((brand) => brand._id === product.productBrand)?.brandName || "Unknown Brand"}</div>
                                <div className="board__table__attribute">{categories.find((category) => category._id === product.productCategory)?.categoryName || "Unknown Category"}</div>
                                <div className="board__table__attribute">${product.productPrice}</div>
                                <div className="board__table__attribute">{product.productQuantity}</div>
                                <div className="board__table__attribute">
                                    <div
                                        style={{ backgroundColor: product.productStatus === "On Stock" ? "green" : (product.productStatus === "Out Of Stock" ? "yellow" : "red") }}
                                        className="board__table__status"></div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="board__table__footer">
                        <div className="board__table__selected">
                            <span>{products.length} products</span>
                            <button>
                                <FontAwesomeIcon icon={faCartShopping} className='icon__deleted' />
                            </button>
                        </div>

                        <div className="board__table__paging">
                            <div className="board__table__paging__page">
                                <span>{page}</span>|
                                <span>{Math.ceil(products.length / amountItem)}</span>
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

export default Product; 