import '../styles/product.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faTrash, faSquareCheck, faSearch, faFilter, faSort } from '@fortawesome/free-solid-svg-icons'
import { use } from 'react';

function Product() {
    const dataMock = [
        {
            id: 1,
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA" +
                "AAAFCAYAAACNbyblAAAAHElEQVQI12P4" +
                "//8/w38GIAXDIBKE0DHxgljNBAAO9TXL" +
                "0Y4OHwAAAABJRU5ErkJggg==",
            name: "Rolex Submariner",
            brand: "Rolex",
            quantity: 5,
            price: 8999,
            madeIn: "Switzerland"
        },
        {
            id: 2,
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA" +
                "AAAFCAYAAACNbyblAAAAHElEQVQI12P4" +
                "//8/w38GIAXDIBKE0DHxgljNBAAO9TXL" +
                "0Y4OHwAAAABJRU5ErkJggg==",
            name: "Omega Speedmaster",
            brand: "Omega",
            quantity: 10,
            price: 6499,
            madeIn: "Switzerland"
        },
        {
            id: 3,
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA" +
                "AAAFCAYAAACNbyblAAAAHElEQVQI12P4" +
                "//8/w38GIAXDIBKE0DHxgljNBAAO9TXL" +
                "0Y4OHwAAAABJRU5ErkJggg==",
            name: "Tag Heuer Carrera",
            brand: "Tag Heuer",
            quantity: 8,
            price: 4299,
            madeIn: "Switzerland"
        },
        {
            id: 4,
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA" +
                "AAAFCAYAAACNbyblAAAAHElEQVQI12P4" +
                "//8/w38GIAXDIBKE0DHxgljNBAAO9TXL" +
                "0Y4OHwAAAABJRU5ErkJggg==",
            name: "Seiko Presage",
            brand: "Seiko",
            quantity: 15,
            price: 549,
            madeIn: "Japan"
        },
        {
            id: 5,
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA" +
                "AAAFCAYAAACNbyblAAAAHElEQVQI12P4" +
                "//8/w38GIAXDIBKE0DHxgljNBAAO9TXL" +
                "0Y4OHwAAAABJRU5ErkJggg==",
            name: "Casio G-Shock",
            brand: "Casio",
            quantity: 20,
            price: 199,
            madeIn: "Japan"
        },
        {
            id: 6,
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA" +
                "AAAFCAYAAACNbyblAAAAHElEQVQI12P4" +
                "//8/w38GIAXDIBKE0DHxgljNBAAO9TXL" +
                "0Y4OHwAAAABJRU5ErkJggg==",
            name: "Breitling Navitimer",
            brand: "Breitling",
            quantity: 3,
            price: 7999,
            madeIn: "Switzerland"
        },
        {
            id: 7,
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA" +
                "AAAFCAYAAACNbyblAAAAHElEQVQI12P4" +
                "//8/w38GIAXDIBKE0DHxgljNBAAO9TXL" +
                "0Y4OHwAAAABJRU5ErkJggg==",
            name: "Citizen Eco-Drive",
            brand: "Citizen",
            quantity: 12,
            price: 349,
            madeIn: "Japan"
        },
        {
            id: 8,
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA" +
                "AAAFCAYAAACNbyblAAAAHElEQVQI12P4" +
                "//8/w38GIAXDIBKE0DHxgljNBAAO9TXL" +
                "0Y4OHwAAAABJRU5ErkJggg==",
            name: "Tissot PRX",
            brand: "Tissot",
            quantity: 7,
            price: 695,
            madeIn: "Switzerland"
        },
        {
            id: 9,
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA" +
                "AAAFCAYAAACNbyblAAAAHElEQVQI12P4" +
                "//8/w38GIAXDIBKE0DHxgljNBAAO9TXL" +
                "0Y4OHwAAAABJRU5ErkJggg==",
            name: "Audemars Piguet Royal Oak",
            brand: "Audemars Piguet",
            quantity: 2,
            price: 23999,
            madeIn: "Switzerland"
        },
        {
            id: 10,
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA" +
                "AAAFCAYAAACNbyblAAAAHElEQVQI12P4" +
                "//8/w38GIAXDIBKE0DHxgljNBAAO9TXL" +
                "0Y4OHwAAAABJRU5ErkJggg==",
            name: "Hamilton Khaki Field",
            brand: "Hamilton",
            quantity: 9,
            price: 595,
            madeIn: "USA"
        }
    ];


    const [page, setPage] = useState(1);

    function calculateItemsPerPage() {
        const screenHeight = window.innerHeight;
        if (screenHeight >= 900) return 11;
        if (screenHeight >= 750) return 9;
        if (screenHeight >= 600) return 7;
        return 4;
    }

    const [amountItem, setAmountItem] = useState(calculateItemsPerPage());

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
        if (page < Math.ceil(dataMock.length / amountItem)) {
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
                </div>

                <div className="product__table__data">
                    {dataMock.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map((product) => (
                        <div key={product.id} className="product__table__row">
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
                            <div className="product__table__attribute">{product.id}</div>
                            <div className="product__table__attribute">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{ width: "50px", height: "50px" }}
                                />
                            </div>
                            <div className="product__table__attribute">{product.name}</div>
                            <div className="product__table__attribute">{product.brand}</div>
                            <div className="product__table__attribute">{product.madeIn}</div>
                            <div className="product__table__attribute">${product.price}</div>
                            <div className="product__table__attribute">{product.quantity}</div>
                        </div>
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
                            <span>{Math.ceil(dataMock.length / amountItem)}</span>
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
    );
}

export default Product; 