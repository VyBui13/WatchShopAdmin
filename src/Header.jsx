import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faList, faRightFromBracket, faClock, faPen, faFilter, faClipboard, faBell } from '@fortawesome/free-solid-svg-icons'
import './styles/header.css'
import { Link } from 'react-router-dom'

function Header() {
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

                <div className="header__nav__items">
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
                                <span>Creation</span>
                            </div>
                        </Link>
                    </div>
                </div>


                <div className="header__nav__items">
                    <div className="header__nav__items__title">
                        Account
                    </div>
                    <div className="header__nav__items__content">
                        <Link to='/account'>
                            <div className="header__nav__item">
                                <FontAwesomeIcon icon={faList} className='icon__item' />
                                <span>Management</span>
                            </div>
                        </Link>
                        <Link to='/order'>
                            <div className="header__nav__item">
                                <FontAwesomeIcon icon={faClipboard} className='icon__item' />
                                <span>Order</span>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="header__nav__items">
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
                </div>


                <div className="header__nav__items">
                    <div className="header__nav__items__title">
                        Report
                    </div>
                    <div className="header__nav__items__content">
                        <div className="header__nav__item">
                            <FontAwesomeIcon icon={faBell} className='icon__item' />
                            <span>Best seller</span>
                        </div>
                        <div className="header__nav__item">
                            <FontAwesomeIcon icon={faBell} className='icon__item' />
                            <span>Account</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header__footer">
                <div className="header__footer__item">
                    <FontAwesomeIcon icon={faRightFromBracket} className='icon__logout' />
                    <span>Logout</span>
                </div>
            </div>

        </div>
    );
}

export default Header;