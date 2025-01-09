import "../styles/user.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPencil, faCheck } from '@fortawesome/free-solid-svg-icons'
import Calendar from "../components/Calendar";
import { useAuthorizations } from "../components/AuthorizationContext";
import { useState } from "react";
import { useNotification } from "../components/NotificationContext"
import { getDate } from "../utils/DateConverter";
import { useLoading } from "../components/LoadingContext";

function User() {
    const { notify } = useNotification();
    const { user, setUser } = useAuthorizations();
    const { setIsLoading } = useLoading();

    const [isEditableName, setIsEditableName] = useState(false);
    const [isEditableEmail, setIsEditableEmail] = useState(false);
    const [isEditablePhone, setIsEditablePhone] = useState(false);
    const [isEditableAddress, setIsEditableAddress] = useState(false);
    const [isEditableDateOfBirth, setIsEditableDateOfBirth] = useState(false);

    function formatDate(dateString) {
        // 09/04/2004
        const day = dateString.slice(0, 2);
        const month = dateString.slice(3, 5);
        const year = dateString.slice(6, 10);
        return `${year}-${month}-${day}`;
    }

    function formatDateToDisplay(dateString) {
        // 2004-09-04
        const day = dateString.slice(8, 10);
        const month = dateString.slice(5, 7);
        const year = dateString.slice(0, 4);
        return `${day}/${month}/${year}`;
    }

    function handleSaveInfo(type, data, setFunction) {
        const url = `http://localhost:5000/api/user/edit?type=${type}&data=${data}`;
        const fetchData = async () => {
            const loadingRef = setTimeout(() => { setIsLoading(true) }, 500);
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: user._id }),
                });

                const data = await response.json();
                notify({ type: data.status, msg: data.message });
                setFunction(false);
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
            <div className="user">
                <div className="user__left">
                    <div className="user__general">
                        <div className="user__general__header">
                            <h3>Your profile</h3>
                            <p>Join {getDate(new Date(user.userCreatedDateTime))}</p>
                        </div>
                        <div className="user__general__avatar">
                            <div className="user__general__avatar__wrapper">
                                <FontAwesomeIcon icon={faUser} className="icon__user" />
                            </div>
                        </div>

                        <div className="user__general__body">
                            <div className="user__general__name">
                                <input
                                    style={{ transform: isEditableName ? "scale(1.05)" : "scale(1)" }}
                                    value={user.userName}
                                    onChange={(e) => setUser({ ...user, userName: e.target.value })}
                                    type="text" disabled={!isEditableName} />
                                {!isEditableName && <button onClick={() => setIsEditableName(true)}>
                                    <FontAwesomeIcon icon={faPencil} className="icon__edit" />
                                    Edit
                                </button>}
                                {isEditableName && <button onClick={() => handleSaveInfo('userName', user.userName, setIsEditableName)}>
                                    <FontAwesomeIcon icon={faCheck} className="icon__edit" />
                                    Done
                                </button>}
                            </div>
                            <div className="user__general__role">
                                <p>Role:
                                    <span>{user.userRole}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="user__detail">
                        <div className="user__detail__item">
                            <div className="user__detail__item__title">
                                <h3>Email</h3>
                            </div>
                            <div className="user__detail__item__content">
                                <div className="user__detail__info">
                                    <input
                                        style={{ transform: isEditableEmail ? "scale(1.05)" : "scale(1)" }}
                                        value={user.userEmail}
                                        onChange={(e) => setUser({ ...user, userEmail: e.target.value })}
                                        type="text" disabled={!isEditableEmail} />
                                    {!isEditableEmail && <button onClick={() => setIsEditableEmail(true)}>
                                        <FontAwesomeIcon icon={faPencil} className="icon__edit" />
                                    </button>}

                                    {isEditableEmail && <button onClick={() => handleSaveInfo('userEmail', user.userEmail, setIsEditableEmail)}>
                                        <FontAwesomeIcon icon={faCheck} className="icon__edit" />
                                    </button>}
                                </div>
                            </div>

                        </div>

                        <div className="user__detail__item">
                            <div className="user__detail__item__title">
                                <h3>Phone</h3>
                            </div>
                            <div className="user__detail__item__content">

                                <div className="user__detail__info">

                                    <input
                                        style={{ transform: isEditablePhone ? "scale(1.05)" : "scale(1)" }}
                                        value={user.userPhone}
                                        onChange={(e) => setUser({ ...user, userPhone: e.target.value.trim() })}
                                        type="text" disabled={!isEditablePhone} />
                                    {!isEditablePhone && <button onClick={() => setIsEditablePhone(true)}>
                                        <FontAwesomeIcon icon={faPencil} className="icon__edit" />
                                    </button>}

                                    {isEditablePhone && <button onClick={() => handleSaveInfo('userPhone', user.userPhone, setIsEditablePhone)}>
                                        <FontAwesomeIcon icon={faCheck} className="icon__edit" />
                                    </button>}
                                    {/* <p>{user.userPhone}</p>
                                    <button>
                                        <FontAwesomeIcon icon={faPencil} className="icon__edit" />
                                    </button> */}
                                </div>
                            </div>
                        </div>

                        <div className="user__detail__item">
                            <div className="user__detail__item__title">
                                <h3>Address</h3>
                            </div>
                            <div className="user__detail__item__content">

                                <div className="user__detail__info">
                                    <input
                                        style={{ transform: isEditableAddress ? "scale(1.05)" : "scale(1)" }}
                                        value={user.userAddress}
                                        onChange={(e) => setUser({ ...user, userAddress: e.target.value })}
                                        type="text" disabled={!isEditableAddress} />
                                    {!isEditableAddress && <button onClick={() => setIsEditableAddress(true)}>
                                        <FontAwesomeIcon icon={faPencil} className="icon__edit" />
                                    </button>}

                                    {isEditableAddress && <button onClick={() => handleSaveInfo('userAddress', user.userAddress, setIsEditableAddress)}>
                                        <FontAwesomeIcon icon={faCheck} className="icon__edit" />
                                    </button>}
                                    {/* <p>{user.userAddress}</p>
                                    <button>
                                        <FontAwesomeIcon icon={faPencil} className="icon__edit" />
                                    </button> */}
                                </div>
                            </div>
                        </div>

                        <div className="user__detail__item">
                            <div className="user__detail__item__title">
                                <h3>Date of birth</h3>
                            </div>
                            <div className="user__detail__item__content">

                                <div className="user__detail__info">
                                    <input
                                        value={formatDate(user.userDateOfBirth)}
                                        onChange={(e) => setUser({ ...user, userDateOfBirth: formatDateToDisplay(e.target.value) })}
                                        type="date" disabled={!isEditableDateOfBirth}
                                        name="input__date" id="input__date" />

                                    {!isEditableDateOfBirth && <button onClick={() => setIsEditableDateOfBirth(true)}>
                                        <FontAwesomeIcon icon={faPencil} className="icon__edit" />
                                    </button>}

                                    {isEditableDateOfBirth && <button onClick={() => handleSaveInfo('userDateOfBirth', user.userDateOfBirth, setIsEditableDateOfBirth)}>
                                        <FontAwesomeIcon icon={faCheck} className="icon__edit" />
                                    </button>}
                                    {/* <p>{user.userAddress}</p>
                                    <button>
                                        <FontAwesomeIcon icon={faPencil} className="icon__edit" />
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="user__right">
                    <div className="user__activity">
                        <Calendar />
                    </div>

                    <div className="user__option">

                        <div className="user__option__btn">
                            <button>Change password</button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default User;