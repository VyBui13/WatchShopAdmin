import './styles/sub_header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon, faBell, faUser, faGear, faBars, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthorizations } from './components/AuthorizationContext';
import { useNotification } from './components/NotificationContext';
import { useLoading } from './components/LoadingContext';
import { useNavigate } from 'react-router-dom';

function SubHeader() {
    const navigate = useNavigate();
    const { authorization } = useAuthorizations();
    const { setIsLoading } = useLoading();
    const { notify } = useNotification();
    const [isSidebar, setIsSidebar] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const lightTheme = {
        "--border-radius": "10px",
        "--main-color": "#80002a",
        "--main-scroll-color": "#3b3b3b93",
        "--background-color": "#fff",
        "--item-color": "#f2f2f2",
        "--text-color": "#000",
        "--text-in-background-color": "#fff",
    };

    const darkTheme = {
        "--border-radius": "10px",
        "--main-color": "#fff",
        "--main-scroll-color": "#88878793",
        "--background-color": "#000",
        "--item-color": "#202020",
        "--text-color": "#fff",
        "--text-in-background-color": "#000",
    };

    useEffect(() => {
        const theme = isDarkMode ? darkTheme : lightTheme;
        Object.keys(theme).forEach((key) => {
            document.documentElement.style.setProperty(key, theme[key]);
        });
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    async function logout() {
        setIsLoading(true);
        try {
            const res = await fetch('https://watch-shop-nine-beryl.vercel.app/api/user/logout', {
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
        <div className="subheader">
            <div className="subheader__nav">
                <button onClick={() => setIsSidebar(!isSidebar)}>
                    <FontAwesomeIcon icon={faBars} className='icon__nav' />
                </button>
                <div
                    style={{ left: isSidebar ? '0' : '-100%', opacity: isSidebar ? '1' : '0' }}
                    className="subheader__nav__sidebar">
                    <div className="subheader__close__btn">
                        <button onClick={() => setIsSidebar(!isSidebar)}>
                            <FontAwesomeIcon icon={faArrowLeft} className='icon__nav' />
                        </button>
                    </div>
                    <div className="subheader__nav__data">
                        <div className="subheader__nav__items">
                            <div className="subheader__nav__title">
                                Dashboard
                            </div>
                            <div className="subheader__nav__item">
                                <Link to='/'>Home</Link>
                            </div>
                        </div>

                        {authorization.productManagement && <div className="subheader__nav__items">
                            <div className="subheader__nav__title">
                                Product
                            </div>
                            <div className="subheader__nav__item">
                                <Link to='/product'>Managament</Link>
                            </div>

                            <div className="subheader__nav__item">
                                <Link to='/product/import'>Addition</Link>
                            </div>
                        </div>}

                        {(authorization.accountManagement || authorization.orderManagement || authorization.orderAcceptance) && <div className="subheader__nav__items">
                            <div className="subheader__nav__title">
                                Account
                            </div>
                            {authorization.accountManagement && <div className="subheader__nav__item">
                                <Link to='/account'>Managament</Link>
                            </div>}

                            {(authorization.orderManagement || authorization.orderAcceptance) && <div className="subheader__nav__item">
                                <Link to='/order'>Order List</Link>
                            </div>}

                            {authorization.orderAcceptance && <div className="subheader__nav__item">
                                <Link to='/order/list'>Personal</Link>
                            </div>}
                        </div>}

                        {authorization.categoryManagement && <div className="subheader__nav__items">
                            <div className="subheader__nav__title">
                                Kind
                            </div>
                            <div className="subheader__nav__item">
                                <Link to='/category'>Category</Link>
                            </div>

                            <div className="subheader__nav__item">
                                <Link to='/manufacturer'>Manufacturer</Link>
                            </div>
                        </div>}

                        {authorization.reportManagement && <div className="subheader__nav__items">
                            <div className="subheader__nav__title">
                                Report
                            </div>
                            <div className="subheader__nav__item">
                                <Link to='/bestseller'>Best seller</Link>
                            </div>
                        </div>}

                        <div className="subheader__nav__items">
                            <div className="subheader__nav__title">
                                Exit
                            </div>
                            <div className="subheader__nav__item" onClick={logout}>
                                Logout
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="subheader__title">
                <span>Dashboard</span>
            </div>
            <div className="subheader__features">
                <div onClick={toggleTheme} className="subheader__feature">
                    <FontAwesomeIcon icon={faSun} className='icon__feature' />
                </div>
                <div className="subheader__feature">
                    <FontAwesomeIcon icon={faBell} className='icon__feature' />
                </div>
                <div className="subheader__feature">
                    <Link to='/admin'>
                        <FontAwesomeIcon icon={faGear} className='icon__feature' />
                    </Link>
                </div>
                <div className="subheader__feature">
                    <Link to='/user'>
                        <FontAwesomeIcon icon={faUser} className='icon__feature' />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SubHeader;