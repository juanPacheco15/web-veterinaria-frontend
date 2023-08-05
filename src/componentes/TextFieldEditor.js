import { useState } from 'react';
import "./TextFieldEditor.css";

function TextFieldEditor(props) {
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const newValue = event.target.value.replace(/ {2,}/g, " ");
        props.onChange(newValue);
        if (props.validator && !props.validator.test(newValue)) {
            setError(props.errorMessage);
            props.actualizarError(true);
        } else if (newValue.length < props.minLength) {
            setError(`Debe tener más de ${props.minLength} caracteres`);
            props.actualizarError(true);
        }
        else {
            setError(null);
            props.actualizarError(false);
        }
    };

    return (
        <div className='modal-item'>
            <label htmlFor={props.id}>{props.label}:</label>
            <input
                type="text"
                id={props.id}
                value={props.value}
                onChange={handleChange}
                maxLength={props.maxLength}
            />
            {error && <div className="error">{error}</div>}
        </div>
    );
}

export default TextFieldEditor;
