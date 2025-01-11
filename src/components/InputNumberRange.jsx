import { useState } from 'react';
import '../styles/input_number_range.css';
import { useNotification } from './NotificationContext';

function InputNumberRange({ label, min, max, value, setValue, date, setDate, step }) {
    const { notify } = useNotification();
    const [valueInput, setValueInput] = useState(value);
    function handleSave() {
        if (valueInput < min || valueInput > max) {
            notify({ type: 'error', msg: 'Invalid value' });
            return;
        }
        setDate(
            {
                ...date,
                [label.charAt(0).toLowerCase() + label.slice(1)]: Number(valueInput)
            }
        );
        setValue(null);
    }

    function handleCancel() {
        setValue(null);
    }

    return (
        <div className="virtual-background">
            <div className="range-container">
                <div className="input__title">
                    {label}
                </div>
                <div className="range">
                    <input type="number"
                        value={valueInput}
                        onChange={(e) => {
                            setValueInput(e.target.value);
                        }}
                    />
                    <div className="range__field">
                        <div className="range__field__value">
                            {
                                min
                            }
                        </div>
                        <div className="range__value">
                            <span
                                style={{ left: `${(valueInput - min) / ((max - min) / step + 1) * 100}%` }}
                            >{
                                    valueInput
                                }</span>
                            <input
                                value={valueInput}
                                onChange={(e) => setValueInput(e.target.value)}
                                type="range"
                                min={Number(min)}
                                max={Number(max)}
                                step={step} />
                        </div>
                        <div className="range__field__value">
                            {
                                max
                            }
                        </div>
                    </div>
                </div>

                <div className="input__button">
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default InputNumberRange;