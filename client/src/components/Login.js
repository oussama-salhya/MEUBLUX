import React, { useState } from 'react'
import { Alert, Form } from './'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { hideMsg, login, loginWithGoogle, register, toggleLoginPage } from '../Features/user/userSlice'
import { useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google'
import { AiOutlineGoogle } from 'react-icons/ai'
import { useEffect } from 'react'
import { displayError, hideError } from '../Features/user/userSlice'

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true
}
const Login = () => {
    const [values, setValues] = useState(initialState)
    const { showError, msg, isLoading } = useSelector(store => store.user)
    const dispatch = useDispatch()
    const handleChange = (e) => {
        const { target: { name, value } } = e
        setValues({ ...values, [name]: value })
    }
    const handleLoginSubmit = () => {
        if (!values.email || !values.password) {
            dispatch(displayError())
            return;
        }
        dispatch(login({ email: values.email, password: values.password }))
        if (showError) {
            dispatch(hideError())
        }
        if (msg) {
            dispatch(hideMsg(true))
        }
    }
    const handleregisterSubmit = () => {
        if (!values.email || !values.password || !values.name) {
            dispatch(displayError())
            return;
        }
        dispatch(register({ email: values.email, password: values.password, name: values.name }))
        if (showError) {
            dispatch(hideError())
        }
        if (msg) {
            dispatch(hideMsg(true))
        }
    }
    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember });
    }
    const openGoogleForm = useGoogleLogin({
        onSuccess: credentialResponse => {
            dispatch(loginWithGoogle(credentialResponse.access_token))
        },
    });
    const closePageLogin = () => {
        console.log("toggle from login");
        dispatch(toggleLoginPage())
        if (showError) {
            dispatch(hideError())
        }
        if (msg) {
            dispatch(hideMsg(true))
        }
    }

    const loginFormInputs = [
        {
            type: 'email',
            name: 'email',
            value: values.email,
            handleChange
        },
        {
            type: 'password',
            name: 'password',
            value: values.password,
            handleChange
        }
    ]
    const registerFormInputs = [
        {
            type: 'text',
            name: 'name',
            value: values.name,
            handleChange
        },
        {
            type: 'email',
            name: 'email',
            value: values.email,
            handleChange
        },
        {
            type: 'password',
            name: 'password',
            value: values.password,
            handleChange
        }
    ]
    useEffect(() => {
        document.addEventListener('click', closePageLogin)
        return () => document.removeEventListener('click', closePageLogin)
    })
    useEffect(() => {
        if (msg && !showError) {
            const timeoutId = setTimeout(() => dispatch(hideMsg(true)), 5000)
            return () => clearTimeout(timeoutId)
        }
    }, [msg])
    return (
        <Wrapper className='login'>
            <div className='container' onClick={(e) => e.stopPropagation()}>
                {
                    values.isMember ?
                        (
                            <Form
                                formInputs={loginFormInputs}
                                handleForm={handleLoginSubmit}
                                title='log in'
                                submitLabel='Log in'
                                cta={{ label: <><AiOutlineGoogle /> continue with gmail </>, onCall: openGoogleForm }}
                                showError={showError}
                                msg={msg}
                                isLoading={isLoading}
                            >
                                <div>
                                    New user?
                                    <button
                                        className='toggle-login'
                                        onClick={toggleMember}
                                    > Create an account.
                                    </button>
                                </div>
                            </Form>
                        )
                        :
                        (
                            <Form
                                formInputs={registerFormInputs}
                                handleForm={handleregisterSubmit}
                                title='Sign up'
                                submitLabel='Register'
                                cta={{ label: <><AiOutlineGoogle /> continue with gmail </>, onCall: openGoogleForm }}
                                showError={showError}
                                msg={msg}
                                isLoading={isLoading}
                            >
                                <div>
                                    Already have an account?
                                    <button
                                        className='toggle-login'
                                        onClick={toggleMember}
                                    >Sign in.
                                    </button>
                                </div>
                            </Form>
                        )
                }
            </div>
        </Wrapper>

    )
}

const Wrapper = styled.section`
    min-height: 100vh;
    display: grid;
    place-items: center;
    .container{
        max-width : var(--fixed-width);
        padding: 1rem 2.5rem;
        margin-top: 3rem;
    }
    .title{
        text-align: center;
        font-size: 4.5rem;
    }
    .toggle-login{
        color : var(--black);
        font-weight : bold ;
        margin-left: 5px;
    }
    @media screen and (max-width : 500px){
        .container{
            padding: 1rem ;
        }
        .title{
            font-size: 3rem;
        }
    }

`

export default Login
