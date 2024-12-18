import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faTrash, faSquareCheck, faSearch, faFilter, faSort } from '@fortawesome/free-solid-svg-icons'
import { getDateTime } from '../utils/DateConverter'
import '../styles/account.css'

function Account() {
    const dataMock = [
        {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            registerTime: new Date(2023, 11, 1, 10, 0).toString(), // Converted to string
            status: "Active",
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane.smith@example.com",
            registerTime: new Date(2023, 11, 2, 11, 30).toString(), // Converted to string
            status: "Inactive",
        },
        {
            id: 3,
            name: "Michael Johnson",
            email: "michael.johnson@example.com",
            registerTime: new Date(2023, 11, 3, 9, 45).toString(), // Converted to string
            status: "Active",
        },
        {
            id: 4,
            name: "Emily Davis",
            email: "emily.davis@example.com",
            registerTime: new Date(2023, 11, 4, 13, 15).toString(), // Converted to string
            status: "Pending",
        },
        {
            id: 5,
            name: "Chris Brown",
            email: "chris.brown@example.com",
            registerTime: new Date(2023, 11, 5, 15, 0).toString(), // Converted to string
            status: "Inactive",
        },
        {
            id: 6,
            name: "Sophia Wilson",
            email: "sophia.wilson@example.com",
            registerTime: new Date(2023, 11, 6, 10, 30).toString(), // Converted to string
            status: "Active",
        },
        {
            id: 7,
            name: "David Miller",
            email: "david.miller@example.com",
            registerTime: new Date(2023, 11, 7, 12, 45).toString(), // Converted to string
            status: "Pending",
        },
        {
            id: 8,
            name: "Olivia Martinez",
            email: "olivia.martinez@example.com",
            registerTime: new Date(2023, 11, 8, 14, 0).toString(), // Converted to string
            status: "Active",
        },
        {
            id: 9,
            name: "Ethan Taylor",
            email: "ethan.taylor@example.com",
            registerTime: new Date(2023, 11, 9, 16, 15).toString(), // Converted to string
            status: "Inactive",
        },
        {
            id: 10,
            name: "Ava Anderson",
            email: "ava.anderson@example.com",
            registerTime: new Date(2023, 11, 10, 17, 30).toString(), // Converted to string
            status: "Active",
        },
    ];

    const [page, setPage] = useState(1);

    function calculateItemsPerPage() {
        const screenHeight = window.innerHeight;
        if (screenHeight >= 900) return 15;
        if (screenHeight >= 750) return 13;
        if (screenHeight >= 600) return 11;
        return 9;
    }

    const [amountItem, setAmountItem] = useState(calculateItemsPerPage());

    useEffect(() => {
        const handleResize = () => {
            setAmountItem(calculateItemsPerPage());
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    function increasePage() {
        if (page < Math.ceil(dataMock.length / amountItem)) {
            setPage(page + 1);
        }
    }

    function decreasePage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const [productsSelected, setProductsSelected] = useState([]);

    return (
        <div className="account">
            <div className="account__feature">
                <div className="account__feature__sortfilter">
                    <div className="account__feature__item">
                        <div className="account__feature__item__icon">
                            <FontAwesomeIcon icon={faSort} className='icon__check' />
                        </div>
                        <select>
                            <option value="" disabled>Sort</option>
                            <option value="name">Name</option>
                            <option value="email">Email</option>
                            <option value="registertime">Register Time</option>
                        </select>
                    </div>
                    <div className="account__feature__item">
                        <div className="account__feature__item__icon">
                            <FontAwesomeIcon icon={faFilter} className='icon__check' />
                        </div>
                        <select>
                            <option value="" disabled>Filter</option>
                            <option value="name">Name</option>
                            <option value="email">Email</option>
                        </select>
                    </div>
                </div>
                <div className="account__feature__search">
                    <input type="text" placeholder="Search..." />
                    <button>
                        <FontAwesomeIcon icon={faSearch} className='icon__search' />
                    </button>
                </div>
            </div>

            <div className="account__table">
                <div className="account__table__header">
                    <div className="account__table__attribute">
                        <button>
                            <FontAwesomeIcon icon={faSquareCheck} className='icon__check' />
                        </button>
                    </div>

                    <div className="account__table__attribute">
                        <span>ID</span>
                    </div>
                    <div className="account__table__attribute">
                        <span>Name</span>
                    </div>

                    <div className="account__table__attribute">
                        <span>Email</span>
                    </div>

                    <div className="account__table__attribute">
                        <span>Register Time</span>
                    </div>

                    <div className="account__table__attribute">
                        <span>Status</span>
                    </div>
                </div>

                <div className="account__table__data">
                    {dataMock.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map((account) => (
                        <div key={account.id} className="account__table__row">
                            <div className="account__table__attribute">
                                <input
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setProductsSelected([...productsSelected, account]);
                                        } else {
                                            setProductsSelected(productsSelected.filter((item) => item.id !== account.id));
                                        }
                                    }
                                    }
                                    type="checkbox" />
                            </div>
                            <div className="account__table__attribute">{account.id}</div>
                            <div className="account__table__attribute">{account.name}</div>
                            <div className="account__table__attribute">{account.email}</div>
                            <div className="account__table__attribute">{getDateTime(new Date(account.registerTime))}</div>
                            <div className="account__table__attribute">{account.status}</div>
                        </div>
                    ))}
                </div>

                <div className="account__table__footer">
                    <div className="account__table__selected">
                        <span>{productsSelected.length} selected</span>
                        <button>
                            <FontAwesomeIcon icon={faTrash} className='icon__deleted' />
                        </button>
                    </div>

                    <div className="account__table__paging">
                        <div className="account__table__paging__page">
                            <span>{page}</span>|
                            <span>{Math.ceil(dataMock.length / amountItem)}</span>
                        </div>

                        <div className="account__table__paging__button">
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
    );
}

export default Account;