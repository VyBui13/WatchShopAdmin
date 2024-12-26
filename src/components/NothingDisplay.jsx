import '../styles/nothing_display.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCubes } from '@fortawesome/free-solid-svg-icons'

function NothingDisplay({ desciption = "It seems like there's nothing to display right now." }) {
    return (
        <div className="nothing__display">
            <div className="nothing__display__header">
                <h2>Hi!</h2>
                <div className="nothing__display__icon">

                    <FontAwesomeIcon icon={faCubes} className="icon__nodisplay" />
                </div>
            </div>

            <div className="nothing__display__body">
                <p>{desciption}</p>
            </div>

        </div>
    );
}

export default NothingDisplay;