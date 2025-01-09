import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faTrash, faSquareCheck, faSearch, faFilter, faSort, faPencil } from '@fortawesome/free-solid-svg-icons'
import { getDateTime } from '../utils/DateConverter'
import '../styles/order.css'
import '../styles/board.css'
import { useLoading } from '../components/LoadingContext';
import { useNotification } from '../components/NotificationContext';

function Order() {

    const dataMock = [
        {
            _id: '1',
            customerName: 'Nguyen Van A',
            orderCreatedDateTime: new Date().toString(),
            orderListProduct: [
                {
                    productName: 'Iphone 12',
                    quantity: 1,
                    productPrice: 10000,
                },
                {
                    productName: 'Iphone 11',
                    quantity: 1,
                    productPrice: 20000,
                },
            ],
            orderShippingAddress: '123 Nguyen Van Linh',
            shippingName: 'Standard Shipping',
            orderShippingFee: 20000,
            orderTotalPrice: 50000,
            orderPayment: 0,
            orderStatus: 'Pending',
        },
        {
            _id: '2',
            customerName: 'Tran Thi B',
            orderCreatedDateTime: new Date().toString(),
            orderListProduct: [
                {
                    productName: 'Samsung Galaxy S21',
                    quantity: 2,
                    productPrice: 15000,
                },
            ],
            orderShippingAddress: '45 Le Loi',
            shippingName: 'Overnight Shipping',
            orderShippingFee: 40000,
            orderTotalPrice: 70000,
            orderPayment: 70000,
            orderStatus: 'Completed',
        },
        {
            _id: '3',
            customerName: 'Pham Van C',
            orderCreatedDateTime: new Date().toString(),
            orderListProduct: [
                {
                    productName: 'MacBook Pro',
                    quantity: 1,
                    productPrice: 100000,
                },
            ],
            orderShippingAddress: '78 Tran Phu',
            shippingName: 'International Shipping',
            orderShippingFee: 50000,
            orderTotalPrice: 150000,
            orderPayment: 50000,
            orderStatus: 'Processing',
        },
        {
            _id: '4',
            customerName: 'Le Thi D',
            orderCreatedDateTime: new Date().toString(),
            orderListProduct: [
                {
                    productName: 'Dell XPS 13',
                    quantity: 1,
                    productPrice: 80000,
                },
                {
                    productName: 'Mouse Logitech',
                    quantity: 1,
                    productPrice: 2000,
                },
            ],
            orderShippingAddress: '99 Bach Dang',
            shippingName: 'Expedited Shipping',
            orderShippingFee: 27000,
            orderTotalPrice: 109000,
            orderPayment: 109000,
            orderStatus: 'Shipped',
        },
        {
            _id: '5',
            customerName: 'Nguyen Van E',
            orderCreatedDateTime: new Date().toString(),
            orderListProduct: [
                {
                    productName: 'Apple Watch',
                    quantity: 1,
                    productPrice: 12000,
                },
            ],
            orderShippingAddress: '321 Cach Mang Thang 8',
            shippingName: 'Overnight Shipping',
            orderShippingFee: 40000,
            orderTotalPrice: 52000,
            orderPayment: 0,
            orderStatus: 'Pending',
        },
        {
            _id: '6',
            customerName: 'Pham Thi F',
            orderCreatedDateTime: new Date().toString(),
            orderListProduct: [
                {
                    productName: 'AirPods Pro',
                    quantity: 2,
                    productPrice: 5000,
                },
            ],
            orderShippingAddress: '14 Hung Vuong',
            shippingName: 'Standard Shipping',
            orderShippingFee: 20000,
            orderTotalPrice: 30000,
            orderPayment: 15000,
            orderStatus: 'Processing',
        },
        {
            _id: '7',
            customerName: 'Tran Van G',
            orderCreatedDateTime: new Date().toString(),
            orderListProduct: [
                {
                    productName: 'Google Pixel 7',
                    quantity: 1,
                    productPrice: 70000,
                },
            ],
            orderShippingAddress: '66 Hoang Dieu',
            shippingName: 'Expedited Shipping',
            orderShippingFee: 27000,
            orderTotalPrice: 97000,
            orderPayment: 97000,
            orderStatus: 'Completed',
        },
        {
            _id: '8',
            customerName: 'Le Van H',
            orderCreatedDateTime: new Date().toString(),
            orderListProduct: [
                {
                    productName: 'Sony WH-1000XM5',
                    quantity: 1,
                    productPrice: 30000,
                },
                {
                    productName: 'Sony SRS-XB13',
                    quantity: 1,
                    productPrice: 10000,
                },
            ],
            orderShippingAddress: '88 Hai Ba Trung',
            shippingName: 'International Shipping',
            orderShippingFee: 50000,
            orderTotalPrice: 90000,
            orderPayment: 0,
            orderStatus: 'Cancelled',
        },
        {
            _id: '9',
            customerName: 'Nguyen Thi I',
            orderCreatedDateTime: new Date().toString(),
            orderListProduct: [
                {
                    productName: 'Canon EOS R10',
                    quantity: 1,
                    productPrice: 50000,
                },
            ],
            orderShippingAddress: '456 Ly Thuong Kiet',
            shippingName: 'Overnight Shipping',
            orderShippingFee: 40000,
            orderTotalPrice: 90000,
            orderPayment: 45000,
            orderStatus: 'Processing',
        },
        {
            _id: '10',
            customerName: 'Pham Van J',
            orderCreatedDateTime: new Date().toString(),
            orderListProduct: [
                {
                    productName: 'Xbox Series X',
                    quantity: 1,
                    productPrice: 150000,
                },
            ],
            orderShippingAddress: '789 Nguyen Hue',
            shippingName: 'Expedited Shipping',
            orderShippingFee: 27000,
            orderTotalPrice: 177000,
            orderPayment: 177000,
            orderStatus: 'Shipped',
        },
    ];

    const { notify } = useNotification();
    const { setIsLoading } = useLoading();
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState('');
    const [search, setSearch] = useState('');
    const [orders, setOrders] = useState(dataMock);
    function calculateItemsPerPage() {
        const screenHeight = window.innerHeight;
        if (screenHeight >= 900) return 15;
        if (screenHeight >= 750) return 13;
        if (screenHeight >= 600) return 11;
        return 7;
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

    // async function updateAccount(id) {
    //     setIsLoading(true);
    //     try {
    //         const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
    //             method: 'PUT',
    //         });
    //         const data = await res.json();
    //         notify({ type: data.status, msg: data.message });
    //         if (data.status !== 'success') {
    //             console.log('Error deleting data');
    //             return;
    //         }
    //         const newArray = orders.map(order => {
    //             if (order._id === id) {
    //                 order.customerAccountStatus = order.customerAccountStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    //             }
    //             return order;
    //         });
    //         setOrders(newArray);

    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setIsLoading(false);
    //     }

    // }

    // async function handleFilter() {
    //     setIsLoading(true);
    //     const query = {
    //         sortBy: sortBy === 'name' ? 'customerName' : sortBy === 'email' ? 'customerEmail' : sortBy === 'register-time' ? 'customerRegisterDateTime' : '',
    //         sortType: 'asc',
    //         keySearch: search,
    //     }
    //     try {
    //         const res = await fetch('http://localhost:5000/api/orders/filter?' + new URLSearchParams(query));
    //         const data = await res.json();
    //         if (data.status !== 'success') {
    //             console.log('Error fetching data');
    //             return;
    //         }
    //         setOrders(data.data);
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }

    // useEffect(() => {
    //     handleFilter();
    // }, [sortBy]);

    return (
        <div className="board board--order">
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
                            <option value="name">Name</option>
                            <option value="email">Email</option>
                            <option value="registertime">Register Time</option>
                        </select>
                    </div>
                    <div className="board__feature__item">
                        <div className="board__feature__item__icon">
                            <FontAwesomeIcon icon={faFilter} className="icon__check" />
                        </div>
                        <select>
                            <option value="" disabled>
                                Filter
                            </option>
                            <option value="name">Name</option>
                            <option value="email">Email</option>
                        </select>
                    </div>

                    <div className="board__feature__item">
                        <div className="board__feature__item__icon">
                            <FontAwesomeIcon icon={faFilter} className="icon__check" />
                        </div>
                        <select>
                            <option value="" disabled>
                                Filter
                            </option>
                            <option value="name">
                                <div className="status__filter"></div>
                                <div className="status__text">
                                    Processing
                                </div>
                            </option>
                            <option value="name">
                                <div className="status__filter"></div>
                                <div className="status__text">
                                    Pending
                                </div>
                            </option>
                            <option value="name">
                                <div className="status__filter"></div>
                                <div className="status__text">
                                    Shipped
                                </div>
                            </option>
                            <option value="name">
                                <div className="status__filter"></div>
                                <div className="status__text">
                                    Completed
                                </div>
                            </option>
                            <option value="name">
                                <div className="status__filter"></div>
                                <div className="status__text">
                                    Cancelled
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
                    {orders
                        .slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem)
                        .map((order) => (
                            <div key={order.id} className="board__table__row">
                                <div className="board__table__attribute">
                                    <button
                                        onClick={() => {
                                            updateAccount(order._id);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPencil} className="icon__edit" />
                                    </button>
                                </div>
                                <div className="board__table__attribute">{order._id.slice(-4)}</div>
                                <div className="board__table__attribute">{order.customerName}</div>
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
                                                    case "Shipped":
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


    );
}

export default Order;