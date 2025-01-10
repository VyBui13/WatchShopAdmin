import { useState } from "react";
import "../styles/account_form.css";
import { useNotification } from "./NotificationContext";
import { useLoading } from "./LoadingContext";
import { useConfirmPrompt } from './ConfirmPromptContext'

function AccountForm({ setIsForm, setUsers }) {
    const { setIsLoading } = useLoading();
    const { setIsConfirmPrompt, setConfirmPromptData } = useConfirmPrompt();
    const { notify } = useNotification();
    const [staff, setStaff] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
        role: "",
        dateOfBirth: "",
    });

    function handleCancel() {
        setIsForm(false);
    }

    function handleAdd() {
        const fetchData = async () => {
            const loadingRef = setTimeout(() => setIsLoading(true), 500);
            try {
                const response = await fetch('http://localhost:5000/api/user/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(staff),
                });
                const data = await response.json();
                if (data.status !== 'success') {
                    notify({ type: data.status, msg: data.message });
                    setIsForm(false);
                    return;
                }
                const responseUsers = await fetch('http://localhost:5000/api/user');
                const dataUsers = await responseUsers.json();
                if (dataUsers.status !== 'success') {
                    console.log(dataUsers.message);
                    return;
                }
                notify({ type: data.status, msg: data.message });
                setUsers(dataUsers.data)
                setIsForm(false);
            } catch (error) {
                console.log(error);
            }
            finally {
                clearTimeout(loadingRef);
                setIsLoading(false);
            }
        }
        fetchData();
    }

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setStaff((prevStaff) => ({
    //         ...prevStaff,
    //         [name]: value,
    //     }));
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(staff);
    // };

    return (
        <>
            <div className="accountform-container">
                <div class="accountform">
                    <form action="#">
                        <div class="accountform__userdetail">
                            <div class="accountform__inputbox">
                                <span class="accountform__detail">Name</span>
                                <input
                                    value={staff.name}
                                    onChange={(e) => setStaff({ ...staff, name: e.target.value })}
                                    type="text" required />
                                <div class="accountform__labelline">Enter staff name</div>
                            </div>

                            <div class="accountform__inputbox">
                                <span class="accountform__detail">Phone</span>
                                <input
                                    value={staff.phone}
                                    onChange={(e) => setStaff({ ...staff, phone: e.target.value })}
                                    type="text" required />
                                <div class="accountform__labelline">Enter staff phone</div>
                            </div>

                            <div class="accountform__inputbox">
                                <span class="accountform__detail">Email</span>
                                <input
                                    value={staff.email}
                                    onChange={(e) => setStaff({ ...staff, email: e.target.value })}
                                    type="text" required />
                                <div class="accountform__labelline">Enter staff email</div>
                            </div>

                            <div class="accountform__inputbox">
                                <span class="accountform__detail">Address</span>
                                <input
                                    value={staff.address}
                                    onChange={(e) => setStaff({ ...staff, address: e.target.value })}
                                    type="text" required />
                                <div class="accountform__labelline">Enter staff address</div>
                            </div>

                            <div class="accountform__inputbox">
                                <span class="accountform__detail">Role</span>
                                <select
                                    value={staff.role}
                                    onChange={(e) => setStaff({ ...staff, role: e.target.value })}
                                    required
                                >
                                    <option value="" disabled>SELECT ROLE</option>
                                    <option value="Manager">MANAGER</option>
                                    <option value="Admin">ADMIN</option>
                                    <option value="Shipper">Shipper</option>
                                </select>
                            </div>

                            <div class="accountform__inputbox">
                                <span class="accountform__detail">Date of birth</span>
                                <input
                                    type="date"
                                    required />
                            </div>
                        </div>
                    </form>

                    <div class="accountform__button">
                        <button onClick={handleCancel}>Cancel</button>
                        <button onClick={() => {
                            setConfirmPromptData({
                                message: `Add account`,
                                action: 'Add',
                                onConfirm: handleAdd
                            });
                            setIsConfirmPrompt(true);
                        }}>Add</button>
                    </div>

                </div>
            </div>

        </>
    );
}

export default AccountForm;