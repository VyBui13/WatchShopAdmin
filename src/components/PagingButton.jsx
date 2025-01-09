import '../styles/paging_button.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function PagingButton({ decreasePage, increasePage, currentPage, numberPage }) {
    return (
        <div className="paging__button">
            <button onClick={decreasePage}>
                <FontAwesomeIcon icon={faArrowLeft} className="icon__paging" />
            </button>
            <span>{currentPage}</span>|
            <span>{numberPage}</span>
            <button onClick={increasePage}>
                <FontAwesomeIcon icon={faArrowRight} className="icon__paging" />
            </button>
        </div>
    );
}

export default PagingButton;