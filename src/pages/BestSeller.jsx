import { Chart as ChartJS } from 'chart.js/auto'
import { Bar, Line, Pie } from 'react-chartjs-2'
import '../styles/report.css'
import { useState, useEffect } from 'react';
import { useLoading } from '../components/LoadingContext';
import { useNotification } from '../components/NotificationContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faSave, faRotateRight, faRepeat } from '@fortawesome/free-solid-svg-icons'
import InputNumberRange from '../components/InputNumberRange';
import Revenue from '../components/Revenue';
import NothingDisplay from '../components/NothingDisplay';

function BestSeller() {
    const { notify } = useNotification();
    const { setIsLoading } = useLoading();
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1);
    const [value, setValue] = useState(null);
    const [dateFrom, setDateFrom] = useState({
        day: 0,
        month: 0,
        year: 0,
    });
    const [isRevenue, setIsRevenue] = useState(false);

    const [dateTo, setDateTo] = useState({
        day: 0,
        month: 0,
        year: 0,
    });

    function calculateItemsPerPage() {
        const screenHeight = window.innerHeight;
        if (screenHeight >= 900) return 16;
        if (screenHeight >= 750) return 14;
        if (screenHeight >= 600) return 12;
        return 7;
    }
    const [amountItem, setAmountItem] = useState(calculateItemsPerPage());


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('https://watch-shop-nine-beryl.vercel.app/api/product', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                const data = await response.json()
                if (data.status !== 'success') {
                    console.log('Failed to fetch product list: ', data.message)
                    notify({ type: data.status, msg: data.message })
                    return;
                }

                const response1 = await fetch('https://watch-shop-nine-beryl.vercel.app/api/customer/order/total-purchase/list', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                })
                const data1 = await response1.json()

                if (data1.status !== 'success') {
                    console.log('Failed to fetch total purchase list: ', data1.message)
                    notify({ type: data1.status, msg: data1.message })
                    return;
                }

                const products = data.data.map(product => { return { ...product, totalPurchase: 0 } })

                data1.data.forEach(item => {
                    const product = products.find(product => product._id === item.productID);
                    if (!product) return;
                    product.totalPurchase = item.totalPurchase;
                })
                const sortProducts = products.sort((a, b) => b.totalPurchase - a.totalPurchase);
                setProducts(sortProducts)
            } catch (error) {
                notify({ type: 'error', msg: error.message })
            }
            finally {
                setIsLoading(false)
            }

        }
        fetchData()
        const handleResize = () => {
            setAmountItem(calculateItemsPerPage());
            setPage(1);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);

        };
    }, [])

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

    const chartProductSellerData = {
        labels: [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
        ],
        datasets: [
            {
                label: 'Best Seller',
                data: products.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map(product => product.totalPurchase),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const chartProductSellerOptions = {
        indexAxis: 'y', // Chuyển biểu đồ thành dạng ngang
        plugins: {
            title: {
                display: true,
                text: 'Product Best Seller',
                font: {
                    size: 20,
                },
                padding: {
                    top: 10,
                    bottom: 10,
                },
            },
        },
    };

    async function handleSearch() {
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
                const response = await fetch('https://watch-shop-nine-beryl.vercel.app/api/product', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                const data = await response.json()
                if (data.status !== 'success') {
                    console.log('Failed to fetch product list: ', data.message)
                    notify({ type: data.status, msg: data.message })
                    return;
                }

                const response2 = await fetch(`https://watch-shop-nine-beryl.vercel.app/api/customer/order/total-purchase/list?` + new URLSearchParams(query), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                })
                const data2 = await response2.json()
                notify({ type: data2.status, msg: data2.message })
                if (data2.status !== 'success') {
                    console.log('Failed to fetch total purchase list: ', data.message)
                    return;
                }

                const products = data.data.map(product => { return { ...product, totalPurchase: 0 } })
                data2.data.forEach(item => {
                    const product = products.find(product => product._id === item.productID);
                    if (!product) return;
                    product.totalPurchase = item.totalPurchase;
                })
                const sortProducts = products.sort((a, b) => b.totalPurchase - a.totalPurchase);
                setProducts(sortProducts)
            } catch (error) {
                notify({ type: 'error', msg: error.message })
            }
            finally {
                setIsLoading(false)
            }

        }
        fetchData()
    }

    function handleReset() {
        setDateFrom({
            day: 0,
            month: 0,
            year: 0,
        });

        setDateTo({
            day: 0,
            month: 0,
            year: 0,
        });
    }

    function handleClick(label, value, min, max, step, state, setState) {
        setValue({
            value: value,
            label: label,
            min: min,
            max: max,
            step: step,
            state: state,
            setState: setState
        })
    }

    return (
        <>
            {value && <InputNumberRange
                label={value.label}
                min={value.min}
                max={value.max}
                value={value.value}
                setValue={setValue}
                date={value.state}
                setDate={value.setState}
                step={value.step} />}

            <div className="report">
                <div className="report__header">
                    <div className="report__header__left">
                        <div className="report__header__btn">
                            <button onClick={
                                () => handleClick("Day", dateFrom.day, 0, 31, 1, dateFrom, setDateFrom)
                            }>
                                {dateFrom.day === 0 ? 'Day' : dateFrom.day}
                            </button>
                            <button onClick={
                                () => handleClick("Month", dateFrom.month, 0, 12, 1, dateFrom, setDateFrom)
                            }>
                                {dateFrom.month === 0 ? 'Month' : dateFrom.month}
                            </button>
                            <button onClick={
                                () => handleClick("Year", dateFrom.year, 2000, new Date().getFullYear(), 1, dateFrom, setDateFrom)
                            }>
                                {dateFrom.year === 0 ? 'Year' : dateFrom.year}
                            </button>
                        </div>
                        <div className="report__header__arrow">
                            <FontAwesomeIcon icon={faArrowRight} className='icon__report' />
                        </div>

                        <div className="report__header__btn">
                            <button onClick={
                                () => handleClick("Day", dateTo.day, 0, 31, 1, dateTo, setDateTo)
                            }>
                                {dateTo.day === 0 ? 'Day' : dateTo.day}
                            </button>
                            <button onClick={
                                () => handleClick("Month", dateTo.month, 0, 12, 1, dateTo, setDateTo)
                            }>
                                {dateTo.month === 0 ? 'Month' : dateTo.month}
                            </button>
                            <button onClick={
                                () => handleClick("Year", dateTo.year, 2000, new Date().getFullYear(), 1, dateTo, setDateTo)
                            }>
                                {dateTo.year === 0 ? 'Year' : dateTo.year}
                            </button>
                        </div>
                    </div>
                    <div className="report__header__right">
                        <button onClick={() => setIsRevenue(!isRevenue)}>
                            <FontAwesomeIcon icon={faRepeat} className='icon__report' />
                        </button>

                        <button onClick={handleReset}>
                            <FontAwesomeIcon icon={faRotateRight} className='icon__report' />
                        </button>

                        <button onClick={handleSearch}>
                            <FontAwesomeIcon icon={faSave} className='icon__report' />
                        </button>
                    </div>
                </div>
                <div className="report__body">
                    {!isRevenue && <div className="report__chart">
                        {products.length === 0 && <NothingDisplay />}
                        {products.length !== 0 && <Bar className="chart"
                            data={chartProductSellerData} options={chartProductSellerOptions}
                        />}
                    </div>}
                    {!isRevenue && <div className="report__form">
                        <div className="report__form__header">
                            <div className="report__form__items">
                                <div className="report__form__item">Product</div>
                                <div className="report__form__item">Purchase</div>
                            </div>
                        </div>
                        <div className="report__form__table">
                            {products.length === 0 && <NothingDisplay />}
                            {products.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map((product, index) => (
                                <div className="report__form__items" key={index}>
                                    <div className="report__form__item">{product.productName}</div>
                                    <div className="report__form__item">{product.totalPurchase}</div>
                                </div>
                            ))}
                        </div>
                        <div className="report__form__footer">
                            <div className="report__form__btn">
                                <button onClick={decreasePage}>
                                    <FontAwesomeIcon icon={faArrowLeft} className='icon__report' />
                                </button>
                                <button onClick={increasePage}>
                                    <FontAwesomeIcon icon={faArrowRight} className='icon__report' />
                                </button>
                            </div>

                            <div className="report__form__export">
                                <button>
                                    <FontAwesomeIcon icon={faSave} className='icon__report' />
                                </button>
                            </div>
                        </div>
                    </div>}

                    {isRevenue && <div className="report__revenue">
                        <Revenue dateFrom={dateFrom} dateTo={dateTo} />
                    </div>}
                </div>
            </div>
        </>
    )
}

export default BestSeller