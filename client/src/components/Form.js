import React, { useState } from 'react'
import FormRow from './FormRow'
import styled from 'styled-components';
import Alert from './Alert';
const Form = ({ formInputs, handleForm, title, submitLabel, cta: { label, onCall }, children, showError, msg, isLoading }) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        handleForm();
    }
    return (
        <Wrapper
            onClick={(e) => e.stopPropagation()}
        >
            <h1 className='title'>{title}</h1>
            {
                msg && <Alert showError={showError} msg={msg} />
            }
            <form onSubmit={handleSubmit} className='form'>
                {
                    formInputs.map((item, index) => {
                        const { type, name, handleChange, value } = item
                        return <FormRow
                            type={type}
                            name={name}
                            handleChange={handleChange}
                            key={index}
                            value={value}
                            showError={showError}
                        />
                    })
                }
                <button type="submit" className='dark-btn'>
                    {
                        isLoading ? 'Loading ...' : submitLabel
                    }
                </button>
            </form>
            {
                label && <>
                    <div className="form-divider"><span>Or</span></div>

                    <button className="dark-btn cta" onClick={onCall}>
                        {label}
                    </button>
                </>
            }

            {children}
        </Wrapper>

    )
}
const Wrapper = styled.div`
    .dark-btn{
        width : 100%; 
        margin-top : 1rem;
    }
    .form-divider{
        position: relative;
        width: 100% ;
        margin: 0 auto ; 
        margin-top : 1rem;
        text-align: center;
    }
    .form-divider::before{
        position: absolute;
        top: 50%;
        left: 0;
        display: block;
        content: " ";
        width: 100%;
        height: 1px;
        background: #e1e1e1;
    }
    .form-divider span{
        z-index: 10;
        position: relative;
        background: var(--white);
        padding: 0 1.2rem;
    }
    .dark-btn.cta{
        background: var(--white);
        color: var(--grey-300);
        border-color: #e1e1e1;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        margin-bottom : 1rem;
    }
    .dark-btn.cta svg{
        font-size: 20px;
    }
    .dark-btn.cta + div{
        text-align:center;
    }
`

export default Form
