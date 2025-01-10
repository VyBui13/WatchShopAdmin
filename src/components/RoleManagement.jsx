import "../styles/role_management.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserTie, faUserSecret, faX } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { useNotification } from "./NotificationContext";
import { useConfirmPrompt } from "./ConfirmPromptContext";
import { useLoading } from "./LoadingContext";

function RoleManagement({ theChosenUser, setTheChosenUser, setUsers }) {
    const { setIsLoading } = useLoading();
    const { setIsConfirmPrompt, setConfirmPromptData } = useConfirmPrompt();
    const { notify } = useNotification();
    const [userInfo, setUserInfo] = useState(theChosenUser);

    function handleSubmit() {
        const fetchData = async () => {
            const loadingRef = setTimeout(() => setIsLoading(true), 500);
            try {
                const res = await fetch('http://localhost:5000/api/user/' + userInfo._id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        type: 'role',
                        data: userInfo.userRole,
                    })
                });

                const data = await res.json();

                if (data.status === 'success') {
                    setUsers((prev) => prev.map(user => user._id === userInfo._id ? userInfo : {
                        ...user
                    }))
                    setTheChosenUser({});
                }
                notify({ type: data.status, msg: data.message });

            } catch (error) {
                console.log(error);
            } finally {
                clearTimeout(loadingRef);
                setIsLoading(false);
            }
        }
        fetchData();
    }

    function handleCancel() {
        setTheChosenUser({});
    }

    return (
        <>
            <div className="staffrole-wrapper">
                <div className="staffrole">
                    <div className="staffrole__button__submit">
                        {userInfo.userRole.toLowerCase() === 'admin' && <FontAwesomeIcon icon={faUserSecret} className="icon__staffrole" />}
                        {userInfo.userRole.toLowerCase() === 'manager' && <FontAwesomeIcon icon={faUserTie} className="icon__staffrole" />}
                        {userInfo.userRole.toLowerCase() === 'shipper' && <FontAwesomeIcon icon={faUser} className="icon__staffrole" />}
                        <button onClick={() => {
                            setConfirmPromptData({
                                message: 'Are you sure you want to change this user role?',
                                action: 'Change',
                                onConfirm: handleSubmit
                            })
                            setIsConfirmPrompt(true);
                        }}>
                            Submit
                        </button>
                    </div>

                    <div className="staffrole__button__cancel">
                        <button onClick={handleCancel}>
                            <FontAwesomeIcon icon={faX} className="icon__staffrole" />
                        </button>
                    </div>
                    <div className="staffrole__info">
                        <h1>
                            {userInfo.userName}
                        </h1>
                    </div>

                    <div className="staffrole__cardwrapper">
                        <input type="radio" name="role" id="roleStaff" checked={userInfo.userRole.toLowerCase() === 'shipper'} />
                        <label onClick={() =>
                            setUserInfo({
                                ...userInfo,
                                userRole: 'Shipper'
                            })
                        } htmlFor="roleStaff" className="staffrole__card">
                            <div className="staffrole__card__icon">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <div className="staffrole__card__title">
                                Shipper
                            </div>
                            <div className="staffrole__card__description">
                                Shipper can only get order and deliver them to customers.
                            </div>
                        </label>

                        <input type="radio" name="role" id="roleManager" checked={userInfo.userRole.toLowerCase() === 'manager'} />
                        <label onClick={() =>
                            setUserInfo({
                                ...userInfo,
                                userRole: 'Manager'
                            })
                        } htmlFor="roleManager" className="staffrole__card">
                            <div className="staffrole__card__icon">
                                <FontAwesomeIcon icon={faUserTie} />
                            </div>
                            <div className="staffrole__card__title">
                                Manager
                            </div>
                            <div className="staffrole__card__description">
                                Manager can manage product, category, manufacturer, ... but can't manage shipper account.
                            </div>
                        </label>

                        <input type="radio" name="role" id="roleAdmin" checked={userInfo.userRole.toLowerCase() === 'admin'} />
                        <label onClick={() =>
                            setUserInfo({
                                ...userInfo,
                                userRole: 'Admin'
                            })
                        } htmlFor="roleAdmin" className="staffrole__card">
                            <div className="staffrole__card__icon">
                                <FontAwesomeIcon icon={faUserSecret} />
                            </div>
                            <div className="staffrole__card__title">
                                Admin
                            </div>
                            <div className="staffrole__card__description">
                                Admin can do all things, it means admin is King.
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RoleManagement;