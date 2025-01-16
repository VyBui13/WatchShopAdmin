import { useNotification } from "./NotificationContext";
import { useLoading } from "./LoadingContext";
import { useEffect, useState } from "react";
import '../styles/revenue.css';

function Revenue({ dateFrom, dateTo }) {
    const { notify } = useNotification();
    const { setIsLoading } = useLoading();
    const [totalPurchase, setTotalPurchase] = useState({
        totalPurchaseBeginning: 0,
        totalPurchaseAfter: 0,
    });

    useEffect(() => {
        if (dateFrom.day !== 0) {
            if (dateFrom.month === 0) {
                notify({ type: 'error', msg: 'Please select month beginning month' })
                return;
            }
            if (dateFrom.year === 0) {
                notify({ type: 'error', msg: 'Please select year beginning year' })
                return;
            }
        }

        if (dateFrom.month !== 0) {
            if (dateFrom.year === 0) {
                notify({ type: 'error', msg: 'Please select year beginning year' })
                return;
            }
        }

        if (dateTo.day !== 0) {
            if (dateTo.month === 0) {
                notify({ type: 'error', msg: 'Please select month ending month' })
                return;
            }
            if (dateTo.year === 0) {
                notify({ type: 'error', msg: 'Please select year ending year' })
                return;
            }
        }
        ///////////////////////////////////////////////////////////////////////////////

        if (dateFrom.year === 0 && dateTo.year !== 0 || dateFrom.year !== 0 && dateTo.year === 0) {
            notify({ type: 'error', msg: 'Please select both year' })
            return;
        }

        if (dateFrom.month === 0 && dateTo.month !== 0 || dateFrom.month !== 0 && dateTo.month === 0) {
            notify({ type: 'error', msg: 'Please select both month' })
            return;
        }

        if (dateFrom.day === 0 && dateTo.day !== 0 || dateFrom.day !== 0 && dateTo.day === 0) {
            notify({ type: 'error', msg: 'Please select both day' })
            return;
        }

        if (dateFrom.year > dateTo.year) {
            notify({ type: 'error', msg: 'Invalid year' })
            return;
        }
        if (dateFrom.year === dateTo.year && dateFrom.month > dateTo.month) {
            notify({ type: 'error', msg: 'Invalid month' })
            return;
        }

        if (dateFrom.year === dateTo.year && dateFrom.month === dateTo.month && dateFrom.day > dateTo.day) {
            notify({ type: 'error', msg: 'Invalid day' })
            return;
        }

        const fetchData = async () => {
            const query = {
                dayFrom: dateFrom.day === 0 ? '' : dateFrom.day,
                monthFrom: dateFrom.month === 0 ? '' : dateFrom.month,
                yearFrom: dateFrom.year === 0 ? '' : dateFrom.year,
                dayTo: dateTo.day === 0 ? '' : dateTo.day,
                monthTo: dateTo.month === 0 ? '' : dateTo.month,
                yearTo: dateTo.year === 0 ? '' : dateTo.year,
            }
            setIsLoading(true);
            try {
                // const response = await fetch('https://watch-shop-nine-beryl.vercel.app/api/product', {
                //     method: 'GET',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                // })
                // const data = await response.json()
                // if (data.status !== 'success') {
                //     console.log('Failed to fetch product list: ', data.message)
                //     notify({ type: data.status, msg: data.message })
                //     return;
                // }

                const response2 = await fetch(`https://watch-shop-nine-beryl.vercel.app/api/customer/order/total-purchase?` + new URLSearchParams(query), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                })
                const data2 = await response2.json()
                // notify({ type: data.status, msg: data.message })
                if (data2.status !== 'success') {
                    console.log('Failed to fetch total purchase list: ', data2.message)
                    return;
                }

                setTotalPurchase({
                    totalPurchaseBeginning: data2.data.totalPurchaseBeginning,
                    totalPurchaseAfter: data2.data.totalPurchaseAfter,
                });

            } catch (error) {
                notify({ type: 'error', msg: error.message })
            }
            finally {
                setIsLoading(false)
            }

        }
        fetchData();
    }, [dateFrom, dateTo])

    return (
        <div className="revenue">
            <div className="revenue__left">
                <div className="revenue__item">
                    <div className="revenue__price">
                        <div className="revenue__price__value">{totalPurchase.totalPurchaseBeginning}</div>
                    </div>
                    <div className="revenue__time">
                        <div className="revenue__time__value">{dateFrom.day === 0 ? '01' : dateFrom.day}/{dateFrom.month === 0 ? "01" : dateFrom.month}/{dateFrom.year === 0 ? new Date().getFullYear() : dateFrom.year}</div>
                    </div>
                    <div className="revenue__title">
                        <div className="revenue__title__value">Beginning Total Purchase</div>
                    </div>
                </div>
                <div className="revenue__item">
                    <div className="revenue__price">
                        <div className="revenue__price__value">{totalPurchase.totalPurchaseAfter}</div>
                    </div>
                    <div className="revenue__time">
                        <div className="revenue__time__value">{dateTo.day === 0 ? (new Date().getDate()) : dateTo.day}/{dateTo.month === 0 ? (new Date().getMonth() + 1) : dateTo.month}/{dateFrom.year === 0 ? new Date().getFullYear() : dateFrom.year}</div>
                    </div>
                    <div className="revenue__title">
                        <div className="revenue__title__value">Current Total Purchase</div>
                    </div>
                </div>

            </div>
            <div className="revenue__right">
                <div className="revenue__item">
                    <div className="revenue__price">
                        <div className="revenue__price__value">{totalPurchase.totalPurchaseAfter < totalPurchase.totalPurchaseBeginning ? "- " : "+ "}{totalPurchase.totalPurchaseAfter - totalPurchase.totalPurchaseBeginning}</div>
                    </div>
                    <div className="revenue__time">
                        <div className="revenue__time__value">{dateTo.day === 0 ? (new Date().getDate()) : dateTo.day}/{dateTo.month === 0 ? (new Date().getMonth() + 1) : dateTo.month}/{dateFrom.year === 0 ? new Date().getFullYear() : dateFrom.year}</div>
                    </div>
                    <div className="revenue__title">
                        <div className="revenue__title__value">Revenue</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Revenue;