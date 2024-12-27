import '../styles/product.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faTrash, faSquareCheck, faSearch, faFilter, faSort } from '@fortawesome/free-solid-svg-icons'
import ProductDetail from '../components/ProductDetail';

function Product() {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [productSelected, setProductSelected] = useState(null);

    const [brands, setBrands] = useState([]);
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
            try {
                const res = await fetch('http://localhost:3000/product');
                const data = await res.json();
                console.log(data);
                if (data.status !== 'success') {
                    console.log('Error fetching data');
                    return;
                }
                setProducts(data.data);

                const resBrand = await fetch('http://localhost:3000/brand');
                const dataBrand = await resBrand.json();
                if (dataBrand.status !== 'success') {
                    console.log('Error fetching data');
                    return;
                }
                setBrands(dataBrand.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setAmountItem(calculateItemsPerPage());
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

    const [productsSelected, setProductsSelected] = useState([]);

    return (
        <>
            {productSelected && <ProductDetail product={productSelected} setProductSelected={setProductSelected} products={products} setProducts={setProducts} />}
            <div className="product">
                <div className="product__feature">
                    <div className="product__feature__sortfilter">
                        <div className="product__feature__item">
                            <div className="product__feature__item__icon">
                                <FontAwesomeIcon icon={faSort} className='icon__check' />
                            </div>
                            <select>
                                <option value="" disabled>Sort</option>
                                <option value="name">Creation Time</option>
                                <option value="price">Price</option>
                                <option value="totalpurchase">Price</option>
                            </select>
                        </div>
                        <div className="product__feature__item">
                            <div className="product__feature__item__icon">
                                <FontAwesomeIcon icon={faFilter} className='icon__check' />
                            </div>
                            <select>
                                <option value="" disabled>Filter</option>
                                <option value="brand">Brand</option>
                                <option value="Nation">Nation</option>
                            </select>
                        </div>
                    </div>
                    <div className="product__feature__search">
                        <input type="text" placeholder="Search..." />
                        <button>
                            <FontAwesomeIcon icon={faSearch} className='icon__search' />
                        </button>
                    </div>
                </div>

                <div className="product__table">
                    <div className="product__table__header">
                        <div className="product__table__attribute">
                            <button>
                                <FontAwesomeIcon icon={faSquareCheck} className='icon__check' />
                            </button>
                        </div>

                        <div className="product__table__attribute">
                            <span>ID</span>
                        </div>
                        <div className="product__table__attribute">
                            <span>Image</span>
                        </div>

                        <div className="product__table__attribute">
                            <span>Name</span>
                        </div>

                        <div className="product__table__attribute">
                            <span>Brand</span>
                        </div>

                        <div className="product__table__attribute">
                            <span>Made In</span>
                        </div>

                        <div className="product__table__attribute">
                            <span>Price</span>
                        </div>

                        <div className="product__table__attribute">
                            <span>Num</span>
                        </div>

                        <div className="product__table__attribute">
                            <span>Status</span>
                        </div>
                    </div>

                    <div className="product__table__data">
                        {products.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map((product, index) => (
                            <button
                                onClick={() => {
                                    setProductSelected(product)
                                }}
                                key={product._id}
                                className="product__table__row">
                                <div className="product__table__attribute">
                                    <input
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setProductsSelected([...productsSelected, product]);
                                            } else {
                                                setProductsSelected(productsSelected.filter((item) => item.id !== product.id));
                                            }
                                        }
                                        }
                                        type="checkbox" />
                                </div>
                                <div className="product__table__attribute">{product._id.slice(-4)}</div>
                                <div className="product__table__attribute">
                                    <img
                                        src={product.productMainImage}
                                        alt={product.productName}
                                        style={{ width: "50px", height: "50px" }}
                                    />
                                </div>
                                <div className="product__table__attribute">{product.productName}</div>
                                <div className="product__table__attribute">{brands.find((brand) => brand._id === product.productBrand)?.brandName || "Unknown Brand"}</div>
                                <div className="product__table__attribute">{product.productCategory}</div>
                                <div className="product__table__attribute">${product.productPrice}</div>
                                <div className="product__table__attribute">{product.productQuantity}</div>
                                <div className="product__table__attribute">
                                    <div
                                        style={{ backgroundColor: product.productStatus === "On Stock" ? "green" : (product.productStatus === "Out Of Stock" ? "yellow" : "red") }}
                                        className="product__table__status"></div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="product__table__footer">
                        <div className="product__table__selected">
                            <span>{productsSelected.length} selected</span>
                            <button>
                                <FontAwesomeIcon icon={faTrash} className='icon__deleted' />
                            </button>
                        </div>

                        <div className="product__table__paging">
                            <div className="product__table__paging__page">
                                <span>{page}</span>|
                                <span>{Math.ceil(products.length / amountItem)}</span>
                            </div>

                            <div className="product__table__paging__button">
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