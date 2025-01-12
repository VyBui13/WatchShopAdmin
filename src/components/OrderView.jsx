import '../styles/order_detail.css';
import { useState, useEffect } from 'react';
import { getDateTime } from '../utils/DateConverter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useLoading } from './LoadingContext';
import { useNotification } from './NotificationContext';
import { useConfirmPrompt } from './ConfirmPromptContext';

function OrderView({ theChosenOrder, setTheChosenOrder, orders, setOrders, setDisplayOrders }) {
    const { setIsLoading } = useLoading();
    const { notify } = useNotification();
    const { setIsConfirmPrompt, setConfirmPromptData } = useConfirmPrompt();
    const [orderDetail, setOrderDetail] = useState(theChosenOrder);

    async function completeOrder() {
        setIsLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/api/customer/order/${theChosenOrder._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    orderStatus: 'Delivered',
                }),
            });

            const data = await res.json();
            notify({ type: data.status, msg: data.message });

            if (data.status !== 'success') {
                return;
            }

            const updatedOrders = orders.map(order => {
                if (order._id === theChosenOrder._id) {
                    return { ...order, orderStatus: 'Delivered' };
                }
                return order;
            });

            setOrders(updatedOrders);
            setDisplayOrders(updatedOrders);
            setTheChosenOrder(null);

        } catch (error) {
            console.log(error);
            notify({ type: 'error', msg: error.message });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="orderdetail-wrapper">
                <div className="orderdetail">
                    <div className="orderdetail__header">
                        <h1>Order Details</h1>
                        <div className="orderdetail__general">
                            <h3>Order ID: #{orderDetail._id.slice(-4)}</h3>
                            <span>{getDateTime(new Date(orderDetail.orderCreatedDateTime))}</span>
                            <div className="orderdetail__status">
                                <button
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
                                            <span>{theChosenOrder.shipper.userName}</span>
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
                                                        {product.product.productBrand.brandName}
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
                        <button onClick={() => {
                            setConfirmPromptData({
                                message: `Update order`,
                                action: 'order',
                                onConfirm: completeOrder
                            });
                            setIsConfirmPrompt(true);
                        }}>Save</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default OrderView;