import '../styles/manufacturer.css';
import '../styles/board.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faTrash, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { useLoading } from "../components/LoadingContext";
import { useNotification } from "../components/NotificationContext"
import { useNavigate } from 'react-router-dom';
import NothingDisplay from '../components/NothingDisplay';
import { useConfirmPrompt } from '../components/ConfirmPromptContext';

function Manufacturer() {
    const navigate = useNavigate();
    const { setConfirmPromptData, setIsConfirmPrompt } = useConfirmPrompt();
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
            const loadingRef = setTimeout(() => { setIsLoading(true) }, 500);
            try {
                const res = await fetch('http://localhost:5000/api/brand');
                const data = await res.json();
                if (data.status !== 'success') {
                    console.log('Error fetching data');
                    return;
                }
                setManufacturers(data.data);

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
            setPage(1);
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

    async function handleHidden(id) {
        try {
            const res = await fetch(`http://localhost:5000/api/brand/activation/${id}`, {
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

            setManufacturers(manufacturers.map(manufacturer => { return manufacturer._id === id ? { ...manufacturer, brandActive: manufacturer.brandActive === "Visible" ? "Hidden" : "Visible" } : manufacturer }));

        } catch (error) {
            console.log(error);
        }
    }

    async function handleRemove(id) {
        try {
            const fetchData = async () => {
                const loadingRef = setTimeout(() => { setIsLoading(true) }, 500);
                try {
                    const res = await fetch(`http://localhost:5000/api/brand/${id}`, {
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
                } finally {
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
            <div className="board board--manufacturer">
                <div className="board__feature">
                    <div className="board__feature__add">
                        <button onClick={() => navigate('/manufacturer/addition')}>
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
                            <span>Image</span>
                        </div>

                        <div className="board__table__attribute">
                            <span>Name</span>
                        </div>

                        <div className="board__table__attribute">
                            <span>Description</span>
                        </div>

                        <div className="board__table__attribute">
                            <span>Country</span>
                        </div>
                    </div>

                    <div className="board__table__data">
                        {manufacturers.length === 0 && <NothingDisplay />}
                        {manufacturers.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map((manufacturer, index) => (
                            <button
                                key={manufacturer._id}
                                className="board__table__row">
                                <div className="board__table__attribute">
                                    <button
                                        style={{ backgroundColor: manufacturer.brandActive === "Visible" ? "green" : "red" }}
                                        onClick={() => {
                                            setConfirmPromptData({
                                                message: manufacturer.brandActive === "Visible" ? "Hidden brand" : "Visible brand",
                                                action: "Change",
                                                onConfirm: () => handleHidden(manufacturer._id),
                                            });
                                            setIsConfirmPrompt(true);

                                        }}>
                                        {manufacturer.brandActive === "Visible" ? "X" : "+"}
                                    </button>
                                </div>
                                <div className="board__table__attribute">{manufacturer._id.slice(-4)}</div>
                                <div className="board__table__attribute">
                                    <img src={manufacturer.brandImage} alt="manufacturer" />
                                </div>
                                <div className="board__table__attribute">{manufacturer.brandName}</div>
                                <div className="board__table__attribute">{manufacturer.brandDescription}</div>
                                <div className="board__table__attribute">{manufacturer.brandCountry}</div>
                            </button>
                        ))}
                    </div>

                    <div className="board__table__footer">
                        <div className="board__table__selected">
                            <span>{manufacturers.length} brands</span>
                            <button>
                                <FontAwesomeIcon icon={faTrash} className='icon__deleted' />
                            </button>
                        </div>

                        <div className="board__table__paging">
                            <div className="board__table__paging__page">
                                <span>{page}</span>|
                                <span>{Math.ceil(manufacturers.length / amountItem)}</span>
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

export default Manufacturer;
