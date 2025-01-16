import '../styles/account_detail.css'
import { getDateTime } from '../utils/DateConverter'
import { useState } from 'react'
import { useNotification } from './NotificationContext';
import { useConfirmPrompt } from './ConfirmPromptContext'
import { useLoading } from './LoadingContext'

function AccountDetail({ theChosenAccount, setTheChosenAccount, customer, setCustomer }) {
    const { notify } = useNotification();
    const { setIsLoading } = useLoading();
    const { setIsConfirmPrompt, setConfirmPromptData } = useConfirmPrompt();

    const [account, setAccount] = useState(theChosenAccount);

    async function handleSave() {
        if (account.customerAccountStatus === theChosenAccount.customerAccountStatus) {
            notify({ type: 'warning', msg: 'No changes to save' });
            setTheChosenAccount(null);
            return;
        }
        const loadingRef = setTimeout(() => setIsLoading(true), 500);
        try {
            const res = await fetch(`https://watch-shop-nine-beryl.vercel.app/api/customer/${account._id}`, {
                method: 'PUT',
            });
            const data = await res.json();
            notify({ type: data.status, msg: data.message });
            if (data.status !== 'success') {
                console.log('Error deleting data');
                return;
            }
            const newArray = customer.map(item => {
                if (item._id === account._id) {
                    item.customerAccountStatus = account.customerAccountStatus;
                }
                return item;
            });
            setCustomer(newArray);
            setTheChosenAccount(null);
            console.log('Data updated');

        } catch (error) {
            console.log(error);
        } finally {
            clearTimeout(loadingRef);
            setIsLoading(false);
        }

    }

    function handleChangeStatus() {
        if (account.customerAccountStatus.toLowerCase() === 'active') {
            setAccount({ ...account, customerAccountStatus: 'INACTIVE' })
        } else {
            setAccount({ ...account, customerAccountStatus: 'ACTIVE' })
        }
    }

    function handleClose() {
        setTheChosenAccount(null)
    }

    return (
        <>
            <div className="accountdetail-wrapper">
                <div className="accountdetail">
                    <div className="accountdetail__data">
                        <div className="accountdetail__left">
                            <div className="accountdetail__left__avatar">
                                <img src={account.customerAvatar} alt="avatar" />
                            </div>
                            <div className="accountdetail__left__general">
                                <h3>{account.customerName}</h3>
                                <p>{account.customerEmail}</p>
                            </div>
                        </div>

                        <div className="accountdetail__right">
                            <div className="accountdetail__item">
                                <div className="accountdetail__field">
                                    Register Date:
                                </div>
                                <span>{getDateTime(new Date(account.customerRegisterDateTime))}</span>
                            </div>

                            <div className="accountdetail__item">
                                <div className="accountdetail__field">
                                    Cart Quantity:
                                </div>
                                <span>{account.customerCart.length}</span>
                            </div>

                            <div className="accountdetail__item">
                                <div className="accountdetail__field">
                                    Account Status:
                                </div>
                                <button onClick={handleChangeStatus}>{account.customerAccountStatus}</button>
                            </div>
                        </div>
                    </div>

                    <div className="accountdetail__footer">
                        <button onClick={handleClose}>Close</button>
                        <button onClick={() => {
                            setConfirmPromptData({
                                message: `Update account status`,
                                action: 'Update',
                                onConfirm: handleSave
                            });
                            setIsConfirmPrompt(true);
                        }}>Save</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountDetail