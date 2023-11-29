import React from 'react'

export default function Input({ value, label, onChange }) {

    const handlerChange = (event) => {
        onChange(event.target.value);
    }

    return (
        <div>
            <label>{label}</label>
            <input
                onChange={handlerChange}
                value={value}

            />
        </div>
    )
}
