import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faTrash, faSquareCheck, faSearch, faFilter, faSort, faPencil } from '@fortawesome/free-solid-svg-icons'
import { getDateTime } from '../utils/DateConverter'
import '../styles/order.css'
import '../styles/board.css'
import { useLoading } from '../components/LoadingContext';
import { useNotification } from '../components/NotificationContext';
import OrderView from '../components/OrderView';

function PersonalOrder() {

    // const dataMock = [
    //     {
    //         _id: '1',
    //         customer: {
    //             customerName: 'Nguyen Van A',
    //             customerPhone: '0000000001',
    //         },
    //         orderCreatedDateTime: new Date().toString(),
    //         orderListProduct: [
    //             {
    //                 product: {
    //                     productName: 'Iphone 12',
    //                     productBrand: 'Apple'
    //                 },
    //                 quantity: 1,

    //                 productPrice: 10000,
    //             },
    //             {
    //                 product: {
    //                     productName: 'Iphone 11',
    //                     productBrand: 'Apple'
    //                 },
    //                 quantity: 1,

    //                 productPrice: 20000,
    //             },
    //         ],
    //         orderShippingAddress: '123 Nguyen Van Linh',
    //         shippingName: 'Standard Shipping',
    //         orderShippingFee: 20000,
    //         orderTotalPrice: 50000,
    //         orderStatus: 'Pending',
    //         shipper: {
    //             userName: 'Shipper A',
    //             userPhone: '0000000002',
    //             userEmail: 'nguyenvanv@gmail.com'
    //         }
    //     },
    //     {
    //         _id: '2',
    //         customer: {
    //             customerName: 'Tran Thi B',
    //             customerPhone: '0000000003',
    //         },
    //         orderCreatedDateTime: new Date().toString(),
    //         orderListProduct: [
    //             {
    //                 product: {
    //                     productName: 'Samsung Galaxy S21',
    //                     productBrand: 'Apple'
    //                 },
    //                 quantity: 2,

    //                 productPrice: 15000,
    //             }
    //         ],
    //         orderShippingAddress: '456 Le Loi',
    //         shippingName: 'Express Shipping',
    //         orderShippingFee: 30000,
    //         orderTotalPrice: 60000,
    //         orderStatus: 'Processing',
    //         shipper: {
    //             userName: 'Shipper B',
    //             userPhone: '0000000004',
    //             userEmail: 'tranthib@gmail.com'
    //         }
    //     },
    //     {
    //         _id: '3',
    //         customer: {
    //             customerName: 'Le Van C',
    //             customerPhone: '0000000005',
    //         },
    //         orderCreatedDateTime: new Date().toString(),
    //         orderListProduct: [
    //             {
    //                 product: {
    //                     productName: 'MacBook Air M1',
    //                     productBrand: 'Apple'
    //                 },
    //                 quantity: 1,

    //                 productPrice: 80000,
    //             },
    //         ],
    //         orderShippingAddress: '789 Tran Hung Dao',
    //         shippingName: 'Standard Shipping',
    //         orderShippingFee: 5000,
    //         orderTotalPrice: 85000,
    //         orderStatus: 'Delivered',
    //         shipper: {
    //             userName: 'Shipper C',
    //             userPhone: '0000000006',
    //             userEmail: 'levanc@gmail.com'
    //         }
    //     },
    //     {
    //         _id: '4',
    //         customer: {
    //             customerName: 'Pham Thi D',
    //             customerPhone: '0000000007',
    //         },
    //         orderCreatedDateTime: new Date().toString(),
    //         orderListProduct: [
    //             {
    //                 product: {
    //                     productName: 'AirPods Pro',
    //                     productBrand: 'Apple'
    //                 },
    //                 quantity: 1,

    //                 productPrice: 5000,
    //             },
    //             {
    //                 product: {
    //                     productName: 'iPad Pro',
    //                     productBrand: 'Apple'
    //                 },
    //                 quantity: 1,

    //                 productPrice: 100000,
    //             }
    //         ],
    //         orderShippingAddress: '101 Nguyen Hue',
    //         shippingName: 'Express Shipping',
    //         orderShippingFee: 10000,
    //         orderTotalPrice: 115000,
    //         orderStatus: 'Pending',
    //         shipper: {
    //             userName: 'Shipper D',
    //             userPhone: '0000000008',
    //             userEmail: 'phamthid@gmail.com'
    //         }
    //     },
    //     {
    //         _id: '5',
    //         customer: {
    //             customerName: 'Hoang Van E',
    //             customerPhone: '0000000009',
    //         },
    //         orderCreatedDateTime: new Date().toString(),
    //         orderListProduct: [
    //             {
    //                 product: {
    //                     productName: 'Sony WH-1000XM4',
    //                     productBrand: 'Apple'
    //                 },
    //                 quantity: 1,

    //                 productPrice: 15000,
    //             }
    //         ],
    //         orderShippingAddress: '202 Hai Ba Trung',
    //         shippingName: 'Standard Shipping',
    //         orderShippingFee: 2000,
    //         orderTotalPrice: 17000,
    //         orderStatus: 'Cancelled',
    //         shipper: {
    //             userName: 'Shipper E',
    //             userPhone: '0000000010',
    //             userEmail: 'hoangvane@gmail.com'
    //         }
    //     },
    //     {
    //         _id: '6',
    //         customer: {
    //             customerName: 'Vo Thi F',
    //             customerPhone: '0000000011',
    //         },
    //         orderCreatedDateTime: new Date().toString(),
    //         orderListProduct: [
    //             {
    //                 product: {
    //                     productName: 'Dell XPS 13',
    //                     productBrand: 'Apple'
    //                 },
    //                 quantity: 1,

    //                 productPrice: 120000,
    //             }
    //         ],
    //         orderShippingAddress: '303 Ly Thuong Kiet',
    //         shippingName: 'Express Shipping',
    //         orderShippingFee: 15000,
    //         orderTotalPrice: 135000,
    //         orderStatus: 'Completed',
    //         shipper: {
    //             userName: 'Shipper F',
    //             userPhone: '0000000012',
    //             userEmail: 'vothif@gmail.com'
    //         }
    //     },
    //     {
    //         _id: '7',
    //         customer: {
    //             customerName: 'Nguyen Van G',
    //             customerPhone: '0000000013',
    //         },
    //         orderCreatedDateTime: new Date().toString(),
    //         orderListProduct: [
    //             {
    //                 product: {
    //                     productName: 'Google Pixel 6',
    //                     productBrand: 'Apple'
    //                 },
    //                 quantity: 1,

    //                 productPrice: 90000,
    //             },
    //         ],
    //         orderShippingAddress: '404 Phan Chau Trinh',
    //         shippingName: 'Standard Shipping',
    //         orderShippingFee: 10000,
    //         orderTotalPrice: 100000,
    //         orderStatus: 'Processing',
    //         shipper: {
    //             userName: 'Shipper G',
    //             userPhone: '0000000014',
    //             userEmail: 'nguyenvang@gmail.com'
    //         }
    //     },
    //     {
    //         _id: '8',
    //         customer: {
    //             customerName: 'Tran Thi H',
    //             customerPhone: '0000000015',
    //         },
    //         orderCreatedDateTime: new Date().toString(),
    //         orderListProduct: [
    //             {
    //                 product: {
    //                     productName: 'Xbox Series X',
    //                     productBrand: 'Apple'
    //                 },
    //                 quantity: 1,

    //                 productPrice: 50000,
    //             },
    //             {
    //                 product: {
    //                     productName: 'PlayStation 5',
    //                     productBrand: 'Apple'
    //                 },
    //                 quantity: 1,

    //                 productPrice: 50000,
    //             }
    //         ],
    //         orderShippingAddress: '505 Bach Dang',
    //         shippingName: 'Express Shipping',
    //         orderShippingFee: 15000,
    //         orderTotalPrice: 115000,
    //         orderStatus: 'Pending',
    //         shipper: {
    //             userName: 'Shipper H',
    //             userPhone: '0000000016',
    //             userEmail: 'tranthih@gmail.com'
    //         }
    //     },
    //     {
    //         _id: '9',
    //         customer: {
    //             customerName: 'Pham Van I',
    //             customerPhone: '0000000017',
    //         },
    //         orderCreatedDateTime: new Date().toString(),
    //         orderListProduct: [
    //             {
    //                 product: {
    //                     productName: 'Apple Watch Series 7',
    //                     productBrand: 'Apple'
    //                 },
    //                 quantity: 1,

    //                 productPrice: 20000,
    //             },
    //         ],
    //         orderShippingAddress: '606 Hoang Dieu',
    //         shippingName: 'Standard Shipping',
    //         orderShippingFee: 5000,
    //         orderTotalPrice: 25000,
    //         orderStatus: 'Delivered',
    //         shipper: {
    //             userName: 'Shipper I',
    //             userPhone: '0000000018',
    //             userEmail: 'phamvani@gmail.com'
    //         }
    //     }
    // ];

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
                const res = await fetch('http://localhost:5000/api/user/order', {
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
                const res2 = await fetch('http://localhost:5000/api/shipping');
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

    return (
        <>
            <div className="board board--order">
                {theChosenOrder && <OrderView theChosenOrder={theChosenOrder} setTheChosenOrder={setTheChosenOrder} orders={orders} setOrders={setOrders} setDisplayOrders={setDisplayOrders} />}
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

export default PersonalOrder;