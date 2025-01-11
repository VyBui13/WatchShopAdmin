import { useState } from 'react';
import '../styles/status_management.css';

function StatusManagement({ orderDetail, setOrderDetail, setIsStatusManagement }) {
    function handleSave(status) {
        setOrderDetail({
            ...orderDetail,
            orderStatus: status
        });
        setIsStatusManagement(false);
    }

    return (
        <>
            <div className="statusmanagement-wrapper">
                <div className="statusmanagement">
                    <div className="statusmanagement__item">
                        <button onClick={() => handleSave("Processing")}>Processing</button>
                    </div>
                    <div className="statusmanagement__item">
                        <button onClick={() => handleSave("Pending")}>Pending</button>
                    </div>
                    <div className="statusmanagement__item">
                        <button onClick={() => handleSave("Delivered")}>Delivered</button>
                    </div>
                    <div className="statusmanagement__item">
                        <button onClick={() => handleSave("Completed")}>Completed</button>
                    </div>
                    <div className="statusmanagement__item">
                        <button onClick={() => handleSave("Cancelled")}>Cancelled</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StatusManagement;