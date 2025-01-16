import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScrewdriverWrench, faUser, faX, faGear, faFilter, faUserTie, faUserSecret } from '@fortawesome/free-solid-svg-icons'
import '../styles/admin_management.css'
import { useState, useEffect } from 'react'
import AccountForm from '../components/AccountForm'
import { useConfirmPrompt } from '../components/ConfirmPromptContext'
import { useNotification } from '../components/NotificationContext'
import RoleManagement from '../components/RoleManagement'
import Card from '../components/Card'
import { useLoading } from '../components/LoadingContext'
import PagingButton from '../components/PagingButton'

function AdminManagement() {
    const { setIsLoading } = useLoading();
    const { notify } = useNotification();
    const [users, setUsers] = useState([]);
    const [isForm, setIsForm] = useState(false);
    const { setIsConfirmPrompt, setConfirmPromptData } = useConfirmPrompt();
    const [theChosenUser, setTheChosenUser] = useState({});
    const [theChosenUserCard, setTheChosenUserCard] = useState({});
    const [displayeUser, setDisplayUser] = useState([]);

    const [page, setPage] = useState(1);

    useEffect(() => {
        setDisplayUser(users);
    }, [users])

    function calculateItemsPerPage() {
        const screenHeight = window.innerHeight;
        if (screenHeight >= 900) return 12;
        if (screenHeight >= 750) return 10;
        if (screenHeight >= 600) return 8;
        return 6;
    }

    const [amountItem, setAmountItem] = useState(calculateItemsPerPage());
    function increasePage() {
        if (page < Math.ceil(users.length / amountItem)) {
            setPage(page + 1);
        }
    }

    function decreasePage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            let loadingRef = null;
            try {
                loadingRef = setTimeout(() => {
                    setIsLoading(true);
                }, 500);
                const response = await fetch('https://watch-shop-nine-beryl.vercel.app/api/user');
                const data = await response.json();
                if (data.status === 'error') {
                    console.log(data.message);
                    return;
                }
                setUsers(data.data);
            } catch (error) {
                console.log(error);
            } finally {
                clearTimeout(loadingRef);
                loadingRef = null;
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
    }, [])


    function filterByRole(role) {
        if (role === '') {
            setDisplayUser(users);
        } else {
            setDisplayUser(users.filter(user => user.userRole === role));
        }
    }

    function handleDeleteStaff(id) {
        const fetchData = async () => {
            const loadingRef = setTimeout(() => {
                setIsLoading(true);
            }, 500);
            try {
                const response = await fetch('https://watch-shop-nine-beryl.vercel.app/api/user/' + id, {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const data = await response.json();
                if (data.status === 'success') {
                    setUsers(users.filter(user => user._id !== id));
                }
                notify({ type: data.status, msg: data.message });

            } catch (error) {
                console.log(error);
            } finally {
                clearTimeout(loadingRef);
                setIsLoading(false);
            }
        }

        fetchData();
    }


    return (
        <>
            <div className="management">
                {theChosenUserCard._id && <Card theChosenUserCard={theChosenUserCard} setTheChosenUserCard={setTheChosenUserCard} />}
                {/* {isPrompt && <ConfirmPrompt message="Delete Staff" action="Delete" onConfirm={() => { console.log("hehehe") }} onCancel={() => setIsPrompt(false)} />} */}
                {isForm && <AccountForm setIsForm={setIsForm} setUsers={setUsers} />}

                {theChosenUser._id && <RoleManagement theChosenUser={theChosenUser} setTheChosenUser={setTheChosenUser} setUsers={setUsers} />}
                <div className="management__header">
                    <div className="management__header__filter">
                        <div className="management__header__filter__item">
                            <FontAwesomeIcon icon={faFilter} className='icon__filter' />
                            <select
                                defaultValue=''
                                onChange={(e) => filterByRole(e.target.value)}
                            >
                                <option value="" disabled>Role</option>
                                <option value="Admin">Admin</option>
                                <option value="Manager">Manager</option>
                                <option value="Shipper">Shipper</option>
                                <option value="">None</option>
                            </select>
                        </div>
                    </div>

                    <div className="management__header__button">
                        <button onClick={() => setIsForm(true)} className="management__header__button__add">
                            <FontAwesomeIcon icon={faScrewdriverWrench} className='icon__button' />
                            <span>Add Staff</span>
                        </button>
                    </div>
                </div>
                <div className="management__body">
                    <div className="management__list">
                        <div className="management__listwrapper">
                            {displayeUser.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map(user => (
                                <div className="management__card" key={user._id}>
                                    <button onClick={() => {
                                        setTheChosenUserCard(user);
                                    }} className="management__card__avatar">
                                        {user.userRole.toLowerCase() === 'admin' && <FontAwesomeIcon icon={faUserSecret} className='icon__card' />}
                                        {user.userRole.toLowerCase() === 'manager' && <FontAwesomeIcon icon={faUserTie} className='icon__card' />}
                                        {user.userRole.toLowerCase() === 'shipper' && <FontAwesomeIcon icon={faUser} className='icon__card' />}
                                    </button>
                                    <div className="clone1">
                                        <span>Export card</span>
                                    </div>
                                    <div className="management__card__body">

                                        <div className="management__card__title">
                                            <h2>
                                                {user.userName}
                                            </h2>
                                        </div>

                                        <div className="management__card__content">
                                            <p>
                                                Email:
                                                <span>{user.userEmail}</span>
                                            </p>

                                            <p>
                                                Phone:
                                                <span>{user.userPhone}</span>
                                            </p>
                                            <p>
                                                Address:
                                                <span>{user.userAddress}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <button onClick={() => {
                                        setConfirmPromptData({
                                            message: `Delete ${user.userName}`,
                                            action: "Delete",
                                            onConfirm: () => {
                                                handleDeleteStaff(user._id);
                                            },
                                        });
                                        setIsConfirmPrompt(true);
                                    }} className="management__card__delete">
                                        <FontAwesomeIcon icon={faX} className='icon__card__button' />
                                    </button>

                                    <button onClick={
                                        () => {
                                            setTheChosenUser(user);
                                        }
                                    } className="management__card__change">
                                        <FontAwesomeIcon icon={faGear} className='icon__card__button' />
                                    </button>
                                </div>))
                            }
                        </div>
                    </div>

                    <div className="management__button">
                        <PagingButton decreasePage={decreasePage} increasePage={increasePage} currentPage={page} numberPage={Math.ceil(users.length / amountItem)} />
                    </div>

                </div>
            </div>
        </>
    )
}

export default AdminManagement;