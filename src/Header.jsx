import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faList, faRightFromBracket, faClock, faPen, faFilter, faClipboard, faBell } from '@fortawesome/free-solid-svg-icons'
import './styles/header.css'
import { Link } from 'react-router-dom'
import { useAuthorizations } from './components/AuthorizationContext'
import { useNotification } from './components/NotificationContext'
import { useNavigate } from 'react-router-dom'
import { useLoading } from './components/LoadingContext'

function Header() {
    const navigate = useNavigate();
    const { setIsLoading } = useLoading();
    const { notify } = useNotification();
    const { authorization } = useAuthorizations();

    async function logout() {
        setIsLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/user/logout', {
                method: 'GET',
                header: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const data = await res.json();
            notify({ type: data.status, msg: data.message });
            if (data.status !== 'success') {
                return
            }

            navigate('/login');
        } catch (error) {
            console.log(error);
            notify({ type: 'error', msg: error.message });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="header">
            <div className="header__logo">
                <div className="header__logo__wrapper">
                    <FontAwesomeIcon icon={faClock} className='icon__logo' />
                </div>
            </div>
            <div className="header__nav">
                <div className="header__nav__items">
                    <div className="header__nav__items__title">
                        Dashboard
                    </div>
                    <Link to='/'>
                        <div className="header__nav__items__content">
                            <div className="header__nav__item">
                                <FontAwesomeIcon icon={faHome} className='icon__item' />
                                <span>Home</span>
                            </div>
                        </div>
                    </Link>
                </div>

                {authorization.productManagement && <div className="header__nav__items">
                    <div className="header__nav__items__title">
                        Product
                    </div>
                    <div className="header__nav__items__content">
                        <Link to='/product'>
                            <div className="header__nav__item">
                                <FontAwesomeIcon icon={faList} className='icon__item' />
                                <span>Management</span>
                            </div>
                        </Link>
                        <Link to='/product/import'>
                            <div className="header__nav__item">
                                <FontAwesomeIcon icon={faPen} className='icon__item' />
                                <span>Addition</span>
                            </div>
                        </Link>
                    </div>
                </div>}


                {(authorization.accountManagement || authorization.orderManagement || authorization.orderAcceptance) && <div className="header__nav__items">
                    <div className="header__nav__items__title">
                        Account
                    </div>
                    <div className="header__nav__items__content">
                        {authorization.accountManagement && <Link to='/account'>
                            <div className="header__nav__item">
                                <FontAwesomeIcon icon={faList} className='icon__item' />
                                <span>Management</span>
                            </div>
                        </Link>}
                        {(authorization.orderManagement || authorization.orderAcceptance) && <Link to='/order'>
                            <div className="header__nav__item">
                                <FontAwesomeIcon icon={faClipboard} className='icon__item' />
                                <span>Order List</span>
                            </div>
                        </Link>}
                        {authorization.orderAcceptance && <Link to='/order/list'>
                            <div className="header__nav__item">
                                <FontAwesomeIcon icon={faClipboard} className='icon__item' />
                                <span>Personal</span>
                            </div>
                        </Link>}

                    </div>
                </div>}

                {authorization.categoryManagement && <div className="header__nav__items">
                    <div className="header__nav__items__title">
                        Kind
                    </div>
                    <div className="header__nav__items__content">
                        <Link to='/category'>
                            <div className="header__nav__item">
                                <FontAwesomeIcon icon={faList} className='icon__item' />
                                <span>Category</span>
                            </div>
                        </Link>
                        <Link to='/manufacturer'>
                            <div className="header__nav__item">
                                <FontAwesomeIcon icon={faClipboard} className='icon__item' />
                                <span>Manufacturer</span>
                            </div>
                        </Link>
                    </div>
                </div>}


                {authorization.reportManagement && <div className="header__nav__items">
                    <div className="header__nav__items__title">
                        Report
                    </div>
                    <div className="header__nav__items__content">
                        <Link to="/bestseller">
                            <div className="header__nav__item">
                                <FontAwesomeIcon icon={faBell} className='icon__item' />
                                <span>Best seller</span>
                            </div>
                        </Link>
                    </div>
                </div>}
            </div>
            <div className="header__footer">
                <div className="header__footer__item" onClick={logout}>
                    <FontAwesomeIcon icon={faRightFromBracket} className='icon__logout' />
                    <span>Logout</span>
                </div>
            </div>

        </div>
    );
}

export default Header;