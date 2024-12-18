import './styles/sub_header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon, faBell, faUser, faGear } from '@fortawesome/free-solid-svg-icons'

function SubHeader() {
    return (
        <div className="subheader">
            <div className="subheader__title">
                <span>Dashboard</span>
            </div>
            <div className="subheader__features">
                <div className="subheader__feature">
                    <FontAwesomeIcon icon={faSun} className='icon__feature' />
                </div>
                <div className="subheader__feature">
                    <FontAwesomeIcon icon={faBell} className='icon__feature' />
                </div>
                <div className="subheader__feature">
                    <FontAwesomeIcon icon={faGear} className='icon__feature' />
                </div>
                <div className="subheader__feature">
                    <FontAwesomeIcon icon={faUser} className='icon__feature' />
                </div>
            </div>
        </div>
    );
}

export default SubHeader;