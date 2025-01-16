import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faTrash, faSquareCheck, faSearch, faFilter, faSort, faPencil } from '@fortawesome/free-solid-svg-icons'
import { getDateTime } from '../utils/DateConverter'
import '../styles/account.css'
import '../styles/board.css'
import { useLoading } from '../components/LoadingContext';
import { useNotification } from '../components/NotificationContext';
import AccountDetail from '../components/AccountDetail';
import NothingDisplay from '../components/NothingDisplay';

function Account() {
    // const customer = [
    //     {
    //         id: 1,
    //         name: "John Doe",
    //         email: "john.doe@example.com",
    //         registerTime: new Date(2023, 11, 1, 10, 0).toString(), // Converted to string
    //         status: "Active",
    //     },
    //     {
    //         id: 2,
    //         name: "Jane Smith",
    //         email: "jane.smith@example.com",
    //         registerTime: new Date(2023, 11, 2, 11, 30).toString(), // Converted to string
    //         status: "Inactive",
    //     },
    //     {
    //         id: 3,
    //         name: "Michael Johnson",
    //         email: "michael.johnson@example.com",
    //         registerTime: new Date(2023, 11, 3, 9, 45).toString(), // Converted to string
    //         status: "Active",
    //     },
    //     {
    //         id: 4,
    //         name: "Emily Davis",
    //         email: "emily.davis@example.com",
    //         registerTime: new Date(2023, 11, 4, 13, 15).toString(), // Converted to string
    //         status: "Pending",
    //     },
    //     {
    //         id: 5,
    //         name: "Chris Brown",
    //         email: "chris.brown@example.com",
    //         registerTime: new Date(2023, 11, 5, 15, 0).toString(), // Converted to string
    //         status: "Inactive",
    //     },
    //     {
    //         id: 6,
    //         name: "Sophia Wilson",
    //         email: "sophia.wilson@example.com",
    //         registerTime: new Date(2023, 11, 6, 10, 30).toString(), // Converted to string
    //         status: "Active",
    //     },
    //     {
    //         id: 7,
    //         name: "David Miller",
    //         email: "david.miller@example.com",
    //         registerTime: new Date(2023, 11, 7, 12, 45).toString(), // Converted to string
    //         status: "Pending",
    //     },
    //     {
    //         id: 8,
    //         name: "Olivia Martinez",
    //         email: "olivia.martinez@example.com",
    //         registerTime: new Date(2023, 11, 8, 14, 0).toString(), // Converted to string
    //         status: "Active",
    //     },
    //     {
    //         id: 9,
    //         name: "Ethan Taylor",
    //         email: "ethan.taylor@example.com",
    //         registerTime: new Date(2023, 11, 9, 16, 15).toString(), // Converted to string
    //         status: "Inactive",
    //     },
    //     {
    //         id: 10,
    //         name: "Ava Anderson",
    //         email: "ava.anderson@example.com",
    //         registerTime: new Date(2023, 11, 10, 17, 30).toString(), // Converted to string
    //         status: "Active",
    //     },
    // ];
    const { notify } = useNotification();
    const { setIsLoading } = useLoading();
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState('');
    const [search, setSearch] = useState('');
    const [customer, setCustomer] = useState([]);
    const [theChosenAccount, setTheChosenAccount] = useState(null);

    function calculateItemsPerPage() {
        const screenHeight = window.innerHeight;
        if (screenHeight >= 900) return 16;
        if (screenHeight >= 750) return 14;
        if (screenHeight >= 600) return 12;
        return 7;
    }

    const [amountItem, setAmountItem] = useState(calculateItemsPerPage());

    useEffect(() => {
        // const fetchData = async () => {
        //     const loadingRef = setTimeout(() => { setIsLoading(true) }, 500);
        //     try {
        //         const res = await fetch('https://watch-shop-nine-beryl.vercel.app/api/customer');
        //         const data = await res.json();
        //         console.log(data);
        //         if (data.status !== 'success') {
        //             console.log('Error fetching data');
        //             return;
        //         }
        //         setCustomer(data.data);
        //     } catch (error) {
        //         console.log(error);
        //     } finally {
        //         clearTimeout(loadingRef);
        //         setIsLoading(false);
        //     }
        // }

        // fetchData();

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
        if (page < Math.ceil(customer.length / amountItem)) {
            setPage(page + 1);
        }
    }

    function decreasePage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    async function updateAccount(id) {
        setIsLoading(true);
        try {
            const res = await fetch(`https://watch-shop-nine-beryl.vercel.app/api/customer/${id}`, {
                method: 'PUT',
            });
            const data = await res.json();
            notify({ type: data.status, msg: data.message });
            if (data.status !== 'success') {
                console.log('Error deleting data');
                return;
            }
            const newArray = customer.map(account => {
                if (account._id === id) {
                    account.customerAccountStatus = account.customerAccountStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
                }
                return account;
            });
            setCustomer(newArray);

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }

    }

    async function handleFilter() {
        setIsLoading(true);
        const query = {
            sortBy: sortBy === 'name' ? 'customerName' : sortBy === 'email' ? 'customerEmail' : sortBy === 'register-time' ? 'customerRegisterDateTime' : '',
            sortType: 'asc',
            keySearch: search,
        }
        try {
            const res = await fetch('https://watch-shop-nine-beryl.vercel.app/api/customer/filter?' + new URLSearchParams(query));
            const data = await res.json();
            if (data.status !== 'success') {
                console.log('Error fetching data');
                return;
            }
            setCustomer(data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleFilter();
    }, [sortBy]);

    return (
        <>
            <div className="board board--account">
                {theChosenAccount && <AccountDetail theChosenAccount={theChosenAccount} setTheChosenAccount={setTheChosenAccount} customer={customer} setCustomer={setCustomer} />}
                <div className="board__feature">
                    <div className="board__feature__sortfilter">
                        <div className="board__feature__item">
                            <div className="board__feature__item__icon">
                                <FontAwesomeIcon icon={faSort} className='icon__check' />
                            </div>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="" disabled>Sort</option>
                                <option value="name">Name</option>
                                <option value="email">Email</option>
                                <option value="registertime">Register Time</option>
                            </select>
                        </div>
                        {/* <div className="board__feature__item">
                            <div className="board__feature__item__icon">
                                <FontAwesomeIcon icon={faFilter} className='icon__check' />
                            </div>
                            <select>
                                <option value="" disabled>Filter</option>
                                <option value="name">Name</option>
                                <option value="email">Email</option>
                            </select>
                        </div> */}
                    </div>
                    <div className="board__feature__search">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text" placeholder="Search..." />
                        <button onClick={handleFilter}>
                            <FontAwesomeIcon icon={faSearch} className='icon__search' />
                        </button>
                    </div>
                </div>

                <div className="board__table">
                    <div className="board__table__header">
                        <div className="board__table__attribute">
                            <button>
                                <FontAwesomeIcon icon={faSquareCheck} className='icon__check' />
                            </button>
                        </div>

                        <div className="board__table__attribute">
                            <span>ID</span>
                        </div>
                        <div className="board__table__attribute">
                            <span>Name</span>
                        </div>

                        <div className="board__table__attribute">
                            <span>Email</span>
                        </div>

                        <div className="board__table__attribute">
                            <span>Register Time</span>
                        </div>

                        <div className="board__table__attribute">
                            <span>
                                <div className="board__table__attribute__status"></div>
                            </span>
                        </div>
                    </div>

                    <div className="board__table__data">
                        {customer.length === 0 && <NothingDisplay />}
                        {customer.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map((account) => (
                            <div key={account.id} className="board__table__row">
                                <div className="board__table__attribute">
                                    <button onClick={() => {
                                        setTheChosenAccount(account);
                                    }}>
                                        <FontAwesomeIcon icon={faPencil} className='icon__edit' />
                                    </button>
                                </div>
                                <div className="board__table__attribute">{account._id.slice(-4)}</div>
                                <div className="board__table__attribute">{account.customerName}</div>
                                <div className="board__table__attribute">{account.customerEmail}</div>
                                <div className="board__table__attribute">{getDateTime(new Date(account.customerRegisterDateTime))}</div>
                                <div className="board__table__attribute" >
                                    <div className="board__table__attribute__status" style={{ backgroundColor: account.customerAccountStatus === 'ACTIVE' ? 'green' : 'red' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="board__table__footer">
                        <div className="board__table__selected">
                            <span>{customer.length} account</span>
                            <button>
                                <FontAwesomeIcon icon={faTrash} className='icon__deleted' />
                            </button>
                        </div>

                        <div className="board__table__paging">
                            <div className="board__table__paging__page">
                                <span>{page}</span>|
                                <span>{Math.ceil(customer.length / amountItem)}</span>
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

export default Account;