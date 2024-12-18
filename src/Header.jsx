import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faList, faRightFromBracket, faClock, faPen, faFilter, faClipboard, faBell } from '@fortawesome/free-solid-svg-icons'
import './styles/header.css'

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
                    <div className="header__nav__items__content">
                        <div className="header__nav__item">
                            <FontAwesomeIcon icon={faHome} className='icon__item' />
                            <span>Home</span>
                        </div>
                    </div>
                </div>

                <div className="header__nav__items">
                    <div className="header__nav__items__title">
                        Product
                    </div>
                    <div className="header__nav__items__content">
                        <div className="header__nav__item">
                            <FontAwesomeIcon icon={faList} className='icon__item' />
                            <span>Management</span>
                        </div>
                        <div className="header__nav__item">
                            <FontAwesomeIcon icon={faPen} className='icon__item' />
                            <span>Creation</span>
                        </div>
                    </div>
                </div>


                <div className="header__nav__items">
                    <div className="header__nav__items__title">
                        Account
                    </div>
                    <div className="header__nav__items__content">
                        <div className="header__nav__item">
                            <FontAwesomeIcon icon={faList} className='icon__item' />
                            <span>Management</span>
                        </div>
                        <div className="header__nav__item">
                            <FontAwesomeIcon icon={faFilter} className='icon__item' />
                            <span>Blacklist</span>
                        </div>
                        <div className="header__nav__item">
                            <FontAwesomeIcon icon={faClipboard} className='icon__item' />
                            <span>Order</span>
                        </div>
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