import './styles/sub_header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon, faBell, faUser, faGear } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SubHeader() {
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

    return (
        <div className="subheader">
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