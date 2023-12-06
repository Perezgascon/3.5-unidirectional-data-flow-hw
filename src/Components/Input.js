import React from 'react'

export default function Input({ value, label, onChange, type }) {



    return (
        <div>
            <label>{label}</label>
            <input

                type={type}

                value={value}

                onChange={onChange}
            />
        </div>
    )
}
