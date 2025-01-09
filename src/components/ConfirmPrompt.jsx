import "../styles/ConfirmPrompt.css";
import { useConfirmPrompt } from "./ConfirmPromptContext";

function Prompt({ message, action, onConfirm, onCancel }) {
    return (
        <div className="confirmprompt-layout">
            <div className="confirmprompt">
                <div className="confirmprompt__header">
                    <h3>Hang On A Second!</h3>
                    <p>{message}</p>
                </div>
                <div className="confirmprompt__body">
                    <p>Before doing something, make sure everything is exactly as you want it.</p>
                    <div className="confirmprompt__body-actions">
                        <button onClick={onCancel}>Cancel</button>
                        <button onClick={async () => {
                            await onConfirm();
                            await onCancel();
                            // setInterval(() => {
                            //     window.location.reload();
                            // }, 3000);
                        }}>{action}</button>
                    </div>
                </div>
            </div>
        </div>)
}

function ConfirmPrompt({ message, action, onConfirm, onCancel }) {
    const { isConfirmPrompt, setIsConfirmPrompt, confirmPromptData } = useConfirmPrompt();
    return (
        <>
            <div className="div">
                {isConfirmPrompt && <Prompt message={confirmPromptData.message} action={confirmPromptData.action} onConfirm={confirmPromptData.onConfirm} onCancel={() => setIsConfirmPrompt(false)} />}
            </div>
        </>
    );
}

export default ConfirmPrompt;