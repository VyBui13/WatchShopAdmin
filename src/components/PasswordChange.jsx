import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import '../styles/password_change.css'
import { useNotification } from './NotificationContext';
import { useLoading } from './LoadingContext';
import { useConfirmPrompt } from './ConfirmPromptContext';
import { useNavigate } from 'react-router-dom'

function PasswordChange({ setIsChangePassword }) {
    const navigate = useNavigate();
    const { notify } = useNotification();
    const { setIsLoading } = useLoading();
    const { setIsConfirmPrompt, setConfirmPromptData } = useConfirmPrompt();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    function handleCancel() {
        setIsChangePassword(false);
    }

    async function handleChangePassword() {
        if (oldPassword === '' || newPassword === '') {
            notify({ type: 'error', msg: 'Please fill in all fields' });
            return;
        }
        if (oldPassword === newPassword) {
            notify({ type: 'error', msg: 'New password must be different from old password' });
            return;
        }

        setIsLoading(true);
        try {

            const response = await fetch('https://watch-shop-nine-beryl.vercel.app/api/user/password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    oldPassword,
                    newPassword
                })
            });

            const data = await response.json();
            notify({ type: data.status, msg: data.message });
            if (data.status === 'error') {
                return;
            }

            const res1 = await fetch('https://watch-shop-nine-beryl.vercel.app/api/user/logout', {
                method: 'GET',
                header: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const data1 = await res1.json();
            if (data.status !== 'success') {
                console.log(data1.message);
                return
            }

            navigate('/login');

        } catch (error) {
            notify({ type: 'error', msg: error.message });
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <div className="password-wrapper">

            <div className="password">
                <div className="password__header">
                    <h1>Change Password</h1>
                </div>
                <div className="password__form">
                    <div className="password__form__input">
                        <div className="password__form__input__icon">
                            <FontAwesomeIcon icon={faLock} />
                        </div>
                        <input
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            type="text"
                            placeholder="Old Password"
                        />
                    </div>

                    <div className="password__form__input">
                        <div className="password__form__input__icon">
                            <FontAwesomeIcon icon={faLockOpen} />
                        </div>
                        <input
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            type="text"
                            placeholder='New Password'
                        />
                    </div>
                </div>

                <div className="password__button">
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={() => {
                        setConfirmPromptData({
                            message: `Change password`,
                            action: 'Change',
                            onConfirm: handleChangePassword
                        });
                        setIsConfirmPrompt(true);
                    }}>Change</button>
                </div>
            </div>
        </div>
    )
}

export default PasswordChange