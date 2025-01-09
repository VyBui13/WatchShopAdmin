import "../styles/card.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faQrcode, faCreditCard, faInfinity, faCompactDisc, faUser, faUserGear } from '@fortawesome/free-solid-svg-icons'
import html2canvas from 'html2canvas';
import { useRef } from 'react';

function Card({ theChosenUserCard, setTheChosenUserCard }) {
    const captureFrontRef = useRef(null);
    const captureBackRef = useRef(null);

    async function handleCapture() {
        try {
            if (captureFrontRef.current) {
                const frontCanvas = await html2canvas(captureFrontRef.current);
                const frontImage = frontCanvas.toDataURL('image/png');
                downloadImage(frontImage, 'card-front.png');
            }

            if (captureBackRef.current) {
                captureBackRef.current.style.transform = 'unset';
                const backCanvas = await html2canvas(captureBackRef.current);
                const backImage = backCanvas.toDataURL('image/png');
                downloadImage(backImage, 'card-back.png');
                captureBackRef.current.style.transform = 'rotateY(180deg)';
            }
        } catch (error) {
            console.log('Error capturing card:', error);
        }
    }

    function downloadImage(dataUrl, fileName) {
        const anchor = document.createElement('a');
        anchor.href = dataUrl;
        anchor.download = fileName;
        anchor.click();
    }

    return (
        <>
            <div className="card-wrapper">
                <div className="card card--firstperson">
                    <input type="checkbox" id="btn-flip" />
                    <div className="card__container">
                        <div ref={captureFrontRef} className="card__side card__frontside">
                            <div className="card__header">
                                <div className="card__text-header">PERSONAL CARD</div>

                                <FontAwesomeIcon icon={faStar} className="icaon__card__header" />
                                <FontAwesomeIcon icon={faStar} className="icon__card__header" />
                                <FontAwesomeIcon icon={faStar} className="icon__card__header" />
                            </div>

                            <label htmlFor="btn-flip" className="card__QR">
                                <FontAwesomeIcon icon={faQrcode} />
                            </label>

                            <div onClick={() => {
                                setTheChosenUserCard({});
                            }} className="card__picture-container">
                                <div className="card__picture">
                                    <FontAwesomeIcon icon={faUser} className="icon__card__picture" />
                                    {/* <FontAwesomeIcon icon={faPerson} className="icon__card__picture" /> */}
                                </div>
                            </div>

                            <div className="card__title">
                                Personal Identity Card
                                <FontAwesomeIcon icon={faCreditCard} className="card__icon-title" />

                            </div>

                            <div className="card__information">
                                <ul className="card__content">
                                    <li className="card__content-item special">
                                        <div className="card__content-header">No:</div>
                                        <ul className="card__content-body card__id">
                                            <li className="card__id-item">{theChosenUserCard.userDateOfBirth[0]}</li>
                                            <li className="card__id-item">{theChosenUserCard.userDateOfBirth[1]}</li>
                                            <li className="card__id-item">{theChosenUserCard.userDateOfBirth[3]}</li>
                                            <li className="card__id-item">{theChosenUserCard.userDateOfBirth[4]}</li>
                                            <li className="card__id-item">{theChosenUserCard.userDateOfBirth[6]}</li>
                                            <li className="card__id-item">{theChosenUserCard.userDateOfBirth[7]}</li>
                                            <li className="card__id-item">{theChosenUserCard.userDateOfBirth[8]}</li>
                                            <li className="card__id-item">{theChosenUserCard.userDateOfBirth[9]}</li>
                                        </ul>
                                    </li>
                                    <li className="card__content-item">
                                        <div className="card__content-header">Fullname: </div>
                                        <div className="card__content-body">{theChosenUserCard.userName}</div>
                                    </li>
                                    <li className="card__content-item">
                                        <div className="card__content-header">Phone: </div>
                                        <div className="card__content-body">{theChosenUserCard.userPhone}</div>
                                    </li>
                                    <li className="card__content-item">
                                        <div className="card__content-header">Place: </div>
                                        <div className="card__content-body">{theChosenUserCard.userAddress}</div>
                                    </li>
                                </ul>
                            </div>

                            <div className="card__footer">
                                <div className="card__content-header">{theChosenUserCard.userName}'s role: </div>
                                <div className="card__content-body">{theChosenUserCard.userRole}</div>
                            </div>

                            <div className="card__expiry">
                                Date expiry:
                                <FontAwesomeIcon icon={faInfinity} className="icon-card-expiry" />
                            </div>

                            <button onClick={handleCapture} className="card__disc">
                                <FontAwesomeIcon icon={faCompactDisc} />
                            </button>

                        </div>
                        <div ref={captureBackRef} className="card__side card__backside">
                            <div className="card__header">
                                <div className="card__text-header">PERSONAL CARD</div>
                                <FontAwesomeIcon icon={faStar} className="icon__card__header" />
                                <FontAwesomeIcon icon={faStar} className="icon__card__header" />
                                <FontAwesomeIcon icon={faStar} className="icon__card__header" />
                            </div>

                            <label htmlFor="btn-flip" className="card__QR">
                                <FontAwesomeIcon icon={faQrcode} />
                            </label>

                            <div className="card__title-social">
                                <div className="card__text-title-social">Staff Card</div>
                            </div>


                            <div className="card__social">

                                <div className="card__social-preview">
                                    <FontAwesomeIcon icon={faUser} />

                                </div>

                                <span>
                                    Hi <span>
                                        {theChosenUserCard.userName}
                                    </span>
                                    , your role as
                                    <span>
                                        {theChosenUserCard.userRole}
                                    </span>
                                    is vital to our success. We're excited to have you on the team!
                                </span>
                            </div>


                            {/* <div className="card__information-social">
                                <ul className="card__social">
                                    <li className="card__social-item">
                                        <div className="card__social-icon">
                                            <i className="fa-brands fa-facebook"></i> :
                                        </div>
                                        <div className="card__social-link">
                                            <a href="" target="_blank">Vy Bui</a>
                                        </div>
                                    </li>
                                    <li className="card__social-item">
                                        <div className="card__social-icon">
                                            <i className="fa-brands fa-instagram"></i> :
                                        </div>
                                        <div className="card__social-link">
                                            <a href="" target="_blank">Lilyofthevalley</a>
                                        </div>
                                    </li>
                                    <li className="card__social-item">
                                        <div className="card__social-icon">
                                            <i className="fa-brands fa-github"></i> :
                                        </div>
                                        <div className="card__social-link">
                                            <a href="" target="_blank">VyBui13</a>
                                        </div>
                                    </li>
                                    <li className="card__social-item">
                                        <div className="card__social-icon">
                                            <i className="fa-brands fa-youtube"></i> :
                                        </div>
                                        <div className="card__social-link">
                                            <a href="" target="_blank">None</a>
                                        </div>
                                    </li>
                                </ul>
                            </div> */}

                            <div className="card__line"></div>


                            <div className="card__disc">
                                <FontAwesomeIcon icon={faCompactDisc} />
                                {/* <i className="fa-solid fa-compact-disc"></i> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Card;