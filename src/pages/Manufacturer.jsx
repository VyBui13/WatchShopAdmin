import '../styles/manufacturer.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faTrash, faSquareCheck, faSearch, faFilter, faSort } from '@fortawesome/free-solid-svg-icons'
import { useLoading } from "../components/LoadingContext";
import { useNotification } from "../components/NotificationContext"

function Manufacturer() {
    const { setIsLoading } = useLoading();
    const { notify } = useNotification();

    const [manufacturers, setManufacturers] = useState([]);
    const [page, setPage] = useState(1);
    // const [productSelected, setProductSelected] = useState(null);

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
                const res = await fetch('http://localhost:3000/brand');
                const data = await res.json();
                if (data.status !== 'success') {
                    console.log('Error fetching data');
                    return;
                }
                setManufacturers(data.data);

            } catch (error) {
                console.log(error);
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
        if (page < Math.ceil(manufacturers.length / amountItem)) {
            setPage(page + 1);
        }
    }

    function decreasePage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    async function handleRemove(id) {
        try {
            const fetchData = async () => {
                try {
                    const res = await fetch(`http://localhost:3000/manufacturer/${id}`, {
                        method: 'DELETE',
                    });
                    const data = await res.json();
                    if (data.status !== 'success') {
                        console.log('Error deleting data');
                        return;
                    }
                    notify({ type: data.status, msg: data.message });
                    setManufacturers(manufacturers.filter(manufacturer => manufacturer._id !== id));
                }
                catch (error) {
                    console.log(error);
                }
            }

            fetchData();
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <div className="manufacturer">
                <div className="manufacturer__feature">
                    <div className="manufacturer__feature__sortfilter">
                        <div className="manufacturer__feature__item">
                            <div className="manufacturer__feature__item__icon">
                                <FontAwesomeIcon icon={faSort} className='icon__check' />
                            </div>
                            <select>
                                <option value="" disabled>Sort</option>
                                <option value="name">Creation Time</option>
                                <option value="price">Price</option>
                                <option value="totalpurchase">Price</option>
                            </select>
                        </div>
                        <div className="manufacturer__feature__item">
                            <div className="manufacturer__feature__item__icon">
                                <FontAwesomeIcon icon={faFilter} className='icon__check' />
                            </div>
                            <select>
                                <option value="" disabled>Filter</option>
                                <option value="brand">Brand</option>
                                <option value="Nation">Nation</option>
                            </select>
                        </div>
                    </div>
                    <div className="manufacturer__feature__search">
                        <input type="text" placeholder="Search..." />
                        <button>
                            <FontAwesomeIcon icon={faSearch} className='icon__search' />
                        </button>
                    </div>
                </div>

                <div className="manufacturer__table">
                    <div className="manufacturer__table__header">
                        <div className="manufacturer__table__attribute">
                            <span>X</span>
                        </div>

                        <div className="manufacturer__table__attribute">
                            <span>ID</span>
                        </div>

                        <div className="manufacturer__table__attribute">
                            <span>Image</span>
                        </div>

                        <div className="manufacturer__table__attribute">
                            <span>Name</span>
                        </div>

                        <div className="manufacturer__table__attribute">
                            <span>Description</span>
                        </div>

                        <div className="manufacturer__table__attribute">
                            <span>Country</span>
                        </div>

                    </div>

                    <div className="manufacturer__table__data">
                        {manufacturers.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map((manufacturer, index) => (
                            <button
                                key={manufacturer._id}
                                className="manufacturer__table__row">
                                <div className="manufacturer__table__attribute">
                                    <button onClick={() => {
                                        handleRemove(manufacturer._id);
                                    }}>X</button>
                                </div>
                                <div className="manufacturer__table__attribute">{manufacturer._id.slice(-4)}</div>
                                <div className="manufacturer__table__attribute"> <img src={manufacturer.brandImage} alt="manufacturer" /></div>
                                <div className="manufacturer__table__attribute">{manufacturer.brandName}</div>
                                <div className="manufacturer__table__attribute">{manufacturer.brandDescription}</div>
                                <div className="manufacturer__table__attribute">{manufacturer.brandCountry}</div>

                            </button>
                        ))}
                    </div>

                    <div className="manufacturer__table__footer">
                        <div className="manufacturer__table__selected">
                            <span>1 selected</span>
                            <button>
                                <FontAwesomeIcon icon={faTrash} className='icon__deleted' />
                            </button>
                        </div>

                        <div className="manufacturer__table__paging">
                            <div className="manufacturer__table__paging__page">
                                <span>{page}</span>|
                                <span>{Math.ceil(manufacturers.length / amountItem)}</span>
                            </div>

                            <div className="manufacturer__table__paging__button">
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

export default Manufacturer;
