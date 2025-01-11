import '../styles/order_detail.css';
import { useState, useEffect } from 'react';
import { getDateTime } from '../utils/DateConverter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useLoading } from './LoadingContext';
import { useNotification } from './NotificationContext';
import { useConfirmPrompt } from './ConfirmPromptContext';
import StatusManagement from './StatusManagement';

function OrderDetail({ theChosenOrder, setTheChosenOrder }) {
    const { setIsLoading } = useLoading();
    const { notify } = useNotification();
    const { setIsConfirmPrompt, setConfirmPromptData } = useConfirmPrompt();

    const [isStatusManagement, setIsStatusManagement] = useState(false);

    const [shipper, setShipper] = useState("");
    const [orderDetail, setOrderDetail] = useState(theChosenOrder);
    const [shippers, setShippers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const loadingRef = setTimeout(() => setIsLoading(true), 500);
            try {
                const res = await fetch('http://localhost:5000/api/user?role=Shipper', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                const data = await res.json();

                if (data.status === 'success') {
                    setShippers(data.data);
                }

            } catch (error) {
                console.log(error);
            } finally {
                clearTimeout(loadingRef);
                setIsLoading(false);
            }
        }
        fetchData();
    }, [])

    return (
        <>
            <div className="orderdetail-wrapper">
                {isStatusManagement && <StatusManagement orderDetail={orderDetail} setOrderDetail={setOrderDetail} setIsStatusManagement={setIsStatusManagement} />}
                <div className="orderdetail">
                    <div className="orderdetail__header">
                        <h1>Order Details</h1>
                        <div className="orderdetail__general">
                            <h3>Order ID: {orderDetail._id}</h3>
                            <span>{getDateTime(new Date(orderDetail.orderCreatedDateTime))}</span>
                            <div className="orderdetail__status">
                                <button
                                    onClick={() => setIsStatusManagement(true)}
                                    style={{
                                        color: (() => {
                                            switch (orderDetail.orderStatus) {
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

                                        borderColor: (() => {
                                            switch (orderDetail.orderStatus) {
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
                                    }
                                    }
                                >{orderDetail.orderStatus}</button>
                            </div>
                        </div>
                    </div>

                    <div className="orderdetail__body">
                        <div className="orderdetail__info">
                            <div className="orderdetail__item">
                                <div className="orderdetail__item__left">
                                    <div className="orderdetail__item__icon">
                                        <FontAwesomeIcon icon={faUser} className='icon__orderdetail' />
                                    </div>
                                </div>

                                <div className="orderdetail__item__right">
                                    <div className="orderdetail__item__title">
                                        <h2>Customer</h2>
                                    </div>
                                    <div className="orderdetail__item__content">
                                        <div className="orderdetail__item__content__field">
                                            <div className="orderdetail__item__content__fieldheader">
                                                Name:
                                            </div>
                                            <span>{orderDetail.customer.customerName}</span>
                                        </div>
                                        <div className="orderdetail__item__content__field">
                                            <div className="orderdetail__item__content__fieldheader">
                                                Phone:
                                            </div>
                                            <span>{orderDetail.customer.customerPhone}</span>
                                        </div>
                                        <div className="orderdetail__item__content__field">
                                            <div className="orderdetail__item__content__fieldheader">
                                                Address:
                                            </div>
                                            <span>{orderDetail.orderShippingAddress}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="orderdetail__item">
                                <div className="orderdetail__item__left">
                                    <div className="orderdetail__item__icon">
                                        <FontAwesomeIcon icon={faCartShopping} className='icon__orderdetail' />
                                    </div>
                                </div>

                                <div className="orderdetail__item__right">
                                    <div className="orderdetail__item__title">
                                        <h2>Order Info</h2>
                                    </div>
                                    <div className="orderdetail__item__content">
                                        <div className="orderdetail__item__content__field">
                                            <div className="orderdetail__item__content__fieldheader">
                                                Shipping:
                                            </div>
                                            <span>{orderDetail.shippingName}</span>
                                        </div>
                                        <div className="orderdetail__item__content__field">
                                            <div className="orderdetail__item__content__fieldheader">
                                                Total price:
                                            </div>
                                            <span>{orderDetail.orderTotalPrice}</span>
                                        </div>
                                        <div className="orderdetail__item__content__field">
                                            <div className="orderdetail__item__content__fieldheader">
                                                Shipper:
                                            </div>
                                            <select
                                                value={shipper}
                                                onChange={(e) => setShipper(e.target.value)}
                                            >
                                                <option value="">None</option>
                                                {shippers.map((shipper, index) => {
                                                    return (
                                                        <option key={index} value={shipper._id}>{shipper.userName}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="orderdetail__product">
                            <div className="orderdetail__product__header">

                            </div>

                            <div className="orderdetail__product__body">
                                <div className="order__product__table">
                                    <div className="order__product__table__header">
                                        <div className="order__product__table__items">
                                            <div className="order__product__table__item">
                                                NAME
                                            </div>
                                            <div className="order__product__table__item">
                                                BRAND
                                            </div>
                                            <div className="order__product__table__item">
                                                UNIT PRICE
                                            </div>
                                            <div className="order__product__table__item">
                                                QUANTITY
                                            </div>
                                        </div>
                                    </div>

                                    <div className="order__product__table__body">
                                        {orderDetail.orderListProduct.map((product, index) => {
                                            return (
                                                <div className="order__product__table__items" key={index}>
                                                    <div className="order__product__table__item">
                                                        {product.product.productName}
                                                    </div>
                                                    <div className="order__product__table__item">
                                                        {product.product.productBrand}
                                                    </div>
                                                    <div className="order__product__table__item">
                                                        {product.productPrice}
                                                    </div>
                                                    <div className="order__product__table__item">
                                                        {product.quantity}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="orderdetail__footer">
                        <button onClick={() => setTheChosenOrder(null)}>Close</button>
                        <button onClick={() => setTheChosenOrder(null)}>Save</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default OrderDetail;