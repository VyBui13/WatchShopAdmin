import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faTrash, faSquareCheck, faSearch, faFilter, faSort, faPencil } from '@fortawesome/free-solid-svg-icons'
import { getDateTime } from '../utils/DateConverter'
import '../styles/order.css'
import '../styles/board.css'
import { useLoading } from '../components/LoadingContext';
import { useNotification } from '../components/NotificationContext';
import OrderDetail from '../components/OrderDetail';
import NothingDisplay from '../components/NothingDisplay';

function Order() {


    const { notify } = useNotification();
    const { setIsLoading } = useLoading();
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState('');
    const [search, setSearch] = useState('');
    const [orders, setOrders] = useState([]);
    const [theChosenOrder, setTheChosenOrder] = useState(null);
    const [displayOrders, setDisplayOrders] = useState([]);
    const [shippingMethods, setShippingMethods] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            try {
                const res = await fetch('https://watch-shop-nine-beryl.vercel.app/api/customer/order/list', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                const data = await res.json();
                if (data.status !== 'success') {
                    notify({ type: data.status, msg: data.message });
                    return;
                }
                const res2 = await fetch('https://watch-shop-nine-beryl.vercel.app/api/shipping');
                const data2 = await res2.json();
                if (data2.status !== 'success') {
                    notify({ type: data2.status, msg: data2.message });
                    return;
                }


                const shippingMethods = data2.data.map((method) => method.shippingName);
                setShippingMethods(shippingMethods);

                const orders = data.data.map((order) => {
                    const shippingMethod = data2.data.find((item) => item._id === order.orderShippingMethod);
                    return {
                        ...order,
                        shippingName: shippingMethod ? shippingMethod.shippingName : order.shippingName,
                    };
                });


                console.log(orders[0]);
                setOrders(orders);
                setDisplayOrders(orders);
            } catch (error) {
                console.log(error);
                notify({ type: 'error', msg: error.message });
            } finally {
                setIsLoading(false);
            }
        }
        fetchOrders();
    }, []);

    const [statusFilter, setStatusFilter] = useState('');
    const [shippingFilter, setShippingFilter] = useState('');

    function filterStatus() {
        if (statusFilter === '') {
            setDisplayOrders(orders);
        } else {
            setDisplayOrders(orders.filter((order) => order.orderStatus === statusFilter));
        }
    }

    function sortOrders() {
        if (sortBy === '') {
            return;
        }

        if (sortBy === 'id') {
            setDisplayOrders([...displayOrders].sort((a, b) => a._id.localeCompare(b._id)));
        }

        if (sortBy === 'creation-time') {
            setDisplayOrders([...displayOrders].sort((a, b) => a.orderCreatedDateTime.localeCompare(b.orderCreatedDateTime)));
        }
    }

    function filterShipping() {
        if (shippingFilter === '') {
            setDisplayOrders(orders);
        } else {
            setDisplayOrders(orders.filter((order) => order.shippingName === shippingFilter));
        }
    }

    useEffect(() => {
        filterShipping();
    }, [shippingFilter]);

    useEffect(() => {
        sortOrders();
    }, [sortBy]);

    useEffect(() => {
        filterStatus();
    }, [statusFilter]);

    function calculateItemsPerPage() {
        const screenHeight = window.innerHeight;
        if (screenHeight >= 900) return 15;
        if (screenHeight >= 750) return 13;
        if (screenHeight >= 600) return 10;
        return 8;
    }

    const [amountItem, setAmountItem] = useState(calculateItemsPerPage());

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
        if (page < Math.ceil(orders.length / amountItem)) {
            setPage(page + 1);
        }
    }

    function decreasePage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    return (
        <>
            <div className="board board--order">
                {theChosenOrder && <OrderDetail theChosenOrder={theChosenOrder} setTheChosenOrder={setTheChosenOrder} />}
                <div className="board__feature">
                    <div className="board__feature__sortfilter">
                        <div className="board__feature__item">
                            <div className="board__feature__item__icon">
                                <FontAwesomeIcon icon={faSort} className="icon__check" />
                            </div>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="" disabled>
                                    Sort
                                </option>
                                <option value="id">ID</option>
                                <option value="creation-time">Creation Time</option>
                                <option value="">None</option>

                            </select>
                        </div>
                        <div className="board__feature__item">
                            <div className="board__feature__item__icon">
                                <FontAwesomeIcon icon={faFilter} className="icon__check" />
                            </div>
                            <select
                                value={shippingFilter}
                                onChange={(e) => {
                                    setShippingFilter(e.target.value);
                                }}
                            >
                                <option value="" disabled>
                                    Shipping Method
                                </option>
                                {shippingMethods.map((method) => (
                                    <option key={method} value={method}>
                                        {method}
                                    </option>
                                ))}
                                <option value="">
                                    <div className="status__filter"></div>
                                    <div className="status__text">
                                        None
                                    </div>
                                </option>
                            </select>
                        </div>

                        <div className="board__feature__item">
                            <div className="board__feature__item__icon">
                                <FontAwesomeIcon icon={faFilter} className="icon__check" />
                            </div>
                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value);
                                }}
                            >
                                <option value="" disabled>
                                    Filter
                                </option>
                                <option value="Processing">
                                    <div className="status__filter"></div>
                                    <div className="status__text">
                                        Processing
                                    </div>
                                </option>
                                <option value="Pending">
                                    <div className="status__filter"></div>
                                    <div className="status__text">
                                        Pending
                                    </div>
                                </option>
                                <option value="Delivered">
                                    <div className="status__filter"></div>
                                    <div className="status__text">
                                        Delivered
                                    </div>
                                </option>
                                <option value="Completed">
                                    <div className="status__filter"></div>
                                    <div className="status__text">
                                        Completed
                                    </div>
                                </option>
                                <option value="Cancelled">
                                    <div className="status__filter"></div>
                                    <div className="status__text">
                                        Cancelled
                                    </div>
                                </option>

                                <option value="">
                                    <div className="status__filter"></div>
                                    <div className="status__text">
                                        None
                                    </div>
                                </option>
                            </select>
                        </div>

                    </div>
                    <div className="board__feature__search">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder="Search..."
                        />
                        <button>
                            <FontAwesomeIcon icon={faSearch} className="icon__search" />
                        </button>
                    </div>
                </div>

                <div className="board__table">
                    <div className="board__table__header">
                        <div className="board__table__attribute">
                            <button>
                                <FontAwesomeIcon icon={faSquareCheck} className="icon__check" />
                            </button>
                        </div>
                        <div className="board__table__attribute">
                            <span>ID</span>
                        </div>

                        <div className="board__table__attribute">
                            <span>Name</span>
                        </div>

                        <div className="board__table__attribute">
                            <span>Method</span>
                        </div>
                        <div className="board__table__attribute">
                            <span>Price</span>
                        </div>

                        <div className="board__table__attribute">
                            <span>DateTime</span>
                        </div>

                        <div className="board__table__attribute">
                            <div className="board__table__attribute__status"></div>

                        </div>
                    </div>

                    <div className="board__table__data">
                        {displayOrders.length === 0 && <NothingDisplay />}
                        {displayOrders
                            .slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem)
                            .map((order) => (
                                <div key={order.id} className="board__table__row">
                                    <div className="board__table__attribute">
                                        <button
                                            onClick={() => {
                                                setTheChosenOrder(order);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faPencil} className="icon__edit" />
                                        </button>
                                    </div>
                                    <div className="board__table__attribute">{order._id.slice(-4)}</div>
                                    <div className="board__table__attribute">{order.customer.customerName}</div>
                                    <div className="board__table__attribute">{order.shippingName.split(' ')[0]}</div>
                                    <div className="board__table__attribute">{new Intl.NumberFormat('de-DE').format(order.orderTotalPrice)}</div>
                                    <div className="board__table__attribute">
                                        {getDateTime(new Date(order.orderCreatedDateTime))}
                                    </div>
                                    <div className="board__table__attribute">
                                        <div
                                            className="board__table__attribute__status"
                                            style={{
                                                backgroundColor: (() => {
                                                    switch (order.orderStatus) {
                                                        case "Processing":
                                                            return "blue";
                                                        case "Pending":
                                                            return "orange";
                                                        case "Delivered":
                                                            return "purple";
                                                        case "Completed":
                                                            return "green";
                                                        case "Cancelled":
                                                            return "red";
                                                        default:
                                                            return "gray"; // Fallback color
                                                    }
                                                })(),
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                    </div>

                    <div className="board__table__footer">
                        <div className="board__table__selected">
                            <span>{orders.length} order</span>
                            <button>
                                <FontAwesomeIcon icon={faTrash} className="icon__deleted" />
                            </button>
                        </div>

                        <div className="board__table__paging">
                            <div className="board__table__paging__page">
                                <span>{page}</span>|<span>{Math.ceil(orders.length / amountItem)}</span>
                            </div>

                            <div className="board__table__paging__button">
                                <button onClick={decreasePage}>
                                    <FontAwesomeIcon icon={faArrowLeft} className="icon__paging" />
                                </button>
                                <button onClick={increasePage}>
                                    <FontAwesomeIcon icon={faArrowRight} className="icon__paging" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Order;