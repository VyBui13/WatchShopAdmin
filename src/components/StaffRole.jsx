import "../styles/role_management.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserTie, faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { useNotification } from "./NotificationContext";
import { useConfirmPrompt } from "./ConfirmPromptContext";
import { useLoading } from "./LoadingContext";

function StaffRole({ theChosenUser, setTheChosenUser, setUsers }) {
    const { setIsLoading } = useLoading();
    const { setIsConfirmPrompt, setConfirmPromptData } = useConfirmPrompt();
    const { notify } = useNotification();
    const [userInfo, setUserInfo] = useState(theChosenUser);

    function handleSubmit() {
        const fetchData = async () => {
            const loadingRef = setTimeout(() => setIsLoading(true), 500);
            try {
                const res = await fetch('http://localhost:5000/users/' + userInfo._id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
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

    return (
        <>
            <div className="staffrole-wrapper">
                <div className="staffrole">
                    <span>
                        {userInfo.userRole.toLowerCase() === 'admin' && <FontAwesomeIcon icon={faUserSecret} className="icon__staffrole" />}
                        {userInfo.userRole.toLowerCase() === 'manager' && <FontAwesomeIcon icon={faUserTie} className="icon__staffrole" />}
                        {userInfo.userRole.toLowerCase() === 'staff' && <FontAwesomeIcon icon={faUser} className="icon__staffrole" />}
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
                    </span>
                    <div className="staffrole__info">
                        <h1>
                            {userInfo.userName}
                        </h1>
                    </div>

                    <div className="staffrole__cardwrapper">
                        <input type="radio" name="role" id="roleStaff" checked={userInfo.userRole.toLowerCase() === 'staff'} />
                        <label onClick={() =>
                            setUserInfo({
                                ...userInfo,
                                userRole: 'Staff'
                            })
                        } htmlFor="roleStaff" className="staffrole__card">
                            <div className="staffrole__card__icon">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <div className="staffrole__card__title">
                                Staff
                            </div>
                            <div className="staffrole__card__description">
                                Staff can only view books, add books to cart, and checkout books.
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
                                Manager can view books, add books to cart, checkout books, and manage staff.
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
                                Admin can view books, add books to cart, checkout books, manage staff, and manage users.
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StaffRole;