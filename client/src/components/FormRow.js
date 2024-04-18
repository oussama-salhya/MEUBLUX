import React, { useState } from 'react'

const FormRow = ({ label, name, type, handleChange, value, showError }) => {
    if (type === 'file') {
        return (
            <div className="container-input">
                <label
                    className="form-label file-label"
                    htmlFor={name}
                >
                    {label || name}
                </label>
                <span>
                    {value}
                </span>
                <div>
                    <input
                        type={type}
                        className="form-input form-row"
                        id={name}
                        name={name}
                        onChange={handleChange}
                        autoComplete='false'
                    />
                    {
                        showError && !value && <span className='form-alert'>{name} is required</span>
                    }
                </div>

            </div>
        )
    }
    return (
        <div className='container-input'>
            <label className="form-label" htmlFor={name}>{label || name}</label>
            {
                type === 'textarea' ?
                    <div>
                        <textarea
                            id={name}
                            name={name}
                            value={value}
                            onChange={handleChange}
                            autoComplete='false'
                            className="form-input form-row"
                            rows='8'
                        />
                        {
                            showError && !value && <span className='form-alert'>{label || name} is required</span>
                        }
                    </div>
                    :
                    <div>
                        <input
                            type={type}
                            className="form-input form-row"
                            id={name}
                            name={name}
                            value={value}
                            onChange={handleChange}
                            autoComplete='false'
                        />
                        {
                            showError && !value && <span className='form-alert'>{label || name} is required</span>
                        }
                    </div>


            }

        </div>
    )
}

export default FormRow
